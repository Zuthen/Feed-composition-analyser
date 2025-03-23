import supabase from './supabaseClient.d.ts';
import { describe, it, expect } from 'vitest';
import {createClient} from "@supabase/supabase-js";

async function fetchIngredients() {
    const { data, error } =  await supabase.from('ingredients').select('*');

    if (error) {
        console.error('Error:', error);
        return error;
    }
    return data;
}

// const supabase = createClient(supabaseUrl, supabaseServiceRole);

describe("fetchIngredients", () => {
    it("should fetch ingredients without error", async () => {
        const ingredients = await fetchIngredients();
        expect(ingredients).toBeInstanceOf(Array);
        expect(ingredients.length).toBeGreaterThan(0);
    });

    it('should throw error when Supabase URL is missing', () => {
        // Arrange
        const originalSupabaseUrl = process.env.SUPABASE_URL; // Zapisz oryginalny URL
        process.env.SUPABASE_URL = ''; // Ustaw na pusty

        // Act & Assert
        expect(() => createClient()).toThrow("Supabase URL is missing");

        // Restore the original URL
        process.env.SUPABASE_URL = originalSupabaseUrl; // Przywróć oryginalny URL
});

