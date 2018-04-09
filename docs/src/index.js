import React from 'react';
import ReactDOM from 'react-dom';
import Zarousel from '../../src/Zarousel';
import '../../src/zarousel.css';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <Zarousel
        className="container"
        autoPlay
        showArrow
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
