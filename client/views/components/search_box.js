import React from 'react';
import { overrideUrl } from 'libs/location';
import vent from '../../modules/vent';
import Form from '../../base/form';


export default class SearchBox extends Form {
  initState () {
    return { model: {} };
  }

  componentWillMount () {
    vent.on('route:after', this.setQuery, this);
  }

  componentWillUnmount () {
    vent.off('route:after', this.setQuery, this);
  }

  setQuery (ctx) {
    this.setState({ model: { text: ctx.query.q } });
  }

  save (model) {
    vent.trigger('routeTo', overrideUrl({ q: model.text }));
  }

  render () {
    return <form className="m-control-group m-control-group-sm" onSubmit={this.handleSubmit}>
      <input valueLink={this.linkState('model.text')} type="text" className="m-control" placeholder={this.lang.messages.type_search_text} autoFocus={true} />
      <label type="submit" className="m-btn">{this.lang.captions.search}<button type="submit"></button></label>
    </form>;
  }
};
