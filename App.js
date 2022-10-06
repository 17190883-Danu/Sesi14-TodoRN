import React, { Component } from "react";
import { View, StatusBar, Text, FlatList} from 'react-native'
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

let DATA = [
  { todo: 'Beli', check: false},
  { todo: 'Meser', check: false},
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      newTodo: '',
    };
  }

  componentDidCatch() {
    this.getData();
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem( 
        '@todoData', 
        JSON.stringify(DATA)
      );
    } catch (error) {
      // Error saving data
    }
  };

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('@todoData'));
      if (value !== null) {
        // We have data!!
        DATA = value ;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  addNewTodo = () => {
    data.push({
      todo: this.state.newTodo, check: false
    });
    this.setState({newTodo: ''});
    this.storeData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor= '#FFFFFF' barStyle="light-content"/>
        <View style={{ backgroundColor: "#2196f3", paddingVertical: 15, elevation: 1, marginBottom: 10}}>
          <Text style={{color: '#FFFFFF', textAlign: 'center', fomtWeight: 'bold', fontSize: 18}}>TODOLIST</Text>
        </View>
      
     

      <FlatList
        data={DATA}
        renderItem={({ item }) =>
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <View style={{marginHorizontal: 20, marginVertikal: 5, borderWidth: 1, borderColor: '#e0e0e0', paddingVertical: 15, borderRadius: 50, backgroundColor: '#FFFFFF', elevation: 1}}>
          <Text style={{marginLeft: 10}}>Beli Jajan</Text>
        </View>
      </View>
        }
        keyExtractor={item => item.todo}
        style={{flex: 1, backgroundColor: '#f5f5f5'}}
      />

      <Hoshi
        label={'Tambah Todo'}
        
        borderColor={'#2196f3'}
        
        borderHeight={3}
        inputPadding={16}
        
        backgroundColor={'#F9F7F6'}
        value={this.state.newTodo}
        onChangeText={(text) => this.setState({ newTodo: text})}
        onSubmitEditing={() => this.addNewTodo()}
        />
      </View>
    )
  }
}

export default App;