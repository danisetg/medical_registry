export class Patient {
    constructor(
        public doctorAddress: string,
        public address: string,
        public name: string,
        public curp: string,
        public birthday: Date,
        public blood: Number,
        public password: string,
        public cpassword: string
    ) {}
}