export type Pet = 'cat' | 'dog' | '';
export type GetData = {
    id: number;
    description: string
    name: string
    rating: string
}
export type GetRequestData = {
    pet: Pet
    ingredients: string[]
}

