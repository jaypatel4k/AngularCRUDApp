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
import { StudentRankReportComponent } from './student/student-rank-report/student-rank-report.component';
import { StudentOverallRankReportComponent } from './student/student-overall-rank-report/student-overall-rank-report.component';
import { AddUtilityComponent } from './student/add-utility/add-utility.component';
import { Student5PercentReportComponent } from './student/student5-percent-report/student5-percent-report.component';
import { NewLoginComponent } from './new-login/new-login.component';

export const routes: Routes = [
    { path: 'employeetest', component: ShowtestempComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'department', component: DepartmentComponent, canActivate: [authGuard] },
    { path: 'typedformtest', component: Ng14TypedContactFormComponent },
    { path: 'upload-student', component: StudentUploadComponent },
    { path: 'student', component: StudentComponent },
    { path: 'upload-student-mark', component: StudentMarkUpladComponent },
    { path: 'showstudent', component: ShowStudentComponent },
    { path: 'rankreport', component: StudentRankReportComponent },
    { path: 'rankoverallreport', component: StudentOverallRankReportComponent },
    { path: 'utility', component: AddUtilityComponent },
    { path: 'rank5Percent', component: Student5PercentReportComponent },
    { path: 'newlogin', component: NewLoginComponent },
    { path: '', component: LoginComponent }
];
