import { Component, OnInit, ViewChild } from '@angular/core';
import { ISchool } from '../../../interfaces/school.interfaces';
import { IonModal } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';

@Component({
  selector: 'app-escolas',
  templateUrl: './escolas.page.html',
  styleUrls: ['./escolas.page.scss'],
})
export class EscolasPage implements OnInit
{
  @ViewChild(IonModal, { static: false }) modal!: IonModal;
  name!: string;
  cep!: string;
  phone!: string;
  email!: string;
  schools: ISchool[] = [];
  public results: ISchool[] = [];

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.getSchools();
  }

  getSchools() {
    this.http.get('http://localhost:3000/schools').subscribe(
      (data: any) => {
        this.schools = data;
        this.results = [...this.schools]
      },
      error => {
        console.error('Erro ao obter escolas', error);
      }
    );
  }

  async newSchool() {
    this.http.post('http://localhost:3000/schools', {
      name: this.name,
      cep: this.cep,
      email: this.email,
      phone: this.phone,
    }).subscribe(
      (data: any) => {
        this.getSchools();
      },
    ),
      (error: any) => {
        console.error('Erro ao criar escola', error);
      }
  }


  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.schools.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  confirm()
  {
    this.newSchool().then(() => {
      this.name = '';
      this.cep = '';
      this.email = '';
      this.phone = '';
      this.modal.dismiss('confirm')
    });
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  readonly cepMask: MaskitoOptions = {
    mask: [
      ...Array(5).fill(/\d/),
      '-',
      ...Array(3).fill(/\d/),
    ],
  };

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '(',
      ...Array(2).fill(/\d/),
      ')',
      ' ',
      ...Array(5).fill(/\d/),
      '-',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();
}
