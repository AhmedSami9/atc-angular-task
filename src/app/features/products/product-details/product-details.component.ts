import { Product } from './../../../shared/models/product';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products/product.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from '../../../shared/components/Loader/loader.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    TagModule
  ],
   providers: [ConfirmationService, MessageService], 

  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _Router = inject(Router);
     loader = inject(LoaderService);
      constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}


  productId: number | null = null;
  product: Product = {} as Product;
  isLoading = signal(false);

  ngOnInit(): void {
    this.getId();
  }
getId(){
   this._ActivatedRoute.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.productId = Number(id);
      this.getProductDetails(this.productId);
    }
  });
}
  private getProductDetails(id: number) {
    this.isLoading.set(true);
    this._ProductsService.getProduct(id).subscribe({
      next: (res: any) => {
        this.product = res.data;
        console.log(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  editProduct(product: Product): void {
    this._Router.navigate(['/products/edit', product.id]);
  }

deleteProduct(product: Product): void {
  if (!product.id) return;

  this.confirmationService.confirm({
    message: `Are you sure you want to delete ${product.name}?`,
    accept: () => {
      this._ProductsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: `${product.name} has been deleted`
          });
          this._Router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Delete failed'
          });
        }
      });
    }
  });
}
}
