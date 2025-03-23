import React from "react";
import colorsPalette from '../../colorsPalette.json'
import {Pet} from "../../types/Types.ts";
import BowlIcon from "../Icons/BowlIcon.tsx";

const petMapping: Record<Pet, string> = {
    cat: 'kota',
    dog: 'psa',
    '': 'zwierzaka',
};
type TitleProps = {
    pet:Pet,
    results?: boolean
}

const Title: React.FC<TitleProps> = ({ pet="", results=false }: TitleProps) => {
    const petText = petMapping[pet];
    if(results){
        return <h2 style={{color: colorsPalette.pageText}}>Wyniki Analizy karmy </h2>
    } else return <div className="title">
        <BowlIcon height="120px" width="120" style={{ display:'block', verticalAlign: 'bottom', padding: "unset"}}/>
        <h1 style={{color: colorsPalette.titleText, marginTop:0}}>Sprawdź skład karmy swojego {petText}</h1>
    </div>
}

export default Title;
