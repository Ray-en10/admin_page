import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSelectComponent } from './bank-select.component';

describe('BankSelectComponent', () => {
  let component: BankSelectComponent;
  let fixture: ComponentFixture<BankSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
