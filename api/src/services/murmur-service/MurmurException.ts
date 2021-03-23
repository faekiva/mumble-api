export class MurmurException extends Error {
    
    public err: Error;

    constructor(err: Error) {
        super();
        this.err = err;
    }

    log() {
        
    }
}