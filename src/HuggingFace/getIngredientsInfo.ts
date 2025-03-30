import {GetResponseData, GetResponseError, Pet} from "../types/Types.ts";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

function mapPet(pet:Pet) {
    if(pet === "cat") return `kotów`
    if(pet === "dog") return `psów`
    else throw Error(`Pet ${pet} not found`)
}

const proxyURL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL;


export async function getIngredientsInfo(
    ingredients: string[],
    pet: Pet,
): Promise<Awaited<GetResponseData | GetResponseError>[]> {
    const petString = mapPet(pet);

    const responses = await Promise.all(
        ingredients.map(async (name): Promise<GetResponseData | GetResponseError> => {
            try {
                const response = await fetch(proxyURL, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${HF_TOKEN}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        inputs: `Podaj mi informację na temat "${name}" w składzie karmy dla "${petString}". 
    Odpowiedz TYLKO poprawnym JSON-em, BEZ żadnych dodatkowych komentarzy czy oznaczeń.
    Użyj następującego formatu:
    {
        "rating": "ok" | "great" | "avoid",
        "description": "Tekst opisu"
    }`
                    })
                });
                 if (!response.ok) {
                    return { ingredientName: name, pet, error: new Error(`Response error: ${response.status} ${response.statusText}`) };
                }

                const result = await response.json();
                let jsonText = result[0]?.generated_text?.trim() || "";
                jsonText = jsonText.match(/\{[\s\S]*\}/)?.[0] || "";

                if (!jsonText) {
                    return { ingredientName: name, pet, error: new Error("not proper json returned") };
                }

                const parsedData = JSON.parse(jsonText);
                return { ingredientName: name, pet, ...parsedData };
            } catch (error) {
                return { ingredientName: name, pet, error: error instanceof Error ? error : new Error("Unknown error") };
            }
        })
    );
    return responses;
}
