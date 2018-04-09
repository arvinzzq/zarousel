import React, { PureComponent, Component } from 'react';
import cx from 'classnames';

export default class Dots extends (PureComponent || Component) {
  getStyleDot = (index) => {
    const { indexActive, colorDot, sizeDot } = this.props;
    return {
      width: sizeDot.width,
      height: sizeDot.height,
      marginLeft: 5,
      backgroundColor: (index === indexActive) ? colorDot : '#e5e5e5'
    };
  };

  render() {
    const {
      items,
      indexActive,
      handleDotClick
    } = this.props;
    return (
      <ul
        className="zarousel-dot-list"
      >
        {items.map((item, index) => (
          <li
            className={cx('zarousel-dot', {
              'zarousel-dot--active': (index === indexActive)
            })}
            key={index}
            style={this.getStyleDot(index)}
            onClick={handleDotClick(index)}
          />
        ))}
      </ul>
    );
  }
}
