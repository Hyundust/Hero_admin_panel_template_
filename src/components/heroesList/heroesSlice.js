import { createSlice,createAsyncThunk,createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";




const heroesAdaptor = createEntityAdapter();

const initialState = heroesAdaptor.getInitialState({
    heroesLoadingStatus: 'idle'  // Status of the loading process for heroes data, can be 'idle', 'loading' or 'error'
});


// const initialState = {
//     heroes: [],  // Array of all hero objects
//     heroesLoadingStatus: 'idle',  // Status of the loading process for heroes data, can be 'idle', 'loading' or 'error'
// }

export const FetchHeroes = createAsyncThunk(
    'heroes/FetchHeroes',
    async() =>{
         const {request} = useHttp();
        return  await request("http://localhost:3001/heroes");
    }
);



const heroSlice = createSlice({
        name:"heroes",
        initialState,
        reducers: {
                heroCreated:(state,action)=>{
                    heroesAdaptor.addOne(state,action.payload);
                    },
                heroDeleted:(state,action)=>{
                    heroesAdaptor.removeOne(state,action.payload);
                    },

        },
        extraReducers: (builder)=>{
            builder
                .addCase(FetchHeroes.pending,state=>{state.heroesLoadingStatus = "loading"})
                .addCase(FetchHeroes.fulfilled,(state,action)=>{
                    state.heroesLoadingStatus = "idle";
                    heroesAdaptor.setAll(state,action.payload);
                })
                .addCase(FetchHeroes.rejected,state=>{state.heroesLoadingStatus = "error";})
                .addDefaultCase (()=>{})


}});

const {actions,reducer} = heroSlice; 


export default reducer;

export const {selectAll} = heroesAdaptor.getSelectors(state=>state.heroes);


export const {
    heroesFetching,
    heroesFetchingError,
    heroesFetched,
    heroCreated,
    heroDeleted,

} = actions;
