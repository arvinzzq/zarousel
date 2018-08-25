# Zarousel


[![NPM version](https://img.shields.io/npm/v/zarousel.svg)](https://www.npmjs.com/package/zarousel)
[![Build Status](https://travis-ci.org/zz1211/zarousel.svg?branch=master)](https://travis-ci.org/zz1211/zarousel)
[![NPM downloads](http://img.shields.io/npm/dt/zarousel.svg?style=flat-square)](https://npmjs.org/package/zarousel)

A react component of carousel

## Installation

```
npm i zarousel --save
```

## Usage

```javascript
import React from 'react';
import Zarousel from 'zarousel';
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
swipeTo|function(index)|--|control zarousel by index of slide that is 0 based
goPrev|function|--|swipe to previous slide of zarousel
goNext|function|--|swipe to next slide of zarousel
onChange|function(previousIndex, currentIndex)|noop|callback when zarousel is changed
