import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { EmployeeJobModel } from './employee-job-assign.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmployeeJobService {

    private resourceUrl = SERVER_API_URL + 'api/empJobs';

    constructor(private http: Http) {
    }
  create(empjob: EmployeeJobModel): Observable<EmployeeJobModel> {
        const copy = this.convert(empjob);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(empjob: EmployeeJobModel): Observable<EmployeeJobModel> {
        const copy = this.convert(empjob);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmployeeJobModel> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
      console.log('====================================', this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res)));
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to JobMySuffix.
     */
    private convertItemFromServer(json: any): EmployeeJobModel {
        const entity: EmployeeJobModel = Object.assign(new EmployeeJobModel(), json);
        return entity;
    }

    /**
     * Convert a JobMySuffix to a JSON which can be sent to the server.
     */
    private convert(job: EmployeeJobModel): EmployeeJobModel {
        const copy: EmployeeJobModel = Object.assign({}, job);
        return copy;
    }
}
