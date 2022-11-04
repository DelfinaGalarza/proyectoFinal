import { Text, View, Stylesheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import Home from '../Home/Home'
import {db, auth} from "../../firebase/config"


class Comments extends Component {
  constructor (props){
    super (props)
    this.state = {
      id: props.route.params.id,
      aComments: [],
      data: {}, 
      comentario
    }
  }

  componentDidMount(){
    db
    .collection('posts')
    .doc(this.state.id) //ya tengo claro que voy a recibir solo uno por eso despues no hago foreach
    .onSnapshot(doc =>{
      this.setState ({
        data: doc.data()
      })
    })
  } 

  enviarComentario (comentario){
    db
    .collection('posts')
    .doc(this.state.id)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        owner: auth.currentUser.email, 
        createdAt:Date.now(),
        comment: comentario
      })
    })
  }


  render() {
    console.log (this.props)
    return (
      <View>
        <Text>Comments</Text>
        <FlatList 
        data ={this.state.aComments}
        keyExtractor= {item => item.createdAt.toString()}
        renderItem ={({item}) => <Text>{item.comment}</Text>}
        
        />
      <View>
      <TextInput
      placeholder= 'Escribi un comentario' 
      style = {styles.input}
      keyboardType= 'default'
      onChangeText ={text=> this.setState({comentario: text})}
      value= {this.state.comentario}
      />
    <TouchableOpacity onPress={()=>this.enviarComentario(this.state.comentario)}>
      <Text>Enviar comentario
      </Text>
    </TouchableOpacity>
      </View>
      </View>
    )
  }
}
// const styles = Stylesheet.create({
// input: {
//   height: 32,
//   borderWidth: 1
// }
// })
export default  Comments