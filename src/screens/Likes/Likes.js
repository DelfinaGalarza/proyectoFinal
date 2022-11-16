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
        aLikes: [],
        data: {}
      }
    }
  
    componentDidMount(){
      db
      .collection('posts')
      .doc(this.state.id) //ya tengo claro que voy a recibir solo uno por eso despues no hago foreach
      .onSnapshot(doc =>{ //solo tra un doc de regreso
        this.setState ({
          data: doc.data(), //se extrae y se guarda 
          aLikes: doc.data().likes
        })
      })
    } 
  
  
  
    render() {
      return (
        <View>
                <View>

                    <Text>Likes en esta publicación</Text>
                    
                    <FlatList 
                    data ={this.state.aLikes}
                    keyExtractor= {item => item.createdAt.toString()}
                    renderItem={({item}) => <LikesInd likes={item} />}
                    />
                </View>
            
          
        </View>
      )
    }
  }

    const styles = StyleSheet.create({
  input:{
      borderWidth: 1,
  }
})

export default  Likes