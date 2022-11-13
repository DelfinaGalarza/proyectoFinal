// import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {Component} from 'react'
import Login from '../screens/Login/Login'
import Home from '../screens/Home/Home'
import Register from '../screens/Register/Register'
import TabNavigation from './TabNavigation'
import Comments from '../screens/Comments/Comments'
import Profile from '../screens/Profile/Profile'

const Stack = createNativeStackNavigator()

class MainNavigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialScreen:'Login'
        }
    }

    
    render(){
        
        return (
          <NavigationContainer>
              <Stack.Navigator
              initialRouteName={this.state.initialScreen}
              >
                   <Stack.Screen
                      name='Home'
                      component={Home}
                      options={{
                        headerShown:false
                      }}                      
                      />
                   <Stack.Screen 
                      name='Login' 
                      component={Login}
                      options={{
                          headerShown:false
                        }}
                        /> 
                  <Stack.Screen
                      name='Register'
                      component={Register}
                      />
                  <Stack.Screen
                      name='TabNavigation'
                      component={TabNavigation}
                      options={{
                          headerShown:false
                        }}
                        />
                    <Stack.Screen
                      name='Comments'
                      component={Comments}
                      unmountOnBlur={true}
                      />

                    <Stack.Screen
                      name='Profile'
                      component={Profile}
                      unmountOnBlur={true}
                      />

                    {/* <Stack.Screen
                      name='Likes'
                      component={Likes}
                      unmountOnBlur={true}
                      /> */}

              </Stack.Navigator>
          </NavigationContainer>
        )
    }
}


export default MainNavigation