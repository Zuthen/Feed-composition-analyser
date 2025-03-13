import { describe, it, expect } from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import Textbox from "./Textbox";

describe("Textbox", ()=>{
    it("should render text box", ()=>{
        const sut: RenderResult = render(<Textbox/>)
        const textArea = sut.container.querySelector('textarea')
        expect(textArea).not.toBeNull();
        expect(textArea!.getAttribute("placeholder")).toEqual("Tutaj wpisz lub skopij skład karmy. Składniki powinny być oddzielone przecinkami")
    })
})