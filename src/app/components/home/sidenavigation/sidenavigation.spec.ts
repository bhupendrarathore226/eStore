import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidenavigation } from './sidenavigation';

describe('Sidenavigation', () => {
  let component: Sidenavigation;
  let fixture: ComponentFixture<Sidenavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidenavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidenavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
