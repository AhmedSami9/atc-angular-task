import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-delet-product',
  imports: [ConfirmDialogModule],
  templateUrl: './delet-product.component.html',
  styleUrl: './delet-product.component.scss',
})
export class DeletProductComponent {
 @Input() itemName: string = '';
  @Output() confirmed = new EventEmitter<void>();

  isDeleting = signal(false);

  constructor(
    private _Router :Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm() {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.itemName}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDeleting.set(true);
        this.confirmed.emit();
        this.isDeleting.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: `${this.itemName} has been deleted successfully.`,
          life: 3000
        });
         this._Router.navigate(['/dashboard']);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled.',
          life: 2000
        });
      }
    });
  }
}