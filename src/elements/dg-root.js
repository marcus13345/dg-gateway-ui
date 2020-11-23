import { LitElement, html, css, unsafeCSS } from 'lit-element';
import auth from './../lib/auth';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import dgLogo from './../res/DG-logos-01.svg';
import { LOGIN, DASHBOARD, OPERATIONS, RESET, SIGNUP } from './../lib/pages';
import background from './../res/dynamic grid backgrounds_transparent 12% (1).png';

class DgRoot extends LitElement {

	authState = false;
	page = LOGIN

	firstUpdated() {
		auth.on('authStateChanged', (evt) => {
			this.authState = evt;
			if(evt) this.page = DASHBOARD;
		})
	}

	static get properties() {
		return {
			authState: { type: Boolean },
			page: { type: String }
		}
	}

	static get styles() {
		return css`
			mx-sidebar::part(sidebar) {
				background: #122E33;
				width: 225px;
			}

			mx-sidebar::part(content) {
				background: #E6EDF1;
			}

			
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
				width: 100%;
				height: 100%;
				background: #E6EDF1;
			}

			.content .overlay {
				background: url(${unsafeCSS(background)});
				background-size: cover;
				width: 100%;
				height: 100%;

				display: grid;
				place-items: center center;
			}

			.logo {
				display: grid;
				place-items: center center;
			}

			.logo svg {
				height: 30px;
			}
		`;
	}

	render() {
		return html`
			${(() => {
				if(this.authState) return html`
					<mx-sidebar>
						<div slot="sidebar">
							<dg-sidebar selected=${this.page} @navigate=${(evt) => this.page = evt.detail}></dg-sidebar>
						</div>
						<div slot="content">
							<dg-header></dg-header>
							${(() => {
								switch (this.page) {
									case DASHBOARD: {
										return html`
											<dg-page-dashboard
											></dg-page-dashboard>
										`;
									}
									case OPERATIONS: {
										return html`
											<dg-page-operations
											></dg-page-operations>
										`;
									}
								}
							})()}

						</div>
					</mx-sidebar>
				`;
				else return html`
					
					<div class="root">
						<div class="header">
							<div class="logo">
								${unsafeHTML(dgLogo)}
							</div>
							<dg-header></dg-header>
						</div>
						<div class="content">
							<div class="overlay">
								${(() => {
									switch (this.page) {
										case LOGIN: {
											return html`
												<dg-page-login
												@signup=${(evt) => this.page = SIGNUP}
												@forgotPassword=${(evt) => this.page = RESET}
												></dg-page-login>
											`;
										}
										case RESET: {
											return html`
												<dg-page-forgot-password
												@signup=${(evt) => this.page = SIGNUP}
												@cancel=${(evt) => this.page = LOGIN}
												></dg-page-forgot-password>
											`;
										}
										case SIGNUP: {
											return html`
												<dg-page-signup
												@signup=${(evt) => this.page = SIGNUP}
												@cancel=${(evt) => this.page = LOGIN}
												></dg-page-signup>
											`;
										}
									}
								})()}
							</div>
						</div>
					</div>

				`
			})()}
		`;
	}
}

customElements.define('dg-root', DgRoot);