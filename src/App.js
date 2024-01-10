import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';

class App extends Component {

  render() {
    const ulStyle = {
      background: "blue", marginTop: "0", listStyle: "none", 
      color: "white", padding: "20px 0px",
      display: "flex", justifyContent: "space-around"
     };

     const linkStyle = {textDecoration: "none", color: "#fff"};
     
    return (
      <div>
        <ul style={ulStyle}>
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/secret" style={linkStyle}>Secret</Link></li>
          <li><Link to="/login" style={linkStyle}>Login</Link></li>
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
