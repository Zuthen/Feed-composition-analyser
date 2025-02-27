import React, {useState} from 'react'
import Title from "./Title/Title.tsx";
import SpeciesMenu from "./SpeciesMenu/SpeciesMenu.tsx";
import TextBox from "./Textbox/Textbox.tsx";
import {Pet} from "../types/Types.tsx";

const CheckFoodIngredients: React.FC = () => {

    const [pet, setPet] = useState<Pet>('')
    const onPetChange = (newPet: Pet) => {
        setPet(newPet)
    }
    return (
        <>
            <Title pet={pet}/>
            <SpeciesMenu onChange={onPetChange}/>
            <TextBox/>
        </>
    )
}

export default CheckFoodIngredients;