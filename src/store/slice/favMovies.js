import { createSlice } from "@reduxjs/toolkit";

const favMovies = createSlice({
    name: "favoritMovies",
    initialState: { fav: [] },
    reducers: {
        addFav: (state, action) => {
            state.fav.push(action.payload);
        },
        removFav: (state, action) => {
            let removIndex = state.fav.findIndex((movie)=>movie.id===action.payload.id);
            if(removIndex !== -1)
            state.fav.splice(removIndex,1);
        }
    }
    
});
export const favMoviesReducer = favMovies.reducer;
export const { addFav, removFav } = favMovies.actions;
export default favMovies.reducers;