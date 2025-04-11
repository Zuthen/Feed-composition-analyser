import { describe, it, expect, vi } from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import Textbox from "./Textbox";

describe("Textbox", ()=>{
    it("should render text box", ()=>{
        const testFn = vi.fn()
        const sut: RenderResult = render(<Textbox mapIngredients={testFn} handleSubmit={testFn}/>)
        const textArea = sut.container.querySelector('textarea')
        expect(textArea).not.toBeNull();
        expect(textArea!.getAttribute("placeholder")).toEqual("Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami")
    })
})