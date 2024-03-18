import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPostsComponent } from './report-posts.component';

describe('ReportPostsComponent', () => {
  let component: ReportPostsComponent;
  let fixture: ComponentFixture<ReportPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
