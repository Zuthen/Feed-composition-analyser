import {describe, it} from "vitest";
import {render} from '@testing-library/react';
import LoaderPopup, {LoadingReason} from "./LoaderPopup.tsx";

describe("Loader Popup", ()=> {
    const testcases :{reason: LoadingReason, expectedText:string}[] = [
        {
            reason: "dataBase",
            expectedText: `Przeszukiwanie bazy danych...`
        },
        {
            reason: "ai",
            expectedText: `Angażowanie sztucznej inteligencji...`
        }
    ]

    testcases.forEach(testcase => {

    it(`Should display loader and text ${testcase.expectedText}`, ()=>{
        // Arrange
        const sut = render(<LoaderPopup loadingReason={testcase.reason} open={true}/>)
        // Assert
        sut.getByText(testcase.expectedText, { exact: false });
        sut.getByRole("spinner")
    })
    })
})