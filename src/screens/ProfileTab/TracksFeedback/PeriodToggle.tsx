import React, { useCallback } from 'react'
import { FeedbackPeriod } from './TracksFeedback'
import LinearGradient from 'react-native-linear-gradient'
import { TextBase } from 'src/components'
import styled from 'src/styled-components'
import { images } from 'src/constants'

const ButtonWrapper = styled.TouchableOpacity``

const Text = styled(TextBase)<Selectable>`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.textMain : theme.colors.textGray};
  text-align: center;
  font-size: 12px;
  line-height: 11px;
`

const CalendarIcon = styled.Image.attrs(() => ({
  source: images.CALENDAR,
}))<Selectable>`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  bottom: 1px;
  tint-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.textMain : theme.colors.textGray};
`

const Gradient = styled(LinearGradient).attrs(
  // @ts-ignore
  ({ theme, isSelected }) => ({
    colors: isSelected
      ? [theme.colors.brandBlue, theme.colors.brandPink]
      : [theme.colors.inputBorder, theme.colors.inputBorder],
  }),
)<Selectable>`
  border-radius: 20px;
`

const TextWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 11px 13px;
  border-radius: 20px;
  margin: 1px;
`

interface Selectable {
  isSelected: boolean
}

interface ToggleButtonProps extends Selectable {
  title: string
  period: FeedbackPeriod
  onPress: (period: FeedbackPeriod) => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  title,
  period,
  onPress,
  isSelected,
}) => {
  const selectPeriod = useCallback(() => {
    onPress(period)
  }, [period, title, onPress])
  return (
    <ButtonWrapper onPress={selectPeriod}>
      <Gradient isSelected={isSelected}>
        <TextWrapper>
          <CalendarIcon isSelected={isSelected} />
          <Text isSelected={isSelected}>{title}</Text>
        </TextWrapper>
      </Gradient>
    </ButtonWrapper>
  )
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
`

interface Period {
  title: string
  period: FeedbackPeriod
}

const periods: Period[] = [
  {
    title: 'За неделю',
    period: 'week',
  },
  {
    title: 'За месяц',
    period: 'month',
  },
  {
    title: 'За год',
    period: 'year',
  },
]

interface Props {
  currentPeriod: FeedbackPeriod
  onPress: (period: FeedbackPeriod) => void
}

const PeriodToggle: React.FC<Props> = ({ currentPeriod, onPress }) => {
  const renderButton = useCallback(
    ({ period, title }: Period): JSX.Element => (
      <ToggleButton
        onPress={onPress}
        isSelected={period === currentPeriod}
        key={period}
        title={title}
        period={period}
      />
    ),
    [currentPeriod, onPress],
  )

  return <Wrapper>{periods.map(renderButton)}</Wrapper>
}

export default PeriodToggle
