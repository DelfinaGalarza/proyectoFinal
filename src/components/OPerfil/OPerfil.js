import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


class OPerfil extends Component {

    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
    }


render() {
    return (
        <View style={styles.perfil}>

        <View style={styles.own}>
        <Text >{this.props.name}</Text>
        <Text >{this.props.mail}</Text>
        </View>

        <View style={styles.pub}>
        <Text>{this.props.nPosts}</Text>
        <Text style={styles.subtitle}> Publicaciones </Text>
        </View>
        </View>

        
    )
}
}

const styles = StyleSheet.create({
    perfil:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    own:{
        marginTop: 10,
    },
    pub:{
        alignItems: 'center',
    },
    lik:{
        alignItems: 'center'
    },

   

    }
    )

export default OPerfil