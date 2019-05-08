// tslint:disable:no-string-literal

import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'

interface Picture {
  id: number,
  name: string,
}

interface Album {
  id: number,
  name: string,
  pictures: Picture[],
}

function random(): number {
  return Math.round(Math.random() * 500) + 1
}

const albumsPath = path.resolve(__dirname, 'albums', `data.json`)
const albumsArray: Album[] = JSON.parse(fs.readFileSync(albumsPath, { encoding: 'utf8' }))
const albumsDict: { [albumId: number]: Album } = albumsArray.reduce((acc, curr) => ({
  ...acc,
  [curr.id]: curr,
}), {})

const port = 3000
const server = express()

server.use((req, res, next) => {
  // Simulate delay
  setTimeout(() => {
    next()
    console.log(`${req.method} ${req.url} => ${res.statusCode} [${req.ip}, ${req.hostname}]`)
  }, 500 + random())
})

server.get('/', (req, res) => {
  res.send({ message: 'Hello world!' })
})

server.get('/api/albums', (req, res) => {
  res.send(albumsArray)
})

server.get('/api/albums/:albumId', (req, res) => {
  const albumId = Number(req.params['albumId'])
  const album = albumsDict[albumId]
  if (album) {
    res.send(album)
  } else {
    res.status(404).send(`Can't find album with id: ${albumId}`)
  }
})

server.get('/api/pictures/:pictureId', (req, res, next) => {
  const pictureId = req.params['pictureId']
  const picturePath = path.resolve(__dirname, 'pictures', `${pictureId}.jpeg`)
  res.sendFile(picturePath)
})

server.get('/api/thumbnails/:thumbnailId', (req, res, next) => {
  const thumbnailId = req.params['thumbnailId']
  const thumbnailPath = path.resolve(__dirname, 'thumbnails', `${thumbnailId}.jpeg`)
  res.sendFile(thumbnailPath)
})

const exit = () => {
  console.log('Server stopped.')
  process.exit()
}

process.on('SIGINT', exit)
process.on('SIGTERM', exit)

server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})
