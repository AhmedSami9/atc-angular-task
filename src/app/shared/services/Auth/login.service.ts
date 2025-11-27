import { Observable } from 'rxjs';
import { Base_URl } from './../../tokens/api.token';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginData } from '../../models/auth';
import { Endpoint } from '../../../core/enums/Endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private BASE_Url = inject(Base_URl)
  private readonly _HttpClient:HttpClient =inject(HttpClient);
   constructor() {}

  login(loginData: LoginData):Observable<any> {
    
    return this._HttpClient.post(this.BASE_Url + Endpoint.SignIn, loginData);
  }
  
}
