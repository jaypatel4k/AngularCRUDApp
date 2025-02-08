import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HandleErrorService } from '../../services/handle-error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public message: string | undefined;
  public loginForm: FormGroup;
  public submitted = false;



  constructor(private fb: FormBuilder, private authservice: AuthserviceService, private router: Router, private handleerror: HandleErrorService) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,
      Validators.pattern("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}")
      ])
    });
  }

  onLogin(): void {
    this.submitted = true;

    // if (this.loginForm.valid) {
    //   const credential = JSON.stringify(this.loginForm.value);
    //   this.authservice.userlogin(credential).subscribe(res => {
    //     let result = res['token'];
    //     localStorage.setItem('token', result);
    //     // return true;
    //     this.router.navigate(['./department']);
    //     //alert(res['status']);
    //   }
    //   )

    // }


    if (this.loginForm.valid) {
      const credential = JSON.stringify(this.loginForm.value);
      this.authservice.userlogin(credential).subscribe({
        next: (res) => {
          let result = res['token'];
          localStorage.setItem('token', result);
          this.router.navigate(['./showstudent']);
        },
        error: (e) => {
          //alert(e.error.message);
          //console.error(e.error.message);
          this.message = e.error.message;
          this.handleerror.handleError(e);
        },
        complete: () => {
          console.info('complete');
        }
      })

    }



  }
  logOut() {
    localStorage.removeItem('token');
  }

  get passwordFormField() {
    return this.loginForm.get('password');
  }


}
