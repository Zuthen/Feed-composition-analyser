import React from "react";
import CatIcon from "../Icons/CatIcon.tsx";
import DogIcon from "../Icons/DogIcon";
import colorsPalette from '../../colorsPalette.json'
import {Pet} from "../../types/Types.ts";

type SpeciesMenuProps = {
    onChange: (pet : Pet) => void;
}

const SpeciesMenu: React.FC<SpeciesMenuProps> = ({onChange} : SpeciesMenuProps)=>{
    return <menu style={{ display: 'flex', alignItems: 'center' }}>
        <button className="menu-button" style={{backgroundColor:colorsPalette.menuButtonBackground, color:colorsPalette.menuButtonCaption}}
        onClick={()=>{onChange('dog')}}>
            <DogIcon height="20px" width="20px"/>
            pies
        </button>
        <button className="menu-button" style={{backgroundColor:colorsPalette.menuButtonBackground, color:colorsPalette.menuButtonCaption}}
                onClick={()=>{onChange('cat')}}>
            <CatIcon height="20px" width="20px"/>
            kot
        </button>
    </menu>
}

export default SpeciesMenu;