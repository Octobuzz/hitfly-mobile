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
  userPlayLists: Collection[] // не знаю что это
  musicWave: number[]
  cover: any // TODO: добавить ImageSizesType[]
  comments: any // TODO: добавить CommentTrack[]
  length?: number
  isMine: boolean // my
  commentedByMe: boolean
}

export type Playlist = Track[]

export interface Image {
  sizeName: string // size
  imageUrl: string // url
}

export interface Pagination<T> {
  items: T[] // data
  total: number
  limit: number // per_page
  page: number // current_page
  from: number
  to: number
  pagesCount: number // last_page
  hasMorePages: boolean // has_more_pages
}

export interface Collection {
  id: number
  title: string
  isCreatedByAdmin: boolean // is_admin
  images: Image[] // image
  tracks: Playlist
  user: any // TODO: добавить User
  isFavourite: boolean // userFavourite
  favouritesCount: number
  isSet: boolean
  isMine: boolean // my
  tracksTime: number
  tracksCountInCollection: number // countTracks
  tracksCountInPlaylist: number // tracksCount
}
