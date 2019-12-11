import { useContext } from 'react'
import { NavigationContext } from 'react-navigation'

const useNavigation = () => {
  const navigation = useContext(NavigationContext)
  return navigation
}

export default useNavigation
