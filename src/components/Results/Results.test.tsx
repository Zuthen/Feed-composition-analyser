import {RenderResult, render} from "@testing-library/react";
import {describe, it, expect} from 'vitest'
import Results from "./Results.tsx";

describe("Results", () => {
    it("should be rendered", ()=> {
        // Arrange
        const data= [
            {
             name: "Mięcho",
             id: 1,
             description: "Bardzo dobre",
             rate: "great"
            },
            {
                name: "Podroby",
                id: 2,
                description: "Może być",
                rate: "ok"
            },
            {
                name: "Podroby",
                id: 3,
                description: "Co to ma być!!!",
                rate: "avoid"
            }
        ]
        const expectedRate1 = "świetny składnik!"
        const expectedRate2 = "jest ok, ale..."
        const expectedRate3 = "najlepiej unikać"
        //Act
        const sut: RenderResult = render(<Results listItems={data}/>)

        // Assert
        const listItems= sut.getAllByRole("listitem")
        expect(listItems.length).toEqual(data.length)
        // ListItem1
        expect(listItems[0].textContent).toContain(data[0].name)
        expect(listItems[0].textContent).toContain(data[0].description)
        expect(listItems[0].textContent).toContain(expectedRate1)
        // ListItem2
        expect(listItems[1].textContent).toContain(data[1].name)
        expect(listItems[1].textContent).toContain(data[1].description)
        expect(listItems[1].textContent).toContain(expectedRate2)
        // ListItem2
        expect(listItems[2].textContent).toContain(data[2].name)
        expect(listItems[2].textContent).toContain(data[2].description)
        expect(listItems[2].textContent).toContain(expectedRate3)
    })
})