
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';
import { configureStore } from '@reduxjs/toolkit';
const stringMiddleware = ()=>(next)=>(action)=>{
    if(typeof action ==='string'){
        return next({
            type:action
        });

    }
    return next(action);

}



const store  = configureStore({
    reducer:{heroes,filters},
    middleWare:getDefaultMiddleware=>getDefaultMiddleware().concat(stringMiddleware),
    devTools:process.env.NODE_ENV !=="production"
 });
// const store = createStore(
//     combineReducers({heroes,filters}),
//     compose(
//             applyMiddleware(ReduxThunk,stringMiddleware),
//                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                );

export default store;