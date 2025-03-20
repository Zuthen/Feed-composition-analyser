import colorsPalette from '../../colorsPalette.json'
import '../../index.css';

type TextBoxProps = {
    isDisabled?: boolean
}
const Textbox = ({isDisabled = true}: TextBoxProps) =>  {
    return <textarea disabled={isDisabled} style ={{ backgroundColor: isDisabled? colorsPalette.disabledField :  colorsPalette.menuButtonCaption, outlineColor:colorsPalette.buttonBackground,
        color: colorsPalette.pageText }}
    placeholder="Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami"
    ></textarea>
}
export default Textbox
