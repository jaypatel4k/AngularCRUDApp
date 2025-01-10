import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { LoginComponent } from './login/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ShowtestempComponent } from './testemp/showtestemp/showtestemp.component';
import { Ng14TypedContactFormComponent } from './TestAngularFeature/ng14-typed-contact-form/ng14-typed-contact-form.component';

export const routes: Routes = [
    { path: 'employeetest', component: ShowtestempComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'department', component: DepartmentComponent, canActivate: [authGuard] },
    { path: 'typedformtest', component: Ng14TypedContactFormComponent },
    { path: '', component: LoginComponent }
];
