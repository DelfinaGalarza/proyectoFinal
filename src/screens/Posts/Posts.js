import { Text, View, TextInput, StyleSheet, TouchableOpacity, CameraRoll } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'
import Home from '../Home/Home'
import { setStatusBarBackgroundColor } from 'expo-status-bar'

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
        <View style={styles.container}>


            <TouchableOpacity onPress={()=> this.props.navigation.navigate('CamaraPost')}>
                    <Text style={styles.sacarfoto}> Tomar foto </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('FotoCarrete')}>
                    <Text style={styles.sacarfoto}> Seleccionar del carrete </Text>
            </TouchableOpacity>
            
            
           
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },

    sacarfoto:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        backgroundColor: "rgb(148, 5, 245)"
    }
})
export default Posts