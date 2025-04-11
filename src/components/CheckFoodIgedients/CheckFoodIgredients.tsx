import React, {useState} from 'react'
import {Pet, DatabaseRecord, RequestData, Ingredient} from "../../types/Types.ts";
import Title from "../Title/Title.tsx";
import SpeciesMenu from "../SpeciesMenu/SpeciesMenu.tsx";
import TextBox from "../Textbox/Textbox.tsx";
import CheckButton from "../CheckButton/CheckButton.tsx";
import Results from "../Results/smart/Results.tsx";
import LoaderPopup from "../LoaderPopup/LoaderPopup.tsx";
import fetchData from "../../supabase/API/get.ts";
import extractIngredients from "./extractingIngredients.tsx";

const CheckFoodIngredients: React.FC = () => {
    const [pet, setPet] = useState<Pet>('')
    const [databaseFetching, setDatabaseFetching] = useState<boolean>(false)
    const [aiFetching, setAiFetching] = useState<boolean>(false)

    const onPetChange = (newPet: Pet) => {
        setPet(newPet)
    }
    const [results, setResults] = useState<DatabaseRecord[] | undefined>()
    const [requestData, setRequestData] = useState<RequestData>()

    async function fetchDatabase( ) {
        if (requestData) {
             await fetchData(requestData, setDatabaseFetching).then( response =>
                setResults(response))
        }
    }

    function validateInputData(ingredientsList: string) : Ingredient[] {
        if(ingredientsList.includes(";")){
            ingredientsList.replace(";", ",")
        }
         return extractIngredients(ingredientsList)
    }

    function handleTextBoxChange(ingredientsList: string){
        const ingredients= validateInputData(ingredientsList)
        const data: RequestData = {
            ingredients:ingredients,
            pet
        }
        setRequestData(data)
    }
    return (
        <>
            <Title pet={pet} results={results} />
            {requestData && results ? (
              <Results listItems={results} requestData={requestData} loading={aiFetching} setLoading={setAiFetching} />
            ) : (
                <>
                    <LoaderPopup loadingReason="dataBase" open={databaseFetching}/>
                    <SpeciesMenu onChange={onPetChange} />
                    <TextBox isDisabled={!pet} mapIngredients={handleTextBoxChange} handleSubmit={fetchDatabase} />
                    <CheckButton
                        isDisabled={!pet}
                        getResults={fetchDatabase}
                    />
                </>
            )}
        </>
    );
}

export default CheckFoodIngredients;