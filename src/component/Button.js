// Calculate Distance Between Two Locations in React Native App
// https://aboutreact.com/react-native-calculate-distance-between-two-locations/

// import React in our code
import React,{PureComponent} from 'react';
sss
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

/*
 * 1. getDistance, Calculates the distance between 
 *    two geo coordinates.
 * 2. getPreciseDistance, Calculates the distance between
 *    two geo coordinates. This method is more accurate then
 *    getDistance, especially for long distances but it is
 *    also slower. It is using the Vincenty inverse formula
 *    for ellipsoids.
 */
import {getDistance, getPreciseDistance} from 'geolib';
import RNRearCameraCharacteristicsDisplayMetrics from 'react-native-rear-camera-characteristics-display-metrics';
import { RNCamera } from 'react-native-camera';

const App = () => {
  
 
  takePicture = async () => {
    this.camera.capture()
    .then((data) => {
      console.log(data);
      this.setState({ path: data.path })
    })
    .catch(err => console.error(err));
  };
  const angle_view = ()=>{
    const sum = 2 * (Math.atan(29/(2 * 40))) * (180/Math.PI)
   // const sum = Math.atan(5)
    console.log(sum)
    console.log(  Dimensions.get('window').height)
    console.log(  Dimensions.get('window').width)
    

    return sum
  }

  return (
    
    <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          zoom = {0}
          focusDepth={0.2}
          captureAudio={false}
          ratio ={"8:8"}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          autoFocus = {RNCamera.Constants.AutoFocus.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        
        <View style={{ color:'black' }}>
    
           <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
     {/* <Text>
            Angle View (degrees) :  {angle_view()}
            
      </Text>
          <Text>
            Focal length :  {getDistance , getPreciseDistance}
            
      </Text>
      <Text>
       Sensor  height : {RNRearCameraCharacteristicsDisplayMetrics.SENSOR_HEIGHT}
      
        </Text>
        <Text>
      Sensor  width : {RNRearCameraCharacteristicsDisplayMetrics.SENSOR_WIDTH}
        </Text>
        <Text>
        DISPLAY_METRICS_Density : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_Density}
        </Text>
        <Text>
        DISPLAY_METRICS_DensityDPI : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_DensityDPI}
        
        </Text>
        <Text>
        DISPLAY_METRICS_HeightPixels : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_HeightPixels}
        
        </Text>
        <Text>
        DISPLAY_METRICS_WidthPixels : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_WidthPixels}
        
        </Text>
        <Text>
        DISPLAY_METRICS_ScaledDensity : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_ScaledDensity}
        
        </Text>
        <Text>
        DISPLAY_METRICS_Xdpi : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_Xdpi}
        
        </Text>
        <Text>
        DISPLAY_METRICS_Ydpi : {RNRearCameraCharacteristicsDisplayMetrics.DISPLAY_METRICS_Ydpi}
        
        </Text> */}

        </View>
      </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;