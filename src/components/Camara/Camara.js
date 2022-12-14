import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'

// primero hacer que funcione los posteos escritos

class Camara extends Component {
    constructor(){
        super()
        this.metodosDeCamara = null
        this.state = {
            mostrarCamara:false,
            fotoUri:''
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> this.setState({
            mostrarCamara: true
        }))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imagenEnMemoria => this.setState({
            fotoUri: imagenEnMemoria.uri,
            mostrarCamara:false
        }))
        .catch(err => console.log(err))
        
    }

    aceptarFoto(url){
        fetch(url)
        .then(imagenEnBinario => imagenEnBinario.blob())
        .then(imagenOk =>{
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagenOk)
            .then(()=>{
                ref.getDownloadURL() //trae la ruta con la que ahora esta guardada nuestra img en firebase
                .then((url)=>{ //devuelve url
                    this.props.cuandoSubaLaFoto(url) 
                })
            })
        })
        .catch(err => console.log(err))
    }
    
    rechazarFoto(){
        this.setState({
            mostrarCamara: true,
            fotoUri:''
        })
    }


  render() {
    return (
      <View style={styles.container}>


        {
            this.state.mostrarCamara ? 
            <>
                <Camera
                    style={styles.camara}
                    type={Camera.Constants.Type.back}
                    ref={metodosDelComponente => this.metodosDeCamara = metodosDelComponente}
                />
                <TouchableOpacity onPress={()=> this.tomarFoto()}>
                    <Text style={styles.sacarfoto}> Tomar foto</Text>
                </TouchableOpacity>
            </> 
            : this.state.mostrarCamara === false && this.state.fotoUri !== '' ?
            <>
                <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUri}}
                />
                <TouchableOpacity onPress={()=> this.aceptarFoto(this.state.fotoUri)}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.rechazarFoto(this.state.fotoUri) }>
                    <Text>Sacar otra</Text> 
                </TouchableOpacity>
            </> :
            <Text>No tienes permiso para usar la Camara</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
       height: 300,
    },
    camara:{
        height:90,
        width:'100%',
        borderBottomColor: 'black',
    },
    image:{
        height:100
    },

    sacarfoto:{
        fontsize: '2000px'
    },
})

export default Camara