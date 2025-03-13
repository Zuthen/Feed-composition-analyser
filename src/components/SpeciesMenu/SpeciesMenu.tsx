import React, {useState} from "react";
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
    selected?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({onChange, pet, children : icon, selected }:MenuButtonProps) => {

    const setPetName: Record<Pet, string> ={
        dog: "pies",
        cat: "kot",
        "": "error"
    }
    return (
        <button className="menu-button" style={{backgroundColor: selected? colorsPalette.pageText: colorsPalette.menuButtonBackground, color:colorsPalette.menuButtonCaption}}
                onClick={()=>{onChange(pet)}}>
            {icon}
            {setPetName[pet]}
        </button>
    )
}

const SpeciesMenu: React.FC<SpeciesMenuProps> = ({onChange} : SpeciesMenuProps)=>{
    const [isDogSelected, setIsDogSelected]= useState(false);
    const [isCatSelected, setIsCatSelected]= useState(false);

    const handleButtonSelected = (pet: Pet) => {
        if(pet === "cat"){
            setIsCatSelected(true);
            setIsDogSelected(false)
        } else if (pet === "dog"){
            setIsDogSelected(true)
            setIsCatSelected(false)
        }
        onChange(pet);
    }
    return <menu> <p  className="menu-text" style = {{color:colorsPalette.pageText}}>Twój zwierzak to </p>
        <MenuButton pet="dog" onChange={()=>handleButtonSelected("dog")} selected={isDogSelected}>
            <DogIcon height="20px" width="20px"/>
        </MenuButton>
        <MenuButton pet="cat" onChange={()=>handleButtonSelected("cat")} selected={isCatSelected}>
            <CatIcon height="20px" width="20px"/>
        </MenuButton>
    </menu>
}

export default SpeciesMenu;