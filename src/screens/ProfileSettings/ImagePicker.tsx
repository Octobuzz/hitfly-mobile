// Import React
import React, { useState } from 'react'
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const App = () => {
  const [filePath, setFilePath] = useState({})

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        )
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    } else return true
  }

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        )
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        alert('Write permission err', err)
      }
      return false
    } else return true
  }

  // const captureImage = async type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   }
  //   let isCameraPermitted = await requestCameraPermission()
  //   let isStoragePermitted = await requestExternalWritePermission()
  //   if (isCameraPermitted && isStoragePermitted) {
  //     launchCamera(options, response => {
  //       console.log('Response = ', response)
  //
  //       if (response.didCancel) {
  //         alert('User cancelled camera picker')
  //         return
  //       } else if (response.errorCode == 'camera_unavailable') {
  //         alert('Camera not available on device')
  //         return
  //       } else if (response.errorCode == 'permission') {
  //         alert('Permission not satisfied')
  //         return
  //       } else if (response.errorCode == 'others') {
  //         alert(response.errorMessage)
  //         return
  //       }
  //       console.log('base64 -> ', response.base64)
  //       console.log('uri -> ', response.uri)
  //       console.log('width -> ', response.width)
  //       console.log('height -> ', response.height)
  //       console.log('fileSize -> ', response.fileSize)
  //       console.log('type -> ', response.type)
  //       console.log('fileName -> ', response.fileName)
  //       setFilePath(response)
  //     })
  //   }
  // }

  // Обработка пути для ios - reference
  // https://github.com/wkh237/react-native-fetch-blob/wiki/File-System-Access-API#readfilepath-encodingpromise
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    }
    launchImageLibrary(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        alert('Пользователь отменил выбор изображения')
        return
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Камера не доступна для устройства')
        return
      } else if (response.errorCode == 'permission') {
        alert('Нет разрешения на использование камеры')
        return
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage)
        return
      }
      // debugger

      // let filePath
      // // fileUri is a string like "file:///var/mobile/Containers/Data/Application/9B754FAA-2588-4FEC-B0F7-6D890B7B4681/Documents/filename"
      // if (Platform.OS === 'ios') {
      //   let arr = response.uri.split('/')
      //   const dirs = RNFetchBlob.fs.dirs
      //   filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`
      // } else {
      //   filePath = audioDataUri
      // }
      //
      // RNFetchBlob.fs.readFile(response.uri, 'base64').then(data => {
      //   // handle the data ..
      // })
      // console.log('base64 -> ', response.base64)
      // console.log('uri -> ', response.uri)
      // console.log('width -> ', response.width)
      // console.log('height -> ', response.height)
      // console.log('fileSize -> ', response.fileSize)
      // console.log('type -> ', response.type)
      // console.log('fileName -> ', response.fileName)
      // setFilePath(response)
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        <Image source={{ uri: filePath.uri }} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        {/*<TouchableOpacity*/}
        {/*  activeOpacity={0.5}*/}
        {/*  style={styles.buttonStyle}*/}
        {/*  onPress={() => captureImage('photo')}*/}
        {/*>*/}
        {/*  <Text style={styles.textStyle}>Launch Camera for Image</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity*/}
        {/*  activeOpacity={0.5}*/}
        {/*  style={styles.buttonStyle}*/}
        {/*  onPress={() => captureImage('video')}*/}
        {/*>*/}
        {/*  <Text style={styles.textStyle}>Launch Camera for Video</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}
        >
          <Text style={styles.textStyle}>Выберите фото</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  activeOpacity={0.5}*/}
        {/*  style={styles.buttonStyle}*/}
        {/*  onPress={() => chooseFile('video')}*/}
        {/*>*/}
        {/*  <Text style={styles.textStyle}>Choose Video</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 25,
    height: 25,
    margin: 5,
  },
})
