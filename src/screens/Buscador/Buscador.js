import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image,  FlatList} from 'react-native'
import React, { Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'
import {SearchBar } from 'react-native'
import { Feather, Entypo } from "@expo/vector-icons";




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

     <View style={styles.containertodo}> 
 <View style={styles.container}> 

    <TextInput style={ styles.buscador}
             onChangeText={ text => this.setState( {busqueda:text} )}
             placeholder='Ingresa tu busqueda'
             value={this.state.busqueda}>
    </TextInput>
    

 <Feather
          name="search"
          size={20}
          style={{ marginLeft: 1 }}
        />

</View> 
  <FlatList
          data={this.state.users}
          keyExtractor={(item) => item.id}
          renderItem= {({item}) => <Text>{item.data.owner}</Text>}

        /> 
</View>

    </>
    )
  }
}

const styles = StyleSheet.create({
    

    containertodo:{
        flex:1, 
        backgroundColor: "rgb(148, 5, 245)",
    },

    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: "90%",
    
      },


    buscador:{
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
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
    },

})

export default Buscador



