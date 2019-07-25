import { createStore } from 'redux';
import reducer from './reducer';

const configureStore = (preloadedState?: any) => createStore(reducer, preloadedState);

export { configureStore };
