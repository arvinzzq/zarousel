import React, { Component, PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


// set style of target element.
function setStyle(target, styles) {
  const { style } = target;
  Object.keys(styles).forEach(attri => {
    style[attri] = styles[attri];
  })
}

export default class Zarousel extends (PureComponent || Component) {
  static propTypes = {};

  static defaultProps = {};

  state = {
    countSlide: 4
  };

  componentDidMount() {
    const { children } = this.props;
    console.log('children: ', children);
    console.log('children of list: ', this.zarouselList.children);
    this.init();
  }

  init() {
    const childrenList = this.zarouselList.children;
    this.getZarouselContainerWidth();
    const len = childrenList.length;
    this.setZarouselListWidth(len);
    for(let i = 0; i < len; i++) {
      setStyle(childrenList[i], {
        width: `${100 / len}%`
      });
    }
  }

  handleDotClick = (index) => () => {
    console.log('index: ', index);
    console.log('next is clicked ~');
    const realDuration = 300;
    const translateDistance = -200 * index;
    setStyle(this.zarouselList, {
      transform: `translateX(${translateDistance}px)`,
      'transitionDuration': `${realDuration}ms`
    });
  };

  calcTranslateDistance = (index, preIndex) => {

  };

  switchSlide() {
  }

  getZarouselContainer = (zarousel) => {
    this.zarouselContainer = zarousel;
  };

  getZarouselList = (list) => {
    this.zarouselList = list;
  };

  getZarouselContainerWidth = () => {
    this.zarouselContainerWidth = this.zarouselContainer.getBoundingClientRect().width;
  };
  setZarouselListWidth = (countElements) => {
    setStyle(this.zarouselList, {
      width: `${this.zarouselContainerWidth * countElements}px`
    })
  };
  createChildren = (children) => {
    const len = Children.count(children);
    if (len <= 1) {
      return children;
    }
    const createdChildren = new Array(len + 2);
    createdChildren[0] = children[len - 1];
    createdChildren[len + 1] = children[0];
    Children.forEach(children, (child, index) => {
      createdChildren[index + 1] = child
    });
    return Children.map(createdChildren, (child, index) =>
      cloneElement(child, {
        key: index,
        style: {
          float: 'left',
          height: '100%',
          width: this.zarouselContainerWidth
        }
      }));
  };

  render() {
    const { children, className } = this.props;
    return (
      <div
        ref={this.getZarouselContainer}
        className={cx('zarousel-container', className)}
      >
        <div
          ref={this.getZarouselList}
          className="zarousel-list">
          {this.createChildren(children)}
        </div>
        <div
          className="zarousel-dot"
          onClick={this.handleDotClick(1)}
        >
          next1
        </div>
        <div
          className="zarousel-dot"
          onClick={this.handleDotClick(2)}
        >
          next2
        </div>
        <div
          className="zarousel-dot"
          onClick={this.handleDotClick(3)}
        >
          next3
        </div>
        <div
          className="zarousel-dot"
          onClick={this.handleDotClick(4)}
        >
          next4
        </div>
      </div>
    );
  }
}
