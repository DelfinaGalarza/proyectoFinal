import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image,  FlatList} from 'react-native'
import React, { Component} from 'react'
import {auth} from '../../firebase/config'
import {SearchBar } from 'react-native'



class Buscador extends Component {

    constructor(props){
        super(props)
        this.state={
            loading: false,
            users:[],
            searchValue: '',
        }
    }

    //aca tengo que poner el array con todos los usuarios posibles
    componentDidMount(){


       
    }

    buscar(text){

        //Filtramos dependiendo de que recibe por parametro 

        let usersFilter = this.state.users.filter(elm => 
            elm.user.toUpperCase().includes(text.toUpperCase()))

        this.setState({
            user: text,
            users: usersFilter, 
        })
    }

    render() {
        return (
        <>

     <View style={styles.headerbusc}> 
            <Image style={styles.imagebusc}
             source={require('../../../assets/iconoWP.png')}
             resizeMode= 'contain'/>
             <Text style={styles.textbusc}> Search Party</Text>
     </View>

    
   {/* <View style={styles.container}>   
        <View style={styles.barra}>
          <SearchBar
          placeholder="Search Here..."
          value={this.state.owner}
          onChangeText={(text) => this.buscar(text)}
          autoCorrect={false}
        />
     </View> 
         
        {/* <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.id}
        /> 
      </View> */}
      
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



