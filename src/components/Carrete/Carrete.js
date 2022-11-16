import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {storage} from '../../firebase/config'

class Carrete extends Component {
  
    constructor(props){
        super(props)
        this.state={
            mostrarCarrete: true,
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
                            this.setState({fotoSubida:url, mostrarCarrete:false})
                        }
                    )
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

aceptarFoto(url){
    fetch(url)
    .then(imagenEnBinario => imagenEnBinario.blob())
    .then(imagenOk =>{
        const ref = storage.ref(`fotoSubida/${Date.now()}.jpg`)
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
        fotoSubida:''
    })
}
  
    render() {
        return (
            <View style={styles.container}>
     
            {
                    this.state.mostrarCarrete === false && this.state.fotoSubida !== '' ?
                    <>
                        <Image
                            style={styles.image}
                            source={{uri: this.state.fotoSubida}}
                        />
                        <TouchableOpacity onPress={()=> this.aceptarFoto(this.state.fotoSubida)}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.rechazarFoto(this.state.fotoSubida) }>
                            <Text>Elegir otra</Text> 
                        </TouchableOpacity>
                    </> :
                    <Text>No tienes permiso para acceder a tu carrete</Text>
                }
                   
                </View>
        )
    }
    
}
    

const styles = StyleSheet.create({
    
})
export default Carrete