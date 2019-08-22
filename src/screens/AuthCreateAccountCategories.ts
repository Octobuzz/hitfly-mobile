import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { profileSelectors, requestLogIn } from '../redux/profile'
import { Navigator } from '../navigation'
import Button from '../components/Button'
import CategoryItem from '../components/CategoryItem'
import Wrapper from '../containers/Wrapper'
import { colors, sizes, style, images } from '../constants'

class AuthCreateAccountCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'some@email.com',
      password: '12345',
      categories: [
        {
          label: 'Рок',
          image: images.TEMP_CATEGORY_1,
          selected: true,
        },
        {
          label: 'Джаз',
          image: images.TEMP_CATEGORY_2,
          selected: false,
        },
        {
          label: 'Альтернатива',
          image: images.TEMP_CATEGORY_3,
          selected: false,
        },
        {
          label: 'Метал',
          image: images.TEMP_CATEGORY_4,
          selected: true,
        },
        {
          label: 'Классика',
          image: images.TEMP_CATEGORY_5,
          selected: false,
        },
        {
          label: 'Поп',
          image: images.TEMP_CATEGORY_6,
          selected: false,
        },
        {
          label: 'Регги',
          image: images.TEMP_CATEGORY_7,
          selected: false,
        },
        {
          label: 'R&B',
          image: images.TEMP_CATEGORY_8,
          selected: false,
        },
      ],
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userName && this.props.userName) {
      Navigator.startTabBasedApp()
    }
  }

  _onPressComplete = () => {
    this.props.requestLogIn('Some User Name')
  }

  _getListData = () => {
    const { categories } = this.state
    let result = []
    categories.forEach((item, index) => {
      if (!(index % 2)) {
        result.push({ left: { ...item, index } })
      } else {
        result[result.length - 1].right = { ...item, index }
      }
    })
    return result
  }

  _renderListItem = ({ index, item }) => {
    const categorySize = (sizes.WINDOW_WIDTH - 16 * 3) / 2
    return (
      <View style={styles.itemsRow}>
        {item.left && (
          <CategoryItem
            image={item.left.image}
            label={item.left.label}
            size={categorySize}
            onPress={() => this._onPressItem(item.left.index)}
            selected={item.left.selected}
            selectable
          />
        )}
        {item.right && (
          <CategoryItem
            image={item.right.image}
            label={item.right.label}
            size={categorySize}
            onPress={() => this._onPressItem(item.right.index)}
            selected={item.right.selected}
            selectable
          />
        )}
      </View>
    )
  }

  _onPressItem = index => {
    let categories = this.state.categories.slice(0)
    categories[index].selected = !categories[index].selected
    this.setState({
      categories,
    })
  }

  _keyExtractor = (item, index) => {
    return `item_${item.id || index}`
  }

  render() {
    return (
      <Wrapper style={styles.wrapper} isFetching={this.props.isFetching}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.description}>
              Отметьте жанры, которые вам больше всего нравятся
            </Text>
          }
          data={this._getListData()}
          renderItem={this._renderListItem}
          contentContainerStyle={styles.listContainer}
          keyExtractor={this._keyExtractor}
        />
        <Button
          type={Button.types.BUTTON_DEFAULT}
          label="Готово"
          styleWrapper={styles.roundedButtonWrapper}
          onPress={this._onPressComplete}
        />
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 128,
    paddingHorizontal: 16,
  },
  roundedButtonWrapper: {
    width: sizes.WINDOW_WIDTH,
    position: 'absolute',
    bottom: 64,
    marginVertical: sizes.CORRECT_PIXEL_RATIO_SIZE(12),
  },
  description: {
    ...style.text.regular,
    fontSize: 16,
    lineHeight: 20,
    color: colors.GRAY_LABEL,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 24,
  },
  itemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

AuthCreateAccountCategories.propTypes = {
  requestLogIn: PropTypes.func,
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
}

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
  isFetching: profileSelectors.getIsFetching,
})

const mapDispatchToProps = {
  requestLogIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthCreateAccountCategories)
