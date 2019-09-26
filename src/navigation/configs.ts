import theme from 'src/theme'

export const stackDefaultOptions = {
  headerBackTitle: null,
  headerTintColor: theme.colors.textMain,
  headerTitleStyle: {
    fontFamily: theme.fonts.bold,
    fontWeight: undefined, // убрать дефолтный вес от react-navigation
    fontSize: 18,
  },
}

export const playlistConfig = {
  headerTintColor: theme.colors.white,
  headerTransparent: true,
}
