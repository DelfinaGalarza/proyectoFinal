import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-naviation/native'
import {FontAwesome} from '@expo/vector-icons'
import Profile from '../screens/Profile/Profile'
import Posts from '../screens/Posts/Posts'
import Home from '../screens/Home/Home'


const Tab = createBottomTabNavigator()

function TabNavigation() {

    return (
        <NavigationContainer>
    
    <Tab.Navigator>
        <Tab.Screen 
        name={'Home'} 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false
        }}
        />
        <Tab.Screen name='Profile' component={Profile}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false
        }} />
        <Tab.Screen name='Posts' component={Posts}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false
        }} />
    </Tab.Navigator>
        </NavigationContainer>
    
)
}
export default TabNavigation