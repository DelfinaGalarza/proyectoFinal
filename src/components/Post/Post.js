import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            isMyLike: false,
            allMyPosts: []
            // Fotouri: this.props.data.foto
        }
    }
    componentDidMount(){
        

        let myLike = this.props.data.likes.includes(auth.currentUser.email)

        if(myLike){
            this.setState({
                isMyLike:true,
            })
        }

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data:doc.data(),
                })
            })
            console.log(posteos)
            this.setState({
                allMyPosts: posteos
            })
        })

    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                isMyLike:true
            })
        })
        .catch(err=> console.log(err))
    }

    unlike(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                isMyLike:false
            })
        })
        .catch(err => console.log(err))
    }

    borrarPosteo(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            myPosts: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                allMyPosts: ''
            })
        })
        .catch(err => console.log(err))
    }

render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
            <Text style={styles.mail}>{this.props.data.owner}</Text>
        </View>
        <View style={styles.foto}>
        <Image style={styles.image} 
                source={{uri: this.props.data.foto}}
                resizeMode='contain'/>
        </View>
        <View style={styles.container2}>
            <Text style={styles.subtitle}>Descripcion:</Text>
            <Text style={styles.descripcion}>{this.props.data.description}</Text>
        </View>
        
        <View>
            <Text>{this.state.likesCount}</Text>

        
        {
            this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='red' size={32} />
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={32} />
                </TouchableOpacity>
        }

        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments',
                {id:this.props.id}
                )}>
            <Text style={styles.agregar}>Agregar comentario</Text>

        </TouchableOpacity>

            {
                this.state.allMyPosts ?
                <TouchableOpacity onPress={()=> this.borrarPosteo()}>
                <Text style={styles.agregar}>BORRAR POSTEO</Text>
                </TouchableOpacity> :
                ''
            }
            


        </View>
    </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        padding: 10,
        justifyContent:'space-between',
        alignItems:'center',
        margin:20,
        borderWidth:.5,
        borderRadius:10,
        backgroundColor: 'black',
    },
    
    container1:{
        flex:1,
    },

    mail:{
        color: 'white'
    }, 

    container2:{
        flex:3
    },

    foto:{
        marginTop:100,
        height:200,
        width:200
    },

    subtitle:{
        fontWeight:700,
        color: 'white',
    },
    image:{
        height: 200,
    },

    agregar:{
        color: 'white',
    },

    descripcion:{
        color: 'white',
    },

    }
    )

export default Post