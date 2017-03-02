import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { User }                     from './user.js';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeService {
	private loginUrl = '/login';  // URL to web API
	constructor(private http: Http) { }
	login(user: User): Promise<User> {
		return this.http.post(this.loginUrl, user)
			.toPromise()
			.then(response => response.json() as User)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
