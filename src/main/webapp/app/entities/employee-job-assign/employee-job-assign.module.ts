import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeejobassignSharedModule } from '../../shared';
import { EmployeeMySuffixService } from '../employee';
import { JobMySuffixService } from '../job';
import {
    EmployeeJobComponent,
    EmployeeJobService,
    employeeJobRoute,
} from './';
const ENTITY_STATES = [
    ...employeeJobRoute,
];
@NgModule({
    imports: [
        EmployeejobassignSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EmployeeJobComponent,
    ],
    entryComponents: [
        EmployeeJobComponent,
    ],
    providers: [
        EmployeeJobService,
      JobMySuffixService,
      EmployeeMySuffixService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeejobassignEmployeeJobModule {}
