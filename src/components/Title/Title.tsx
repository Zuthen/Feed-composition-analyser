import React from "react";

type PetType = 'cat' | 'dog' | '';

type PetSpice = {
    pet?: PetType;
};

const petMapping: Record<PetType, string> = {
    cat: 'kota',
    dog: 'psa',
    '': 'zwierzaka',
};

const Title: React.FC<PetSpice> = ({ pet='' }) => {
    const petText = petMapping[pet as PetType];
    return <h1>Sprawdź skład karmy swojego {petText}</h1>;
}

export default Title;
