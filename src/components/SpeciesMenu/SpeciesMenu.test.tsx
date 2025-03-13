import {describe, it, expect, vi} from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import SpeciesMenu from './SpeciesMenu';

describe("Species Menu", () => {
    it("should contain two options: 'pies' and 'kot'", () => {
        // Arrange
        const sut: RenderResult = render(<SpeciesMenu onChange={vi.fn()}/>)

        //Act
       const buttons = sut.getAllByRole("button")

        const buttonsCaptions: string[] = buttons.map(item => item.textContent || "");

        // Assert
        expect(buttons.length).equal(2)
        expect(buttonsCaptions).toContain("pies")
        expect(buttonsCaptions).toContain("kot")
        sut.getByRole("DogIcon")
        sut.getByRole("CatIcon")
    })
})