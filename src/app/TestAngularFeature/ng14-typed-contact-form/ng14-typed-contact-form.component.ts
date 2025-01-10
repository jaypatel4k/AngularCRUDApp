import { Component, OnInit } from '@angular/core';
import { contactFormGroup } from './contact-form-group';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ng14-typed-contact-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './ng14-typed-contact-form.component.html',
  styleUrl: './ng14-typed-contact-form.component.scss'
})
export class Ng14TypedContactFormComponent implements OnInit {
  contactForm = new FormGroup<contactFormGroup>({
    name: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    contactNumber: new FormControl<Number>(0, { nonNullable: false }),
    query: new FormControl<string>('I would like to connect!', { nonNullable: false })
  });
  constructor() {
  };

  dataOutput: string = '';
  ngOnInit(): void {
  }
  onSubmitContactForm() {
    this.dataOutput = `Name: ${this.contactForm.value.name},Query: ${this.contactForm.value.query},Contact Number: ${this.contactForm.value.contactNumber}, Email: ${this.contactForm.value.email} `;
  }
  resetSubmitContactForm() {
    this.contactForm.reset();
    this.dataOutput = '';
  }
  removeQuery() {
    this.contactForm.removeControl('query'); //This code removes the optional control from typed model
  }
}


