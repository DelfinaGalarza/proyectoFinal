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
        <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                'OtroPerfil',
                {email:this.props.likes.owner}
                )}>
            <Text >{this.state.datos.name}</Text>
        </TouchableOpacity>
        
    </View>
)
}
}
const styles = StyleSheet.create({
    comento: {
        flexDirection: 'row',   
    },
    owner:{
    fontWeight: 'bold',
    marginTop: 10
    }
})

export default LikesInd