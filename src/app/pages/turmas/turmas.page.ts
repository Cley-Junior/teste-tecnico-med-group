import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ISchool } from '../../../interfaces/school.interfaces';
import { IonButton, IonModal, IonSelectOption } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { IClasses } from 'src/interfaces/classes.interfaces';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.page.html',
  styleUrls: ['./turmas.page.scss'],
})
export class TurmasPage implements OnInit, AfterViewInit
{
  @ViewChild("newClassesModal")newClassesModal!: IonButton;
  @ViewChild("selectedSchool")selectedSchool!: IonSelectOption
  @ViewChild(IonModal, { static: false }) modal!: IonModal;
  schoolId!: string;
  year!: number;
  name!: string;
  studentsQtd!: number;
  schools: ISchool[] = [];
  classes: IClasses[] = [];
  public results: ISchool[] = [];
  public schoolSelected!: ISchool | undefined;
  public schoolClasses!: IClasses[];
  public schoolClassesResults!: IClasses[];
  public choosed: boolean = false;

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.getSchools();
  }

  ngAfterViewInit(): void {
    this.newClassesModal.disabled = true;
  }

  activateButton(event: any)
  {
    this.newClassesModal.disabled = false;
    this.schoolSelected = this.schools.find((school) => school.id === event.target.value);
    this.getClasses().then(() => {
      this.schoolClasses = this.classes.filter((classe) => classe.schoolId == this.schoolSelected?.id);
      console.log(this.schoolClasses);
      console.log(this.schoolSelected)
      this.choosed = true;
    });
  }

  getSchools() {
    this.http.get('http://localhost:3000/schools').subscribe(
      (data: any) => {
        this.schools = data;
      },
      error => {
        console.error('Erro ao obter escolas', error);
      }
    );
  }

  async getClasses() {
    this.http.get('http://localhost:3000/classes').subscribe(
      (data: any) => {
        this.classes = data;
      },
      error => {
        console.error('Erro ao obter escolas', error);
      }
    );
  }

  async newClass() {
    this.http.post('http://localhost:3000/classes', {
      schoolId: this.schoolId,
      name: this.name,
      year: this.year,
      studentsQtd: this.studentsQtd,
    }).subscribe(
      error => {
        console.error('Erro ao criar turma', error);
      }
    );
  }


  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.schoolClassesResults = this.schoolClasses.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  confirm()
  {
    this.newClass().then(() => {this.modal.dismiss('confirm')});
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
