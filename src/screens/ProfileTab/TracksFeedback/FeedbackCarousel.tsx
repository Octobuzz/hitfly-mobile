import React, { createRef } from 'react'
import Animated from 'react-native-animatable'
import { TrackComment } from 'src/apollo'
import Icon from 'react-native-vector-icons/AntDesign'
import styled from 'src/styled-components'
import { TextBase } from 'src/components'

const Wrapper = styled.View``

const CommentText = styled(TextBase)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const ArrowButtonsWrapper = styled.View`
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.inputBorder};
  align-self: center;
`

const ArrowButtonsDivider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`

const ArrowButton = styled.TouchableOpacity.attrs(() => ({
  hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
}))`
  ${({ disabled }) => disabled && `opacity: 0.6;`}
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textMain,
  size: 24,
}))``

interface Props {
  comments: TrackComment[]
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
    this.setState({ currentPage: page }, async () => {
      if (
        this.animatedView &&
        this.animatedView.current &&
        this.animatedView.current.fadeIn
      ) {
        await this.animatedView.current.fadeIn(300)
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

  render() {
    const { comments } = this.props
    const { currentPage } = this.state
    return (
      <Wrapper>
        <Animated.View ref={this.animatedView}>
          <CommentText>{comments[currentPage]}</CommentText>
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
