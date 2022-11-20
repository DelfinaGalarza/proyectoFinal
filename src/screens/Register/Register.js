import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker' //traer el carrete
import {storage} from '../../firebase/config'
import { AntDesign } from '@expo/vector-icons'; // logo de la imagen



class Register extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            error:'',
            name:'',
            // mostrarCamara: true,
            fotoUrl:'',
            bio:'',
            foto:'',
        }
    }

    registrar(email, password, name, foto, bio){
        auth.createUserWithEmailAndPassword(email, password)
        .then( resp => db.collection('users').add({
                owner:auth.currentUser.email,
                createdAt: Date.now(),
                name: name,
                bio: bio,
                foto: this.state.foto

            })
            .catch(err => console.log (err))
                )
                .then(()=>this.props.navigation.navigate('Home'))
        .catch( err => this.setState({error:err.message}))
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
                const ref = storage.ref(`foto/${Date.now()}.jpg`)
                ref.put(img)
                .then(()=> {
                    ref.getDownloadURL()
                    .then(url => {
                            this.setState({foto:url})
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
                placeholder='Nombre de usuario'
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
                keyboardType='default'
                style={styles.usuario}
                />

                <TextInput
                    style={styles.password}
                    placeholder='Escribi tu contraseña'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />

               

                <TextInput
                    placeholder='Deja tu biografia'
                    onChangeText={text => this.setState({bio: text})}
                    value={this.state.bio}
                    keyboardType='default'
                    style={styles.input}
                    />
                
                <View style={styles.ftoperfil}>
                <TouchableOpacity onPress={()=> this.subirfoto()}>
                    <AntDesign name="picture" size={60} color="black" />
                </TouchableOpacity>
                <Text style={styles.botton}>Elija su foto de perfil</Text>
              </View> 

            </View>
            
            <View style={styles.container1}>
            {
                // this.state.mostrarCamara ?
                // <CamaraRegistro

                // cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
                // /> : 
                <>
                <View style={styles.reg}>  
                <TouchableOpacity onPress={()=> this.registrar(this.state.email, this.state.password, this.state.name, this.state.fotoUrl, this.state.bio)}>
                    <Text> Registrar usuario</Text>
                </TouchableOpacity>
                </View>  
                {/* <TouchableOpacity onPress={()=> this.reintentar(this.state.description)}>
                    <Text> Sacar otra foto</Text>
                </TouchableOpacity> */}
            </>

            
        }
          <View style={styles.errores}>
            {
                    this.state.error !== '' ?
                    <Text>{this.state.error}</Text>:
                    ''
                }
                </View>  
            </View>
        
               

                <View style={styles.loguear}>
                    <Text>Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                       <View style={styles.log}> <Text>Logueate</Text></View>
                    </TouchableOpacity>
                </View>
            
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
        borderWidth:1,
         height: 30,
    },

    container1:{
        flex:1,
        justifyContent:'center',  
    },
    image: {
        marginTop: 15,
        height: 150,
        width: '100%',
       justifyContent: 'center',
    }   ,
    email:{
         marginTop:5,
         marginBottom: 5,
         borderWidth:1,
         height:25,

    },
  password: {
    marginTop:5,
    marginBottom: 5,
    borderWidth:1,
    height:25,

},
 usuario:{
    marginTop:5,
    marginBottom: 5,
    borderWidth:1,
    height:25,
 },
loguear:{
    flexDirection: 'row',
    marginBottom: 30,

},
log:{
    marginLeft: 10, 
    textDecorationLine:'underline'
,    


},
errores:{
    marginTop: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
   
},
ftoperfil:{
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex:1,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around'
},

titulo:{
  marginTop: 15,
  height: 80,
},

reg:{
    fontWeight: 'bold',

}
    
})

export default Register