export interface Genre {
  id: number
  title: string
  imageUrl: string
  userFavourite: boolean
  countTracks: number
  countListenedByUser?: number
}

export type SocialType =
  | 'facebook'
  | 'vkontakte'
  | 'instagram'
  | 'odnoklassniki'

export interface SocialConnect {
  url: string
  type: SocialType
  isLinked: boolean
}
