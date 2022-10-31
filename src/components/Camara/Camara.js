import {Text, View} from 'react-native'
import React, {Component} from 'react'
import {Camera} from expo-Camera


class Camera extends Component {
    constructor(){
        super()
        this.metodosDeCamara = null
        this.state = {
            mostrarCamara: false, 
            fotoUri:'',
        }
    }
}

// componentDidMount(){
//     Camera.requestCameraPermissionAsync()
//     .then(()=> this.setState({
//         mostrarCamara: true
//     }))
//     .catch(err => console.log(err))
// }


// render(){
//     return (
//         <View style ={StyleSheet.container}>
//         <Camera>


//         </Camera>
//         </View>
//     )
// }