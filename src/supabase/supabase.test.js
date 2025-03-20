import supabase from './supabaseClient.js';

async function fetchIngredients() {
    const { data, error } = await supabase.from('ingredients').select('*');

    if (error) {
        console.error('Error:', error);
        return error;
    }
    return data;
}


async function testSupabase() {
    const ingredients = await fetchIngredients();
    if (ingredients) {
        console.log('Pobrane składniki:', ingredients);
        return ingredients;
    } else {
        console.log('Nie udało się pobrać składników.');
        return []
    }
}

testSupabase();
