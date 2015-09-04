import React from 'react';
import BaseRouter from './base/router';
import vent from './modules/vent';

import Welcome from './views/welcome';
import Signin from './views/signin';
import Signup from './views/signup';
import User from './views/user';


class Router extends BaseRouter {
  constructor () {
    super();
    vent.on('user:signin', () => this.routeTo('/user'));
    vent.on('user:signout', () => this.routeTo('/'));
  }

  router () {
    this.route('/', (ctx, done) => {
      this.renderView(<Welcome />, done);
    });

    this.route('/signin', (ctx, done) => {
      this.renderView(<Signin />, done);
    });

    this.route('/signup', (ctx, done) => {
      this.renderView(<Signup />, done);
    });

    this.route('/user', (ctx, done) => {
      this.renderView(<User />, done);
    });
  }
}

export default new Router();
