import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserschatComponent } from './userschat.component';

describe('UserschatComponent', () => {
  let component: UserschatComponent;
  let fixture: ComponentFixture<UserschatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserschatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserschatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
