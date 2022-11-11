// import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image} from 'react-native'
// import React, { Component } from 'react'
// import {auth} from '../../firebase/config'



// class Buscador extends Component {

//     constructor(props){
//         super(props)
//         this.state={
//             owner:'',
//             users: [],
//             logueado: false
//         }
//     }

//     //aca tengo que poner el array con todos los usuarios posibles
//     componentDidMount(){
//         auth.onAuthStateChanged(user => {
//             if(user !== null){
//                 this.props.navigation.navigate('TabNavigation')
//             }
//         })
//     }

//     buscar(text){

//         //Filtramos dependiendo de que recibe por parametro 

//         letusersFilter = this.state.users.filter(elm => elm.owner.toUpperCase().includes(text.toUpperCase()))

//         this.setState({
//             owner: text,
//             users: usersFilter, 
//         })
//     }

//     render() {
//         return (
//         <>

//      <View style={styles.headerbusc}> 
//             <Image style={styles.imagebusc}
//              source={require('../../../assets/iconoWP.png')}
//              resizeMode= 'contain'/>
//              <Text style={styles.textbusc}> Search Party</Text>
//      </View>

    
//           <View style={styles.container}>
//             <Text style= {styles.text}> Ingrese su busquedad</Text>
//             <View>
//                 <TextInput
//                  style={ styles.owner}
//                  onChangeText={ text => this.buscar( {text} )}
//                  placeholder='Ingresa tu email'
//                  value={this.state.owner}
//                 />
//                  </View>
//       </View>
//     </>
//     )
//   }
// }


// const styles = StyleSheet.create({
    
//     container:{
//         flex:1,
//         justifyContent:'center',
//         paddingHorizontal:32,
//         width: '100%',
//         backgroundColor: "rgb(148, 5, 245)",
//     },

//     headerbusc:{
//         backgroundColor: 'black', 
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '110',
//         padding: 14,
//     },

//     textbusc:{
//         color: "rgb(148, 5, 245)",
//         textAlign: 'center', 
//         fontSize: '30px',
//     },

//     imagebusc: {
//         height: 60,
//         width: 200,
//     }
// })

// export default Buscador



// SearchBar.js