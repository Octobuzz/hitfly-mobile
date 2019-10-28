import AsyncStorage from '@react-native-community/async-storage'

type Item = string | number | object | boolean

type DefaultItem = Item | Item[] | void

export const setItem = (key: string, item: Item | Item[]) =>
  AsyncStorage.setItem(key, JSON.stringify(item))

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
