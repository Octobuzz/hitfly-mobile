import R from 'ramda'
import AsyncStorage from '@react-native-community/async-storage'

export const setItem = (key: string, item: string) =>
  AsyncStorage.setItem(key, JSON.stringify(item))

type DefaultItem = string | number | object | void

export const getItem = (key: string, defaultItem?: DefaultItem): DefaultItem =>
  AsyncStorage.getItem(key)
    .then(JSON.parse)
    .catch(R.always(defaultItem))

export const clearStorage = () => AsyncStorage.clear()

export const removeItem = (key: string) => AsyncStorage.removeItem(key)
