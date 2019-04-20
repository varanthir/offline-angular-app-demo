export type PictureObject = Readonly<{
  id: number,
  name: string,
}>

export class Picture {
  public static fromObject({ id, name }: PictureObject): Picture {
    return new Picture(id, name)
  }

  constructor(
    public readonly id: number,
    public readonly name: string
  ) {}
}
