// Типы обявлены с их алиасами (в комментах), поэтому не забывай их добавлять в запросы.
// алиасы добавлены, потому что мне не нравятся названия переменных с бэка
export interface Genre {
  id: number
  title: string // name
  imageUrl: string // image
  isFavourite: boolean // userFavourite
  countTracks: number
  countListenedByUser?: number
}

export type SocialType =
  | 'facebook'
  | 'vkontakte'
  | 'instagram'
  | 'odnoklassniki'

export interface SocialConnect {
  url: string // link
  type: SocialType // social_type
  isLinked: boolean // connected
}

export interface Track {
  id: number
  title: string // trackName
  genres: Genre[]
  album: any // TODO: добавить Album
  uploadedBy: any // user TODO: добавить User
  group: any // musucGroup TODO: добавить MusicGroup
  singer: string
  date: string // trackDate
  songText: string
  fileUrl: string // filename
  isFavourite: boolean // userFavourite
  favouritesCount: number
  userPlayLists: any // не знаю что это  TODO: добавить Collection[]
  musicWave: number[]
  cover: any // TODO: добавить ImageSizesType[]
  comments: any // TODO: добавить CommentTrack[]
  length?: number
  isMine: boolean // my
  commentedByMe: boolean
}
