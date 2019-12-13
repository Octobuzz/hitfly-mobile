import AsyncStorage from '@react-native-community/async-storage'
import { storageKeys } from 'src/constants'

type Item = string | number | object | boolean

let token = ''
export const getToken = async (): Promise<string> => {
  if (!token) {
    token = (await AsyncStorage.getItem(storageKeys.AUTH_TOKEN)) as string
  }
  return token
}

export const setToken = async (newToken: string): Promise<void> => {
  token = newToken
  AsyncStorage.setItem(storageKeys.AUTH_TOKEN, newToken)
}

export const setItem = (key: string, item: Item | Item[]) =>
  AsyncStorage.setItem(key, JSON.stringify(item))

export const getItem = async <T>(
  key: string,
  defaultItem?: T,
): Promise<T | undefined> => {
  try {
    const item = await AsyncStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    } else {
      return defaultItem
    }
  } catch {
    return defaultItem
  }
}

export const clearStorage = () => AsyncStorage.clear()

export const removeItem = (key: string) => AsyncStorage.removeItem(key)

export default AsyncStorage
