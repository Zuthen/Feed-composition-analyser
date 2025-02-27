import React from "react";
import colorsPalette from '../../colorsPalette.json'
import {Pet, PetSpices} from "../../types/Types.tsx";

const petMapping: Record<Pet, string> = {
    cat: 'kota',
    dog: 'psa',
    '': 'zwierzaka',
};


const Title: React.FC<PetSpices> = ({ pet='' }: PetSpices) => {

    const petText = petMapping[pet as Pet];
    return <h1 style={{color: colorsPalette.titleText}}>Sprawdź skład karmy swojego {petText}</h1>;
}

export default Title;
