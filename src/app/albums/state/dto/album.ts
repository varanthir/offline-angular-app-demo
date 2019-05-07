import { Picture, PictureObject } from './picture';

export type AlbumObject =  Readonly<{
  id: number,
  name: string,
  pictures: PictureObject[],
}>

export class Album {
  public static fromObject({ id, name, pictures }: AlbumObject): Album {
    return new Album(id, name, pictures.map(Picture.fromObject))
  }

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly pictures: Picture[],
  ) {}
}
