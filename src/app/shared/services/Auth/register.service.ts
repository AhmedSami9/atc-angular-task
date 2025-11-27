import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Base_URl } from '../../tokens/api.token';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { RegisterData } from '../../models/auth';
import { Endpoint } from '../../../core/enums/Endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly _HttpClient:HttpClient = inject(HttpClient)
  private readonly BASE_Url = inject(Base_URl)
  constructor(){}
  


 register(regDate:RegisterData):Observable<any>
 {
  return this._HttpClient.post(this.BASE_Url + Endpoint.SignUp,regDate)
 }


}
