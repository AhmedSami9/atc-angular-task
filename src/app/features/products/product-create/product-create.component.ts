
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../shared/services/products/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
 productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private msg: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
       sku: ['', Validators.required],
       slug:['', Validators.required],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      is_active: [true]
    });
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.productService.createProduct(this.productForm.value).subscribe({
      next: (res) => {
        this.msg.add({ severity: 'success', summary: 'Created', detail: 'Product created successfully', life: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to create product' });
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

}
