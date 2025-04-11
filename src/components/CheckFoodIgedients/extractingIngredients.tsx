import {Ingredient} from "../../types/Types.ts";

function isNumber(text: string): boolean{
    return !isNaN(Number(text));
}

function splitItemsBy(array: string[], condition: string): string[] {
    return array.flatMap(item => item.includes(condition) ? item.split(condition) : [item])
}

type PrepIngredient = {
    id: number,
    name?: string,
    content?: string,
    percentage?: number,
    in?: string
}
function createPrepIngredientsFromStringList(array: string[]): PrepIngredient[] {
    const prepIngredients: PrepIngredient[] = [];

    array.forEach((item) => {
        if (isNumber(item) && Number(item) > 0) {
            prepIngredients.push({
                id: prepIngredients.length,
                percentage: Number(item)
            });
        } else {
            const trimmedContent = item.trim();
            if (trimmedContent) {
                prepIngredients.push({
                    id: prepIngredients.length,
                    content: trimmedContent
                });
            }
        }
    });

    const prepIngredientsWithNames: PrepIngredient[] = [];

    prepIngredients.forEach((prepIngredient: PrepIngredient) => {
        if (typeof prepIngredient.content !== "undefined") {
            prepIngredientsWithNames.push({
                id: prepIngredient.id,
                content: prepIngredient.content,
            });
        } else {
            prepIngredientsWithNames.push({ ...prepIngredient });
        }
    });

    return prepIngredientsWithNames;
}


function mapNamesByContent(prepIngredientArray: PrepIngredient[]): PrepIngredient[] {
    return prepIngredientArray.map(item => {
        const mightBeNamed = typeof item.name === "undefined" && typeof item.percentage === "undefined" &&  typeof item.content === "string"
        const content = typeof item.content === "string" ? item.content.trim() : ""
        if(mightBeNamed && content && !content.includes(")") && !content?.includes(",")){
            return {
                id: item.id,
                name: content,
            }
        }
        return item
    })
}

function splitContentToName(preps: PrepIngredient[]): PrepIngredient[] {
    const allIngredients : PrepIngredient[] = []
    let id:number=0
    preps.map((prep)=>{
        if(prep.content !== undefined) {
            const newPreps = prep.content.split(", ")
            if(newPreps.length>1){
                newPreps.forEach(prepIngredient => {
                    allIngredients.push({
                        id: id,
                        name: prepIngredient
                    })
                    id++
                })
            } else{
                allIngredients.push({
                    id: id,
                    name:newPreps[0]
                })
                id++
            }
        }else{
// eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id: _, ...rest } = prep
            allIngredients.push({
                id,
                ...rest
            })
            id++
        }
    })
    return allIngredients
}

function mapPercentagesFromNameString (array: PrepIngredient[]):PrepIngredient[] {
    const percentages: PrepIngredient[]=[]
    array.forEach(item => {
        if(item.name && isNumber(item.name)){
            percentages.push({
                percentage: Number(item.name),
                ...item
            })
        }
        else{
            percentages.push(item)
        }
    })
    return percentages
}
function moveClosingBracketsUp(array: PrepIngredient[]): PrepIngredient[] {
    const movedBrackets: PrepIngredient[] = []

    for (const current of array) {
        if (current.name === ")") {
            for (let j = movedBrackets.length - 1; j >= 0; j--) {
                if (movedBrackets[j].name) {
                    movedBrackets[j].name += ")"
                    break
                }
            }
        } else {
            movedBrackets.push({ ...current })
        }
    }

    return movedBrackets
}


function isSelfClosing(item: PrepIngredient):boolean{
    return typeof item.name === "string" && item.name.includes("(") && item.name.includes(")");
}

function splitForRangesByBrackets(array: PrepIngredient[]): (PrepIngredient[])[] {
    const ranges: (PrepIngredient[])[] = [];

    const isBracketRangeStart = (item: PrepIngredient): boolean =>
        typeof item.name === "string" && item.name.includes("(") && !isSelfClosing(item);

    const isBracketRangeEnd = (item: PrepIngredient): boolean =>
        typeof item.name === "string" && item.name.includes(")") && !isSelfClosing(item);

    const starts: number[] = [];
    const ends: number[] = [];

    for (let i = 0; i < array.length; i++) {
        if (isBracketRangeStart(array[i])) starts.push(i);
        if (isBracketRangeEnd(array[i])) ends.push(i);
    }

    const bracketRanges: [number, number][] = [];
    const minLength = Math.min(starts.length, ends.length);

    for (let i = 0; i < minLength; i++) {
        bracketRanges.push([starts[i], ends[i]]);
    }

    if (starts[0] !== 0) {
        const preRange: PrepIngredient[] = array.slice(0, starts[0]);
        if (preRange.length > 0) ranges.push(preRange);
    }


    for (let i = 0; i < starts.length - 1; i++) {
        const start = ends[i] + 1;
        const end = starts[i + 1];
        if (start < end) {
            const betweenRange: PrepIngredient[] = array.slice(start, end);
            if (betweenRange.length > 0) ranges.push(betweenRange);
        }
    }

    bracketRanges.forEach(([start, end]) => {
        const range = array.slice(start, end + 1);
        if (range.length > 0) ranges.push(range);
    });

    const lastEnd = ends[ends.length - 1];
    if (lastEnd < array.length - 1) {
        const postRange = array.slice(lastEnd + 1);
        if (postRange.length > 0) ranges.push(postRange);
    }

    const isBracketedRange = (range: PrepIngredient[]): boolean =>
        range.some(item => isBracketRangeStart(item) || isBracketRangeEnd(item));

    const flatRanges = new Set(ranges.flat());

    array.forEach((item) => {
        if (isSelfClosing(item) && !flatRanges.has(item)) {
            // znajdź najbliższy zakres bez nawiasów
            let closestIndex = -1;
            let minDistance = Infinity;

            ranges.forEach((range, rIdx) => {
                if (!isBracketedRange(range)) {
                    const first = range[0].id;
                    const last = range[range.length - 1].id;
                    const dist = Math.min(Math.abs(first - item.id), Math.abs(last - item.id));
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestIndex = rIdx;
                    }
                }
            });

            if (closestIndex !== -1) {
                ranges[closestIndex].push(item);
            } else {
                ranges.push([item]); // jeśli brak sąsiedztwa, wrzuć jako osobny
            }
        }
    });

    return ranges.sort((a, b) => a[0].id - b[0].id);
}
function percentagesWithNames(array: PrepIngredient[]): PrepIngredient[] {
    const newRange: PrepIngredient[] = [];
    if(array.length > 1){
    array.forEach((item, index) => {
        if(item.percentage && array[index+1]){
            newRange.push({
                ...item,
                name:array[index+1].name
            })
        }else if(newRange.filter(element =>element.name===item.name).length<1){
            newRange.push(item)
        }
    })}
    return newRange
}
function selfClosingItemsToPercentages(prepIngredient: PrepIngredient):PrepIngredient{
    if(isSelfClosing(prepIngredient)){
        const nameContents = prepIngredient.name?.replace("(", " ").replace(")", "").split(" ")
        if(nameContents && nameContents.length > 1){
        return {
            id: prepIngredient.id,
            name: nameContents[0],
            percentage: Number(nameContents[1])
        }
        }
        return  prepIngredient
    }
    return prepIngredient;
}
function setNameForClosingBracket(name: string): string{
    if(name.includes(")")){
        return name.replace(")", "").trim()
    }
    return name;
}
function mapPercentageFirst(prepIngredients: PrepIngredient[], nameParts:string[]):PrepIngredient[]{
        const mainElementName: string = nameParts[0].trim()
        const nextElementPercentage: string = nameParts[1]
        const mainElement = {
            id: prepIngredients[0].id,
            name: mainElementName
        }
        const nextElement = {
            id: prepIngredients[1].id,
            name: prepIngredients[1].name ? setNameForClosingBracket(prepIngredients[1].name) : "",
            percentage: Number(nextElementPercentage),
            in: mainElementName
        }

        const rest = prepIngredients.filter(ingredient => ingredient.id !== mainElement.id && ingredient.id !== nextElement.id )
            .map(ingredient => {
                return{
                    ...ingredient,
                    name: ingredient.name ? setNameForClosingBracket(ingredient.name) : "",
                    in: mainElementName
                }
            })
        return [
            mainElement,
            nextElement,
            ...rest
        ]
}

function mapNextNameFirst(prepIngredients: PrepIngredient[], nameParts:string[]):PrepIngredient[]{
    const mainElementName: string = nameParts[0].trim()
    const nextElementName: string = nameParts[1].trim()
    const mainElement = {
        id: prepIngredients[0].id,
        name: mainElementName
    }
    // id is duplicated but will be overwritten in toIngredient map
    const nextElement = {
        id: prepIngredients[0].id,
        name:  setNameForClosingBracket(nextElementName),
        in: mainElementName
    }
    const rest = prepIngredients.filter(ingredient => ingredient.id !== mainElement.id)
        .map(ingredient => {
            return{
                ...ingredient,
                name: ingredient.name ? setNameForClosingBracket(ingredient.name) : "",
                in: mainElementName
            }
        })
    return [
        mainElement,
        nextElement,
        ...rest
    ]
}

function createIngredientsFromBrackets(ingredients: PrepIngredient[][]):PrepIngredient[][]{
   return ingredients.map(range =>{
        const nameContent = range[0].name
        if(nameContent?.includes("(")){
            const nameParts = nameContent.split("(")
            if(nameParts.length > 1){
                if( isNumber(nameParts[1])){
                    return mapPercentageFirst(range, nameParts)
                }
                else{
                    return mapNextNameFirst(range, nameParts)
                }
            }
        }
        return range
    })

}

function mergeToPrepIngredients(rangesList: PrepIngredient[][]):PrepIngredient[]{
    const allPrepIngredients: PrepIngredient[] = []
    let id = 0
    rangesList.forEach((range) => {
        range.map(ingredient => {
            const newIngredient = {
                ...ingredient,
                id
            }
            allPrepIngredients.push(newIngredient)
            id++
        })
    })
    return allPrepIngredients
}

function setPercentagesByName(item: PrepIngredient, name: string):PrepIngredient{
    const nameParts = name.split(" ")
    const namePartsSource = nameParts.slice()
    if(nameParts.length > 1){
        const indexes:number[]=[]
        nameParts.forEach((namePart, index) => {
            if(isNumber(namePart)){
                indexes.push(index)
            }
        })
        if(indexes.length === 1){
            nameParts.splice(indexes[0], 1)

            const newName= nameParts.join(" ");
            return {
                ...item,
                name: newName,
                percentage: Number(namePartsSource[indexes[0]])
            }
        }
        return item
        }
    return item
    }



export default function extractIngredients(text: string): Ingredient[] {
    const removedPercentChar = splitItemsBy(text.split(","), "%").slice()
    const prepIngredients: PrepIngredient[] = createPrepIngredientsFromStringList(removedPercentChar)
    const setNames = mapNamesByContent(prepIngredients)
    const mappedNamesFromContent =splitContentToName(setNames)
    const mappedPercentagesFromName = mapPercentagesFromNameString(mappedNamesFromContent)
    const movedBrackets = moveClosingBracketsUp(mappedPercentagesFromName)
    const ranges = splitForRangesByBrackets(movedBrackets)
    const mergedPercentages:PrepIngredient[][] = ranges.map(range =>{
       return percentagesWithNames(range)
        }
    )
    const selfClosingToPercentages = mergedPercentages.map(range =>{
        return range.map((item) => {
           return  selfClosingItemsToPercentages(item)
        })
    })
    const mappedPercentages = createIngredientsFromBrackets(selfClosingToPercentages)
    const mergedPrepIngredientsList = mergeToPrepIngredients(mappedPercentages)
    const setPercentagesForNamesIncludingNumbers = mergedPrepIngredientsList.map(item =>{
        if(item.name && item.name.includes(" ")){
            return setPercentagesByName(item, item.name)
        }
        return item
    })

    console.log(setPercentagesForNamesIncludingNumbers.map((item) =>{
        const { id, ...rest } = item;
        return {
            ...rest,
            name: item.name ? item.name : "",
        }
    }))

    return setPercentagesForNamesIncludingNumbers.map((item) =>{
        const { id, ...rest } = item;
        return {
            ...rest,
            name: item.name ? item.name : "",
        }
    })

}