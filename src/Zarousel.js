import React, { Component, PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dots from './Dots';

function setStyle(target, styles) {
  const { style } = target;
  Object.keys(styles).forEach(attri => {
    style[attri] = styles[attri];
  })
}

export default class Zarousel extends (PureComponent || Component) {
  static propTypes = {
    autoPlay: PropTypes.bool,
    autoPlayInterval: PropTypes.number,
    transitionDuration: PropTypes.number,
    showArrow: PropTypes.bool,
    sizeArrow: PropTypes.object,
    colorDot: PropTypes.string,
    sizeDot: PropTypes.object
  };

  static defaultProps = {
    autoPlay: false,
    autoPlayInterval: 3000,
    transitionDuration: 300,
    showArrow: false,
    sizeArrow: {
      width: 30,
      height: 30
    },
    colorDot: '#333',
    sizeDot: {
      width: 10,
      height: 10
    }
  };

  state = {
    indexActive: 0
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const { autoPlay } = this.props;
    const childrenList = this.zarouselList.children;
    this.getZarouselContainerWidth();
    this.setZarouselListWidth(childrenList.length);
    this.setChildrenWidth(childrenList);
    this.setInitPosition();
    autoPlay && this.startAutoPlay();
  }

  startAutoPlay = () => {
    const { autoPlayInterval } = this.props;
    this.autoPlayTimer = setInterval(this.goNext, autoPlayInterval);
  };

  clearAutoPlay = () => {
    clearInterval(this.autoPlayTimer);
  };

  handleDotClick = (index) => () => {
    this.setState({
      indexActive: index
    });
    this.swipeTo(index);
  };

  handleMouseEnter = () => {
    const { autoPlay } = this.props;
    autoPlay && this.clearAutoPlay();
  };

  handleMouseLeave = () => {
    const { autoPlay } = this.props;
    autoPlay && this.startAutoPlay();
  };

  calcRealIndex = (index) => {
    const { children } = this.props;
    const len = children.length;
    let realIndex = index;
    if (index < 0) {
      realIndex = (len - 1);
    } else if (index > (len - 1)) {
      realIndex = 0;
    }
    return realIndex;
  };

  goNext = () => {
    const { indexActive } = this.state;
    this.swipeTo(indexActive + 1);
  };

  goPrev = () => {
    const { indexActive } = this.state;
    this.swipeTo(indexActive - 1);
  };

  resetPosition = (index) => {
    const { transitionDuration, children } = this.props;
    const len = children.length;
    let translateDistance = index < 0 ? ((len - 1) * this.zarouselContainerWidth) : 0;
    setTimeout(() => {
      setStyle(this.zarouselList, {
        transform: `translateX(-${translateDistance}px)`,
        'transitionDuration': `0ms`
      });
      this.isSwiping = false;
    }, transitionDuration)
  };

  swipeTo = (index) => {
    const {
      children,
      transitionDuration
    } = this.props;
    const len = children.length;
    if (this.isSwiping) {
      return;
    }
    this.isSwiping = true;
    if (index < 0 || index > (len - 1)) {
      // 复制的元素的情况
      this.setState({
        indexActive: this.calcRealIndex(index)
      }, () => {
        this.translate(index);
        this.resetPosition(index);
      });
    } else {
      // 正常情况下的切换
      this.setState({
        indexActive: this.calcRealIndex(index)
      }, () => {
        this.translate(index);
        setTimeout(() => {
          this.isSwiping = false;
        }, transitionDuration);
      });
    }
  };

  translate = (index) => {
    const { transitionDuration } = this.props;
    const translateDistance = -(this.zarouselContainerWidth * index);
    setStyle(this.zarouselList, {
      transform: `translateX(${translateDistance}px)`,
      'transitionDuration': `${transitionDuration}ms`
    });
  };

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

  setChildrenWidth = (childrenList) => {
    const len = childrenList.length;
    for (let i = 0; i < len; i++) {
      setStyle(childrenList[i], {
        width: `${100 / len}%`
      });
    }
  };

  setInitPosition = () => {
    setStyle(this.zarouselList, {
      marginLeft: `-${this.zarouselContainerWidth}px`
    });
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

  getStyleArrow = (type) => {
    const { sizeArrow } = this.props
    return {
      display: 'inline-block',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: sizeArrow.width,
      height: sizeArrow.height,
      borderRadius: '50%',
      backgroundColor: '#eee',
      [type]: 10
    };
  };

  render() {
    const {
      children,
      className,
      showArrow,
      colorDot,
      sizeDot
    } = this.props;
    const { indexActive } = this.state;
    return (
      <div
        ref={this.getZarouselContainer}
        className={cx('zarousel-container', className)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          ref={this.getZarouselList}
          className="zarousel-list">
          {this.createChildren(children)}
        </div>
        {showArrow && (
          <div
            className="zarousel-icon--arrow arrow--next"
            style={this.getStyleArrow('right')}
            onClick={this.goNext}
          ></div>)}
        {showArrow && (
          <div
            className="zarousel-icon--arrow arrow--prev"
            style={this.getStyleArrow('left')}
            onClick={this.goPrev}
          ></div>
        )}
        <Dots
          items={children}
          indexActive={indexActive}
          colorDot={colorDot}
          sizeDot={sizeDot}
          handleDotClick={this.handleDotClick}
        />
      </div>
    );
  }
}
