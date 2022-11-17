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
import OtroPerfil from '../screens/OtroPerfil/OtroPerfil'
import CamaraPost from '../screens/CamaraPost/CamaraPost'
import FotoCarretePost from '../screens/FotoCarretePost/FotoCarretePost'
import Likes from '../screens/Likes/Likes'
import {FontAwesome} from '@expo/vector-icons'

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

                    <Stack.Screen
                      name='OtroPerfil'
                      component={OtroPerfil}
                      unmountOnBlur={true}
                      />

                    <Stack.Screen
                      name='CamaraPost'
                      component={CamaraPost}
                      unmountOnBlur={true}
                      />

                      <Stack.Screen
                      name='FotoCarretePost'
                      component={FotoCarretePost}
                      unmountOnBlur={true}
                     
                      />

                    <Stack.Screen
                      name='Likes'
                      component={Likes}
                      unmountOnBlur={true}
                      />

              </Stack.Navigator>
          </NavigationContainer>
        )
    }
}


export default MainNavigation