export type Pet = 'cat' | 'dog' | '';
export type Rating = "avoid" | "ok" | "great"

export type DatabaseRecord = {
    id: number
    description: string
    name: string
    rating: Rating
}
export type Ingredient ={
    name: string,
    percentage?: number
    in?: string
}
export type DatabaseInsert = {
    description: string
    name: string
    rating: Rating
    pet:Pet
}

export type RequestData = {
    pet: Pet
    ingredients: Ingredient[]
}

export type GetResponseData = {
    id: number
    pet: Pet
    ingredientName: string
    rating: Rating
    description: string
}

export type GetResponseError = {
    pet: Pet
    ingredientName: string
    error: Error
}
export type ResponseData = {
    description: string
    id: number
    name: string
    pet: string
    rating: string
}