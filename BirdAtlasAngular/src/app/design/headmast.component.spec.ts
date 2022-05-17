import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmastComponent } from './headmast.component';

describe('HeadmastComponent', () => {
  let component: HeadmastComponent;
  let fixture: ComponentFixture<HeadmastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadmastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadmastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
