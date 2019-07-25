export const CAROUSEL_ITEM_INIT = 'CAROUSEL_ITEM_INIT';
export function carouselItemInit() {
  return (dispatch) => {
    dispatch({
      type: CAROUSEL_ITEM_INIT
    });
  };
}

export const CAROUSEL_PREV = 'CAROUSEL_PREV';
export function carouselPrev() {
  return (dispatch) => {
    dispatch({
      type: CAROUSEL_PREV
    });
  };
}

export const CAROUSEL_NEXT = 'CAROUSEL_NEXT';
export function carouselNext() {
  return (dispatch) => {
    dispatch({
      type: CAROUSEL_NEXT
    });
  };
}
