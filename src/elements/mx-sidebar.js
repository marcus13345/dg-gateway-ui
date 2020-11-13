import { LitElement, html, css } from 'lit-element';

class Sidebar extends LitElement {
	static get styles() {
		return css`
			:host {
				display: initial;
			}

			.grid {
				width: 100vw;
				height: 100vh;
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: auto;
			}

			.sidebar {
				background: #f0f0f0;
				transition: width 300ms;
				overflow: hidden;
				width: 250px;
			}

			.sidebar.hidden {
				width: 0px;
			}

			.content {
			}
		`;
	}

	render() {
		return html`
			<div class="grid">
				<div class="sidebar" part="sidebar">
					<slot name="sidebar"></slot>
				</div>
				<div class="content" part="content">
					<slot name="content"></slot>
				</div>
			</div>
		`;
	}
}

customElements.define('mx-sidebar', Sidebar);