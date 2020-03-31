// Типы обявлены с их алиасами (в комментах), поэтому не забывай их добавлять в запросы.
// алиасы добавлены, потому что мне не нравятся названия переменных с бэка
export interface Genre {
  id: number
  title: string // name
  imageUrl: string // image
  isFavorite: boolean // userFavourite
  hasSubGenres: boolean // haveSubGenres
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
  album: Album
  uploadedBy: User
  group?: MusicGroup // musicGroup
  singer: string
  date: string // trackDate
  songText: string
  fileUrl: string // filename
  isFavorite: boolean // userFavourite
  favouritesCount: number
  userPlayLists: Collection[] // не знаю что это
  musicWave: number[]
  cover: Image[]
  comments: TrackComment[]
  length?: number
  isMine: boolean // my
  commentedByMe: boolean
}

export interface TrackComment {
  id: number
  comment: string
  createdBy: User // user
  createdAt: string
  estimation: number
}

export interface Album {
  id: number
  title: string
  genres: Genre[]
  createdBy: User // user
  author: string
  year: string
  cover: Image[]
  group: MusicGroup // musicGroup
  isFavorite: boolean // userFavourite
  favouritesCount: number
  isMine: boolean // my
  tracksCount: number
  tracksTime: number
}

export interface FavouriteBase {
  id: number
  userId: number
  createdAt: string
}

export interface FavouriteTrack extends FavouriteBase {
  track: Track
}

export interface FavouriteAlbum extends FavouriteBase {
  album: Album
}

export interface FavouriteLifehack extends FavouriteBase {
  lifehack: Lifehack
}

export type Playlist = Track[]

export enum NoAvatarSizeNames {
  S_32 = 'size_32x32',
  S_40 = 'size_40x40',
  S_48 = 'size_48x48',
  S_56 = 'size_56x56',
  S_104 = 'size_104x104',
  S_120 = 'size_120x120',
  S_150 = 'size_150x150',
  S_160 = 'size_160x160',
  S_235 = 'size_235x235',
  S_290 = 'size_290x290',
  S_300 = 'size_300x300',
  S_800 = 'size_800x800',
}

export enum AvatarSizeNames {
  S_56 = 'size_56x56',
  S_72 = 'size_72x72',
  S_235 = 'size_235x235',
}

export type ImageSizeNames = NoAvatarSizeNames | AvatarSizeNames

export interface Image {
  sizeName: ImageSizeNames // size
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
  image: Image[]
  tracks: Playlist
  user: User
  isFavorite: boolean // userFavourite
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
  musicGroups: MusicGroup[] | null
  followersCount: number
  location: City | null
  avatar: Image[]
  favouriteGenres: Genre[] | null
  roles: Role[]
  careerStartDate: string // careerStart
  description: string | null
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

interface Favorite {
  id: number
  userId: number
  createdAt: string
}

export interface FacoriteTrack extends Favorite {
  track: Track
}

export interface FacoriteAlbum extends Favorite {
  album: Album
}

export interface FacoriteCollection extends Favorite {
  collection: Collection
}

export interface Lifehack {
  id: number
  title: string
  image: Image[]
  hasFavorite: boolean
  hasLike: boolean
  countLike: number
  isBookmarked: boolean
}
