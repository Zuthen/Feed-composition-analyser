import {describe, it, expect} from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import SpeciesMenu from './SpeciesMenu';

describe("Species Menu", () => {
    it("should contain two options: 'pies' and 'kot'", () => {
        // Arrange

        const sut: RenderResult = render(<SpeciesMenu/>)

        //Act
       const buttons = sut.getAllByRole("button")
        const dogIcon = sut.getByRole("DogIcon")
        const catIcon = sut.getByRole("CatIcon")
        const xyz = sut.getByRole("XYZ")
        const buttonsCaptions: string[] = buttons.map(item => item.textContent || "");

        // Assert
        expect(buttons.length).equal(2)
        expect(buttonsCaptions).toContain("pies")
        expect(buttonsCaptions).toContain("kot")
    })
})

// miska: Pet food icon created by  Mihimihi - Flaticon</a>
// < a
// href = "https://www.flaticon.com/free-icons/animal-feed"
// title = "animal feed icons" > Animal
// feed
// icons
// created
// by
// Mihimihi - Flaticon < /a>
// kot: Cat icon created by Sir.Vector - Flaticon</a>
// < a
// href = "https://www.flaticon.com/free-icons/kitty"
// title = "kitty icons" > Kitty
// icons
// created
// by
// Sir.Vector - Flaticon < /a>
// pies: Dog icon created by Smashicons - Flaticon</a>
// < a
// href = "https://www.flaticon.com/free-icons/puppy"
// title = "puppy icons" > Puppy
// icons
// created
// by
// Smashicons - Flaticon < /a>

// paleta kolorów: https://coolors.co/0c1618-004643-faf4d3-d1ac00-f6be9a