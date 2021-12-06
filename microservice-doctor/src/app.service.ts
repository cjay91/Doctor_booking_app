import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public create_doctor(data: number[]): object {
    return {message:"Created successfully"};
  }
}
