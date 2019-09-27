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

export interface MusicGroup {
  id: number
  title: string // name
  cover: Image[] // avatarGroup
  careerStartYear: string
  genres: Genre[]
  createdBy: User
  description: string
  location: City
  followersCount: number
  activeMembers: User[]
  socialLinks: any // TODO: добавить SocialLinks[]
  isMeCreator: boolean // isCreator
  isWatching: boolean // iWatch
}

export interface Track {
  id: number
  title: string // trackName
  genres: Genre[]
  album: any // TODO: добавить Album
  uploadedBy: User
  group?: MusicGroup // musicGroup
  singer: string
  date: string // trackDate
  songText: string
  fileUrl: string // filename
  isFavourite: boolean // userFavourite
  favouritesCount: number
  userPlayLists: Collection[] // не знаю что это
  musicWave: number[]
  cover: Image[]
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

export interface PaginationVariables {
  page?: number
  limit?: number
}

export interface Collection {
  id: number
  title: string
  isCreatedByAdmin: boolean // is_admin
  images: Image[] // image
  tracks: Playlist
  user: User
  isFavourite: boolean // userFavourite
  favouritesCount: number | null
  isSet: boolean
  isMine: boolean // my
  tracksTime: number
  tracksCountInCollection: number // countTracks
  tracksCountInPlaylist: number // tracksCount
}

export type Gender = 'M' | 'F'

export interface City {
  id: number
  title: string
  region: string // area_region
}

export interface Role {
  title: string
  slug: string
}

export interface User {
  id: number
  userName: string // username
  registrationDate: string // dateRegister
  gender: Gender
  musicGroups: MusicGroup[]
  followersCount: number
  location: City | null
  avatar: Image[]
  favouriteGenres: Genre[] | null
  roles: Role[]
  careerStartDate: string // careerStart
  description: string
  playsInGenres: Genre[] // genresPlay
  daysInBonusProgram: number // bpDaysInProgram
  isSubscribed: boolean // iWatch
  favouritesTracksCount: number // favouritesTrackCount
  favouritesTracksTime: number // favouritesTrackTime
  listenedCount: number // countListenedTracks
}

export enum BonusProgramLevel {
  LEVEL_NOVICE = 'LEVEL_NOVICE',
  LEVEL_AMATEUR = 'LEVEL_AMATEUR',
  LEVEL_CONNOISSEUR_OF_THE_GENRE = 'LEVEL_CONNOISSEUR_OF_THE_GENRE',
  LEVEL_SUPER_MUSIC_LOVER = 'LEVEL_SUPER_MUSIC_LOVER',
}

export interface Profile extends User {
  email: string
  accessToken: string
  bonusProgramLevel: BonusProgramLevel // bpLevelBonusProgram
  bonusProgramPoints: number // bpPoints
  bonusProgramListenedGenres: Genre[] // bpListenedTracksByGenres
  myTracksCount: number
  myTracksTime: number
}
