import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
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

        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'OtroPerfil',
                {email:this.props.likes.owner}
                )}>
            <Text >{this.props.likes.owner}</Text>
        </TouchableOpacity>
        
    </View>
  )
}
}
const styles = StyleSheet.create({
    comento: {
        flexDirection: 'row',
      
      
         
    },
    owner:{
    fontWeight: 'bold',
    marginTop: 10
    }
})
 
export default LikesInd