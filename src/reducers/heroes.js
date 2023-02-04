const initialState = {
    heroes: [],  // Array of all hero objects
    heroesLoadingStatus: 'idle',  // Status of the loading process for heroes data, can be 'idle', 'loading' or 'error'
}

// Reducer function that updates the state based on the action type
const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            // If the heroes data is being fetched, change the loading status to 'loading'
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            // If the heroes data has been fetched, update the heroes array and filteredHeroes array
            // based on the active filter, and change the loading status to 'idle'
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            // If there was an error fetching the heroes data, change the loading status to 'error'
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
            
        case 'HERO_CREATED':
                 // Form a new array by spreading the state's heroes array
                // Return the updated state with the new hero added to the heroes array and the filteredHeroes array updated
                
                return {
                    ...state,
                    heroes: [...state.heroes, action.payload]
                }
                // When the HERO_DELETED action is dispatched
        case 'HERO_DELETED': 
                 // Form a new array by spreading the state's heroes array
                // Return the updated state with the new hero added to the heroes array and the filteredHeroes array updated
                
                return {
                    ...state,
                    heroes: state.heroes.filter(item => item.id !== action.payload)
                }
            
            
        default: 
            // Return the original state
            return state
        }
    }         
         // Export the reducer function as the default export
export default heroes;
