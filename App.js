import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Images from 'react-native-image-crop-picker';
import Measure from './src/MeasureSize';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  createStackNavigator,
  createAppContainer,
} from '@react-navigation/stack';

class HomeScreen extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileHeight: '',
      fileWidth: '',
      fileUri: '',
    };
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        console.log('response.data', response.height);
        console.log('response.uri', response.uri);
        this.setState({
          filePath: response,
          fileHeight: response.height,
          fileWidth: response.width,
          fileUri: response.uri,
        });
      }
    });
  };
  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    }
  }
  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text
              style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
              Pick Images from Camera
            </Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign: 'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              {console.log('image', this.state.fileUri)}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Measure', {
                    image: this.state.fileUri,
                    imageWidth: this.state.fileWidth,
                    imageHeight: this.state.fileHeight,
                  })
                }
                style={styles.btnSection}>
                <Text style={styles.btnText}>Cropped</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.launchCamera}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Measure" component={Measure} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 300,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
