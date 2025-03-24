import {supabaseUrl, supabaseServiceRole} from "../supabaseClient.ts";
import {GetRequestData, GetData} from "../../types/Types.ts";
import React from "react";

type FetchData = {
    input:GetRequestData,
    setResult: React.Dispatch<React.SetStateAction<GetData[] | undefined>>
}
type ResponseData = {
    description: string
    id: number
    name: string
    percentage: number
    pet: string
    rating: string
}

async function fetchData(data: FetchData ) {
    const response = await fetch(`${supabaseUrl}/rest/v1/ingredients?name=in.(${data.input.ingredients.join(',')})&pet=eq.${data.input.pet.toString()}`, {
        method: 'GET',
        headers: {
            'apikey': supabaseServiceRole as string,
            'Authorization': `Bearer ${supabaseServiceRole}` as string,
            'Content-Type': 'application/json',
        } as Record<string, string>,
    });

    const fullResult: ResponseData[]  = await response.json();

    const result: GetData[] = fullResult.map(item => (
        {
            id: item.id,
            description: item.description,
            name: item.name,
            rating: item.rating
        }
    ));
    data.setResult(result);
}

export default fetchData;

