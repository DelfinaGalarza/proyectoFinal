import { Text, View, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"
import firebase from 'firebase'
import LikesInd from '../../components/LikeInd/LikesInd'


class Likes extends Component {
    constructor (props){
      super (props)
      this.state = {
        id: props.route.params.id,
        arrayLikes: [],
        data: {}
      }
    }
  
    componentDidMount(){
        db.collection('posts')
        .doc(this.state.id)
        .onSnapshot(doc => {
            this.setState({
                id: doc.id, 
                arrayLikes: doc.data().likes})
                 })
    } 
  
  
  
    render() {
      return (
                <View style={styles.container}>

                    
                    {
                        this.state.arrayLikes != 'null' ?
                        <View >
                        <Text>Personas que van a la fiesta</Text>
                        <FlatList 
                    data ={this.state.arrayLikes}
                    keyExtractor= {item => item.createdAt.toString()}
                    renderItem={({item}) => <LikesInd style={styles.li} likes={item} />}
                    />
                        </View>
                     :
                    <Text> Por ahora nadie va a esta fiesta </Text>
                    }
                    
                </View>
      )
    }
  }

    const styles = StyleSheet.create({
        container:{
            borderWidth: 1,
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
  },
  li:{
    margin: 1000,

  }
})

export default  Likes