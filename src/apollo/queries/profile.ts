import gql from 'graphql-tag'

// email вытаскивается для предзагрузки в кеш
export const GET_PROFILE_HEAD = gql`
  query {
    profile: myProfile {
      userName: username
      followersCount
      email
      roles {
        slug
      }
      avatar(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`
