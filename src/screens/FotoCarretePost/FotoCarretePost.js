import { Text, View, TextInput, StyleSheet, TouchableOpacity, CameraRoll, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'
import Home from '../Home/Home'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import {storage} from '../../firebase/config'

class FotoCarrete extends Component {
  
    constructor(props){
        super(props)
        this.state={
            description:'',
            fotoSubida:''
        }
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

    publicarPost(text){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: text,
            likes:[],
            comments:[],
            foto: this.state.fotoSubida
        })
        .then(()=> {this.props.navigation.navigate('Home')})
        .catch(err=> console.log(err))

    }

    cuandoSubaLaFoto(url){
        this.setState({
            fotoSubida:url,
        })
    }


    render() {
        return (
        <View style={styles.container}>


                <View>
                    <TouchableOpacity onPress={()=> this.subirfoto()}>
                        <Text style={styles.botton}>Elegir foto del carrete</Text>
                    </TouchableOpacity>
                </View>
     
     {
        this.state.mostrarCamara ?
        <Carrete

        cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
        /> :
        <>
            <TextInput
            placeholder='Deja tu descripcion'
            onChangeText={text => this.setState({description: text})}
            value={this.state.description}
            keyboardType='default'
            style={styles.input}
            />
            <TouchableOpacity onPress={()=> this.publicarPost(this.state.description)}>
                <Text>PUBLICAR POSTEO</Text>
            </TouchableOpacity>
        </>
    }
    
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