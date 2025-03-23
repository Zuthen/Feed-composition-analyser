import React, {useState} from 'react'
import Title from "../Title/Title.tsx";
import SpeciesMenu from "../SpeciesMenu/SpeciesMenu.tsx";
import TextBox from "../Textbox/Textbox.tsx";
import {Pet} from "../../types/Types.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";
import Results from "../Results/Results.tsx";


const CheckFoodIngredients: React.FC = () => {

    const [pet, setPet] = useState<Pet>('')
    const onPetChange = (newPet: Pet) => {
        setPet(newPet)
    }
    const [areResults, setAreResults] = useState<boolean>(false)
    function handleResults(){
        setAreResults(true)
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
            <Title pet={pet} results={areResults}/>
            {areResults ?
                <Results listItems={temporaryData}/>
                :
                <><SpeciesMenu onChange={onPetChange}/>
                <TextBox isDisabled={!pet}/>
                 <CheckButton isDisabled={!pet} onClick={handleResults}/>
                </>
            }
        </>
    )
}

export default CheckFoodIngredients;