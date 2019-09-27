import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { storageInstance } from 'src/utils'

export default async (): Promise<InMemoryCache> => {
  const cache = new InMemoryCache({
    freezeResults: true,
  })

  await persistCache({
    cache,
    debug: __DEV__,
    // @ts-ignore
    storage: storageInstance,
  })

  cache.writeData({
    data: {
      headerSettings: {
        mode: 'dark',
        state: 'main',
        __typename: 'HeaderSettings',
      },
    },
  })

  return cache
}
