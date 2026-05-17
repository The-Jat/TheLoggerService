export class Log {
  constructor(
    public id: number,

    public event: string,

    public service: string,

    public level: string,

    public message: string,

    public meta: any,

    public created_at: Date,
  ) {}
}