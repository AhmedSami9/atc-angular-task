import { Routes } from '@angular/router';
import { RegisterComponent } from './features/Auth/register/register.component';
import { LoginComponent } from './features/Auth/login/login.component';
import { ProductCreateComponent } from './features/products/product-create/product-create.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EditComponent } from './features/products/edit/edit.component';
import { loginGuard } from './core/guards/login-guard';
import { registerGuard } from './core/guards/register-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [registerGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'products/create', component: ProductCreateComponent, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductDetailsComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: EditComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];
