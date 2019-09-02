import theme from 'src/theme'

export const stackConfig = {
  defaultNavigationOptions: {
    headerBackTitle: null,
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerTintColor: theme.colors.textMain,
    headerTitleStyle: {
      fontFamily: theme.fonts.bold,
      fontWeight: undefined, // убрать дефолтный вес от react-navigation
      fontSize: 18,
    },
  },
}
