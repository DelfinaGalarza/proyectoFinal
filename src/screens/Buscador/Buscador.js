import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image,  FlatList} from 'react-native'
import React, { Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'
import {SearchBar } from 'react-native'



class Buscador extends Component {

    constructor(props){
        super(props)
        this.state={
            loading: false,
            users:[],
            busqueda: '',
        }
    }

    //aca tengo que poner el array con todos los usuarios posibles
    componentDidMount(){
        db.collection('users').onSnapshot(docs => {
            let misUsuarios = []
            docs.forEach(doc => {
                misUsuarios.push({
                    id: doc.id,
                    data:doc.data(),
                })
            })
            this.setState({
                users: misUsuarios,
            })
        })
       
    }

    buscar(text){

        //Filtramos dependiendo de que recibe por parametro 

        let usersFilter = this.state.users.filter(elm => 
            elm.data.owner.toUpperCase().includes(text.toUpperCase()))

        this.setState({
            user: text,
            users: usersFilter, 
        })
    }

    render() {
        console.log(this.state);
        return (
        <>

     <View style={styles.headerbusc}> 
            <Image style={styles.imagebusc}
             source={require('../../../assets/iconoWP.png')}
             resizeMode= 'contain'/>
             <Text style={styles.textbusc}> Search Party</Text>
     </View>

    
    <TextInput 
    style={ styles.buscador}
             onChangeText={ text => this.setState( {busqueda:text} )}
             placeholder='Ingresa tu busqueda'
             value={this.state.busqueda}>
    </TextInput>


    <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
    <Text style={styles.buscar}> Buscar</Text>
    </TouchableOpacity>

         
        <FlatList
          data={this.state.users}
          keyExtractor={(item) => item.id}
          renderItem= {({item}) => <Text>{item.data.owner}</Text>}

        /> 
    

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
        backgroundColor: "rgb(148, 5, 245)",
    },

    headerbusc:{
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
        height: '110',
        padding: 14,
    },

    textbusc:{
        color: "rgb(148, 5, 245)",
        textAlign: 'center', 
        fontSize: '30px',
    },

    imagebusc: {
        height: 60,
        width: 200,
    }
})

export default Buscador