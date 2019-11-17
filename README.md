# package.json в src/package.json

это нужно для абсолютных путей (src/\*\*/\*\* - из любого файла), не удалять

# MacOS Catalina!

Возникли проблемы с Ruby и некоторыми плагинами fastlane
после установки провекта запустить команду:
<code>bundle install --path vendor/bundle</code>

# Forks

## react-native-vector-icons

проблема в тестировании с jest, отписал сюда https://github.com/oblador/react-native-vector-icons/issues/1046
когда решат проблему - вернуть обратно

## react-native-track-player

добавил метод для инициализации очереди _initQueue_
