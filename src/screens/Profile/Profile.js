import { Text, View, FlatList, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'
import Perfil from '../../components/Perfil/Perfil'
import { TouchableOpacity } from 'react-native-web'



class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            myPosts:[],
            myLikes: [],
            datos: {},
            id:'',
        }
    }


    componentDidMount(){

        db.collection('users')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot(docs=> {
          docs.forEach(doc => {console.log(doc.data())
            this.setState({
            id: doc.id,
            datos: doc.data()
          })}) 
        })
        db.collection('posts').where('owner', '==', auth.currentUser.email ).onSnapshot(docs => {
            let misPosteos = []
            docs.forEach(doc => {
                misPosteos.push({
                    id: doc.id,
                    data:doc.data(),
                })
            })
            this.setState({
                myPosts: misPosteos,
            })
        })
        db.collection('posts').where('owner', '==', auth.currentUser.email ).onSnapshot(docs => {
            let misLikes = []
            docs.forEach(doc => {
                misLikes.push({
                    id: doc.id,
                    data:doc.data().likes,
                })
            })
            this.setState({
                myLikes: misLikes,
            })
        })
    }
    logOut(){
        auth.signOut()
        .then(()=> {this.props.navigation.navigate('Login')})
        .catch(err=> console.log(err))
    }

    render() {
        console.log(this.state)
        return (

            <>
            <View style={styles.headerhome}> 

            <Image style={styles.imagehome}
             source={require('../../../assets/iconoWP.png')}
             resizeMode= 'contain'/>
             <Text style={styles.texthome}> You Party</Text>
             
             <View style={styles.cerrar}>
             <TouchableOpacity onPress= {()=> this.logOut()} style={styles.button}>
                <Text style={styles.cerrar}> Cerrar Sesion </Text>
            </TouchableOpacity>
            </View>

     </View>

 

     <View style={styles.perfil}>
  <Perfil  nPosts={this.state.myPosts.length} mail={auth.currentUser.email} user={this.state.datos} />

     </View>

        <View 
        style={styles.container}
        >
            <FlatList
                data={this.state.myPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}
                
            />
 

        </View>
        </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "rgb(148, 5, 245)",
    },
    
    subtitle:{
        fontWeight:700,
        color: 'black',

    },

    button:{
        flex:1,
        justifyContent: 'center',
    },

    headerhome:{
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
        height: '110',
        padding: 14,
    },

    texthome:{
        color: "rgb(148, 5, 245)",
        textAlign: 'center', 
        fontSize: '30px',
    },

    imagehome: {
        height: 60,
        width: 200,
    },

    perfil:{
        justifyContent: 'space-between',
        borderWidth: 5,
        borderColor: "rgb(148, 5, 245)",


    },

    cerrar: {
        color: "rgb(148, 5, 245)",
        alignItems: 'right', 
        textDecorationLine: 'underline',



    }
})

export default Profile