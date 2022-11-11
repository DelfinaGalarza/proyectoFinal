// import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
// import React, { Component } from 'react'
// import Home from '../Home/Home'
// import {db, auth} from "../../firebase/config"
// import firebase from 'firebase'
// import Post from '../../components/Post/Post'
// import LikesInd from '../../components/LikesInd/LikesInd'


// class Likes extends Component {
//   constructor (props){
//     super (props)
//     this.state = {
//       id: props.route.params.id,
//       aLikes: [],
//       data: {}, 
//     }
//   }

//   componentDidMount(){
//     console.log (this.props)
//     db
//     .collection('posts')
//     .doc(this.state.id) //ya tengo claro que voy a recibir solo uno por eso despues no hago foreach
//     .onSnapshot(doc =>{ //solo tra un doc de regreso
//       this.setState ({
//         data: doc.data(), //se extrae y se guarda 
//         aLikes: doc.data().likes,
//       })
//     })
//   } 


//   render() {
//     console.log (this.props)
//     return (
//       <View>
//         <Text>Likes en esta publicación</Text>
//         <FlatList 
//         data ={this.state.aLikes}
//         keyExtractor= {item => item.id.toString()}
//         renderItem={({item}) => <LikesInd likes={item.data.likes} />}
//         />
//         </View>

//     )
//   }
// }

// const styles = StyleSheet.create({
//   input:{
//       borderWidth: 1,
//   }
// })

// export default  Likes