import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ImageScreen from './Components/ImageScreen/ImageScreen';
import TextScreen from './Components/TextScreen/TextScreen';

const tabNavigator = createBottomTabNavigator({
  imageScreen: ImageScreen,
  textScreen: TextScreen,
});

const App = createAppContainer(tabNavigator);

export default App;
