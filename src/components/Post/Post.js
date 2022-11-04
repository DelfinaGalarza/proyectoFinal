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
            // Fotouri: this.props.data.foto
        }
    }
    componentDidMount(){
        //['Brian', 'Nelson', 'Cami']
        //  .('Cami')
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
            <Text>{this.props.data.owner}</Text>
        </View>
        <View style={styles.foto}>
        <Image style={styles.image} 
                source={{uri: this.props.data.foto}}
                resizeMode='contain'/>
        </View>
        <View style={styles.container2}>
            <Text style={styles.subtitle}>Descripcion:</Text>
            <Text>{this.props.data.description}</Text>
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
            <Text>Agregar comentario</Text>

        </TouchableOpacity>
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
        borderRadius:10
    },
    container1:{
        flex:1,
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
    },
    image:{
        height: 200,
    }
})

export default Post