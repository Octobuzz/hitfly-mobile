export type CollectionsType = 'recommended' | 'musicFan'

export type HeaderMode = 'light' | 'dark'

export type NavigationState = 'main' | 'profile'

export interface HeaderSettings {
  mode: HeaderMode
  state: NavigationState
}
