import { describe, it, expect } from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import Title from "./Title.tsx"

describe('Title', () => {
    it('should show "zwierzaka" when no pet prop provided', () => {
        const sut: RenderResult = render(<Title/>);
        const titleElement = sut.container.querySelector('h1')
        expect(titleElement?.textContent).toSatisfy(text=>text.endsWith("zwierzaka"));
    })
    it('should show "psa" for dog value', ()=>{
        const sut: RenderResult = render(<Title pet={"dog"}/>);
        const titleElement = sut.container.querySelector('h1')
        expect(titleElement?.textContent).toSatisfy(text=>text.endsWith("psa"))
    })
    it('should show "kota" for cat value', ()=>{
        const sut: RenderResult = render(<Title pet={"cat"}/>);
        const titleElement = sut.container.querySelector('h1')
        expect(titleElement?.textContent).toSatisfy(text=>text.endsWith("kota"))
    })
});