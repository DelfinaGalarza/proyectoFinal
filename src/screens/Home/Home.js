import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'
import Comments from '../Comments/Comments'
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs'

class Home extends Component {
    constructor(){
        super()
        this.state={
            allPosts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data:doc.data()
                })
            })
            console.log(posteos)
            this.setState({
                allPosts: posteos
            })
        })
    }

    render() {
        return (

        <>
       
       <View style={styles.header}> 
        <Image style={styles.image}
        source={require('../../../assets/iconoWP.png')}
        resizeMode= 'contain'/>
        <Text style={styles.text}> We Party</Text>


</View>
        <View 
        style={styles.container}>
        
            <FlatList
            
                data={this.state.allPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}  style = {styles.post}/>}
                
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
    header:{
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
        height: '110',
        padding: 14,
    },

    text:{
        color: "rgb(148, 5, 245)",
        textAlign: 'center', 
        fontSize: '30px',
        fontStyle: 'Fugaz One',
    },

    image: {
        height: 60,
        width: 200,
    }        
    
})

export default Home