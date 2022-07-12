import { createStore,compose, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import reducers from "./Reducer";
const initialState = {};
//const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

/*export const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
*/
 export const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk)
    //(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
    )
);
export default store;