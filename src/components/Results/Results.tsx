import React from "react";

type ResultsProps = {
    listItems: ResultItemProps[]
}

type ResultItemProps= {
    id: number
    name: string,
    description: string,
    rate: string
}
type Rate = 'świetny składnik!' | 'jest ok, ale...' | 'najlepiej unikać';

function setDescriptiveRate(rate: string): Rate {
    if (rate === "great") return "świetny składnik!";
    if (rate === "ok") return "jest ok, ale...";
    if (rate === "avoid") return "najlepiej unikać";
    throw new Error("rateNotFound");
}

const ResultItem: React.FC<ResultItemProps> = ({...listItem}: ResultItemProps)=> {
    const rate = setDescriptiveRate(listItem.rate)
    return <li>
        <span>{listItem.name} {listItem.description} {rate} </span>
    </li>
}

const Results:React.FC<ResultsProps> = ({listItems}: ResultsProps )=> {
return <ul>
    {
        listItems.map((listItem)=> <ResultItem key={listItem.id} {...listItem}/>)
    }
</ul>
}

export default Results