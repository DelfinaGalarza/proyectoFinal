import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

class Perfil extends Component {

    constructor(props){
        super(props)
        this.state = {
            fotoSubida: "", 
        }
    }
    componentDidMount(){
    }


render() {
    return (
        <View style={styles.perfil}>

        <View style={styles.own}>
        <Text >{this.props.mail}</Text>
        </View>

        <View style={styles.pub}>
        <Text>{this.props.nPosts}</Text>
        <Text style={styles.subtitle}> Publicaciones </Text>
        </View>

        {/* <View>
                    <TouchableOpacity onPress={()=> this.subirfoto()}>
                        <Text style={styles.botton}>Subir foto del carrete</Text>
                    </TouchableOpacity>
                </View> */}

        {/* <View style={styles.lik}>
        <Text>{this.state.myLikes.length}</Text>
        <Text style={styles.subtitle}> Likes </Text>
        </View> */}

        {/* <Image style={styles.image} 
                source={{uri: this.props.data.foto}}
                resizeMode='contain'/>
         */}
        {/* <View style={styles.container2}>
            <Text style={styles.subtitle}>Bio: {this.props.data.description}</Text>
            </View> */}
        </View>

        
    )
}
}

const styles = StyleSheet.create({
    perfil:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    own:{
        marginTop: 10,
    },
    pub:{
        alignItems: 'center',
    },
    lik:{
        alignItems: 'center'
    },

   

    }
    )

export default Perfil
// import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
// import React, { Component } from 'react'
// import { auth } from '../../firebase/config'
// import Camara from '../../components/Camara/Camara'


// export default class Register extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             mail:'',
//             password:'',
//             name:'',
//             mostrarCamara: true,
//             fotoUrl:'',
//         }
//     }

// registreUsuarios(email, password){
//     /* auth.signInWithEmailAndPassword()*/
//    auth.createUserWithEmailAndPassword(email, password)
//    .then(resp => console.log(resp))
//    .catch(err => console.log(err))
// }

// fotoPerfil(text){
//     db.collection('User').add({
//         owner:auth.currentUser.email,
//         createdAt: Date.now(),
//         name: text,
//         fotoPerfil: this.state.fotoUrl
//     })
//     .then(()=> {this.props.navigation.navigate('Home')})
//     .catch(err=> console.log(err))

// }

// cuandoSubaLaFoto(url){
//     this.setState({
//         fotoUrl:url,
//         mostrarCamara:false
//     })
// }

//     render() {
//         return (
//         <View>
//             <Text>Registra tu usuario</Text>

//             <View>
//                 <TextInput
//                     style = {styles.input}
//                     onChangeText = {(text) => this.setState({mail: text})}
//                     value={this.state.mail}
//                     keyboardType='email-address'
//                     placeholder='Ingresa tu email'
//                 />
//                 <TextInput
//                     style = {styles.input}
//                     onChangeText = {(text) => this.setState({password: text})}
//                     value={this.state.password}
//                     keyboardType='default'
//                     secureTextEntry={true}
//                     placeholder='Ingresa tu password'
//                 />
//                 <TextInput
//                 placeholder='nombre de usuario'
//                 onChangeText={text => this.setState({name: text})}
//                 value={this.state.name}
//                 keyboardType='default'
//                 style={styles.input}
//                 />

//                 <View style={styles.container}>
//             {
//                 this.state.mostrarCamara ?
//                 <Camara

//                 cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
//                 /> : 
//                 <>
//                 <TouchableOpacity onPress={()=> this.fotoPerfil(this.state.name)}>
//                     <Text> Cargar foto de perfil</Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity onPress={()=> this.reintentar(this.state.description)}>
//                     <Text> Sacar otra foto</Text>
//                 </TouchableOpacity> */}
//             </>
//         }
                
//             </View>
//             </View>
//         </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     input:{
//         borderWidth: 1
//     }
// })