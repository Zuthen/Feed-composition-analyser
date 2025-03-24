import React from "react";
import colorsPalette from '../../colorsPalette.json'
import '../../index.css';

type TextBoxProps = {
    isDisabled?: boolean
    mapIngredients: (ingredients: string) => void
}
const Textbox = ({isDisabled = true, mapIngredients}: TextBoxProps) =>  {

    function handleTextBoxChange(event:React.ChangeEvent<HTMLTextAreaElement>) {
         mapIngredients(event.target.value)
    }

    return <textarea disabled={isDisabled} onChange={handleTextBoxChange}
                     style ={{ backgroundColor: isDisabled
                             ? colorsPalette.disabledField
                             :  colorsPalette.menuButtonCaption,
                         outlineColor:colorsPalette.buttonBackground,
        color: colorsPalette.pageText }}
    placeholder="Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami"
    ></textarea>
}
export default Textbox
