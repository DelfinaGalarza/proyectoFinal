import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {storage} from '../../firebase/config'

class Carrete extends Component {
  
    constructor(props){
        super(props)
        this.state={
            
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
  
    render() {
        return (
            <View style={styles.container}>
     
            {
                this.state.mostrarCamara ?
                <TouchableOpacity onPress={()=> this.subirfoto()}>
                                <Text style={styles.botton}>Seleccionar foto del carrete</Text>
                            </TouchableOpacity>
                :
                
                <TouchableOpacity onPress={()=> this.subirfoto()}>
                                <Text style={styles.botton}>Subir foto del carrete</Text>
                            </TouchableOpacity>
        
                    
               
        }
                   
                </View>
        )
    }
    
}
    

const styles = StyleSheet.create({
    
})
export default Carrete