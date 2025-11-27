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

<<<<<<< HEAD

=======
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
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
<<<<<<< HEAD
    TagModule
  ],
   providers: [ConfirmationService, MessageService], 
=======
    TagModule,
  ],
  providers: [ConfirmationService, MessageService],
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc

  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _Router = inject(Router);
<<<<<<< HEAD
     loader = inject(LoaderService);
      constructor(
=======
  loader = inject(LoaderService);
  constructor(
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

<<<<<<< HEAD

=======
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
  productId: number | null = null;
  product: Product = {} as Product;
  isLoading = signal(false);

  ngOnInit(): void {
    this.getId();
  }
<<<<<<< HEAD
getId(){
   this._ActivatedRoute.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.productId = Number(id);
      this.getProductDetails(this.productId);
    }
  });
}
=======
  getId() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = Number(id);
        this.getProductDetails(this.productId);
      }
    });
  }
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
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
<<<<<<< HEAD
      }
=======
      },
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
    });
  }

  editProduct(product: Product): void {
    this._Router.navigate(['/products/edit', product.id]);
  }

<<<<<<< HEAD
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
=======
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
              detail: `${product.name} has been deleted`,
            });
            this._Router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Delete failed', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Delete failed',
            });
          },
        });
      },
    });
  }
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
}
