export type CollectionsType = 'recommended' | 'musicFan'

export type HeaderMode = 'light' | 'dark'

export type NavigationState = 'main' | 'profile' | 'auth'

export interface HeaderSettings {
  mode: HeaderMode
  state: NavigationState
}
