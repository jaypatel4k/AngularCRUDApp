import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public loginForm: FormGroup;
  public submitted = false;



  constructor(private fb: FormBuilder, private authservice: AuthserviceService, private router: Router) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,
      Validators.pattern("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}")
      ])
    });
  }

  onLogin(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const credential = JSON.stringify(this.loginForm.value);
      this.authservice.userlogin(credential).subscribe(res => {
        let result = res['token'];
        localStorage.setItem('token', result);
        // return true;
        this.router.navigate(['./department']);
        //alert(res['status']);
      }
      )

    }
  }
  logOut() {
    localStorage.removeItem('token');
  }

  get passwordFormField() {
    return this.loginForm.get('password');
  }


}
