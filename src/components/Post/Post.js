import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'



class Post extends Component {
 constructor(props){
        super(props)
        this.state = {
            isMyLike: false,
            cantLikes: props.data.likes.length, 
            cantComments: props.data.comments.length,
            isMyPost:false,
            foto: '',
            id: '',
            datos:{},
            myPosts: [],

        }
    }
    componentDidMount(){
       if(this.props.data.owner === auth.currentUser.email){
        this.setState({
            isMyPost: true,
        })
       }
       console.log(this.props.data.likes)
       this.props.data.likes.forEach( doc => {
        if(doc.owner == auth.currentUser.email){
            this.setState({
                isMyLike:true,
            })
        }

       })
        db.collection('users')
        .where('owner', '==', this.props.data.owner)
        .onSnapshot(docs=> {
        docs.forEach(doc => {console.log(doc.data())
            this.setState({
            id: doc.id,
            datos: doc.data()
        })}) 
        })
    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email
          })
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
            likes: firebase.firestore.FieldValue.arrayRemove({
            owner: auth.currentUser.email 
          })
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
            
            <View style={styles.circulo}>

            <Image style={styles.imageProfile}
                source={{uri: this.state.datos.foto}}
                resizeMode = 'cover'
            />  
 

        <View style={styles.container1}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'OtroPerfil',
                {email:this.props.data.owner}
                )}>
            <Text style={styles.textProfile}>{this.state.datos.name}</Text>
        </TouchableOpacity>
            
        </View>
        </View>




        <View style={styles.container2}>
        <Image style={styles.image} 
                source={{uri: this.props.data.foto}}
                resizeMode='contain'/>
        </View>
        
        <View style={styles.container3}>

        <View style={styles.like}>
            <Text>{this.state.cantLikes} van</Text>
        {
            this.state.isMyLike && this.state.isMyPost == false ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='check' color='black' size={32} />
                </TouchableOpacity>
            : this.state.isMyLike == false && this.state.isMyPost == false ?
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='user-plus' color='black' size={32} />
                </TouchableOpacity> 
            :
            <FontAwesome name='users' color='black' size={25} />

        }
        </View>
        

        <View style={styles.comment} >
        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments',
                {id:this.props.id}
                )}>
            <FontAwesome name='comment' size={32} />

        </TouchableOpacity>
        </View>

        <View style={styles.likes}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Likes',
                {id:this.props.id, cantLikes: this.state.cantLikes}
                )}>
            <Text style={styles.agregar}>Quienes van?</Text>

        </TouchableOpacity>
        </View>
    
        </View>

        <View style={styles.container4}>

            <View>
            <Text style={styles.subtitle}>Descripción: {this.props.data.description}</Text>
            </View>
            
            
        <View style={styles.coment}>
            {
                this.state.cantComments >= 1 ?
                <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                    'Comments',
                    {id:this.props.id}
                    )}>
                <Text style={styles.comentario}>Ver los {this.state.cantComments} comentarios</Text>
    
            </TouchableOpacity> :

            <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                'Comments',
                {id:this.props.id}
                )}>
                <Text style={styles.comentario}>Aun no hay comentarios</Text>
            </TouchableOpacity>
            }
        </View>
        
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
        padding: 20,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 5,
        backgroundColor: 'white',
        marginTop: 5,
        flex: 1,
        borderColor: 'black'
    },
    
    container1:{
        justifyContent: 'left',
        color: 'black',
        marginBottom: 30,
        width: '100%', 
    },

    container3:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    like: {
        marginBottom: 20,
       
    },
    likes: {
        marginBottom: 20
    },
    comment: {
        marginBottom: 20
    },

    container4:{
        flex:1,
        margintop: 60,
        marginBottom: 10,

        
    },


    subtitle:{
        fontWeight:700,
        color: 'black',
        marginTop: 20,

    },
    image:{
        height: 265,
        width: 273,
        border: 'black',
        marginBottom: 30,
        
    },

    circulo:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },

    imageProfile:{
        height: 70,
        width: 70,
        borderRadius: 1000,
        marginBottom: 10,
    },

    textProfile:{
        fontWeight: 'bold',
        textAlign: 'center',
    },


    agregar:{
        color: 'white',
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 20,
        backgroundColor: 'black',

    },

 
    comentario: {
        color: "rgb(148, 5, 245)",
        marginTop: 5,
        alignItems: 'center',
    },

    }
    )

export default Post