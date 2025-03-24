import React, {useState} from 'react'
import Title from "../Title/Title.tsx";
import SpeciesMenu from "../SpeciesMenu/SpeciesMenu.tsx";
import TextBox from "../Textbox/Textbox.tsx";
import {Pet, GetData} from "../../types/Types.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";
import Results from "../Results/Results.tsx";


const CheckFoodIngredients: React.FC = () => {

    const [pet, setPet] = useState<Pet>('')
    const onPetChange = (newPet: Pet) => {
        setPet(newPet)
    }
    const [results, setResults] = useState<GetData[]>([])


    const [ingredients, setIngredients] = useState<string[]>([])

    function handleTextBoxChange(ingredientsList: string){
        const textBoxIngredients = ingredientsList.split(",")
        const trimmedIngredients = textBoxIngredients.map(ingredient => ingredient.trim())
        setIngredients(trimmedIngredients)
    }

    const temporaryData = [
        {
            name: "Mięcho",
            id: 1,
            description: "Bardzo dobre o ja nie mogę jakie zajegbiste. Aż trudno w to uwierzyć że masz to w swojej karmie",
            rate: "great"
        },
        {
            name: "Podroby",
            id: 2,
            description: "Może być",
            rate: "ok"
        },
        {
            name: "Podroby",
            id: 3,
            description: "Co to ma być!!!",
            rate: "avoid"
        }
    ]
    return (
        <>
            <Title pet={pet} results={results}/>
            {results.length>0 ?
                <Results listItems={temporaryData}/>
                :
                <><SpeciesMenu onChange={onPetChange}/>
                <TextBox isDisabled={!pet} mapIngredients={handleTextBoxChange}/>
                 <CheckButton isDisabled={!pet} ingredients={ingredients} assignResults={setResults}/>
                </>
            }
        </>
    )
}

export default CheckFoodIngredients;