import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusZonesMapComponent } from './campus-zones-map.component';

describe('CampusZonesMapComponent', () => {
  let component: CampusZonesMapComponent;
  let fixture: ComponentFixture<CampusZonesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusZonesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusZonesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
