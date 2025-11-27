import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base_URl } from '../../tokens/api.token';
import { Endpoint } from '../../../core/enums/Endpoints.enum';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly BASE_Url = environment.apiUrl
  private readonly _HttpClient: HttpClient = inject(HttpClient);

  constructor() {}

listProducts(
  page: number = 1,
  perPage: number = 15,
  search?: string,
  filters?: Record<string, any>,
  isActive?: boolean | null
): Observable<any> {

  let params = new HttpParams()
    .set('page', page)
    .set('per_page', perPage);

  if (search) {
    params = params.set('search', search);
  }

  if (isActive !== null && isActive !== undefined) {
    params = params.set('is_active', isActive.toString());
  }

  if (filters) {
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
  }

  return this._HttpClient.get(this.BASE_Url + Endpoint.products, { params });
}




  getProduct(id: number): Observable<any> {
    return this._HttpClient.get(`${this.BASE_Url + Endpoint.products}/${id}`);
  }

  createProduct(data: any): Observable<any> {
    return this._HttpClient.post(this.BASE_Url + Endpoint.products, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`${this.BASE_Url + Endpoint.products}/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.BASE_Url + Endpoint.products}/${id}`);
  }
}
