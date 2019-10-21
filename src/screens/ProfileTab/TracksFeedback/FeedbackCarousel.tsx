import React, { createRef } from 'react'
import { ViewStyle } from 'react-native'
import * as Animated from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
import { parseISO, formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import { TrackComment } from 'src/apollo'
import { TextBase, Image } from 'src/components'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const CommentText = styled(props => <TextBase {...props} />)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const ArrowButtonsWrapper = styled.View`
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.inputBorder};
  align-self: center;
  flex-direction: row;
  margin-top: 16px;
`

const ArrowButtonsDivider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`

const ArrowButton = styled.TouchableOpacity.attrs(() => ({
  hitSlop: styles.HIT_SLOP,
}))`
  ${({ disabled }) => disabled && `opacity: 0.6;`}
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textMain,
  size: 24,
}))`
  top: 1px;
`

const Avatar = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`

const UserNameText = styled(props => <TextBase {...props} />)`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.bold};
  flex: 1;
  padding-horizontal: 16px;
`

const DateText = styled(props => <TextBase {...props} />)`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textGray};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

interface Props {
  comments: TrackComment[]
  style?: ViewStyle
}

interface State {
  currentPage: number
}

class FeedbackCarousel extends React.Component<Props, State> {
  state: State = {
    currentPage: 0,
  }

  private animatedView = createRef<Animated.View>()

  private openPage = async (page: number): Promise<void> => {
    // блять, ts не поддерживает ?.
    // не хочу использовать L.get так как придется типизировать
    if (
      this.animatedView &&
      this.animatedView.current &&
      this.animatedView.current.fadeOut
    ) {
      await this.animatedView.current.fadeOut(300)
    }
    this.setState({ currentPage: page }, () => {
      if (
        this.animatedView &&
        this.animatedView.current &&
        this.animatedView.current.fadeIn
      ) {
        this.animatedView.current.fadeIn(300)
      }
    })
  }

  private nextPage = (): void => {
    const { currentPage } = this.state
    this.openPage(currentPage + 1)
  }

  private previousPage = (): void => {
    const { currentPage } = this.state
    this.openPage(currentPage - 1)
  }

  private formatCreatedAtDate = (createdAt: string): string => {
    const parsed = parseISO(createdAt)
    const newFormat = formatRelative(parsed, Date.now(), { locale: ru })
    return newFormat
  }

  render() {
    const { comments, style } = this.props
    const { currentPage } = this.state
    if (!comments.length) {
      return null
    }
    const {
      comment,
      createdAt,
      createdBy: { userName, avatar },
    } = comments[currentPage]
    return (
      <Wrapper style={style}>
        <Animated.View useNativeDriver ref={this.animatedView}>
          <Row>
            <Avatar source={{ uri: avatar[0].imageUrl }} />
            <UserNameText>{userName}</UserNameText>
            <DateText>{this.formatCreatedAtDate(createdAt)}</DateText>
          </Row>
          <CommentText>{comment}</CommentText>
        </Animated.View>
        <ArrowButtonsWrapper>
          <ArrowButton disabled={currentPage === 0} onPress={this.previousPage}>
            <StyledIcon name="arrowleft" />
          </ArrowButton>
          <ArrowButtonsDivider />
          <ArrowButton
            disabled={currentPage === comments.length - 1}
            onPress={this.nextPage}
          >
            <StyledIcon name="arrowright" />
          </ArrowButton>
        </ArrowButtonsWrapper>
      </Wrapper>
    )
  }
}

export default FeedbackCarousel
