import R from 'ramda'
import AsyncStorage from '@react-native-community/async-storage'

export const setItem = (key: string, item: string) =>
  AsyncStorage.setItem(key, JSON.stringify(item))

type DefaultItem = string | number | object | void

export const getItem = async (
  key: string,
  defaultItem?: DefaultItem,
): Promise<DefaultItem> => {
  try {
    const item = await AsyncStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
  } catch {
    return defaultItem
  }
}

export const clearStorage = () => AsyncStorage.clear()

export const removeItem = (key: string) => AsyncStorage.removeItem(key)

export default AsyncStorage
