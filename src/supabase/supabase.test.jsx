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

describe("fetchIngredients", () => {
    it("should fetch ingredients without error", async () => {
        const ingredients = await fetchIngredients();
        expect(ingredients).toBeInstanceOf(Array);
        expect(ingredients.length).toBeGreaterThan(0);
    });

    it('should throw error when Supabase key is missing', () => {
        // Arrange
        const originalSupabaseUrl = process.env.SUPABASE_URL;

        // Act & Assert
        expect(() => createClient(
            originalSupabaseUrl,"")).toThrow("supabaseKey is required");

        // Restore the original key
        process.env.SUPABASE_URL = originalSupabaseUrl;
    })

    it('should throw error when Supabase url is missing', () => {
            // Arrange
            const originalSupabaseKey = process.env.SUPABASE_ANON_KEY;

            // Assert
            expect(() => createClient(
                "",originalSupabaseKey)).toThrow("supabaseUrl is required");

            // Restore the original URL
            process.env.SUPABASE_SERVICE_ROLE_KEY = originalSupabaseKey;
    })
})

