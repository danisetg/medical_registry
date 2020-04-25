import { Doctor } from './doctor.model';

export class Diagnosis {
    constructor(
        public patientAddress?: string,
        public creationDate?: Date,
        public weight?: Number,
        public height?: Number,
        public description?: string,
        public observations?: string,
        public hashFile?: any[],
        public files?: File[],
        public createdBy?: string,
        public doctor?: Doctor
    ) {}
}
