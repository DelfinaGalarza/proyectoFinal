import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import Home from '../Home/Home'
import {db, auth} from "../../firebase/config"
import firebase from 'firebase'
import Post from '../../components/Post/Post'
import CommentsInd from '../../components/CommentsInd/CommentsInd'


class Comments extends Component {
  constructor (props){
    super (props)
    this.state = {
      id: props.route.params.id,
      aComentarios: [],
      data: {}, 
      comentario: ''
    }
  }

  componentDidMount(){
    console.log (this.props)
    db
    .collection('posts')
    .doc(this.state.id) //ya tengo claro que voy a recibir solo uno por eso despues no hago foreach
    .onSnapshot(doc =>{ //solo tra un doc de regreso
      this.setState ({
        data: doc.data(), //se extrae y se guarda 
        aComentarios: doc.data().comments
      })
    })
  } 

  enviarComentarios (com){
    db
    .collection('posts')
    .doc(this.state.id)
    .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
        owner: auth.currentUser.email, 
        createdAt:Date.now(),
        comment: com
      })
    })
    .catch(err => console.log(err))
    //limpio campo de comentario
      this.setState({
        comentario: ''
      })

  }


  render() {
    console.log (this.props)
    return (
      <View>
        <Text>Comentarios en esta publicación</Text>
        <FlatList 
        data ={this.state.aComentarios}
        keyExtractor= {item => item.createdAt.toString()}
        renderItem={({item}) => <CommentsInd comentario={item}  />}
        // renderItem ={({item}) => <Text>{item.comment}</Text>}
        


        
        />
      <View>
      <TextInput
      placeholder= 'Escribi un comentario' 
      style = {styles.input}
      keyboardType= 'default'
      onChangeText ={texto=> this.setState({comentario: texto})}
      value= {this.state.comentario}
      />
    <TouchableOpacity onPress={()=>this.enviarComentarios(this.state.comentario)}>
      <Text>Enviar comentario</Text>
    </TouchableOpacity>
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

export default  Comments