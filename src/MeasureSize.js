import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from 'react-native-image-crop-picker';
import {set} from 'react-native-reanimated';
const SENSORHEIGHT = 51.71118; //mm
const SENSORWIDTH = 29.28864; //mm
const SensorHeight_Pixel = 1280;
const SensorWidth_Pixel = 720;

const FOCALLENGTH = 40.09; //mm
const DISTANCE = 1000; //MM
const urls = 'http://192.168.1.62:5000/getImage';
const Measure = ({route}) => {
  const [getApi, setApi] = useState(image);
  const [state, setState] = useState(image);
  const [defectWidth, setDefectWidth] = useState('');
  const [defectHeight, setDefectHeight] = useState('');
  const {image, imageHeight, imageWidth, imageJsonH, imageJsonW} = route.params;
  //console.log('measure', image, imageHeight, imageWidth);
  console.log('img', imageJsonH, imageJsonW);

  const real_object_heigth = () => {
    const Object_height = (SENSORHEIGHT * imageHeight) / SensorHeight_Pixel;
    const real = (DISTANCE * Object_height) / FOCALLENGTH;
    return real / 1000;
  };
  const real_object_width = () => {
    const Object_width = (SENSORWIDTH * imageWidth) / SensorWidth_Pixel;
    const real = (DISTANCE * Object_width) / FOCALLENGTH;
    return real / 1000;
  };
  // useEffect(() => {
  //   fetch(urls,{

  //   })
  //     .then((response) => response.json())
  //     .then((json) => setData(json.movies))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);
  const cropImage = () => {
    Images.openCropper({
      path: image,
    }).then((img) => {
      //   this.setState({
      //     fileUri: image.path,
      //   });
      setState(img.path);
      setDefectHeight(img.height);
      setDefectWidth(img.width);
      console.log(image);
    });
  };
  const real_defect_height = () => {
    const height = (SENSORHEIGHT * imageJsonH) / SensorHeight_Pixel;
    const real = (DISTANCE * height) / FOCALLENGTH;
    return real / 1000;
  };
  const real_defect_width = () => {
    const height = (SENSORWIDTH * imageJsonW) / SensorWidth_Pixel;
    const real = (DISTANCE * height) / FOCALLENGTH;
    return real / 1000;
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.text}> Image</Text>
        {/* <Image source={{uri: getApi}} style={styles.images} /> */}
        <Text style={styles.text}>Orginal Image</Text>
        <Image source={{uri: image}} style={styles.images} />
        <Text style={styles.text}>
          Зургийн бодит өндөр : {real_object_heigth()} ( m )
        </Text>
        <Text style={styles.text}>
          Зургийн бодит өргөн : {real_object_width()} (m)
        </Text>
        <Text style={styles.text}>
          {' '}
          Камернаас обьект хүртэлх зай : {DISTANCE / 1000} (m){' '}
        </Text>
      </View>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.btn} onPress={cropImage}>
          <Text style={{color: 'white'}}>Cэв салгах</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.btn}>
          <Text style={{color: 'white'}}>Sew salgah</Text>
        </TouchableOpacity> */}
        <Text style={styles.text}>Сэвний зураг</Text>
        <Image source={{uri: state}} style={styles.images} />
        <Text style={styles.text}>
          {' '}
          Сэвний бодит өндөр: {real_defect_height()} (m){' '}
        </Text>
        <Text style={styles.text}>
          {' '}
          Сэвний бодит өргөн: {real_defect_width()} (m){' '}
        </Text>
      </View>
    </ScrollView>
  );
};
export default Measure;
const styles = StyleSheet.create({
  images: {
    width: 300,
    height: 300,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  btn: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginVertical: 20,
  },
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    // justifyContent: 'space-around',
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 15,
  },
});
