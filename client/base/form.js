import React from 'react';
import _ from 'lodash';
import ReactLink from 'react/lib/ReactLink';
import error from '../modules/error';
import { getValue, updateValue } from 'libs/utils';
import Component from './component';
import { format } from 'libs/utils';


export default class Form extends Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lockForm = this.lockForm.bind(this);
    this.unlockForm = this.unlockForm.bind(this);
  }

  _linkStateChange (keyPath, value) {
    updateValue(keyPath, value, this.state);
    this.setState(this.state);
  }

  _linkValue (keyPath) {
    return getValue(keyPath, this.state);
  }

  showError (code) {
    let message = error(code);
    this.showMessage('error', message);
  }

  showSuccess () {
    this.showMessage('success', this.lang.messages.success);
  }

  showMessage (type, text) {
    this.setState({ message: { type, text } });
    this.forceUpdate();
  }

  handleAPIError (xhr) {
    let response = xhr.responseJSON;
    let messages = [];

    if (_.has(response, 'error.fields')) {
      _.forEach(response.error.fields, (field) => {
        messages.push(field.message);
      });
    } else {
      messages.push(response.error.message);
    }

    this.showMessage('error', messages.join('\n'));
  }

  lockForm () {
    this.setState({ formLocked: true });
    this.forceUpdate();
  }

  unlockForm () {
    this.setState({ formLocked: false });
    this.forceUpdate();
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.formLocked) return;

    let model = _.clone(this.state.model);
    this.save(model);
  }

  linkState (keyPath) {
    return new ReactLink(
      this._linkValue.call(this, keyPath),
      this._linkStateChange.bind(this, keyPath)
    );
  }
}
