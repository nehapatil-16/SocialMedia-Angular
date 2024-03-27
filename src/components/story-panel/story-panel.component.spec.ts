import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPanelComponent } from './story-panel.component';

describe('StoryPanelComponent', () => {
  let component: StoryPanelComponent;
  let fixture: ComponentFixture<StoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
