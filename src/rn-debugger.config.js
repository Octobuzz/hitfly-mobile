/* tslint:disable */
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
global.FormData = global.originalFormData || global.FormData

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false
} else {
  global.Blob = global.originalBlob || global.Blob
  global.FileReader = global.originalFileReader || global.FileReader
}
//https://github.com/jhen0409/react-native-debugger/issues/365
global.Blob = null
