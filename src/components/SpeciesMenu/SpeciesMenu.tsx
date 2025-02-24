import React from "react";
import DogIcon from "../../assets/icons/dog.svg"
import CatIcon from "../../assets/icons/cat.svg"

const SpeciesMenu: React.FC = ()=>{
    return <menu type="vertical">
        <button className="button" style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
            <img className="button-icon" src={DogIcon} alt="Pies" width="20" height="20" style={{marginRight: '8px', fill:"aqua"}}/>
            pies
        </button>
        <button className="button" style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
            <img className="button-icon" src={CatIcon} alt="Kot" width="20" height="20" style={{marginRight: '8px'}}/>
            kot
        </button>
    </menu>
}

export default SpeciesMenu;