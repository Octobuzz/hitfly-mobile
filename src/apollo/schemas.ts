export interface Genre {
  id: number
  title: string
  imageUrl: string
  userFavourite: boolean
  countTracks: number
  countListenedByUser?: number
}
