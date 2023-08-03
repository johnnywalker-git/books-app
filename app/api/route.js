import axios from "axios"

const myBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
})

export const getBooksBySearchTerm = async (searchTerm, criteria) => {
    const response = await myBooksApi.get(`?q=${criteria}:${searchTerm}`)
    if(response.data.items.length !== 0 ) {
        return response.data.items.slice(0, 4)
    }  
}
export const getFeaturedBooks = async () => {
    const response = await myBooksApi.get(`?q=rating`)
    return response.data.items.slice(0, 4)
}

export const fetchBookById = async (id) => {
    const response = await myBooksApi.get(`/${id}`)
    return response.data.volumeInfo
}