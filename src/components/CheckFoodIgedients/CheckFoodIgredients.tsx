import React, {useState} from 'react'
import Title from "../Title/Title.tsx";
import SpeciesMenu from "../SpeciesMenu/SpeciesMenu.tsx";
import TextBox from "../Textbox/Textbox.tsx";
import {Pet, GetData, GetRequestData} from "../../types/Types.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";
import Results from "../Results/Results.tsx";


const CheckFoodIngredients: React.FC = () => {

    const [pet, setPet] = useState<Pet>('')
    const onPetChange = (newPet: Pet) => {
        setPet(newPet)
    }
    const [results, setResults] = useState<GetData[] | undefined>()


    const [requestData, setRequestData] = useState<GetRequestData>()

    function handleTextBoxChange(ingredientsList: string){
        const textBoxIngredients = ingredientsList.split(",")
        const trimmedIngredients = textBoxIngredients.map(ingredient => ingredient.trim().toLowerCase())
        const data: GetRequestData = {
            ingredients:trimmedIngredients,
            pet
        }
        setRequestData(data)
    }

    return (
        <>
            <Title pet={pet} results={results} />
            {results && results.length > 0 ? (
                <Results listItems={results} />
            ) : (
                <>
                    <SpeciesMenu onChange={onPetChange} />
                    <TextBox isDisabled={!pet} mapIngredients={handleTextBoxChange} />
                    <CheckButton
                        isDisabled={!pet}
                        requestData={requestData ? requestData : { pet: "", ingredients: [] }}
                        getResults={setResults}
                    />
                </>
            )}
        </>
    );


}

export default CheckFoodIngredients;