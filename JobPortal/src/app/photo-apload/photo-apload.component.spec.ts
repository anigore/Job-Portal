import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAploadComponent } from './photo-apload.component';

describe('PhotoAploadComponent', () => {
  let component: PhotoAploadComponent;
  let fixture: ComponentFixture<PhotoAploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoAploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoAploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
