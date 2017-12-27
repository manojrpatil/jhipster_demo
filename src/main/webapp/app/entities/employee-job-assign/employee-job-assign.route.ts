import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { EmployeeJobComponent } from './employee-job-assign.component';
export const employeeJobRoute: Routes = [
    {
        path: 'employee-job-assign',
        component: EmployeeJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeJob'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee-job-assign/:id',
        component: EmployeeJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeJob'
        },
        canActivate: [UserRouteAccessService]
    }
];

/*export const employeePopupRoute: Routes = [
    {
        path: 'employee-my-suffix-new',
        component: EmployeeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-my-suffix/:id/edit',
        component: EmployeeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-my-suffix/:id/delete',
        component: EmployeeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];*/
