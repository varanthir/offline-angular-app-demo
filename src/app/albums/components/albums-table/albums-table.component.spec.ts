import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsTableComponent } from './albums-table.component';

describe('AlbumsTableComponent', () => {
  let component: AlbumsTableComponent;
  let fixture: ComponentFixture<AlbumsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
