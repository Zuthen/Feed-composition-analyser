import React from "react";
import BowlIcon from "../Icons/BowlIcon.tsx";
import colorsPalette from '../../colorsPalette.json'
import {GetData, GetRequestData} from "../../types/Types.ts";

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

const ResultItem: React.FC<GetData> = ({...listItem}: GetData)=> {
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
    listItems: GetData[]
    requestData: GetRequestData
}



const Results:React.FC<ResultsProps> = ({listItems, requestData}: ResultsProps )=> {
    function notFoundIngredients(): string[] {
        const requestIngredients=requestData.ingredients
        const resultIngredients = listItems.map(item => item.name.toLowerCase())
        return requestIngredients.filter(ingredient =>!resultIngredients.includes(ingredient))
    }
    notFoundIngredients()
    return <>
    <table >
    <thead style={{color:colorsPalette.pageText, width:"66%"}}>
    <tr>
         <th className="th-merged" colSpan={2}>składnik</th><th>opis</th>
    </tr>
    </thead>
    <tbody>
    {
        listItems.map((listItem)=> <ResultItem key={listItem.id} {...listItem}/>)
    }
    </tbody>
</table>
    </>
}

export default Results