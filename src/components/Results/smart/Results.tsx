import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {
    DatabaseInsert,
    DatabaseRecord,
    RequestData,
    GetResponseData,
    GetResponseError,
} from "../../../types/Types.ts";
import {getIngredientsInfo} from "../../../HuggingFace/getIngredientsInfo.ts";
import LoaderPopup from "../../LoaderPopup/LoaderPopup.tsx";
import DumbResults, {ListItem} from "../dumb/Results.tsx";
import {postData, postErrors} from "../../../supabase/API/post.ts";

type ResultsProps = {
    listItems: DatabaseRecord[]
    requestData: RequestData
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

    function isGetResponseData(item: GetResponseData | GetResponseError): item is GetResponseData {
        return "rating" in item;
    }

    function  isGetResponseError(item: GetResponseData | GetResponseError): item is GetResponseError {
        return "error" in item;
    }

    function mapGetDataToListItem(getData: DatabaseRecord[]):ListItem[]{
     return getData.map(item => {
         return {
             id: item.id,
             description:item.description,
             rating: item.rating,
             name: item.name
         }
     })
    }

function mapGetResponseDataToListItem(data: GetResponseData[]): ListItem[] {
    return data.map(item => {
        return {
            id: item.id,
            name: item.ingredientName,
            rating: item.rating,
            description: item.description
        };
    });
}

function mapResponseDataToDatabaseInsert(data:GetResponseData[]):DatabaseInsert[]{
    return data.map(item=> {return {
        description: item.description,
        name: item.ingredientName,
        rating: item.rating,
        pet: item.pet
    }})
}

const Results:React.FC<ResultsProps> = ({listItems, requestData, loading, setLoading}: ResultsProps )=> {
    const [allIngredients, setAllIngredients] = useState<ListItem[]>([])
    const [responseErrors, setResponseErrors] = useState<GetResponseError[]>([])

    function notFoundIngredients(): string[] {
        const requestIngredients=requestData.ingredients.map(ingredient =>ingredient.name)
        const resultIngredients = listItems.map(item => item.name.toLowerCase())
        return requestIngredients.filter(ingredient =>!resultIngredients.includes(ingredient))
    }

    const missingIngredients=notFoundIngredients()

    const fetchMissingIngredientsFromAI = useCallback(async () => {
            setLoading(true);
             getIngredientsInfo(missingIngredients, requestData.pet).then(response => {
                 const responseData = response.filter(isGetResponseData);
                 const errors = response.filter(isGetResponseError);
                 setResponseErrors(errors)
                 setAllIngredients(mapGetResponseDataToListItem(responseData).concat(mapGetDataToListItem(listItems)))
                 const dataDatabaseItems = mapResponseDataToDatabaseInsert(responseData)
                 return postData(dataDatabaseItems)

             }).then(() => postErrors(responseErrors)).catch(console.error).finally(()=>setLoading(false))
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
