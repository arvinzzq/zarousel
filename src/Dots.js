import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Dots extends (PureComponent || Component) {

  static propTypes = {
    items: PropTypes.array.isRequired,
    indexActive: PropTypes.number.isRequired,
    handleDotClick: PropTypes.func.isRequired,
    colorDots: PropTypes.string
  };

  static defaultProps = {
    colorDots: '#333'
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
              'dot--active': (index === indexActive)
            })}
            key={index}
            onClick={handleDotClick(index)}
          />
        ))}
      </ul>
    );
  }
}
