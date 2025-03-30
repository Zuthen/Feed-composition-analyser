import React, {useState} from 'react'
import {Pet, GetData, GetRequestData} from "../../types/Types.ts";
import Title from "../Title/Title.tsx";
import SpeciesMenu from "../SpeciesMenu/SpeciesMenu.tsx";
import TextBox from "../Textbox/Textbox.tsx";
import CheckButton from "../CheckButton/CheckButton.tsx";
import Results from "../Results/smart/Results.tsx";
import LoaderPopup from "../LoaderPopup/LoaderPopup.tsx";
import fetchData from "../../supabase/API/get.ts";


const CheckFoodIngredients: React.FC = () => {
    const [pet, setPet] = useState<Pet>('')
    const [databaseFetching, setDatabaseFetching] = useState<boolean>(false)
    const [aiFetching, setAiFetching] = useState<boolean>(false)

    const onPetChange = (newPet: Pet) => {
        setPet(newPet)
    }
    const [results, setResults] = useState<GetData[] | undefined>()
    const [requestData, setRequestData] = useState<GetRequestData>()

    async function handleCheckButtonClicked( ) {
        if (requestData) {
            const response = await fetchData(requestData, setDatabaseFetching);
            setResults(response);
        }
    }
    function handleTextBoxChange(ingredientsList: string){
        const textBoxIngredients = ingredientsList.split(",")
        const trimmedIngredients = textBoxIngredients.map(ingredient => ingredient.trim().toLowerCase())
        const data: GetRequestData = {
            ingredients:trimmedIngredients,
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
                    <TextBox isDisabled={!pet} mapIngredients={handleTextBoxChange} />
                    <CheckButton
                        isDisabled={!pet}
                        getResults={handleCheckButtonClicked}
                    />
                </>
            )}
        </>
    );
}

export default CheckFoodIngredients;