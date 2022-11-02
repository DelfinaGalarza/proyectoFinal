import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'

export default class ProductList extends Component {

    constructor(){
        super()
        this.state = {
            products: info
        }
    }

  render() {
    return (
      <View>
        <Text>ProductList</Text>
        <FlatList
            data={this.state.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem = {({item}) => <Text>{item.title}</Text>}
        />
      </View>
    )
  }
}