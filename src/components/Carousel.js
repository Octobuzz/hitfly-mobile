import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ViewPropTypes, FlatList } from 'react-native'
import { sizes } from '../constants'
import CategoryItem from './CategoryItem'

const MARGIN = 8

/**
 * Карусель жанров
 * @param {object} props
 * @param {object} props.style Стиль для врапера
 * @param {func} props.onPress Функция на нажатие - при отсутсвии компонент перестает быть кликабельным
 * @param {bool} props.disabled Включение/отключение кликабельности
 * @param {object} props.header Компонент заголовка
 * @param {object} props.data Данные
 * @param {bool} props.horizontal Горизонтальная прокрутка
 * @param {number} props.col Количество столбцов
 * @param {number} props.row Количество строк
 * @param {number} props.hmargin Отступы справа и слева для горизонтальной прокрутки
 * @param {component} props.RenderComponent Компонент для рендера
 */
class Carousel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this._setWidth(sizes.WINDOW_WIDTH)
  }

  _keyExtractor = (item, index) => `item_${item.id || index}`

  _renderListItem = ({ item, index }) => {
    const { horizontal, hmargin, RenderComponent } = this.props
    return (
      <View
        onLayout={!horizontal && this._onLayout}
        style={[
          horizontal ? styles.horizontalWraper : styles.verticalWraper,
          horizontal && !index && { marginLeft: hmargin },
          horizontal && { marginRight: MARGIN },
          !horizontal && index && { marginTop: MARGIN },
        ]}
      >
        {item.map((props, index) => (
          <RenderComponent
            {...props}
            key={index}
            size={this.state.size}
            styleWrapper={[
              { marginBottom: 0 },
              horizontal && index && { marginTop: MARGIN },
              !horizontal && index && { marginLeft: MARGIN },
            ]}
          />
        ))}
      </View>
    )
  }

  _onLayout = event => {
    let { width } = event.nativeEvent.layout
    if (this.state.width !== width) this._setWidth(width)
  }

  _setWidth = width => {
    const { horizontal, row, col, hmargin } = this.props
    const number = horizontal ? row : col
    const size =
      (width - MARGIN * (col - 1) - (horizontal && hmargin ? hmargin * 2 : 0)) /
      col
    const data = this.props.data.reduce(
      (rows, value, index) =>
        (index % number === 0
          ? rows.push([value])
          : rows[rows.length - 1].push(value)) && rows,
      [],
    )
    this.setState({
      width,
      size,
      data,
    })
  }

  render() {
    const { style, header, horizontal, hmargin } = this.props
    const { data } = this.state
    const Content = (
      <FlatList
        ListHeaderComponent={!horizontal && header && header}
        data={data && data}
        renderItem={this._renderListItem}
        contentContainerStyle={[
          !horizontal && style && style,
          horizontal && { paddingRight: hmargin - MARGIN },
        ]}
        keyExtractor={this._keyExtractor}
        horizontal={horizontal}
        extraData={this.state}
      />
    )
    if (horizontal) {
      return (
        <View style={[style && style]}>
          {header && header}
          {Content}
        </View>
      )
    } else return Content
  }
}

Carousel.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  data: PropTypes.array.isRequired,
  horizontal: PropTypes.bool.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  hmargin: PropTypes.number.isRequired,
  RenderComponent: PropTypes.func.isRequired,
}

Carousel.defaultProps = {
  data: [],
  horizontal: false,
  col: 2,
  row: 1,
  hmargin: 16,
  RenderComponent: CategoryItem,
}

const styles = StyleSheet.create({
  verticalWraper: {
    flexDirection: 'row',
  },
  horizontalWraper: {
    flexDirection: 'column',
  },
})

export default Carousel
