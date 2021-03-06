import React, { useMemo, useCallback } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { DarkenImage, TextBase } from 'src/components'
import { Profile, Role, AvatarSizeNames } from 'src/apollo'
import { getNameForCount } from 'src/helpers'
import { images, styles } from 'src/constants'
import { useImageSource } from 'src/hooks'
import styled from 'src/styled-components'

const HeaderWrapper = styled.View`
  height: ${styles.COVER_HEIGHT}px;
  padding-left: 56px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-left-radius: 28px;
  overflow: hidden;
`

const Cover = styled(DarkenImage)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 56px;
`

const Icon = styled.Image`
  width: 22px;
  height: 22px;
  margin-left: 8px;
`

const TitleText = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  line-height: 28px;
`

const SubTitleText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  line-height: 14px;
  margin-top: 24px;
`

const TabBarWrapper = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 56px;
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))`
  border-top-left-radius: 28px;
`

interface Props {
  profile: Profile
  TabBar: React.ReactNode
}

const getNameForSubscribers = getNameForCount({
  nominative: 'поклонник',
  genitive: 'поклонника',
  genitiveMultiple: 'поклонников',
})

const Header: React.FC<Props> = ({
  profile: { userName, avatar, followersCount, roles },
  TabBar,
}) => {
  const subtitle = useMemo(
    () => `${followersCount} ${getNameForSubscribers(followersCount)}`,
    [followersCount],
  )

  // это последствия костыля бэка с ролями
  // не понятно почему приходит массив ролей, а не одна роль
  // а также почему в массивах не приходят приоритеты,
  // чтобы я не делал эту пляску со змеями
  const getCurrentRole = useCallback((profileRoles: Role[]): Role => {
    const weights: Record<string, number> = {
      listener: 0,
      performer: 1,
      critic: 2,
      prof_critic: 3,
      star: 4,
    }
    const rolesWithWeight = profileRoles.map(({ slug, ...rest }) => ({
      ...rest,
      slug,
      weight: weights[slug],
    }))
    // по убыванию
    const sortedRoles = rolesWithWeight.sort((a, b) => b.weight - a.weight)
    return sortedRoles[0]
  }, [])

  const source = useMemo(() => {
    const { slug } = getCurrentRole(roles)
    switch (slug) {
      case 'star': {
        return images.STAR
      }
      case 'prof_critic': {
        return images.EXPERT_PLUS
      }
      case 'critic': {
        return images.CRITIC
      }
      case 'performer': {
        return images.MUSICIAN
      }
      default: {
        return images.LISTENER
      }
    }
  }, [roles])

  const avatarSource = useImageSource(avatar, AvatarSizeNames.S_235)

  return (
    <HeaderWrapper>
      <Cover source={avatarSource} />
      <Row>
        <TitleText>{userName}</TitleText>
        <Icon source={source} />
      </Row>
      <SubTitleText>{subtitle}</SubTitleText>
      <TabBarWrapper>
        <Gradient>{TabBar}</Gradient>
      </TabBarWrapper>
    </HeaderWrapper>
  )
}

export default Header
