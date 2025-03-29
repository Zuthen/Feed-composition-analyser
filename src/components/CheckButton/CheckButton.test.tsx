import {describe, expect, it, vi} from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import CheckButton from "./CheckButton.jsx"

describe('CheckButton', () => {
    const assignFn = vi.fn()
    const renderCheckButton = (disabled?: boolean) => render(<CheckButton isDisabled={disabled} getResults={assignFn} />)

    it('has "Sprawdź" label', ()=> {
        const sut: RenderResult = renderCheckButton()
        sut.getByText("Sprawdź")
    })

    const testData= [{isDisabled: true, testcaseNamePart:"disabled"}, {isDisabled: false, testcaseNamePart:"enabled"}]

    testData.forEach(testcase => {
        it(`should be ${testcase.testcaseNamePart}`, () => {
            const {getByRole} = renderCheckButton(testcase.isDisabled)
            const button = getByRole('button') as HTMLButtonElement
                expect(button.disabled).toBe(testcase.isDisabled);
        })
    })

    it("should be disabled by default", ()=> {
        const {getByRole} = renderCheckButton()
        const button = getByRole('button') as HTMLButtonElement
        expect(button.disabled).toBe(true);
    })
})