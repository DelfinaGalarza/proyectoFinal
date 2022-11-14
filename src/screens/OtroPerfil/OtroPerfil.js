// class Comments extends Component {
//     constructor (props){
//       super (props)
//       this.state = {
//         id: props.route.params.id,
//         aComentarios: [],

import { Text, View, FlatList, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'
import OPerfil from '../../components/OPerfil/OPerfil'

class OtroPerfil extends Component {
    constructor(props){
        super(props)
        this.state={
            usuario:[],
            susPosts: [],
            userId: props.route.params.id
        }
    }

    componentDidMount(){
        db.collection('users')
        .doc(this.state.userId) //ya tengo claro que voy a recibir solo uno por eso despues no hago foreach
        .onSnapshot(doc =>{ //solo tra un doc de regreso
        this.setState ({
            usuario: doc.data(), //se extrae y se guarda 
            })
        })
        
        db.collection('posts').where('owner', '==', this.state.userId).onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data:doc.data(),
                })
            })
            this.setState({
                susPosts: posts,
            })
        })
    }

    render() {
        return (

            <>
            <View style={styles.headerhome}> 

            <Image style={styles.imagehome}
            source={require('../../../assets/iconoWP.png')}
            resizeMode= 'contain'/>
            <Text style={styles.texthome}> You Party</Text>
    </View>

    

     <View style={styles.perfil}>
            <OPerfil mail={this.state.usuario.email} name={this.state.usuario.usuario} nPosts={this.state.susPosts.length} />

     </View>

        <View 
        style={styles.container}
        >
            <FlatList
                data={this.state.susPosts}
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

    }
})

export default OtroPerfil