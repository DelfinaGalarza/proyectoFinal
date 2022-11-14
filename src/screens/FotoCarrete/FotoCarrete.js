import { Text, View, TextInput, StyleSheet, TouchableOpacity, CameraRoll } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'
import Home from '../Home/Home'
import { setStatusBarBackgroundColor } from 'expo-status-bar'

class FotoCarrete extends Component {
  
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


    subirfoto(){
        ImagePicker.launchImageLibraryAsync()
        .then(resp => {
            fetch(resp.uri)
            .then(data => data.blob())
            .then(img => {
                console.log(storage)
                const ref = storage.ref(`fotoSubida/${Date.now()}.jpg`)
                ref.put(img)
                .then(()=> {
                    ref.getDownloadURL()
                    .then(url => {
                            this.setState({fotoSubida:url})
                        }
                    )
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}
  
    render() {
        return (
        <View style={styles.container}>
        
    

            <TouchableOpacity onPress={()=> this.subirfoto()}>
                        <Text style={styles.botton}>Subir foto del carrete</Text>
                    </TouchableOpacity>
       
    
           
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    input:{
        height:32,
        borderWidth:1,
    }
})
export default FotoCarrete