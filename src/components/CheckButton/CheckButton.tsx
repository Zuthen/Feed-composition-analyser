import colorsPalette from "../../colorsPalette.json";
import fetchData from "../../supabase/API/get.ts";
import {GetRequestData, GetData} from "../../types/Types.ts";
import React from "react";

type CheckButtonProps = {
    isDisabled?: boolean;
    requestData: GetRequestData;
    getResults:  React.Dispatch<React.SetStateAction<GetData[] | undefined>>
};

const CheckButton = ({ isDisabled = true, requestData, getResults }: CheckButtonProps) => {

    return (
        <button
            style={{
                backgroundColor: isDisabled ? colorsPalette.disabledButton : colorsPalette.buttonBackground,
            }}
            disabled={isDisabled}
            onClick={() => fetchData({ input: requestData, setResult: getResults })}
        >
            Sprawdź
        </button>
    );
};

export default CheckButton;
