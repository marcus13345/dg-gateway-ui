import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import lang from './../i18n';

class DgPageForgotPassword extends LitElement {
	static get styles() {
		return css`
			.panel {
				font-size: 13px;
				/* font-weight: 900; */
				background: white;
				border-radius: 15px;
				padding: 24px;

				width: 500px;
			}

			h1 {
				margin: 0px;
				font-size: 2.3em;
				margin-bottom: 8px;
				/* opacity: 0.7; */
				color: #153034;
				font-weight: 100;
				/* font-smoothing */
			}

			span {
				padding-top: 4px;
				display: inline-block;
				/* opacity: 0.7; */
				color: #153034;
			}

			.signup, .cancel {
				color: royalblue;
				cursor: pointer;
				margin-bottom: 16px;
			}

			label {
				/* font-size: 13px; */
				margin-top: 24px;
				opacity: 0.6;
			}


			label, input {
				display: block;
			}

			input {
				width: 100%;
				margin-top: 8px;
				border: 1px solid #EDF0F4;
				outline: none;
				border-radius: 12px;
				padding: 12px 16px;
				box-sizing: border-box;
				box-shadow: 0px 3px 10px rgba(0, 0, 0, .1);
				font-size: 15px;
				color: #606060;
			}

			mx-button {
				width: 100%;
				padding-top: 32px;
				padding-bottom: 16px;
				display: block;
				--color: #006494;
				--height: 44px;
			}

			mx-button::part(button) {
				width: 100%;
			}
		`;
	}

	render() {
		return html`
			<div class="panel">
				<h1>${lang.forgot_password}</h1>
				<span>${lang.dont_have_an_account_yet}</span><br>
				<span
				@click=${() => this.dispatchEvent(new CustomEvent('signup'))}
				class="signup"
				>${lang.sign_up_now}</span>

				<label>${lang.email}</label>
				<input></input>

				<mx-button raised @click=${() => alert('something happens here')}>${lang.submit}</mx-button>
				<span
				@click=${() => this.dispatchEvent(new CustomEvent('cancel'))}
				class="cancel"
				>${lang.cancel}</span>
			</div>
		`;
	}
}

customElements.define('dg-page-forgot-password', DgPageForgotPassword);
