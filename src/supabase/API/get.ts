import {supabaseUrl, supabaseServiceRole} from "../supabaseClient.ts";
import {GetData, GetRequestData, Rating, ResponseData} from "../../types/Types.ts";
import {Dispatch, SetStateAction} from "react";



async function fetchData(data: GetRequestData, setLoadingDatabase: Dispatch<SetStateAction<boolean>> ): Promise<GetData[]> {
    setLoadingDatabase(true);
    const response = await fetch(`${supabaseUrl}/rest/v1/ingredients?or=(${data.ingredients.map(ingredient => `name.ilike.${ingredient}`).join(',')})&pet=eq.${data.pet}`
        , {
        method: 'GET',
        headers: {
            'apikey': supabaseServiceRole as string,
            'Authorization': `Bearer ${supabaseServiceRole}` as string,
            'Content-Type': 'application/json',
        } as Record<string, string>,
    });

    const fullResult: ResponseData[] = await response.json();

    const result: GetData[] = fullResult.map(item => (
        {
            id: item.id,
            description: item.description,
            name: item.name,
            rating: item.rating as Rating
        }
    ));
    setLoadingDatabase(false);
    return result;
}

export default fetchData;

