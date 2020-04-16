import { Picture, PictureObject } from './picture'

export type AlbumObject =  Readonly<{
  id: number,
  name: string,
  pictures: PictureObject[],
  isOffline?: boolean,
}>

export class Album {
  static fromObject({ id, name, pictures, isOffline }: AlbumObject): Album {
    return new Album(
      id,
      name,
      pictures.map(Picture.fromObject),
      typeof isOffline === 'boolean' ? isOffline : false
    )
  }

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly pictures: Picture[],
    public readonly isOffline: boolean,
  ) {}
}
