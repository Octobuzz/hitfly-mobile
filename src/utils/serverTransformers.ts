import { SocialButtonData, SocialButtonType, IGenreItem } from 'src/components'
import { SocialConnect, SocialType } from 'src/containers'
import { Genre } from 'src/screens/Home/Home'
import { renameKeys } from './helpers'

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

const genresMapper = {
  name: 'title',
  image: 'imageUrl',
}
export const serverGenreAdapter = (genre: Genre): IGenreItem => {
  const item = renameKeys(genresMapper, genre) as IGenreItem
  return item
}
