import {describe, expect, it, vi} from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import CheckButton from "./CheckButton.jsx"

describe('CheckButton', () => {
    it('has "Sprawdź" label', ()=> {
        const sut: RenderResult = render(<CheckButton/>)
        sut.getByText("Sprawdź")
    })

    const testData= [{isDisabled: true, testcaseNamePart:"disabled"}, {isDisabled: false, testcaseNamePart:"enabled"}]

    testData.forEach(testcase => {
        it(`should be ${testcase.testcaseNamePart}`, () => {
            const {getByRole} = render(<CheckButton isDisabled={testcase.isDisabled}/>);
            const button = getByRole('button') as HTMLButtonElement
                expect(button.disabled).toBe(testcase.isDisabled);
        })
    })

    it("should be enabled by default", ()=> {
        const {getByRole} = render(<CheckButton/>);
        const button = getByRole('button') as HTMLButtonElement
        expect(button.disabled).toBe(false);
    })

    it("should run function on click", ()=> {
        // Arrange
        const testFn = vi.fn()
        const sut :RenderResult = render(<CheckButton onClick={testFn}/>)
        // Act
        sut.getByRole("button").click()
        // Assert
        expect(testFn).toHaveBeenCalled()
    })
})