# DIGICO #

## Android fixes ##

### Навигация ###  

[rn-video 4.2.0+ issue](https://github.com/react-native-community/react-native-video/issues/1417)

[issue](https://github.com/wix/react-native-navigation/issues/4524)
>/node_modules/react-native-navigation/lib/android/app/build.gradle  

заменить  
>implementation 'com.android.support:design:26.1.0'  
>implementation 'com.android.support:appcompat-v7:26.1.0'  

на  
>implementation 'com.android.support:design:27.1.1'  
>implementation 'com.android.support:appcompat-v7:27.1.1'
