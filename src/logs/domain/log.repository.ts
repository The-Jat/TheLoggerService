export interface LogRepository {
  create(data: {
    event: string;
    service: string;
    level: string;
    message: string;
    meta: any;
  }): Promise<void>;
}