import {GetResponseData, GetResponseError, Pet} from "../types/Types.ts";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

function mapPet(pet:Pet) {
    if(pet === "cat") return `kotów`
    if(pet === "dog") return `psów`
    else throw Error(`Pet ${pet} not found`)
}

const proxyURL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL;

export async function getIngredientsInfo(ingredients:string[], pet:Pet) : Promise<Awaited<GetResponseData | GetResponseError>[]> {
    const petString = mapPet(pet);

    return Promise.all(
        ingredients.map(async (name) :Promise<GetResponseData | GetResponseError> => {
            try {
                const response = await fetch(proxyURL, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${HF_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        inputs: `Podaj mi informację na temat "${name}" w składzie karmy dla "${petString}". Proszę, zwróć odpowiedź w formacie JSON z kluczami, "rating" (ok/great/avoid) oraz "description".`
                    })
                });

                if (!response.ok) {
                    return {ingredientName: name, pet:pet, error: Error(`Response error: ${response.status}  ${response.statusText}`)}
                }

                const result = await response.json();
                let jsonText = result[0]?.generated_text?.trim() || "";

                jsonText = jsonText.match(/\{[\s\S]*\}/)?.[0] || "";

                if (!jsonText) {
                    return {ingredientName: name, pet:pet, error: Error("not proper json returned")}
                }

                const parsedData = JSON.parse(jsonText);
                return { ingredientName: name, pet:pet, ...parsedData }
            } catch (error) {
                const catchedError = error instanceof Error ? error : Error("Unknown error");
                return { ingredientName: name, pet: pet, error: catchedError };
            }
        })
    );
}