import React from "react";
import BowlIcon from "../../Icons/BowlIcon.tsx";
import {Rating} from "../../../types/Types.ts";
import colorsPalette from "../../../colorsPalette.json";

export type ListItem = {
    description: string
    name: string
    rating: Rating
    id: number
}
type RateDescription = 'świetny składnik!' | 'jest ok, ale...' | 'najlepiej unikać';

type Rate = {
    rateDescription: RateDescription
    color: string
    backgroundColor: string
}

function setDescriptiveRate(rate: string): Rate {
    if (rate === "great") return {rateDescription:"świetny składnik!", color: colorsPalette.buttonBackground, backgroundColor: colorsPalette.disabledButton};
    if (rate === "ok") return {rateDescription: "jest ok, ale...", color:colorsPalette.titleText, backgroundColor: colorsPalette.neutralRateBackground};
    if (rate === "avoid") return {rateDescription: "najlepiej unikać", color:colorsPalette.menuButtonBackground , backgroundColor:colorsPalette.negativeRateBackground }
    throw new Error("rateNotFound");
}
const ResultItem: React.FC<ListItem> = ({...listItem}: ListItem)=> {
    const rate = setDescriptiveRate(listItem.rating)

    return <tr style={{color:rate.color}}>
        <td>
            <span className="table-span" style={{backgroundColor:rate.backgroundColor}}><BowlIcon height="20px" width="20px" stroke={rate.color} fill={rate.color}/> {rate.rateDescription} </span>
        </td>
        <td> {listItem.name}</td>
        <td>{listItem.description}</td>
    </tr>
}

type ResultsProps = {
    listItems: ListItem[]
}
const Results:React.FC<ResultsProps> = ({listItems}: ResultsProps )=> {
    return <>
        :
        <table >
            <tbody>
            {
                listItems.map((listItem, index)=>
                     <ResultItem  key={listItem.id || index*2137} {...listItem}/>)
            }
            </tbody>
        </table>
</>}

export default Results;