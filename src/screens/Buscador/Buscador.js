import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image,  FlatList, ActivityIndicator} from 'react-native'
import React, { Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'
import {SearchBar } from 'react-native'
import { Feather, Entypo } from "@expo/vector-icons"
import {ImageBackground} from 'react-native'




class Buscador extends Component {

    constructor(props){
        super(props)
        this.state={
            loading: true,
            users:[],
            busqueda: '',
        }
    }

    //aca tengo que poner el array con todos los usuarios posibles
    componentDidMount(){
        db.collection('users').limit(5).onSnapshot(docs => {
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
            loading: false
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


{/* 
      <ImageBackground
    source= {require('../../../assets/fotobuscador.jpeg')}
    style= {{width: '100%', height: '95%'}}>
        </ImageBackground> 
 */}


    <View style={styles.containertodo}> 


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

   <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
    <Text style={styles.buscar}> Buscar</Text>
    </TouchableOpacity>

                  <ActivityIndicator size='small' color='white' />
                  

</View>          

 

<View style={styles.resultados}> 
         {this.state.loading ?
            '':
            
            <FlatList 
            data={this.state.users}
            keyExtractor={(item) => item.id}
            renderItem= {({item}) => <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'OtroPerfil',
                {email:item.data.owner}
                )}>
            <Text style={styles.user} >{item.data.owner} </Text> </TouchableOpacity> }
            /> 
         }

 </View>          



    </>
    )
  }
}

const styles = StyleSheet.create({
    

    containertodo:{
        flex:1, 
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "rgb(148, 5, 245)", 
        borderWidth: 15,
        borderColor: "rgb(148, 5, 245)", 
    },

 
      user:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 15,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        backgroundColor: "rgb(148, 5, 245)", 
        flex:'row',
        
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

      resultados:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        backgroundColor: "rgb(148, 5, 245)",
        borderWidth: 15,
        borderColor: "rgb(148, 5, 245)", 


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