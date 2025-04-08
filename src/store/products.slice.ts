import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICard, ICards } from "../types/data"
import axios from "axios"

type StateProduct = {
    items: ICard[],
    loading: boolean,
    error: string | null,
    itemsAddToCart: ICard[],
    itemsCart: ICard[],
    itemsAddToFavorites: ICard[],
    itemsFavorites: ICard[],
    itemsAddToOrders: ICard[],
    itemsOrders: ICards[]
}

const initialProductState: StateProduct = {
    items: [],
    loading: false,
    error: null,
    itemsAddToCart: [],
    itemsCart: [],
    itemsAddToFavorites: [],
    itemsFavorites: [],
    itemsAddToOrders: [],
    itemsOrders: []
}


export const fetchProducts = createAsyncThunk<ICard[]>("products/fetchProducts", async () => {
    const response = await axios.get('https://676b9a97bc36a202bb85137e.mockapi.io/clothes')
    return response.data
})
export const fetchProductsAddToCart = createAsyncThunk<ICard[], {obj: ICard}>("products/fetchProductsAddToCart", async (params) => {
    const response = await axios.post('https://676b9a97bc36a202bb85137e.mockapi.io/cart', params.obj)
    return response.data
})
export const fetchProductsCart = createAsyncThunk<ICard[]>("products/fetchProductsCart", async () => {
    const response = await axios.get('https://676b9a97bc36a202bb85137e.mockapi.io/cart')
    return response.data
})
export const fetchProductsDeleteFromCart = createAsyncThunk<string, {id: string}>("products/fetchProductsDeleteFromCart", async (params) => {
    await axios.delete(`https://676b9a97bc36a202bb85137e.mockapi.io/cart/${params.id}`)
    return params.id
})
export const fetchProductsAddToFavorites = createAsyncThunk<ICard[], {obj: ICard}>("products/fetchProductsAddToFavorites", async (params) => {
    const response = await axios.post('https://676a93c5863eaa5ac0deea1a.mockapi.io/favorites', params.obj)
    return response.data
})
export const fetchProductsFavorites = createAsyncThunk<ICard[]>("products/fetchProductsFavorites", async () => {
    const response = await axios.get('https://676a93c5863eaa5ac0deea1a.mockapi.io/favorites')
    return response.data
})
export const fetchProductsDeleteFromFavorites = createAsyncThunk<string, {id: string}>("products/fetchProductsDeleteFromFavorites", async (params) => {
    await axios.delete(`https://676a93c5863eaa5ac0deea1a.mockapi.io/favorites/${params.id}`)
    return params.id
})
export const fetchProductsAddToOrders = createAsyncThunk<ICard[], {obj: ICard[]}>("products/fetchProductsAddToOrders", async (params) => {
    const response = await axios.post('https://676a93c5863eaa5ac0deea1a.mockapi.io/orders', {items: params.obj})
    return response.data
})
export const fetchProductsOrders = createAsyncThunk<ICards[]>("products/fetchProductsOrders", async () => {
    const response = await axios.get('https://676a93c5863eaa5ac0deea1a.mockapi.io/orders')
    return response.data
})


export const productsSlice = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {},
    selectors: {
        selectProducts: (state) => state.items,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
        selectProductsCart: (state) => state.itemsCart,
        selectProductsFavorites: (state) => state.itemsFavorites,
        selectProductsOrders: (state) => state.itemsOrders
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ICard[]>) => {
            state.loading = false
            state.items = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Unknow message"
        })
        .addCase(fetchProductsAddToCart.fulfilled, (state, action: PayloadAction<ICard[]>) => {
            state.itemsAddToCart = action.payload
        })
        .addCase(fetchProductsCart.fulfilled, (state, action: PayloadAction<ICard[]>) => {
            state.itemsCart = action.payload
        })
        .addCase(fetchProductsDeleteFromCart.fulfilled, (state, action) => {
            const id = action.payload
            state.itemsCart = state.itemsCart.filter(product => product.id !== id)
        })
        .addCase(fetchProductsAddToFavorites.fulfilled, (state, action: PayloadAction<ICard[]>) => {
            state.itemsAddToFavorites = action.payload
        })
        .addCase(fetchProductsFavorites.fulfilled, (state, action: PayloadAction<ICard[]>) => {
            state.itemsFavorites = action.payload
        })
        .addCase(fetchProductsDeleteFromFavorites.fulfilled, (state, action) => {
            const id = action.payload
            state.itemsFavorites = state.itemsFavorites.filter(product => product.id !== id)
        })
        .addCase(fetchProductsAddToOrders.fulfilled, (state, action: PayloadAction<ICard[]>) => {
            state.itemsAddToOrders = action.payload
        })
        .addCase(fetchProductsOrders.fulfilled, (state, action: PayloadAction<ICards[]>) => {
            state.itemsOrders = action.payload
        })
    }
})

export const {selectError,selectLoading,selectProducts, selectProductsCart, selectProductsFavorites, selectProductsOrders} = productsSlice.selectors