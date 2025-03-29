import colorsPalette from "../../colorsPalette.json";

type CheckButtonProps = {
    isDisabled?: boolean;
    getResults: () => void;
};

const CheckButton = ({ isDisabled = true, getResults }: CheckButtonProps) => {

    return (
        <button
            style={{
                backgroundColor: isDisabled ? colorsPalette.disabledButton : colorsPalette.buttonBackground,
            }}
            disabled={isDisabled}
            onClick={getResults}
        >
            Sprawdź
        </button>
    );
};

export default CheckButton;
