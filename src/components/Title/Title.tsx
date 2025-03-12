import React from "react";
import colorsPalette from '../../colorsPalette.json'
import {Pet, PetSpices} from "../../types/Types.ts";
import BowlIcon from "../Icons/BowlIcon.tsx";

const petMapping: Record<Pet, string> = {
    cat: 'kota',
    dog: 'psa',
    '': 'zwierzaka',
};


const Title: React.FC<PetSpices> = ({ pet='' }: PetSpices) => {

    const petText = petMapping[pet];
    return <div className="title">
        <BowlIcon height="120px" width="120" style={{ display:'block', verticalAlign: 'bottom', padding: "unset"}}/>
        <h1 style={{color: colorsPalette.titleText, marginTop:0}}>Sprawdź skład karmy swojego {petText}</h1>
    </div>
}

export default Title;
