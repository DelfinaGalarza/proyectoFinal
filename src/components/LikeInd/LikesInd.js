import { View, Text, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from "../../firebase/config"
import firebase from 'firebase'

class LikesInd extends Component {
    constructor(props) {
    super (props)
    this.state = {  
        LikeI: []
    }}

    render () {
  return (
    <View style= {styles.comento}>
        
        <Text style= {styles.owner}>
            {this.props.likes}
        </Text>
        
    </View>
  )
}
}
const styles = StyleSheet.create({
    comento: {
        flexDirection: 'row',
      
      
         
    },
    owner:{
    fontWeight: 'bold'
    }
})
 
export default LikesInd