import React from "react";
import colorsPalette from '../../colorsPalette.json'
import '../../index.css';

 export default function Textbox(): React.JSX.Element  {
    return <textarea style ={{  backgroundColor: colorsPalette.menuButtonCaption, outlineColor:colorsPalette.buttonBackground, color:colorsPalette.pageText}}
    placeholder="Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami"
    ></textarea>
}