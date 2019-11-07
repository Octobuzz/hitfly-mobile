import React from 'react'
// import { Linking } from 'react-native'
import { helpers } from 'src/utils'
import { Profile } from 'src/apollo'
import { H2, /* Link, */ TextBase } from 'src/components'
import Block from './Block'
import { images /* names */ } from 'src/constants'
import styled from 'src/styled-components'

const TitleText = styled(H2)`
  margin-bottom: 3px;
`

const Row = styled.View`
  flex-direction: row;
  margin-top: 11px;
  margin-bottom: 11px;
`

const Column = styled.View`
  padding: 16px 8px;
  align-items: center;
  flex: 1;
`

const ColumnImage = styled.Image``

const ColumnText = styled(TextBase)`
  font-size: 12px;
  margin-top: 14px;
  text-align: center;
`

const Divider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`

interface Props
  extends Pick<
    Profile,
    | 'bonusProgramLevel'
    | 'bonusProgramPoints'
    | 'daysInBonusProgram'
    | 'favouritesTracksCount'
  > {}

class BonusProgram extends React.PureComponent<Props> {
  private getNameForPoints = helpers.getNameForCount({
    nominative: 'балл',
    genitive: 'балла',
    genitiveMultiple: 'баллов',
  })
  private getNameForDays = helpers.getNameForCount({
    nominative: 'день',
    genitive: 'дня',
    genitiveMultiple: 'дней',
  })
  private getNameForSongs = helpers.getNameForCount({
    nominative: 'любимая песня',
    genitive: 'любимые песни',
    genitiveMultiple: 'любимых песен',
  })

  // Временно убираем, пока не решим что делать дальше
  // private openBonusProgramLink = (): void => {
  //   Linking.openURL(`${names.DOMAIN_URL}/bonus-program`)
  // }

  render() {
    const {
      bonusProgramLevel,
      bonusProgramPoints,
      daysInBonusProgram,
      favouritesTracksCount,
    } = this.props
    return (
      <Block>
        <TitleText>
          {helpers.getBonusProgramLevelHumanReadable(bonusProgramLevel)}
        </TitleText>

        <Row>
          <Column>
            <ColumnImage source={images.RING} />
            <ColumnText>
              {`${bonusProgramPoints} ${this.getNameForPoints(
                bonusProgramPoints,
              )}`}
            </ColumnText>
          </Column>
          <Divider />
          <Column>
            <ColumnImage source={images.CALENDAR} />
            <ColumnText>
              {`${daysInBonusProgram} ${this.getNameForDays(
                daysInBonusProgram,
              )} в Hitfly`}
            </ColumnText>
          </Column>
          <Divider />
          <Column>
            <ColumnImage source={images.HEART_MUSIC} />
            <ColumnText>
              {`${favouritesTracksCount} ${this.getNameForSongs(
                favouritesTracksCount,
              )}`}
            </ColumnText>
          </Column>
        </Row>

        {/* Временно убираем, пока не решим что делать дальше */}
        {/* <Link
          onPress={this.openBonusProgramLink}
          title="Подробнее о бонусной программе"
        /> */}
      </Block>
    )
  }
}

export default BonusProgram
