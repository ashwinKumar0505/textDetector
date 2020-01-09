import * as actionTypes from '../Action/ActionTypes';
const initialState = {
  text: '',
  imageUri: '',
};

const ImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IMAGE_TO_TEXT: {
      return {
        ...state,
        text: action.text,
        imageUri: action.imageUri,
      };
    }
    case actionTypes.CHANGE_THE_TEXT: {
      return {
        ...state,
        text: action.text,
      };
    }
    default: {
      return state;
    }
  }
};

export default ImageReducer;
