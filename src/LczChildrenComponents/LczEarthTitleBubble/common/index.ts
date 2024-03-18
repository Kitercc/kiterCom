export function getImage(url: string): Promise<HTMLImageElement | null> {
  if (!url) return Promise.resolve(null)
  return new Promise(resolve => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      resolve(null)
    }
    image.src = url || ''
  })
}
