import {describe, it, expect} from 'vitest';
import {act, render, RenderResult} from '@testing-library/react';
import CheckFoodIgredients from "./CheckFoodIgredients.tsx";

describe("CheckFoodIngredients", () => {
    it("should contain header, species menu and textarea", ()=> {
      // Arrange
        const sut:RenderResult = render(<CheckFoodIgredients/>)
        // Assert
        const heading = sut.getByRole("heading")
        expect (heading.textContent).toEqual("Sprawdź skład karmy swojego zwierzaka")
        sut.getByRole("BowlIcon")
        sut.queryByRole("h1")
        const buttonsCaptions = sut.queryAllByRole("button").map(button => button.textContent)
        expect(buttonsCaptions).toContain("pies")
        expect(buttonsCaptions).toContain("kot")
        sut.getByRole("DogIcon")
        sut.getByRole("CatIcon")
        const textarea = sut.getByRole("textbox")
        expect(textarea.getAttribute("placeholder")).toEqual("Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami")
    })
    const testCases = [
        {   testName: "dog",
            value: "pies",
        expectedValue:"Sprawdź skład karmy swojego psa"},
        {
            testName: "cat",
            value: "kot",
            expectedValue:"Sprawdź skład karmy swojego kota",
        }
    ]
    testCases.forEach(testCase => {
        it(`Should set pet: ${testCase.testName}`, () => {
            // Arrange
            const sut:RenderResult = render(<CheckFoodIgredients/>)
            const buttons = sut.queryAllByRole("button")
            const petButton = buttons.find(button => button.textContent === testCase.value)
            const header = sut.getByRole("heading")
            // Act
            expect(petButton).not.toBeUndefined()
            act(()=> {
                petButton!.click()
            })

            // Assert
            expect(header.textContent).toEqual(testCase.expectedValue)
        })
    })
})