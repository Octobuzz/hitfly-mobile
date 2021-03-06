const jestPreset = require('@testing-library/react-native/jest-preset')

module.exports = {
  preset: '@testing-library/react-native',
  setupFiles: jestPreset.setupFiles,
  setupFilesAfterEnv: ['./jest/setup.js'],
  testEnvironment: 'jsdom',
  cacheDirectory: './jest/cache',
  coverageDirectory: './jest/coverage',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      babelConfig: 'babel.config.js',
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native-track-player|react-native-platform-touchable|react-native-webview|react-native-render-html|react-native-gesture-handler|react-native-screens|react-navigation-.*|react-navigation|@react-navigation/.*|react-native-splash-screen|rn-sliding-up-panel|@react-native-community|react-native|react-native-fast-image|react-native-svg|react-native-iphone-x-helper|react-native-keyboard-aware-scroll-view|react-native-material-textfield|react-native-collapsible|react-native-vector-icons|react-native-modal-datetime-picker|react-native-modal|react-native-animatable|react-native-linear-gradient)/)',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'Slider.tsx',
    'src/apollo',
    'src/globalRefs',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
}
