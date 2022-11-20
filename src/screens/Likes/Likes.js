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
                data: doc.data(),
                arrayLikes: doc.data().likes})
              console.log(this.state.arrayLikes)
            })
          } 
  
  
  
    render() {
      console.log(this.state.arrayLikes)
      return (
                <View style={styles.container}>
                    {
                        this.state.arrayLikes.length > 0 ?
                        <View style={styles.caja}>
                        <View style={styles.titulo}>
                        <Text style={styles.titulo}> Amigos que van a la fiesta</Text>
                        </View>
                        <View style={styles.lista}>
                        <FlatList 
                    data ={this.state.arrayLikes}
                    keyExtractor= {item => item.toString()}
                    renderItem={({item}) => <LikesInd style={styles.li} likes={item} />}
                    />
                        </View>
                        </View>
                    :
                    <View style={styles.caja}>
                    <Text style={styles.titulo}> Por ahora nadie va a esta fiesta </Text>
                    </View>
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
            backgroundColor: 'white'
  },
        caja:{
            borderWidth: 1,
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'column',
            margin: 20,
            padding: 40,
        },
        titulo:{
          fontWeight: 'bold',
          color: 'black'
        },
        lista:{
          marginTop: 5
        },
  li:{
    margin: 1000,

  }
})

export default  Likes