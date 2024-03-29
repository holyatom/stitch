import _ from 'lodash';
import React from 'react';
import Component from '../../base/component';
import FolloweeModel from '../../models/followee';
import userActions from '../../actions/user';


const TOGGLE_LIMIT = 200;

export default class FollowToggle extends Component {

  constructor (props) {
    super(props);
    this.handleToggle = _.debounce(this.handleToggle.bind(this), TOGGLE_LIMIT);
  }

  initState (props) {
    return {
      isFollowed: props.user.is_followed,
    };
  }

  handleToggle () {
    let followee = new FolloweeModel({_id: this.props.user.username});

    let dfd;
    if (this.state.isFollowed) {
      dfd = followee.destroy();
    } else {
      dfd = followee.save(null, {
        type: 'POST',
      });
    }

    dfd.then(() => {
      let isFollowed = !this.state.isFollowed;
      this.setState({isFollowed});

      if (isFollowed) {
        userActions.follow();
      } else {
        userActions.unfollow();
      }
    });
  }

  render () {
    return <button
      className={this.cx('m-btn m-btn-block m-btn-sm m-btn-success', { active: this.state.isFollowed })}
      onClick={this.handleToggle}>
      {this.state.isFollowed ? this.lang.captions.unfollow : this.lang.captions.follow}
    </button>;
  }
}
