import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environments';

export const Base_URl = new InjectionToken<string>('Base_URl', {
  providedIn: 'root',
  factory: () => environment.apiUrl
});
