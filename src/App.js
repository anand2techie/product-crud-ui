import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListProductComponent from "./component/product/ListProductComponent";
import AddProductComponent from "./component/product/AddProductComponent";
import EditProductComponent from "./component/product/EditProductComponent";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <h1 className="text-center" style={style}>React Product Application</h1>
                  <Switch>
                      <Route path="/" exact component={ListProductComponent} />
                      <Route path="/products" component={ListProductComponent} />
                      <Route path="/add-product" component={AddProductComponent} />
                      <Route path="/edit-product" component={EditProductComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;
