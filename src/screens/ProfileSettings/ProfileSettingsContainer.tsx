import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import AuthSettingsScreen from './ProfileSettings'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { routes } from 'src/constants'
import { PROFILE_AVATAR } from '../../apollo/fragments'

const GET_PROFILE = gql`
  query {
    profile: myProfile {
      userName: username
      location {
        title
      }
    }
  }
`

const GET_NAME = gql`
  query {
    profile: myProfile {
      userName: username
      location {
        title
      }
    }
  }
`

const UPDATE_USERNAME = gql`
  mutation updateUsername($userName: String!) {
    updateMyProfile(profile: { username: $userName }) {
      username
    }
  }
`

const UPDATE_CITY = gql`
  mutation updateCity($city: Int!) {
    updateMyProfile(profile: { cityId: $city }) {
      location {
        title
      }
    }
  }
`

const GET_CITIES = gql`
  query getCities($query: String, $limit: Int!, $page: Int!) {
    locations(q: $query, limit: $limit, page: $page) {
      data {
        id
        area_region
        title
      }
    }
  }
`

interface Props extends NavigationStackScreenProps {}

const ProfileSettingsContainer: React.FC<Props> = props => {
  const { data } = useQuery(GET_PROFILE)
  const { data: dataCities } = useQuery(GET_CITIES, {
    variables: {
      limit: 100,
      page: 1,
    },
  })

  const userName = L.get(data, 'profile.userName', '')
  const city = L.get(data, 'profile.location.title', '') // текущее значение
  const cities = L.get(dataCities, 'locations.data', []).map(el => {
    // список городов - словарь
    return {
      ...el,
      value: el.id,
    }
  })
  // Ставим город на первое место, чтобы он отображался как дефолтный из-за реализации Dropdown
  if (city !== '') {
    cities.forEach((el, i, arr) => {
      debugger
      if (el.title === city) {
        const currentCity = arr.splice(i, 1)
        arr.unshift(currentCity[0])
      }
    })
  }

  const [updateUsername] = useMutation(UPDATE_USERNAME)
  const [updateCity] = useMutation(UPDATE_CITY)

  const onSubmit = useCallback(values => {
    return Promise.all([
      updateUsername({ variables: values }),
      updateCity({ variables: values }),
    ])
  }, [])

  return (
    <AuthSettingsScreen
      onSubmit={onSubmit}
      userName={userName}
      cities={cities}
      city={city}
      {...props}
    />
  )
}

export default ProfileSettingsContainer
