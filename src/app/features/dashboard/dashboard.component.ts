import { Router } from '@angular/router';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Component, effect, signal, ViewChild } from '@angular/core';
import { ProductsService } from '../../shared/services/products/product.service';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { debounceTime, Subject } from 'rxjs';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Menu, MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
interface ProductFilters {
  name?: string;
  sku?: string;
  slug?: string;
  price?: number | string;
  stock?: number | string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    PaginatorModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    MenuModule,
    ConfirmDialogModule,
    SelectModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class DashboardComponent {
  products = signal<Product[]>([]);
  originalData = signal<Product[]>([]);
  totalItems = signal(0);
  colFilters = signal<ProductFilters>({});
  statusFilter = signal<boolean | null>(null);

  session: { userName: string } | null = null;

  page = signal(1);
  perPage = signal(15);
  search = signal('');
  @ViewChild('userMenu') userMenu!: Menu;
  userMenuItems = signal<any[]>([]);

  isLoading = signal(false);
  perPageOptions = [10, 15, 25, 50];
  statusOptions = [
  { label: 'All', value: '' },
  { label: 'Active', value: true },
  { label: 'Inactive', value: false }
];

  private searchSubject = new Subject<string>();

  constructor(
    private productService: ProductsService,
    private router: Router,
    private msg: MessageService,
    private confirmationService: ConfirmationService
  ) {
    effect(() => {
      if (this.specialFilters()) {
        this.loadAllForFiltering();
      } else {
        this.loadProducts(this.page(), this.perPage(), this.search(), this.statusFilter);
      }
    });

    this.searchSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.search.set(value);
      this.page.set(1);
    });
  }

ngOnInit() {
  this.getSession();
}

getSession() {
  const sessionStr = localStorage.getItem('userSession');
  if (sessionStr) {
    try {
      this.session = JSON.parse(sessionStr); 
      console.log(this.session)
    } catch (e) {
      console.error('Failed to parse session', e);
      this.session = null;
    }
  } else {
    this.session = null;
  }
}
  onColumnFilter(column: keyof ProductFilters, value: any) {
    const filters = { ...this.colFilters() };

    if (value === '' || value === null) {
      delete filters[column];
    } else {
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      if (column === 'price' || column === 'stock') {
        const num = Number(value);
        if (!isNaN(num)) value = num;
      }

      filters[column] = value;
    }

    this.colFilters.set(filters);
    this.page.set(1);
  }

  onStatusFilterChange(event:any) {
    const value = event;

    if (value === '') {
      this.statusFilter.set(null);
    } else if (value === true) {
      this.statusFilter.set(true);
    } else if (value === false) {
      this.statusFilter.set(false);
    }

    this.page.set(1);

    this.loadProducts(
      this.page(),
      this.perPage(),
      this.search(),
      this.colFilters(),
      this.statusFilter()
    );
  }

  specialFilters() {
    return Object.keys(this.colFilters()).length > 0;
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  onPageChange(event: any) {
    this.page.set(event.first / event.rows + 1);
    this.perPage.set(event.rows);

    if (this.specialFilters()) {
      this.applyLocalFilters();
    } else {
      this.loadProducts(this.page(), this.perPage(), this.search(), this.statusFilter);
    }
  }

  openUserMenu(event: any) {
    this.userMenu.toggle(event);
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  loadProducts(
    page: number,
    perPage: number,
    search?: string,
    filters?: Record<string, any>,
    statusFilter?: boolean | null
  ) {
    this.isLoading.set(true);

    this.productService.listProducts(page, perPage, search, filters, statusFilter).subscribe({
      next: (res) => {
        this.products.set(res.data || []);
        this.totalItems.set(res.meta?.total || 0);
        this.isLoading.set(false);
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to load products' });
        this.isLoading.set(false);
      },
    });
  }

  loadAllForFiltering() {
    this.isLoading.set(true);

    this.productService.listProducts(1, 5000, this.buildGlobalSearch()).subscribe({
      next: (res) => {
        this.originalData.set(res.data || []);
        this.applyLocalFilters();
        this.totalItems.set(this.products().length);
        this.isLoading.set(false);
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to load products' });
        this.isLoading.set(false);
      },
    });
  }

  buildGlobalSearch() {
    const f = this.colFilters();
    return [f.name, f.sku, f.slug]?.filter((v) => v)?.join(' ') || '';
  }

  applyLocalFilters() {
    let data = [...this.originalData()];

    const filters = this.colFilters();

    if (filters.name)
      data = data.filter((x) => x.name?.toLowerCase().includes(filters.name!.toLowerCase()));

    if (filters.sku)
      data = data.filter((x) => x.sku?.toLowerCase().includes(filters.sku!.toLowerCase()));

    if (filters.slug)
      data = data.filter((x) => x.slug?.toLowerCase().includes(filters.slug!.toLowerCase()));

    if ('price' in filters) {
      const minPrice = Number(filters.price);
      data = data.filter((x) => Number(x.price) >= minPrice);
    }

    if ('stock' in filters) {
      const stockFilter = Number(filters.stock);
      data = data.filter((x) => Number(x.stock) === stockFilter);
    }

    this.products.set(data);
  }

  viewProduct(product: Product) {
    this.router.navigate(['/products', product.id]);
  }
  creatProduct() {
    this.router.navigate(['/products/create']);
  }

  editProduct(product: Product) {
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.name}?`,
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.msg.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `${product.name} has been deleted`,
            });
            this.loadProducts(this.page(), this.perPage(), this.search(), this.statusFilter);
          },
          error: (err) => {
            console.error('Delete failed', err);
            this.msg.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Delete failed',
            });
          },
        });
      },
    });
  }
}
