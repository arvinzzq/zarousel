import React from 'react';
import ReactDOM from 'react-dom'
import Zarousel from '../../src/zarousel';
import '../../src/zarousel';
import './index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        heiheihei
        <Zarousel />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
