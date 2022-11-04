import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Home from '../Home/Home'
import {db, auth} from "../../firebase/config"

class Comments extends Component {
  constructor (props){
    super (props)
    this.state = {
      id: props.id,
      aComments: []
    }
  }

  componentDidMount(){
    db
    .collection('posts')
    .doc(this.state.id)
    .onSnapshot()
  } 

  render() {
    console.log (this.props)
    return (
      <View>
        <Text>Comments</Text>
      </View>
    )
  }
}

export default  Comments