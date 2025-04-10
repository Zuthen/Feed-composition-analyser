import {Ingredient} from "../../types/Types.ts";
import {it} from "vitest";

function trimToLowerCase(text: string): string {
    return text.trim().toLowerCase()
}
function extractNumberOnTextEnd(text: string) :Ingredient{
    const textParts = text.split(" ")
    const lastPart = textParts[textParts.length - 1]
    if (textParts.length>1 &&isNumber(textParts[textParts.length-1])) {
        return {
            name: textParts.slice(0, -1).join(" "),
            percentage: Number(lastPart)
        };
    }
    return {
        name: text
    }
}

function extractNameOnlyIngredients(text: string): Ingredient[]{
    return text.split(",").map(item =>{
        return {
            name: trimToLowerCase(item)
        }
    })
}
function isNumber(text: string): boolean{
    return !isNaN(Number(text));
}
function extractPercentageIngredients (text: string){

    const percentagesAndNames: string[] = []

    text.split("%").forEach(item =>{
        const split = trimToLowerCase(item).split(",")
            for(let i=0; i<split.length; i++){
                if(split[i]) {percentagesAndNames.push(split[i].trim())}
        }
    })
    const ingredients: Ingredient[] = []
    for(let i=0; i<percentagesAndNames.length; i++){
        if(isNumber(percentagesAndNames[i])){
            ingredients.push({
                name: percentagesAndNames[i+1],
                percentage: Number(percentagesAndNames[i])
            })
            i++
        }
        else {
            ingredients.push(extractNumberOnTextEnd(percentagesAndNames[i]))}
        }
    console.log(ingredients)

    return ingredients
}

function extractIngredientsWithBrackets(text: string): Ingredient[]{
    const partialIngredients = text.split("(")
    const ingredients = partialIngredients[0].split(",")
    const ingredientList: Ingredient[] = ingredients.map(ingredient => {
        return {
            name: trimToLowerCase(ingredient),
        }
    })
    const mainIngredient=ingredients[ingredients.length - 1]
    const lastIngredientContent :Ingredient[] = partialIngredients[1].split(",").map(ingredient =>{
        return {
            name: trimToLowerCase(ingredient),
            in:mainIngredient
        }
    })
    return ingredientList.concat(lastIngredientContent)
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

function mapPercentagesByName (array: PrepIngredient[]):PrepIngredient[] {
    const percentages: PrepIngredient[]=[]
    array.forEach(item => {
        if(item.name && isNumber(item.name)){
            percentages.push({
                id: item.id,
                percentage: Number(item.name)
            })
        }
        else{
            percentages.push(item)
        }
    })
    return percentages
}
function moveClosingBracketsUp(array: PrepIngredient[]):PrepIngredient[]{
    const movedBrackets:PrepIngredient[] =[]
    for (let i = 0; i < array.length-1; i++) {
        const current = array[i]
        if(current.name === ")"){
            const previous = movedBrackets[movedBrackets.length - 1]
            if(previous?.name){
                previous.name += ")"
            }
            continue
        }
        movedBrackets.push({...current})
    }
    return movedBrackets
}

function splitForRangesByBrackets(array: PrepIngredient[]): (PrepIngredient[])[] {
    const ranges: (PrepIngredient[])[] = [];

    const isSelfClosing = (item: PrepIngredient): boolean =>
        typeof item.name === "string" && item.name.includes("(") && item.name.includes(")");

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

    const bracketRanges: [number, number][] = starts.map((start, i) => [start, ends[i]]);

    if (starts[0] !== 0) {
        const preRange: PrepIngredient[] = array.slice(0, starts[0]);
        if(preRange.length>0) ranges.push(preRange);
    }

    for (let i = 0; i < starts.length - 1; i++) {
        const start = ends[i] + 1;
        const end = starts[i + 1];
        if (start < end) {
            const betweenRange: PrepIngredient[] = array.slice(start, end);
            if (betweenRange.length>0) ranges.push(betweenRange);
        }
    }

    bracketRanges.forEach(([start, end]) => {
        const range = array.slice(start, end + 1);
        if(range.length>0) ranges.push(range);
    });

    const lastEnd = ends[ends.length - 1];
    if (lastEnd < array.length - 1) {
        const postRange = array.slice(lastEnd + 1);
        if (postRange.length>0) ranges.push(postRange);
    }

    return ranges.sort((a, b) => a[0].id - b[0].id);
}


function extractPercentageIngredientsWithBrackets(text: string): Ingredient[] {
    const removedPercentChar = splitItemsBy(text.split(","), "%").slice()
    const prepIngredients: PrepIngredient[] = createPrepIngredientsFromStringList(removedPercentChar)
    const setNames = mapNamesByContent(prepIngredients)
    const mappedNamesFromContent =splitContentToName(setNames)
    const mappedPercentagesFromName = mapPercentagesByName(mappedNamesFromContent)
    const movedBrackets = moveClosingBracketsUp(mappedPercentagesFromName)
    const ranges = splitForRangesByBrackets(movedBrackets)

    console.log(movedBrackets)
    console.log("ranges", ranges)

    return []
}
    // herbata(20%), cynamon, cukier(17% biały, 18% brązowy), miłość (fizyczna, psychiczna), 18% imbir, ryba(ości 12%, mięso 5%), tymianek(15%),
//



export default function extractIngredients (text: string): Ingredient[] {
    if(text.includes("%") && text.includes("%")){
        return extractPercentageIngredientsWithBrackets(text)
    }

    if(text.includes("%") && !text.includes("(")){
        return extractPercentageIngredients(text)
    }

    if(text.includes("(") && !text.includes("%")){
        return extractIngredientsWithBrackets(text)
    }
    if(text.includes("%") && text.includes("%")){
        return [{name: "notImplemented"}]
    }
    return extractNameOnlyIngredients(text);
}