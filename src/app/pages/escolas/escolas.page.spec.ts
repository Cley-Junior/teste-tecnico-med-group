import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscolasPage } from './escolas.page';

describe('EscolasPage', () => {
  let component: EscolasPage;
  let fixture: ComponentFixture<EscolasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EscolasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
