import React, { Component } from 'react';
import './App.css';

import FileUpload from './components/FileUpload';


class App extends Component {
  render() {
    return (
      <div className="container">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react">React File Upload</i>
        </h4>
        <FileUpload />
      </div>
    );
  }
}

export default App;
