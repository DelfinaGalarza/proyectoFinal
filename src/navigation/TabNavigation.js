import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Profile from '../screens/Profile/Profile'
import Posts from '../screens/Posts/Posts'
import Home from '../screens/Home/Home'
import Buscador from '../screens/Buscador/Buscador'


const Tab = createBottomTabNavigator()

function TabNavigation() {

    return (    
    <Tab.Navigator>
        <Tab.Screen 
        name={'Home'} 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={"rgb(148, 5, 245)"} size={32} />,
            headerShown:false
        }}
        />
        <Tab.Screen name='Profile' component={Profile}
        options={{
            tabBarIcon: () => <FontAwesome name='user' color={"rgb(148, 5, 245)"} size={32} />,
            headerShown:false
        }} />
        <Tab.Screen name='Posts' component={Posts}
        options={{
            tabBarIcon: () => <FontAwesome name='camera' color={"rgb(148, 5, 245)"} size={32} />,
            headerShown:false
        }} />
        <Tab.Screen name='Search' component={Buscador} //mas adelante cuando ande lo cambiio a buscador
        options={{
            tabBarIcon: () => <FontAwesome name='search' color={"rgb(148, 5, 245)"} size={32} />,
            headerShown:false
        }} />
      
        
    </Tab.Navigator>    
)
}
export default TabNavigation