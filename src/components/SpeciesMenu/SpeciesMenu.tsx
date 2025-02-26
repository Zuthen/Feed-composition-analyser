import React from "react";
import CatIcon from "../Icons/CatIcon.tsx";
import DogIcon from "../Icons/DogIcon";

const SpeciesMenu: React.FC = ()=>{
    return <menu style={{ display: 'flex', alignItems: 'center' }}>
        <button className="button" style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
            <DogIcon height="20px" width="20px" fill="red"/>
            pies
        </button>
        <button className="button" style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
            <CatIcon height="20px" width="20px" fill="red"/>
            kot
        </button>
    </menu>
}

export default SpeciesMenu;