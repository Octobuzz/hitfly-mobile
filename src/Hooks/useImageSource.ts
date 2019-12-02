import { useMemo } from 'react'
import { ImageSizeNames, Image } from 'src/apollo'
import { getImageForSize } from 'src/helpers'

const useImageSource = (images: Image[], size: ImageSizeNames) => {
  const source = useMemo(() => {
    const image = getImageForSize(images, size)
    return { uri: image.imageUrl }
  }, [images, size])

  return source
}

export default useImageSource
