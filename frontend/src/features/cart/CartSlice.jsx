import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {addToCart,fetchCartByUserId,updateCartItemById,deleteCartItemById} from './CartApi'

const initialState={
    status:"idle",
    items:[],
    errors:null,
    successMessage:null
}

export const addToCartAsync=createAsyncThunk('cart/addToCartAsync',async(item)=>{
    const addedItem=await addToCart(item)
    return addedItem
})
export const fetchCartByUserIdAsync=createAsyncThunk('cart/fetchCartByUserIdAsync',async(id)=>{
    const items=await fetchCartByUserId(id)
    return items
})
export const updateCartItemByIdAsync=createAsyncThunk('cart/updateCartItemByIdAsync',async(update)=>{
    const updatedItem=await updateCartItemById(update)
    return updatedItem
})
export const deleteCartItemByIdAsync=createAsyncThunk('cart/deleteCartItemByIdAsync',async(id)=>{
    const deletedItem=await deleteCartItemById(id)
    return deletedItem
})

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addToCartAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(addToCartAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.items.push(action.payload)
            })
            .addCase(addToCartAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(fetchCartByUserIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchCartByUserIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.items=action.payload
            })
            .addCase(fetchCartByUserIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateCartItemByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateCartItemByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                const index=state.items.findIndex((item)=>item._id===action.payload._id)
                state.items[index]=action.payload
            })
            .addCase(updateCartItemByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(deleteCartItemByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(deleteCartItemByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.items=state.items.filter((item)=>item._id!==action.payload._id)
            })
            .addCase(deleteCartItemByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectCartStatus=(state)=>state.CartSlice.status
export const selectCartItems=(state)=>state.CartSlice.items
export const selectCartErrors=(state)=>state.CartSlice.errors
export const selectCartSuccessMessage=(state)=>state.CartSlice.successMessage


export default cartSlice.reducer