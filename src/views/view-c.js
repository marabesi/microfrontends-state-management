// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';
import  'wired-card';
import 'wired-checkbox';
import 'wired-spinner';

// Extend the LitElement base class
class ViewC extends LitElement {

  static get styles() {
    return css`
    :host {
      --wired-icon-bg-color: red;
      --wired-item-selected-bg: green;
    }`;
  }

  static get properties() {
    return {
      spinning: { type: Boolean },
    }
  }

  render(){
    return html`
      <!-- template content -->
      <wired-card elevation="5">
        <h4>Micro Frontend 3</h4>
        <wired-checkbox id="cbox" @change="${(e) => {
          PubSub.publish('broadcast-channel', e.detail.checked);
          this.spinning = false;
        }}">Off all</wired-checkbox>
        <section>
            <wired-spinner id="sp" ?spinning="${this.spinning}"></wired-spinner>
        </section>
      </wired-card>
    `;
  }

  constructor() {
    super();
    this.spinning = false;
  }

  connectedCallback() {
    super.connectedCallback();
    //Subscribe to channel
    PubSub.subscribe('spinner-channel').on((value) => {
        this.spinning = !this.spinning;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //Subscribe to channel
    PubSub.unsubscribe('spinner-channel');
  }

}
// Register the new element with the browser.
customElements.define('view-c', ViewC);
