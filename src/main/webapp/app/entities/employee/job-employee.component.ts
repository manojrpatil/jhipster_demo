import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { EmployeeMySuffix } from './employee-my-suffix.model';
import { EmployeeMySuffixService } from './employee-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { JobMySuffix } from '../job/job-my-suffix.model';
import { JobMySuffixService } from '../job/job-my-suffix.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-job-employee',
    templateUrl: './job-employee.component.html'
})
export class JobEmployeeComponent implements OnInit, OnDestroy {

    employees: EmployeeMySuffix[];
    jobs: JobMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    employee: EmployeeMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private employeeService: EmployeeMySuffixService,
        private jobService: JobMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.employees = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
      this.jobService.query()
            .subscribe((res: ResponseWrapper) => { this.jobs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.employeeService.query().subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.employees = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.isSaving = false;
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployees();
    }
   clear() {
        this.activeModal.dismiss('cancel');
    }

      save() {
        this.isSaving = true;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(
                this.employeeService.create(this.employee));
        }
    }
  private subscribeToSaveResponse(result: Observable<EmployeeMySuffix>) {
        result.subscribe((res: EmployeeMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeeMySuffix) {
        this.eventManager.broadcast({ name: 'employeeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

   private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmployeeMySuffix) {
        return item.id;
    }
  getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.employees.push(data[i]);
        }
    }
}
