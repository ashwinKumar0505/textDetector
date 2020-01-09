import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ImageScreen from './Components/ImageScreen/ImageScreen';
import TextScreen from './Components/TextScreen/TextScreen';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import Thunk from 'redux-thunk';
import ImageReducer from './Store/Reducers/imageReducers';

const TabNavigator = createAppContainer(
  createBottomTabNavigator({
    imageScreen: ImageScreen,
    textScreen: TextScreen,
  }),
);

const RootReducer = combineReducers({
  ImageReducer: ImageReducer,
});

const store = createStore(RootReducer, applyMiddleware(Thunk));

const App = () => {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
};

export default App;
