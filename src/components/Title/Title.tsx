import React from "react";
import colorsPalette from '../../colorsPalette.json'

type PetType = 'cat' | 'dog' | '';


type PetSpices = {
    pet?: PetType;
};

const petMapping: Record<PetType, string> = {
    cat: 'kota',
    dog: 'psa',
    '': 'zwierzaka',
};


const Title: React.FC<PetSpices> = ({ pet='' }: PetSpices) => {

    const petText = petMapping[pet as PetType];
    return <h1 style={{color: colorsPalette.titleText}}>Sprawdź skład karmy swojego {petText}</h1>;
}

export default Title;
