import { IClasses } from "./classes.interfaces";

export interface ISchool
{
  id: string,
  name: string,
  cep: string,
  phone: string,
  email: string,
  classesId?: string[],
  classes?: IClasses[],
}
