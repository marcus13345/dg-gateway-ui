import { EventEmitter } from 'events';
import Cookies from 'js-cookie';

class Auth extends EventEmitter {

	_authState = false;

	get authState() {
		return this._authState;
	}

	set authState(val) {
		if(this._authState != val) {
			this._authState = val;
			this.emit('authStateChanged', {data: {
				auth: val
			}});
		}
	}

	constructor() {
		this.loadAuthState();
	}

	login() {
		if(this.authState) return;
		this.authState = true;
		this.persistAuthState();
	}

	logout() {
		if(!this.authState) return;
		this.authState = false;
		this.persistAuthState();
	}

	loadAuthState() {
		if(Cookies.get('auth')) {
			this.authState = true;
		} else {
			this.authState = false;
		}
	}

	persistAuthState() {
		if(this.authState) {
			Cookies.set('auth', true);
		} else {
			Cookies.remove('auth');
		}
	}
}



module.exports = new Auth();