import colorsPalette from '../../colorsPalette.json'

type CheckButtonProps = {
    isDisabled?: boolean
    onClick?: () => void
}

const CheckButton = ({isDisabled=false, onClick} : CheckButtonProps) => {
    return <button style={{backgroundColor: colorsPalette.buttonBackground}} disabled={isDisabled} onClick={onClick}>Sprawdź</button>
}

export default CheckButton