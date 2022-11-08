import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'
import { TouchableOpacity } from 'react-native-web'

class Profile extends Component {
    constructor(){
        super()
        this.state={
            myPosts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email ).onSnapshot(docs => {
            let misPosteos = []
            docs.forEach(doc => {
                misPosteos.push({
                    id: doc.id,
                    data:doc.data()
                })
            })
            this.setState({
                myPosts: misPosteos
            })
        })
    }
    logOut(){
        auth.signOut()
        .then(()=> {this.props.navigation.navigate('Login')})
        .catch(err=> console.log(err))
    }

    render() {
        return (
        <View 
        style={styles.container}
        >
            <Text>Home</Text>
            <FlatList
                data={this.state.myPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}  />}
            />
            <TouchableOpacity onPress= {()=> this.logOut()} style={styles.button}>
 
                <Text> CERRAR SESION </Text>
            </TouchableOpacity>

        </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "rgb(148, 5, 245)"

    },

    button:{
        flex:1,
        justifyContent: 'center',

    }
})

export default Profile