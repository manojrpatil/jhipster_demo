export class EmployeeJobModel  {
    job: Job;
    constructor(
        public id?: number,
      public firstName?: string,
    ) {
    }
}
export class Job {
  constructor(
    public id?: number,
    public jobTitle?: string,
  ) {
  }
}
