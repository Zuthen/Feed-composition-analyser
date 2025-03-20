import supabase from './supabaseClient.js';
import { describe, it, expect } from 'vitest';

async function fetchIngredients() {
    const { data, error } = await supabase.from('ingredients').select('*');

    if (error) {
        console.error('Error:', error);
        return error;
    }
    return data;
}


describe('fetchIngredients', () => {
    it('should fetch ingredients without error', async () => {
        const ingredients = await fetchIngredients();
        expect(ingredients).toBeInstanceOf(Array);
        expect(ingredients.length).toBeGreaterThan(0)
    });
});
