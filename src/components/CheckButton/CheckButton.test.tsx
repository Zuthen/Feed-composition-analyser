import {describe, expect, it, vi} from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import CheckButton from "./CheckButton.jsx"

describe('CheckButton', () => {
    const assignFn = vi.fn

    it('has "Sprawdź" label', ()=> {
        const sut: RenderResult = render(<CheckButton assignResults={()=>assignFn} ingredients={[]}/>)
        sut.getByText("Sprawdź")
    })

    const testData= [{isDisabled: true, testcaseNamePart:"disabled"}, {isDisabled: false, testcaseNamePart:"enabled"}]

    testData.forEach(testcase => {
        it(`should be ${testcase.testcaseNamePart}`, () => {
            const {getByRole} = render(<CheckButton isDisabled={testcase.isDisabled} assignResults={()=>assignFn} ingredients={[]}/>)
            const button = getByRole('button') as HTMLButtonElement
                expect(button.disabled).toBe(testcase.isDisabled);
        })
    })

    it("should be disabled by default", ()=> {
        const {getByRole} = render(<CheckButton assignResults={()=>assignFn} ingredients={[]}/>)
        const button = getByRole('button') as HTMLButtonElement
        expect(button.disabled).toBe(true);
    })
})