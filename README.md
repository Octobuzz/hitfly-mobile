# DIGICO #

## Android fixes ##

### Навигация ###
[issue](https://github.com/wix/react-native-navigation/issues/4524)
>/node_modules/react-native-navigation/lib/android/app/build.gradle  

заменить  
>implementation 'com.android.support:design:26.1.0'  
>implementation 'com.android.support:appcompat-v7:26.1.0'  

на  
>implementation 'com.android.support:design:27.1.1'  
>implementation 'com.android.support:appcompat-v7:27.1.1'
