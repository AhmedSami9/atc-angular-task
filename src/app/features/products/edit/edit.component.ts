import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../shared/services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { LoaderService } from '../../../shared/components/Loader/loader.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
    SelectModule,
  ],
  providers: [MessageService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productForm: FormGroup;
  productId!: number;
  imgUrl: String = '';
  loader = inject(LoaderService);
  statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private msg: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      slug: ['', Validators.required],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      is_active: [true],
    });
  }
  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.productForm.patchValue(res.data);
        this.imgUrl = res.data.thumbnail_url;
      },
      error: (err) => console.error(err),
    });
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  onUpdate() {
    if (this.productForm.invalid) return;

    this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
      next: () => {
        debugger;
        this.msg.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Product updated successfully',
          life: 3000,
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product' });
        console.error(err);
      },
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
