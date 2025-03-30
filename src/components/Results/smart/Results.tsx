import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {
    GetData,
    GetRequestData,
    GetResponseData,
    GetResponseError,
} from "../../../types/Types.ts";
import {getIngredientsInfo} from "../../../HuggingFace/getIngredientsInfo.ts";
import LoaderPopup from "../../LoaderPopup/LoaderPopup.tsx";
import DumbResults, {ListItem} from "../dumb/Results.tsx";

type ResultsProps = {
    listItems: GetData[]
    requestData: GetRequestData
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

    function isGetResponseData(item: GetResponseData | GetResponseError): item is GetResponseData {
        return "rating" in item;
    }

    function mapGetDataToListItem(getData: GetData[]):ListItem[]{
     return getData.map(item => {
         return {
             id:item.id.toString(),
             description:item.description,
             rating: item.rating,
             name: item.name
         }
     })
    }

function mapGetResponseDataToListItem(data: GetResponseData[]): ListItem[] {
    return data.map(item => {
        return {
            id: item.id?.toString() || crypto.randomUUID(),
            name: item.ingredientName,
            rating: item.rating,
            description: item.description
        };
    });
}

const Results:React.FC<ResultsProps> = ({listItems, requestData, loading, setLoading}: ResultsProps )=> {
    const [allIngredients, setAllIngredients] = useState<ListItem[]>([])

    function notFoundIngredients(): string[] {
        const requestIngredients=requestData.ingredients
        const resultIngredients = listItems.map(item => item.name.toLowerCase())
        return requestIngredients.filter(ingredient =>!resultIngredients.includes(ingredient))
    }

    const missingIngredients=notFoundIngredients()

    const fetchMissingIngredientsFromAI = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getIngredientsInfo(missingIngredients, requestData.pet);
            const responseData= response.filter(isGetResponseData)
            if (typeof response === "string") {
                console.log("Surowa odpowiedź jako string:", response);
                try {
                    const parsedResponse = JSON.parse(response);
                    console.log("Poprawnie sparsowany JSON:", parsedResponse);
                } catch (jsonError) {
                    console.error("Błąd parsowania JSON:", jsonError);
                }
            } else {
                console.log("Odpowiedź to już obiekt JS:", response);
            }

            if (typeof response === "string") {
                console.log("Próba parsowania JSON-a...");
                const parsedResponse = JSON.parse(response);
                console.log("Poprawnie sparsowany JSON:", parsedResponse);
            }
            setAllIngredients(mapGetResponseDataToListItem(responseData).concat(mapGetDataToListItem(listItems)))

        } catch (error) {
            console.error("Błąd:", error);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(missingIngredients), requestData.pet]);


    useEffect(() => {
        fetchMissingIngredientsFromAI().catch(console.error);
    }, [fetchMissingIngredientsFromAI]);

    return <>
        {loading ? <LoaderPopup open={loading} loadingReason="ai"/>
            :
            <DumbResults listItems={allIngredients}/> }
    </>
}

export default Results
