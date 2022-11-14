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
            cantLikes: props.data.likes.length, 
            cantComments: props.data.comments.length,
            myPosts: [],
            isMyPost:false
        }
    }
    componentDidMount(){
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
                isMyLike:true,
                cantLikes: this.state.cantLikes + 1, //agrego un numero mas al estado original
                cantComments: this.state.cantComments + 1,
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
                isMyLike:false,
                cantLikes: this.state.cantLikes - 1, //le resto un like al estado original
                cantComments: this.state.cantComments - 1,
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
        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'OtroPerfil',
                {email:this.props.data.owner}
                )}>
            <Text >{this.props.data.owner}</Text>
        </TouchableOpacity>
            
        </View>




        <View >
        <Image style={styles.image} 
                source={{uri: this.props.data.foto}}
                resizeMode='contain'/>
        </View>
        
        <View style={styles.likeycoment}>

        <View style={styles.like}>
            <Text>{this.state.cantLikes}</Text>

        
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

        <View style={styles.comment} >
        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments',
                {id:this.props.id}
                )}>
            <FontAwesome name='comment' size={32} />

        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Likes',
                {id:this.props.id}
                )}>
            <Text style={styles.agregar}>Los likes</Text>

        </TouchableOpacity> */}
        </View>
    
        </View>


        </View>
        

          <View style={styles.container2}>
            <Text style={styles.subtitle}>Descripcion: {this.props.data.description}</Text>
            </View>
       

           
        
        <View style={styles.coment}>
            {
                this.state.cantComments >= 1 ?
                <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                    'Comments',
                    {id:this.props.id}
                    )}>
                <Text style={styles.comentario}>ver los {this.state.cantComments} comentarios</Text>
    
            </TouchableOpacity> :

            <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments',
                {id:this.props.id}
                )}>
                <Text style={styles.comentario}>Aun no hay comentarios</Text>
            </TouchableOpacity>
            }
        
        
        </View>

        <View>
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
        margin: 50,
        marginBottom: 10,
        backgroundColor: 'white',
        marginTop: 20,
        flex: 1,
        borderWidth: 3,
        borderRadius: 10,

    
    },
    
    container1:{
        justifyContent: 'left',
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 30,
        width: '100%',
        
    },
    likeycoment:{
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    container2:{
        flex:3,
        margintop: 60,
        marginBottom: 10,

        
    },

    // foto:{
    //     marginTop:50,
    //     height:200,
    //     width:200
    // },

    subtitle:{
        fontWeight:700,
        color: 'black',

    },
    image:{
        height: 265,
        width: 100000,
        border: 'black',
        marginBottom: 30,

        
    },

    agregar:{
        color: 'black',
    },

    descripcion:{
        color: 'black',
    },
    
    like: {
        justifyContent: 'left',
        flexDirection: 'row',
        marginBottom: 20,
    },

    coment: {
        color: "rgb(148, 5, 245)",
        textDecorationLine: 'underline',
    },

    comentario: {
        color: "rgb(148, 5, 245)",
    },

   

    }
    )

export default Post