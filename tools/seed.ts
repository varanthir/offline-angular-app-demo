import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'

async function downloadImage(id: number, folder: string, width: number, height: number): Promise<void> {
  const url = `https://picsum.photos/${width}/${height}/?image=${id}`

  const response = await axios.get(url, { responseType: 'stream' })
  const imagePath = path.resolve(__dirname, folder, `${id}.jpeg`)
  const writer = fs.createWriteStream(imagePath)
  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

async function downloadPictureThumbnailPairs(startId: number, length: number): Promise<number[]> {
  const finishedIds: number[] = []
  const ids = Array.from({ length }, (v, i) => startId + i)

  for (const id of ids) {
    try {
      await Promise.all([
        downloadImage(id, 'pictures', 1920, 1080),
        downloadImage(id, 'thumbnails', 320, 180)
      ])
      finishedIds.push(id)
      console.log(`Picture and thumbnail ${id} Ok`)
    } catch (error) {
      console.log(`Picture and thumbnail ${id} ${error}`)
    }
  }

  return finishedIds
}

function mod(divident: number, divider: number): number {
  const reminder = divident % divider
  return (divident - reminder) / divider
}

const getAlbum = (id: number) => ({ id, name: `Picture ${id}` })
const getAlbums = (ids: number[]) => ids.map(getAlbum)

async function main(): Promise<void> {
  const imagesStartId = 222
  const numberOfImages = 100
  const albumSize = 20

  const pictureIds = await downloadPictureThumbnailPairs(imagesStartId, numberOfImages)
  const albums = Array.from({ length: mod(pictureIds.length, mod(albumSize, 2)) }, (v, i) => i + 1)
    .map((albumId, index) => ({
      id: albumId,
      name: `Album ${albumId}`,
      pictures: getAlbums(pictureIds.slice(index * mod(albumSize, 2), index * mod(albumSize, 2) + albumSize))
    }))

  fs.writeFileSync(
    path.resolve(__dirname, 'albums', `data.json`),
    JSON.stringify(albums, null, 2),
    { encoding: 'utf8' },
  )
}

main()
  .then(() => console.log('Finished!'))
  .catch(() => console.log('Failed!'))
