// src/app/core/models/product-response.model.ts

import { PaginationLinks, PaginationMeta } from "./pagination-links";
import { Product } from "./product";


export interface ProductResponse {
  data: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

