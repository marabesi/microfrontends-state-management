// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';
import 'wired-card';
import 'wired-input';
import 'wired-button';
import 'wired-listbox';
import "wired-icon-button";


// Extend the LitElement base class
class ViewA extends LitElement {

  static get styles() {
    return css`
    :host {
      --wired-icon-bg-color: red;
      --wired-item-selected-bg: green;
    }`;
  }

  static get properties() {
    return {
      value: { type: String },
      buttonDisabled: {
        type: Boolean,
        attribute: 'button-disabled'
      },
    }
  }

  render(){
    return html`
      <!-- template content -->
      <wired-card elevation="5">
        <h4>Micro Frontend 1</h4>
        <wired-input id="inputValue" placeholder="Enter value" .value="${this.value}"></wired-input>
        <wired-button id="btn" @click="${() => PubSub.publish('value-channel', this.value)}">Submit</wired-button>
        <p> Input a value or select one in listbox</p>
        <section>
          <wired-listbox id="combo" horizontal @selected="${(e) => { this.value = e.detail.selected; }}">
            <wired-item value="one">0</wired-item>
            <wired-item value="two">25</wired-item>
            <wired-item value="three">50</wired-item>
            <wired-item value="four">75</wired-item>
          </wired-listbox>
          <wired-icon-button id="iconBtn" class="red" ?disabled="${this.buttonDisabled}"  @click="${(e) => PubSub.publish('spinner-channel')}">cached</wired-icon-button>
        </section>
      </wired-card>
    `;
  }

  constructor() {
    super();
    this.value = '';
    this.buttonDisabled = true;
  }

  connectedCallback() {
    super.connectedCallback();
    //Subscribe to channel
    PubSub.subscribe('favorite-channel').on((value) => {
      this.buttonDisabled = !value;
    });

    //Subscribe to channel
    PubSub.subscribe('broadcast-channel').on((value) => {
      this.buttonDisabled = value;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //Subscribe to channel
    PubSub.unsubscribe('favorite-channel');
    PubSub.unsubscribe('broadcast-channel');
  }
}
// Register the new element with the browser.
customElements.define('view-a', ViewA);
