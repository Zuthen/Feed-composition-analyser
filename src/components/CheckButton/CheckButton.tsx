import { useState } from "react";
import colorsPalette from "../../colorsPalette.json";
import supabase from "../../supabase/supabaseClient.ts";
import {GetData} from "../../types/Types.ts";

type CheckButtonProps = {
    isDisabled?: boolean;
    ingredients: string[];
    assignResults: (results: GetData[]) => void
};

const CheckButton = ({ isDisabled = true, ingredients, assignResults }: CheckButtonProps) => {
    const [loading, setLoading] = useState(false);

    const getIngredients = async ({ pet = "dog" }) => {
        setLoading(true);

        const { data, error } = await supabase
            .from("ingredients")
            .select("description, rating, name")
            .eq("pet", pet)
            .in("name", ingredients);

        if (error) {
            console.error("Błąd pobierania danych:", error);
        } else {
            const ingredients = data?.map(element =>{
                return {
                    name: element.name,
                    description: element.description,
                    rating: element.rating
                } as GetData
            })
            assignResults(ingredients)
        }
        setLoading(false);
    };

    return (
        <button
            style={{
                backgroundColor: isDisabled ? colorsPalette.disabledButton : colorsPalette.buttonBackground,
            }}
            disabled={isDisabled || loading}
            onClick={() => getIngredients({ pet: "dog" })}
        >
            {loading ? "Ładowanie..." : "Sprawdź"}
        </button>
    );
};

export default CheckButton;
