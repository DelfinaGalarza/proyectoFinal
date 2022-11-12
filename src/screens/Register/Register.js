import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'
import CamaraRegistro from '../../components/CamaraRegistro/CamaraRegistro'


class Register extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            error:'',
            name:'',
            mostrarCamara: true,
            fotoUrl:'',
            bio:''
        }
    }

    registrar(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch( err => this.setState({error:err.message}))
    }

    fotoPerfil(text){
        db.collection('User').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            name: text,
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
            <View> <Image style={styles.image}
        source={require('../../../assets/iconosinfondo.PNG')}
        resizeMode= 'contain' /> </View> 
        <View style={styles.container}>
            <View>
                <View style={styles.titulo}><Text>Registrate</Text></View>
                <TextInput
                    style={styles.email}
                    placeholder='Escribi tu email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                
                />
                <TextInput
                    style={styles.password}
                    placeholder='Escribi tu password'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />

                <TextInput
                placeholder='nombre de usuario'
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
                keyboardType='default'
                style={styles.usuario}
                />
            </View>
            
            <View style={styles.container}>
            {
                this.state.mostrarCamara ?
                <CamaraRegistro

                cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
                /> : 
                <>
                    <TextInput
                    placeholder='Deja tu biografia'
                    onChangeText={text => this.setState({bio: text})}
                    value={this.state.bio}
                    keyboardType='default'
                    style={styles.input}
                    />
                <TouchableOpacity onPress={()=> this.fotoPerfil(this.state.name)}>
                    <Text> Cargar foto de perfil</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=> this.reintentar(this.state.description)}>
                    <Text> Sacar otra foto</Text>
                </TouchableOpacity> */}
            </>
        }
                
            </View>
        
                <View>
                    <TouchableOpacity onPress={()=> this.registrar(this.state.email, this.state.password)}>
                        <Text>Registrar usuario</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text>Logueate</Text>
                    </TouchableOpacity>
                </View>
                
                {
                    this.state.error !== '' ?
                    <Text>{this.state.error}</Text>:
                    ''
                }
            </View>
       </> )
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:32
    },
    input:{
        borderWidth:1
    },
    image: {
        marginTop: 25,
        height: 150,
        width: '100%',
       justifyContent: 'center',
    }   ,
    email:{
         marginTop:5,
         marginBottom: 5,
    },
    titulo: {
        
    }
})

export default Register