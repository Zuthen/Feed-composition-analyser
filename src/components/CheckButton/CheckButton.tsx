import colorsPalette from '../../colorsPalette.json'

type CheckButtonProps = {
    isDisabled?: boolean
    onClick?: () => void
}

const CheckButton = ({isDisabled=true, onClick} : CheckButtonProps) => {
    return <button style={{backgroundColor: isDisabled
            ? colorsPalette.disabledButton
            : colorsPalette.buttonBackground}}
                   disabled={isDisabled}
                   onClick={onClick}>Sprawdź</button>
}

export default CheckButton