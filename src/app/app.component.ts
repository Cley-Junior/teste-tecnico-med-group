import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public url!: string;
  public appPages = [
    { title: 'Página Inicial', url: '/pagina-inicial', icon: 'home' },
    { title: 'Escolas', url: '/escolas', icon: 'school' },
    { title: 'Turmas', url: '/turmas', icon: 'people' },
  ];
  constructor(private router: Router)
  {
    this.router.events.subscribe((param) => {
      if (param instanceof NavigationEnd)
      {
        const titleIndex = this.appPages.findIndex( x => x.url === param.url );
        this.url = this.appPages[titleIndex].title;
      }})
  }
}
