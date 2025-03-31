import {RenderResult, render, within} from "@testing-library/react";
import {describe, it, expect} from 'vitest'
import Results, {ListItem} from "./Results"

describe("Results", () => {
    it("should be rendered", ()=> {
        // Arrange

        const data:ListItem[]= [
            {
             name: "Mięcho",
             id: 1,
             description: "Bardzo dobre",
             rating: "great"
            },
            {
                name: "Podroby",
                id: 2,
                description: "Może być",
                rating: "ok"
            },
            {
                name: "Kiełbasa",
                id: 3,
                description: "Co to ma być!!!",
                rating: "avoid"
            }
        ]
        function discriptiveRate(rate: string): string {
            if (rate === "great") return "świetny składnik!"
            if (rate === "ok") return  "jest ok, ale..."
            if (rate === "avoid") return "najlepiej unikać"
            return "rate not found"
        }
        //Act
        const sut: RenderResult = render(<Results listItems={data}/>)

        // Assert
        const tableRows= sut.getAllByRole("row")
        expect(tableRows.length).toEqual(data.length+1)
        // Table Header
        const headerCells = within(tableRows[0]).getAllByRole("columnheader")
        expect(headerCells.length).toEqual(2)
        expect(headerCells[0].textContent).toBe("składnik")
        expect(headerCells[1].textContent).toBe("opis")
        // Table Rows
        for (let i=1; i<tableRows.length; i++){
            const tableRow=tableRows[i]
            const tableCells=within(tableRow).getAllByRole("cell")
            expect(tableCells.length).toEqual(3)
            expect(tableCells[0].textContent).toContain(discriptiveRate(data[i-1].rating))
            expect(tableCells[1].textContent).toContain(data[i-1].name)
            expect(tableCells[2].textContent).toContain((data[i-1].description))
        }
    })
})