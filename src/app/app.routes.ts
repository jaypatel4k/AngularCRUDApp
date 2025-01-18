import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { LoginComponent } from './login/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ShowtestempComponent } from './testemp/showtestemp/showtestemp.component';
import { Ng14TypedContactFormComponent } from './TestAngularFeature/ng14-typed-contact-form/ng14-typed-contact-form.component';
import { StudentComponent } from './student/student.component';
import { ShowStudentComponent } from './student/show-student/show-student.component';
import { StudentUploadComponent } from './student/student-upload/student-upload.component';
import { StudentMarkUpladComponent } from './student/student-mark-uplad/student-mark-uplad.component';

export const routes: Routes = [
    { path: 'employeetest', component: ShowtestempComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'department', component: DepartmentComponent, canActivate: [authGuard] },
    { path: 'typedformtest', component: Ng14TypedContactFormComponent },
    { path: 'upload-student', component: StudentComponent },
    { path: 'upload-student-mark', component: StudentMarkUpladComponent },
    { path: 'showstudent', component: ShowStudentComponent },
    { path: '', component: LoginComponent }
];
