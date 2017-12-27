import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmployeejobassignRegionMySuffixModule } from './region/region-my-suffix.module';
import { EmployeejobassignCountryMySuffixModule } from './country/country-my-suffix.module';
import { EmployeejobassignLocationMySuffixModule } from './location/location-my-suffix.module';
import { EmployeejobassignDepartmentMySuffixModule } from './department/department-my-suffix.module';
import { EmployeejobassignTaskMySuffixModule } from './task/task-my-suffix.module';
import { EmployeejobassignEmployeeMySuffixModule } from './employee/employee-my-suffix.module';
import { EmployeejobassignJobMySuffixModule } from './job/job-my-suffix.module';
import { EmployeejobassignJobHistoryMySuffixModule } from './job-history/job-history-my-suffix.module';
/*import { EmployeejobassignEmployeeJobModule } from './employee-job-assign/employee-job-assign.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        EmployeejobassignRegionMySuffixModule,
        EmployeejobassignCountryMySuffixModule,
        EmployeejobassignLocationMySuffixModule,
        EmployeejobassignDepartmentMySuffixModule,
        EmployeejobassignTaskMySuffixModule,
        EmployeejobassignEmployeeMySuffixModule,
        EmployeejobassignJobMySuffixModule,
        EmployeejobassignJobHistoryMySuffixModule,
        /*EmployeejobassignEmployeeJobModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeejobassignEntityModule {}
