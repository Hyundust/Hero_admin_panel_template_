const initialState = {
    
    filters: [],  // Array of all filter options
    filtersLoadingStatus: 'idle',  // Status of the loading process for filters data, can be 'idle', 'loading' or 'error'
    activeFilter: 'all',  // Currently active filter option

}

// Reducer function that updates the state based on the action type
const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            // If the filters data is being fetched, change the loading status to 'loading'
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            // If the filters data has been fetched, update the filters array and change the loading status to 'idle'
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            // If there was an error fetching the filters data, change the loading status to 'error'
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            // If the active filter has changed, update the filteredHeroes array based on the new active filter
            return {
                ...state,
                activeFilter: action.payload
                
            }
              // When no action type matches
              default: 
                // Return the original state
                return state
            }
          }
          
          // Export the reducer function as the default export
export default filters;
