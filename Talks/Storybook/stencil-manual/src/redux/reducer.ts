import { CAROUSEL_ITEM_INIT,CAROUSEL_PREV, CAROUSEL_NEXT } from './actions';

const defaultState = {
  active: 0,
  items: 0
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case CAROUSEL_ITEM_INIT:
      return {
        ...state,
        items: state.items + 1
      };

    case CAROUSEL_PREV:
      return {
        ...state,
        active: state.active > 0 ? state.active - 1 : state.items - 1
      };

    case CAROUSEL_NEXT:
      return {
        ...state,
        active: state.active < state.items - 1 ? state.active + 1 : 0
      };

    default:
      return state;
  }
}
