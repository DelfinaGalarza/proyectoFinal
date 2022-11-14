import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'


class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            mail:'',
            pass:'',
            logueado: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

    loguear(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err => console.log(err))
    }

  render() {
    return (
    <>
        <View> <Image style={styles.image}
        source={require('../../../assets/iconosinfondo.png')}
        resizeMode= 'contain' /> </View>

      <View style={styles.container}>
        <Text style= {styles.text}>Login</Text>
        <View>
            <TextInput
             style={ styles.mail}
             onChangeText={ text => this.setState( {mail:text} )}
             placeholder='Ingresa tu email'
             value={this.state.mail}
            />
            <TextInput
             style={ styles.pass}
             onChangeText={ text => this.setState( {pass:text} )}
             placeholder='Ingresa tu password'
             value={this.state.pass}
             secureTextEntry={true}
            />
            <View>
                {
                    this.state.mail != '' && this.state.pass != '' ?
                    <TouchableOpacity onPress={()=> this.loguear(this.state.mail, this.state.pass)} style= {styles.inicia}>
                    <Text>Iniciar sesión</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={()=> this.loguear(this.state.mail, this.state.pass)} style= {styles.inicia} disabled={true}>
                    <Text>Iniciar sesión</Text>
                    </TouchableOpacity>

                }
            </View>

            <View style= {styles.registrarse}>
                <Text>Aun no tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                   <View style={styles.reg}> <Text>Registrate</Text> </View>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:32,
        width: '100%',
    },
    mail:{
        borderWidth:1,
        width: '100%',
        marginBottom: 5,
        height: 30,
    },
    pass:{
        borderWidth:1,
        width: '100%',
        marginBottom: 5,
        height: 30,
    },
    text: {
        height: 70,
        fontSize: 30,
        justifyContent: 'center',
        flex: 'row',
        marginTop: 2,
    },
    image: {
        marginTop: 100,
        height: 200,
        width: '100%',
       justifyContent: 'center',
    }   ,
    inicia:{
        marginBottom: 8,
    },
    registrarse:{
        flex: 'row', 
        height: 15,  
      },
      reg: {
          color: 'white',
        
          }
     
})

export default Login