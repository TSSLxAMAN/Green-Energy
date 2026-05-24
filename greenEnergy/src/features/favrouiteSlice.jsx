import { createSlice } from '@reduxjs/toolkit';

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        items: [],
    },
    reducers: {
        addFavourite: (state, action) => {
            const exists = state.items.find(p => p.name === action.payload.name);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFavourite: (state, action) => {
            state.items = state.items.filter(p => p.name !== action.payload);
        },
    },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
