import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletProductComponent } from './delet-product.component';

describe('DeletProductComponent', () => {
  let component: DeletProductComponent;
  let fixture: ComponentFixture<DeletProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
