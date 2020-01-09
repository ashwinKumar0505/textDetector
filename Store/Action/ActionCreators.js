import * as actionTypes from './ActionTypes';
import RNMlKit from 'react-native-firebase-mlkit';

export const getText = imageUri => {
  return async dispatch => {
    await RNMlKit.deviceTextRecognition(imageUri)
      .then(response => {
        dispatch(changeImageToText(response[0].resultText, imageUri));
      })
      .catch(err => {
        console.log('error occured :' + err);
      });
  };
};

export const changeImageToText = (text, imageUri) => {
  return {
    type: actionTypes.IMAGE_TO_TEXT,
    text: text,
    imageUri: imageUri,
  };
};

export const changeTheText = value => {
  return {
    type: actionTypes.CHANGE_THE_TEXT,
    text: value,
  };
};
