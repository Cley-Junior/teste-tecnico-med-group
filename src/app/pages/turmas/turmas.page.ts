import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ISchool } from '../../../interfaces/school.interfaces';
import { IonButton, IonModal, IonSelectOption } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { IClasses } from 'src/interfaces/classes.interfaces';
import { flatMap } from 'rxjs';

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
  year!: string;
  name!: string;
  studentsQtd!: string;
  schools: ISchool[] = [];
  classes: IClasses[] = [];
  public results: IClasses[] = [];
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

  activateButton(event?: any)
  {
    this.newClassesModal.disabled = false;
    this.schoolSelected = this.schools.find((school) => school.id === event.target.value);
    this.getClasses().then(() => {
      this.choosed = true;
    });
  }

  getSchools() {
    this.http.get('http://localhost:3000/schools').subscribe(
      (data: any) => {
        this.schools = data;
      }
    ),
      (error: any) => {
        console.error('Erro ao obter escolas', error);
      }
  }

  async getClasses() {
    this.http.get('http://localhost:3000/classes').subscribe(
      (data: any) => {
        this.classes = data;
        this.schoolClasses = this.classes.filter((classe) => classe.schoolId == this.schoolSelected!.id);
        this.results = [...this.schoolClasses];
      }
    ),
    (error: any) => {
      console.error('Erro ao obter turmas', error);
    };
  }

  async newClass() {
    this.http.post('http://localhost:3000/classes', {
      schoolId: this.schoolSelected?.id,
      name: this.name,
      year: parseInt(this.year),
      studentsQtd: parseInt(this.studentsQtd),
    }).subscribe(data =>
      {
        this.getClasses()
      }),
    (error: any) => {
      console.error('Erro ao criar nova classe', error);
    };
  }

  async deleteClass(id: string)
  {
    this.http.delete('http://localhost:3000/classes/' + id).pipe()
    .subscribe(data =>
      {
        this.getClasses()
      }),
    (error: any) =>
    {
      console.error('Erro ao deletar classe', error);
    }
  }

  refresh()
  {
    this.getClasses();
  }

  confirm()
  {
    this.newClass().then(() => {
      this.year = '';
      this.name = '';
      this.studentsQtd = '';
      this.modal.dismiss('confirm');
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
