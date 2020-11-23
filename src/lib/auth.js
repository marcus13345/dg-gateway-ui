import { EventEmitter } from 'events';
// class EventEmitter {}
import Cookies from 'js-cookie';

class Auth extends EventEmitter {

	_authState = false;

	get authState() {
		return this._authState;
	}

	set authState(val) {
		// console.log('setting auth state', this._authState, val)
		if(this._authState != val) {
			this._authState = val;
			this.emit('authStateChanged', val);
		}
	}

	on(evt, cb) {
		if(evt === 'authStateChanged') {
			cb(this.authState);
		}
		super.on(evt, cb);
	} 

	constructor() {
		super();
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

const auth = new Auth();
export default auth;

// setTimeout(() => auth.login(), 0)

// export default obj;