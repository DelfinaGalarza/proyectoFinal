import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'
import Comments from '../Comments/Comments'

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
        <View 
        style={styles.container}
        >
            <Text>Home</Text>
            <FlatList
                data={this.state.allPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}  />}
            />

        </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Home