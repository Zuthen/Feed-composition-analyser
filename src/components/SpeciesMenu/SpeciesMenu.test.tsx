import {describe, it, expect} from 'vitest';
import {render, RenderResult} from '@testing-library/react';
import SpeciesMenu from './SpeciesMenu';

describe("Species Menu", () => {
    it("should contain two options: 'pies' and 'kot'", () => {
        // Arrange

        const sut: RenderResult = render(<SpeciesMenu/>)

        //Act
        const buttons = sut.getAllByRole("button")
        const buttonsCaptions: string[] = buttons.map(item => item.textContent || "");
        const buttonsIcons: string[] = buttons.map(item=> {
            const icon = item.querySelector("img")
            return icon ? icon.src : ""
        })

        // Assert
        expect(buttons.length).equal(2)
        expect(buttonsCaptions).toContain("pies")
        expect(buttonsCaptions).toContain("kot")
        expect(buttonsIcons.length).equal(2)
        expect(buttonsIcons[0]).toContain("dog.svg")
        expect(buttonsIcons[1]).toContain("cat.svg")
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