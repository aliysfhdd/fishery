import { applyMiddleware, createStore, compose, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { combinedReducer } from "@/redux/reducer";
import { IState } from "@/interface/state";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
export type AppDispatch = ThunkDispatch<IState, any, AnyAction>;
const store = createStore(combinedReducer, enhancer);
export default store;

export type RootState = ReturnType<typeof store.getState>;
