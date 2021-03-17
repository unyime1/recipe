//user model

export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date
    ) {}
    
    get token() {
        //check login token validity
        if (!this._token || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}