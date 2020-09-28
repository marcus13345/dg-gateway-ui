import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import dgLogo from './../res/DG-logos-01.svg';
import lang from './../i18n';
import auth from './../lib/auth';

class DgPageLogin extends LitElement {
	static get styles() {
		return css`
			.root {
				display: grid;
				grid-template-rows: 48px 1fr;
				height: 100vh;
			}

			.header {
				display: grid;
				grid-template-columns: 250px 1fr;
			}

			.content {
				display: grid;
				place-items: center center;
				background: #E6EDF1;
			}

			.logo svg {
				height: 30px;
			}

			.logo {
				display: grid;
				place-items: center center;
			}

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

			.signup {
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
				border-radius: 5px;
				padding: 12px 16px;
				box-sizing: border-box;
				box-shadow: 0px 3px 10px rgba(0, 0, 0, .1);
				font-size: 15px;
				color: #606060;
			}

			mx-button {
				width: 100%;
				padding-top: 24px;
				display: block;
				--color: #006494;
			}

			mx-button::part(button) {
				width: 100%;
			}
		`;
	}

	render() {
		return html`
			<div class="root">
				<div class="header">
					<div class="logo">
						${unsafeHTML(dgLogo)}
					</div>
					<dg-header></dg-header>
				</div>
				<div class="content">
					<div class="panel">
						<h1>${lang.sign_in}</h1>
						<span>${lang.dont_have_an_account_yet}</span><br>
						<span class="signup">${lang.sign_up_now}</span>

						<label>${lang.email}</label>
						<input></input>
						
						<label>${lang.password}</label>
						<input type="password"></input>

						<mx-button raised @click=${() => auth.login()}>${lang.sign_in}</mx-button>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('dg-page-login', DgPageLogin);
