import React from "react";
import colorsPalette from '../../colorsPalette.json'
import '../../index.css';

type TextBoxProps = {
    isDisabled?: boolean
    mapIngredients: (ingredients: string) => void
    handleSubmit: () => void
}
const Textbox = ({isDisabled = true, mapIngredients, handleSubmit}: TextBoxProps) =>  {

    function handleTextBoxChange(event:React.ChangeEvent<HTMLTextAreaElement>) {
         mapIngredients(event.target.value)
    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    }
    return <textarea disabled={isDisabled} onChange={handleTextBoxChange}
                     style ={{ backgroundColor: isDisabled
                             ? colorsPalette.disabledField
                             :  colorsPalette.menuButtonCaption,
                         outlineColor:colorsPalette.buttonBackground,
        color: colorsPalette.pageText }} onKeyDown={handleKeyDown}
    placeholder="Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami"
    ></textarea>
}
export default Textbox
