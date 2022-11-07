import { View, Text, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from "../../firebase/config"
import firebase from 'firebase'
import Comments from '../../screens/Comments/Comments'

class CommentsInd extends Component {
    constructor(props) {
    super (props)
    this.state = {  
        commentI: []
    }}

    render () {
  return (
    <View>
        <Text>
            {this.props.comentario.owner}
        </Text>
        <Text>
            {this.props.comentario.comment}
        </Text>
        
    </View>
  )
}

// const styles = StyleSheet.create({
//     imagen:{
//         height:100
//     }
// })
 }
export default CommentsInd