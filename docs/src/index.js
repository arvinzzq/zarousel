import React from 'react';
import ReactDOM from 'react-dom';
import Zarousel from '../../src/zarousel.js';
import '../../src/zarousel.css';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Zarousel
        className="container"
        autoPlay={true}
        showArrow={true}
      >
        <div className="slide">1</div>
        <div className="slide">2</div>
        <div className="slide">3</div>
        <div className="slide">4</div>
        <div className="slide">5</div>
        <div className="slide">6</div>
      </Zarousel>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
