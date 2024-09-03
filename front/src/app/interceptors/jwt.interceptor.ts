import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {TokenModel} from "../models/TokenModel";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  private readonly whitelistUrls = [
    '/login',
    '/register'
  ];

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const isWhitelisted = this.whitelistUrls.some(url => request.url.includes(url));

    if (isWhitelisted) {
      return next.handle(request);
    }

    let tokenJson: string | null = localStorage.getItem('tokenModel');
    let tokenModel: TokenModel = {} as TokenModel;

    if (tokenJson) {
      tokenModel = JSON.parse(tokenJson);
    }

    const token = tokenModel.token;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
