import React from 'react';
import moment from 'moment';
import Component from '../../base/component';
import Dropdown from './dropdown';
import currentUser from '../../stores/current_user';


export default class Post extends Component {
  render () {
    let { post } = this.props.data;
    let hasImage = post.image_urls && post.image_urls.length > 0;
    let postDropdownId = `post-${post._id}-dropdown`;
    let isOwner = post.user._id === currentUser.get('_id');

    return <div className="c-post m-panel">
      <div className="c-p-header m-p-body">
        <div className="c-p-h-left">
          <div className="c-p-h-l-avatar" style={{ backgroundImage: `url(${post.user.image_url})` }}></div>
          <div className="c-p-h-l-info">
            <div className="c-p-h-l-i-author">{post.user.full_name}</div>
            <div className="c-p-h-l-i-time">{moment(post.created).fromNow()}</div>
          </div>
        </div>
        <div className="c-p-h-right">
          <i className="icon-more" data-dropdown-toggle={postDropdownId}></i>
          <Dropdown id={postDropdownId}>
            <ul className="c-d-menu">
              {isOwner
                ? <li>
                    <span>{this.lang.captions.delete}</span>
                  </li>
                : <li className="c-d-m-static">
                    <span>No available actions</span>
                  </li>
              }
            </ul>
          </Dropdown>
        </div>
      </div>
      {hasImage
        ?
          <div className="m-p-body c-p-slider">
            <div className="c-p-shadow">
              <img className="c-p-s-image" src={post.image_urls[0]} />
            </div>
          </div>
        : false
      }
      <div className="c-p-info m-p-body">
        <div className="c-p-i-icon">
          <i className="icon-pin"></i>
        </div>
        <div className="c-p-i-address">{post.address}</div>
      </div>
      <div className="c-p-description">
        <p>
          {post.description}
        </p>
      </div>
      <div className="c-p-footer">
        <div className="c-p-f-actions">
          <button type="button" className="m-btn m-btn-sm c-p-f-a-like">
            <i className="icon-like"></i>0
          </button>
          <button type="button" className="m-btn m-btn-sm">
            <i className="icon-upcoming"></i>{this.lang.captions.add_event}
          </button>
        </div>
      </div>
    </div>;
  }
}
