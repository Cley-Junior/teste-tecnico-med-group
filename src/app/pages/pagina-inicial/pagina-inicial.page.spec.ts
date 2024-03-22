import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaInicialPage } from './pagina-inicial.page';

describe('PaginaInicialPage', () => {
  let component: PaginaInicialPage;
  let fixture: ComponentFixture<PaginaInicialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
