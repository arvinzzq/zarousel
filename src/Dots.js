import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Dots extends (PureComponent || Component) {
  static propTypes = {
    items: PropTypes.array.isRequired,
    indexActive: PropTypes.number.isRequired,
    handleDotClick: PropTypes.func.isRequired,
    colorDot: PropTypes.string,
    sizeDot: PropTypes.object
  };

  static defaultProps = {
    colorDot: '#333',
    sizeDot: {
      width: 10,
      height: 10
    }
  };

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
