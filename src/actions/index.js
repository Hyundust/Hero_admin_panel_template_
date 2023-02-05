
import { filtersFetched,filtersFetchingError,filtersFetching } from "../components/heroesFilters/filtersSlice";



export const FetchFilters = (request)=>(dispatch)=>{

    dispatch(filtersFetching());
    // Make a request to the server for the filters
    request("http://localhost:3001/filters")
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()))
}

