import React from "react";
import CatIcon from "../Icons/CatIcon.tsx";
import DogIcon from "../Icons/DogIcon";
import colorsPalette from '../../colorsPalette.json'

const SpeciesMenu: React.FC = ()=>{
    return <menu style={{ display: 'flex', alignItems: 'center' }}>
        <button style={{display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor:colorsPalette.menuButtonBackground, color:colorsPalette.menuButtonCaption}}>
            <DogIcon height="20px" width="20px"/>
            pies
        </button>
        <button style={{display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor:colorsPalette.menuButtonBackground, color:colorsPalette.menuButtonCaption}}>
            <CatIcon height="20px" width="20px"/>
            kot
        </button>
    </menu>
}

export default SpeciesMenu;