import {supabaseUrl, supabaseServiceRole} from "../supabaseClient.ts";
import {DatabaseInsert, GetResponseError} from "../../types/Types.ts";

const headers = {
    'apikey': supabaseServiceRole as string,
    'Authorization': `Bearer ${supabaseServiceRole}`,
    'Content-Type': 'application/json',
}as Record<string, string>

export async function postData(
    data: DatabaseInsert[],
): Promise<{ responseData: Response[]; errors: Response[] }> {
    const responses= await Promise.all(
        data.map(async (item) => {
            const response= await fetch(`${supabaseUrl}/rest/v1/ingredients`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(item),
    })
         return response;
        })
    )
    const responseData = responses.filter(response => response.ok);
    const errors = responses.filter(response => !response.ok);
    return { responseData, errors };
}
 export async function postErrors(
     errors: GetResponseError[]
 ): Promise<{responseData: Response[]; errors: Response[]}> {
    const responses = await Promise.all(
        errors.map(async (item) =>{
            const response= await fetch(`${supabaseUrl}/rest/v1/errors`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(item),
            })
            return response;
    })
    )
     const responseData = responses.filter(response => response.ok);
     const responseErrors = responses.filter(response => !response.ok);
     return { responseData, errors: responseErrors };
    }
