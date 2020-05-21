
import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from './screens/MainScreen'
import Screen from './screens/Screen'

import { Provider } from 'react-redux'
import store from './api/store'

const Stack = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Screen: {
    screen: Screen,
    navigationOptions:{
      title:'Поиск',
      headerTintColor: '#606DAA',
      //headerLeft: false,
      headerBackTitle: 'Назад'
    }
  }
},)

const AppContainer = createAppContainer(Stack)

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
