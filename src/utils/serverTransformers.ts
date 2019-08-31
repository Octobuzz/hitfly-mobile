import { SocialButtonData, SocialButtonType } from 'src/components'
import { SocialConnect, SocialType } from 'src/containers'

export const serverSocialDataAdapter = ({
  link,
  social_type,
}: SocialConnect): SocialButtonData => {
  const typeMapper: Record<SocialType, SocialButtonType> = {
    facebook: 'fb',
    vkontakte: 'vk',
    instagram: 'inst',
    odnoklassniki: 'ok',
  }

  const data: SocialButtonData = {
    type: typeMapper[social_type],
    url: link,
  }

  return data
}
