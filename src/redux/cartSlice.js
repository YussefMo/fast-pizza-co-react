import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const existingItem = state.cart.find(
                (item) => item.pizzaId === action.payload.pizzaId
            );
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.quantity * existingItem.unitPrice;
            } else {
                state.cart.push(action.payload);
            }
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            );
        },
        incItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            );
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            );
            if (item.quantity > 1) {
                item.quantity--;
                item.totalPrice = item.quantity * item.unitPrice;
            } else {
                cartSlice.caseReducers.deleteItem(state, action)
            }
        },
        clearCart(state) {
            state.cart = [];
        }
    }
});

export const {
    addItem,
    deleteItem,
    incItemQuantity,
    decItemQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotalPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getQuantityByItemId = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
