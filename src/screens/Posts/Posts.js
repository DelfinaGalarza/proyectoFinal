import { Text, View, TextInput, StyleSheet, TouchableOpacity, CameraRoll, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'
import Home from '../Home/Home'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons'; 


class Posts extends Component {
  
    constructor(props){
        super(props)
        this.state={
            description:'',
            mostrarCamara:true,
            fotoUrl:''
        }
    }

    publicarPost(text){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: text,
            likes:[],
            comments:[],
            foto: this.state.fotoUrl
        })
        .then(()=> {this.props.navigation.navigate('Home')})
        .catch(err=> console.log(err))

    }

    cuandoSubaLaFoto(url){
        this.setState({
            fotoUrl:url,
            mostrarCamara:false
        })
    }
  
    render() {
        return (

            <>
            <View style={styles.headerhome}> 

            <Image style={styles.imagehome}
             source={require('../../../assets/iconoWP.png')}
             resizeMode= 'contain'/>
             <Text style={styles.texthome}> Party</Text>
             
             <View style={styles.cerrar}>
             <TouchableOpacity onPress= {()=> this.logOut()} style={styles.button}>
                <Text style={styles.cerrar}> Cerrar Sesion </Text>
            </TouchableOpacity>
            </View>

     </View>

        <View style={styles.container}>
            <Text style={styles.subtitulo}> Subir una publicación</Text>


            <TouchableOpacity onPress={()=> this.props.navigation.navigate('CamaraPost')}>
                    {/* <Text style={styles.sacarfoto}> Tomar foto </Text> */}
                    <AntDesign name="camera" size={100} color="black" />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('FotoCarretePost')}>
                    {/* <Text style={styles.sacarfoto}> Seleccionar del carrete </Text> */}
                <AntDesign name="picture" size={100} color="black" />
            </TouchableOpacity>
            </View> 
            
          
         </>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white"


    },

    sacarfoto:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        backgroundColor: "white"
    },

    headerhome:{
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
        height: '110',
        padding: 14,
    },

    texthome:{
        color: "rgb(148, 5, 245)",
        textAlign: 'center', 
        fontSize: '30px',
    },

    imagehome: {
        height: 60,
        width: 200,
    },

    subtitulo:{
        marginTop: 5, 
        fontSize: 20,
        fontWeight: 'bold',
      textDecorationLine: 'underline',
    }

})
export default Posts