export type Pet = 'cat' | 'dog' | '';
export type Rating = "avoid" | "ok" | "great"

export type DatabaseRecord = {
    id: number
    description: string
    name: string
    rating: Rating
}

export type DatabaseInsert = {
    description: string
    name: string
    rating: Rating
    pet:Pet
}

export type GetRequestData = {
    pet: Pet
    ingredients: string[]
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
    percentage: number
    pet: string
    rating: string
}