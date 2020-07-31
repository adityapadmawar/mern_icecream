import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import IcecreamList from "./components/icecreams-list.component";
import EditIcecream from "./components/edit-icecream.component";
import CreateIcecream from "./components/create-icecream.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={IcecreamList} />
      <Route path="/edit/:id" component={EditIcecream} />
      <Route path="/create" component={CreateIcecream} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
