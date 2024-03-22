import { Component, OnInit } from '@angular/core';
import { IClasses } from 'src/interfaces/classes.interfaces';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.page.html',
  styleUrls: ['./turmas.page.scss'],
})
export class TurmasPage implements OnInit {

  public classes: IClasses[] = []
  public results = [...this.classes];
  constructor() { }

  ngOnInit() {
    console.log();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.classes.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
}
