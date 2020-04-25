export class Patient {
    constructor(
        public address?: string,
        public name?: string,
        public curp?: string,
        public birthday?: Date,
        public blood?: string,
        public mobile?: string,
        public genre?: string,        
        public password?: string,
        public cpassword?: string,
        public hashProfileImg: string = 'QmTK3tw4NaENb8C9L4XuDnhSDPAxiP577BY3MR3m4VKZ7u',
        public imageUrl?: string,
        public imageFile?: File
    ) {}
}