/* eslint-disable prettier/prettier */
// axios.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosInterceptor implements NestInterceptor {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();

    // Inject Axios instance into the request
    request.axiosConfig = this.axiosInstance.defaults;

    return next.handle();
  }
}