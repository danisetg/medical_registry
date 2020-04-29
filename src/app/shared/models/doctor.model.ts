export class Doctor {
    constructor(
        public address?: string,
        public name?: string,
        public specialization?: string,
        public email?: string,
        public joiningDate?: string,
        public idCard?: string,
        public password?: string,
        public cpassword?: string,
        public hashProfileImg: string = 'QmTK3tw4NaENb8C9L4XuDnhSDPAxiP577BY3MR3m4VKZ7u',
        public imageUrl?: string,
        public imageFile?: File,
        public status?: boolean,
        public changingStatus?: boolean
    ) {}
}
