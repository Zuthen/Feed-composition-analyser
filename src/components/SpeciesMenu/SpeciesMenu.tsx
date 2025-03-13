import React from "react";
import CatIcon from "../Icons/CatIcon.tsx";
import DogIcon from "../Icons/DogIcon";
import colorsPalette from '../../colorsPalette.json'
import {Pet} from "../../types/Types.ts";
import '../../App.css';

type SpeciesMenuProps = {
    onChange: (pet : Pet) => void;
}

type MenuButtonProps={
    onChange: (pet : Pet) => void;
    pet:Pet
    children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({onChange, pet, children : icon }:MenuButtonProps) => {
    const setPetName: Record<Pet, string> ={
        dog: "pies",
        cat: "kot",
        "": "error"
    }
    return (
        <button className="menu-button" style={{backgroundColor:colorsPalette.menuButtonBackground, color:colorsPalette.menuButtonCaption}}
                onClick={()=>{onChange(pet)}}>
            {icon}
            {setPetName[pet]}
        </button>
    )
}

const SpeciesMenu: React.FC<SpeciesMenuProps> = ({onChange} : SpeciesMenuProps)=>{
    return <menu>
        <MenuButton pet="dog" onChange={()=>onChange("dog")}>
            <DogIcon height="20px" width="20px"/>
        </MenuButton>
        <MenuButton pet="cat" onChange={()=>onChange("cat")}>
            <CatIcon height="20px" width="20px"/>
        </MenuButton>
    </menu>
}

export default SpeciesMenu;