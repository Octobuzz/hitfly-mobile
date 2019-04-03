import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Navigator, screens } from '../navigation'
import { profileSelectors, requestLogOut } from '../redux/profile'
import { tempMusicSelectors } from '../redux/tempMusic'
import Button from '../components/Button'
import Announcement from '../components/Announcement'
import Wrapper from '../containers/Wrapper'
import Title from '../components/Title'
import Carousel from '../components/Carousel'
import FaceItem from '../components/FaceItem'
import GenreItem from '../components/GenreItem'
import { images, colors } from '../constants'
import { renameKeys } from '../utils/helpers'

const TEMPDATA = [
  {
    label: 'Рок',
    image: images.TEMP_CATEGORY_1,
  },
  {
    label: 'Джаз',
    image: images.TEMP_CATEGORY_2,
  },
  {
    label: 'Альтернатива',
    image: images.TEMP_CATEGORY_3,
  },
  {
    label: 'Метал',
    image: images.TEMP_CATEGORY_4,
  },
  {
    label: 'Классика',
    image: images.TEMP_CATEGORY_5,
  },
  {
    label: 'Поп',
    image: images.TEMP_CATEGORY_6,
  },
  {
    label: 'Регги',
    image: images.TEMP_CATEGORY_7,
  },
  {
    label: 'R&B',
    image: images.TEMP_CATEGORY_8,
  },
  {
    label: 'R&B',
    image: images.TEMP_CATEGORY_8,
  },
]

const TEMPDATA2 = [
  {
    title: 'Рок',
    description: 'Рок',
    image: images.TEMP_CATEGORY_1,
  },
  {
    title: 'Джаз',
    image: images.TEMP_CATEGORY_2,
  },
  {
    description: 'Альтернатива',
    image: images.TEMP_CATEGORY_3,
  },
  {
    title: 'Метал',
    description: 'Метал',
    image: images.TEMP_CATEGORY_4,
  },
]

class TabHome extends Component {
  componentDidMount() {
    Navigator.showPlayerOverlay()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userName && !this.props.userName) {
      Navigator.dismissPlayerOverlay()
      Navigator.startAuthScreen()
    }
  }

  _onPressLogOut = () => {
    this.props.requestLogOut()
  }

  _onPressAlbum = item => {
    if (item[0] && item[0].hasOwnProperty('id')) {
      Navigator.pushWhiteTransparent(this, screens.PLAYLIST, {
        title: `${item[0].title} - ${item[0].description}`,
        albumId: item[0].id,
      })
    }
  }

  render() {
    const albums = R.map(
      renameKeys({ album: 'title', artist: 'description', artwork: 'image' }),
      this.props.albums,
    )

    return (
      <Wrapper
        isFetching={this.props.isFetching}
        scroll
        playerOffset
        style={styles.wrapper}
      >
        <Button
          label="Выйти"
          styleWrapper={styles.roundedButtonWrapper}
          onPress={this._onPressLogOut}
        />
        <Announcement
          title="Битва музыкантов"
          bgcolors={[colors.BLUE]}
          style={styles.item}
          bgimage={images.TEMP_EVENT}
        />
        <Carousel
          horizontal
          header={
            <Title
              title="Рекомендуем"
              description="Плейлисты, собранные специально для тебя"
              style={[styles.paddingHorizontal, styles.marginBottom]}
            />
          }
          RenderComponent={GenreItem}
          data={albums}
          onPress={this._onPressAlbum}
          style={styles.marginTop}
        />
        <Carousel
          horizontal
          header={
            <Title
              title="Горизонтальное"
              style={[styles.paddingHorizontal, styles.marginBottom]}
            />
          }
          row={2}
          data={TEMPDATA}
          style={styles.marginTop}
        />
        <Carousel
          header={<Title title="Вертикальное" style={styles.marginBottom} />}
          style={styles.item}
          data={TEMPDATA}
        />
        <Title
          title="ЗаголовокЗаголовокЗаголовок"
          description="descriptiondescriptiondescription descriptiondescriptiondescription"
          hot
          style={styles.item}
        />
        <Announcement
          title="Заголовок"
          description="description"
          bottom="bottom"
          bgcolors={[colors.BRAND_BLUE, colors.BRAND_PINK]}
          style={styles.item}
          image={{ uri: 'http://img.lenagold.ru/g/gen/gens141.png' }}
        />
        <Announcement
          title="ЗаголовокЗаголовок"
          description="descriptiondescriptiondescription descriptiondescriptiondescription"
          bottom="bottombottombottombottombottom"
          style={styles.item}
        />
        <Carousel
          horizontal
          header={
            <Title
              title="Звездные эксперты"
              style={[styles.paddingHorizontal, styles.marginBottom]}
            />
          }
          RenderComponent={FaceItem}
          data={TEMPDATA2}
          style={styles.marginTop}
        />
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  marginBottom: {
    marginBottom: 8,
  },
  item: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
})

TabHome.propTypes = {
  requestLogOut: PropTypes.func,
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
  albums: PropTypes.array,
}

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
  isFetching: profileSelectors.getIsFetching,
  albums: tempMusicSelectors.getAlbums,
})

const mapDispatchToProps = {
  requestLogOut,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabHome)
