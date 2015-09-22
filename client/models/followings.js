import Collection from '../base/collection';


export default class Followings extends Collection {
  urlPath () {
    return `/users/${this.username}/following`;
  }
}
