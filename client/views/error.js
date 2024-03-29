import React from 'react';
import Component from '../base/component';
import Footer from './components/footer';


export default class ErrorView extends Component {
  title () {
    return this.lang.titles.error;
  }

  render () {
    return <div className="l-layout p-error">
      <div className="p-e-top"></div>
      <div className="p-e-description">
        <h1 className="p-e-d-title">{this.lang.messages.error_title}</h1>
        <p className="p-e-d-message">{this.lang.messages.error_description}</p>
      </div>
      <div className="p-e-bottom"></div>
      <Footer />
    </div>;
  }
}
