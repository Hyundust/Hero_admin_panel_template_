
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const initialState = {
    
    filters: [],  // Array of all filter options
    filtersLoadingStatus: 'idle',  // Status of the loading process for filters data, can be 'idle', 'loading' or 'error'
    activeFilter: 'all',  // Currently active filter option

}
export const FetchFilters = createAsyncThunk(
    'filters/FetchFilters',
    async() =>{
         const {request} = useHttp();
        return  await request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
            name: "filters",
            initialState,
            reducers:   {
                        filtersChanged: (state,action)=>{
                            state.activeFilter = action.payload;
                        }
                    
                    },
            extraReducers: (builder)=>{
                        builder
                            .addCase(FetchFilters.pending,state=>{state.filtersLoadingStatus = "loading"})
                            .addCase(FetchFilters.fulfilled,(state,action)=>{
                                state.filtersLoadingStatus = "idle";
                                state.filters = action.payload;
                            })
                            .addCase(FetchFilters.rejected,state=>{state.filtersLoadingStatus = 'error'})
                            .addDefaultCase (()=>{})

                }
            });

const {actions,reducer}= filtersSlice;


export default reducer;
export const {
    filtersFetched,
    filtersFetching,
    filtersFetchingError,
    filtersChanged
} = actions;

       