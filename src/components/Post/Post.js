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
            myPosts: [],
            isMyPost:false
        }
    }
    componentDidMount(){
        //junto mis posteos y los meto dentro de un array para luego editarlos
        // db.collection('posts').where('owner', '==', auth.currentUser.email ).onSnapshot(docs => {
        //     let misPosteos = []
        //     docs.forEach(doc => {
        //         misPosteos.push({
        //             id: doc.id,
        //             data:doc.data()
        //         })
        //     })
        //     this.setState({
        //         myPosts: misPosteos
        //     })
        // })
    
        // let myPost = this.props.data
        // console.log(myPost)
        // if(myPost){
        //     this.setState({
        //         isMyPost:true,
        //     })
        // }

       if(this.props.data.owner === auth.currentUser.email){
        this.setState({
            isMyPost: true,
        })
       }


        let myLike = this.props.data.likes.includes(auth.currentUser.email)

        if(myLike){
            this.setState({
                isMyLike:true,
            })
        }

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
        .delete()
        .then(()=> {this.props.navigation.navigate('Profile')})
        .catch(err=> console.log(err))
    }

render() {
    return (
        <View style={styles.container}>
        <View style={styles.container1}>
            <Text >{this.props.data.owner}</Text>
        </View>
        
          <View >
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
                this.state.isMyPost ?
                <TouchableOpacity onPress={()=> this.borrarPosteo()}>
                <Text style={styles.agregar}>BORRAR POSTEO</Text>
                </TouchableOpacity> : ''
            }
            


        </View>
    </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        padding: 40,
        justifyContent:'space-between',
        alignItems:'center',
      marginBottom: 10,
     marginTop: 5,
        backgroundColor: 'black',
        flex: 1,
    
    },
    
    container1:{
      justifyContent: 'left',
        backgroundColor: 'white',
        color: 'black',
    },

    container2:{
        flex:3
    },

    // foto:{
    //     marginTop:50,
    //     height:200,
    //     width:200
    // },

    subtitle:{
        fontWeight:700,
        color: 'white',
    },
    image:{
        height: 200,
        
        width: '100%',
        
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