## Zarousel
A react component of carousel

## Installation

```
npm i zarousel --save
```

## Usage

```javascript
import React from 'react';
import Zarousel from 'Zarousel';
import 'zarousel/lib/zarousel.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
```

## Props

Property|Type|Default|Description
---|---|---|---
autoPlay|boolean|true|whether autoplay carousel
autoPlayInterval|number|3000(ms)|interval time of autoplay
transitionDuration|number|300(ms)|transition duration of carousel
showArrow|boolean|false|whether show icon of arrow to control play of carousel
sizeArrow|object|{width: 30, height: 30}|size of icon of arrow
colorDot|string|'#333'|color of active dot
sizeDot|object|{width: 10, height: 10}|size of dot
