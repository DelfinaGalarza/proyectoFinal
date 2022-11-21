import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class LikesInd extends Component {
    constructor(props) {
    super (props)
    this.state = {  
        LikeI: [],
        datos: {},
        id:'',
    }}

    componentDidMount(){

        db.collection('users')
        .where('owner', '==', this.props.likes.owner)
        .onSnapshot(docs=> {
        docs.forEach(doc => {console.log(doc.data())
            this.setState({
            id: doc.id,
            datos: doc.data()
        })}) 
        console.log(this.state.datos.name)
        })
    }

    render () {
    
        return (

    <View style= {styles.comento}>

            <View style= {styles.p}>
            <Image style={styles.image} 
                source={{uri: this.state.datos.foto}}
                resizeMode='cover'/>
            </View>
        
            <View style= {styles.p}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                'OtroPerfil',
                {email:this.state.datos.email}
                )}>
            <Text >{this.state.datos.name}</Text>
            </TouchableOpacity>
            </View> 
        
        
    </View>
)
}
}
const styles = StyleSheet.create({
    comento: {
        flexDirection: 'row',   
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'white',
        padding:5
    },
    owner:{
    fontWeight: 'bold',
    marginTop: 10,
    },
    image:{
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default LikesInd