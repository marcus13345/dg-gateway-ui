import { LitElement, html, css } from 'lit-element'
import './elements';
import './pages';
import * as globalCss from './global.css';
import operationsIcon from './res/operations.svg';

import './lib/db.js';

// TODO create an html file base and css base
document.write(`<style>${globalCss}</style>`)
document.write('<dg-root></dg-root>');
// document.write(`<svg src="${operationsIcon.substr(1)}"></svg>`);