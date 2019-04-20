import { Picture } from './picture';

export type AlbumObject =  Readonly<{
  id: number,
  name: string,
  pictures: Picture[],
}>

export class Album {
  public static fromObject({ id, name, pictures }: AlbumObject): Album {
    return new Album(id, name, pictures)
  }

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly pictures: Picture[],
  ) {}
}
