<<<<<<< HEAD
import { InjectionToken } from "@angular/core";


export const Base_URl=new InjectionToken('API')
=======
import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environments';

export const Base_URl = new InjectionToken<string>('Base_URl', {
  providedIn: 'root',
  factory: () => environment.apiUrl
});
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
