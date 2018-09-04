import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    render() {
      let ComponentToReturn;
      if (Cookie.get('token')) {
        ComponentToReturn = <ComponentToProtect {...this.props} />
      } else {
        ComponentToReturn = <Redirect to="/login" />
      }
      
      return ComponentToReturn
    }
  }
}