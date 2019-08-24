import R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet /*, Text, View*/ } from 'react-native'
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
// import CustomSwiper from '../components/CustomSwiper'
import { images, colors, sizes, style } from '../constants'
import { renameKeys, generateUID } from '../utils/helpers'

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
]

const TEMP_EXPERTS = [
  {
    title: 'Юлианна Караулова',
    description: 'Певица',
    image: images.TEMP_EXPERT_JULIA,
  },
  {
    title: 'Стас Михайлов',
    description: 'Певец',
    image: images.TEMP_EXPERT_MIHAILOV,
  },
  {
    title: 'Сплин',
    description: 'Группа',
    image: images.TEMP_EXPERT_SPLIN,
  },
]

class TabHome extends Component {
  playerScreenId = generateUID()

  componentDidMount() {
    Navigator.showOverlay(screens.PLAYER, this.playerScreenId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userName && !this.props.userName) {
      Navigator.dismissOverlay({
        screen: screens.PLAYER,
        screenId: this.playerScreenId,
      })
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
    // const swiperWidth = sizes.WINDOW_WIDTH - 32
    // const swiperHeight = 400

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
          styleWrapper={styles.item}
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
        <Announcement
          title="Топ 20"
          description="Лучшие музыканты в одном месте"
          bottom="3 часа 43 минуты"
          bgcolors={['#FE6C6D', '#FFA469']}
          styleWrapper={styles.item}
          image={images.TEMP_DANCE_GIRL}
          imageSize={{ width: 125, height: 204 }}
        />
        <Carousel
          horizontal
          header={
            <Title
              title="Новые релизы"
              style={[styles.paddingHorizontal, styles.marginBottom]}
            />
          }
          RenderComponent={GenreItem}
          data={albums}
          onPress={this._onPressAlbum}
          style={styles.marginTop}
        />
        <Announcement
          title="Сейчас слушают"
          description="Обновлен вчера"
          bottom="127 песен"
          bgcolors={['#E3C8BD', '#6B76A7']}
          styleWrapper={styles.item}
          image={images.TEMP_GUITAR_GIRL}
          imageSize={{ width: 180, height: 184 }}
        />
        <Carousel
          horizontal
          header={
            <Title
              title="Супер меломан"
              description="«Русская рулетка» треков"
              hot
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
              title="Жанры"
              style={[styles.paddingHorizontal, styles.marginBottom]}
            />
          }
          row={2}
          data={TEMPDATA}
          style={styles.marginTop}
        />
        {/* <Carousel
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
          styleWrapper={styles.item}
          image={{ uri: 'http://img.lenagold.ru/g/gen/gens141.png' }}
        />
        <Announcement
          title="ЗаголовокЗаголовок"
          description="descriptiondescriptiondescription descriptiondescriptiondescription"
          bottom="bottombottombottombottombottom"
          styleWrapper={styles.item}
        /> */}
        <Carousel
          horizontal
          header={
            <Title
              title="Звездные эксперты"
              style={[styles.paddingHorizontal, styles.marginBottom]}
            />
          }
          RenderComponent={FaceItem}
          data={TEMP_EXPERTS}
          style={styles.marginTop}
        />
        {/* <Text style={styles.swiperTitle}>Последние отзывы</Text> */}
        {/* <CustomSwiper
          styleWrapper={{
            backgroundColor: '#f0f',
            width: swiperWidth,
            height: swiperHeight,
          }}
          width={swiperWidth}
          height={swiperHeight}
          onTouchStart={this.props.handleSwiperTouchStart}
          onTouchEnd={this.props.handleSwiperTouchEnd}
          loop={false}
        >
          <View
            style={{
              backgroundColor: colors.GRAY_LABEL,
              width: swiperWidth,
              height: swiperHeight,
            }}
          />
          <View
            style={{
              backgroundColor: colors.GRAY_LABEL,
              width: swiperWidth,
              height: swiperHeight,
            }}
          />
          <View
            style={{
              backgroundColor: colors.GRAY_LABEL,
              width: swiperWidth,
              height: swiperHeight,
            }}
          />
          <View
            style={{
              backgroundColor: colors.GRAY_LABEL,
              width: swiperWidth,
              height: swiperHeight,
            }}
          />
        </CustomSwiper> */}
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
  horizontalItem: {
    width: sizes.WINDOW_WIDTH - 32,
  },
  swiperTitle: {
    ...style.text.bold,
    fontSize: 16,
    lineHeight: 18,
    padding: 16,
  },
})

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
