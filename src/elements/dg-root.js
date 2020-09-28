import { LitElement, html, css } from 'lit-element';
import Cookies from 'js-cookie';

class DgRoot extends LitElement {

	auth = false;

	firstUpdated() {
		if (Cookies.get('token')) {
			this.auth = true;
		}
	}

	static get properties() {
		return {
			auth: { type: Boolean }
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
		`;
	}

	render() {
		return html`
			${(() => {
				if(this.auth) return html`
					<mx-sidebar>
						<div slot="sidebar">
							<dg-sidebar></dg-sidebar>
						</div>
						<div slot="content">
							<dg-header></dg-header>
							<dg-page-dashboard>

							</dg-page-dashboard>
						</div>
					</mx-sidebar>
				`;
				else return html`
					<dg-page-login @authStateChange=${(evt) => console.log(evt)}></dg-page-login>
				`
			})()}
		`;
	}
}

customElements.define('dg-root', DgRoot);