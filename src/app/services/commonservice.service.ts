import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  schoolnameheading: string = 'THE VIDYAKUNJ HIGH SCHOOL';
  highestmarkobtainheader: string = 'HIGHEST MARKS OBTAINED IN VARIOUS SUBJECTS';
  congatesheading: string = 'CONGRATULATIONS';
  firstsecondthridheading: string = 'FIRST , SECOND, THIRD RANK IN ALL DIVISION';
  highestinalldivisionheading: string = 'HIGHEST IN ALL SUBJECT AND ALL DIVISION';
  constructor() { }
}
