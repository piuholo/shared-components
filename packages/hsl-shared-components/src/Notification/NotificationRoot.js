import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import Icons from '../Icons';
import { Div, Span } from '../';
import { emitter as EE } from './notification';
import UltraWideContainer from '../UltraWideContainer/UltraWideContainer';

const renderNotificationMessage = (contentItem, idx) => {
  switch (contentItem.type) {
    case 'text':
      return (
        <Span key={idx}>{contentItem.msg}</Span>
      );
    case 'textLink':
      return (
        <a href={contentItem.href} className="text-link" key={idx}>
          <Span>{contentItem.msg}</Span>
        </a>
      );
    case 'title':
      return (
        <h3 key={idx}>
          <Span>{contentItem.msg}</Span>
        </h3>
      );
    case 'titleLink':
      return (
        <a href={contentItem.href} className="title-link" key={idx}>
          <h3 className="link-icon">
            {contentItem.msg}
            <Icons.ArrowLeft fill="#fff" height="0.8em" />
          </h3>
        </a>
      );
    default:
      return null;
  }
};

const renderTypeIcon = (type) => {
  switch (type) {
    case 'success':
      return <Icons.Checkmark fill={{ inner: '#4ea700', outer: '#fff' }} height="1em" />;
    case 'error':
      return <Icons.Alert fill="#fff" height="1em" />;
    case 'neutral':
      return <Icons.PositionAlert height="1em" />;
    default:
      return null;
  }
};

const NotificationBar = UltraWideContainer.extend`
  max-height: 0;
  overflow: hidden;
  color: #fff;
  &.error {
    background-color: #dc0451;
  }
  &.success {
    background-color: #4ea700;
  }
  &.neutral {
    background-color: #fff;
    color: #333;
    .content .message a {
      color: navy;
    }
  }
  .content {
    max-width: 1100px;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon svg {
      height: 2em;
      padding: 0 1em;
    }
    .message {
      padding: 1.5em 0;
      display: flex;
      flex-direction: column;
      ${Span} {
        margin: 0.3em 0;
      }
      h3 {
        margin: 0;
        &.link-icon svg {
          transform: rotate(180deg);
          padding-right: 0.5em;
        }
      }
      a {
        color: inherit;
        &.title-link {
          text-decoration: none;
        }
      }
    }
    .close-button {
      margin-left: auto;
      button {
        background-color: transparent;
        border: none;
        padding: 0 1em 0 0.5em;
        font-size: 1em;
      }
    }
  }
  `;

export default class NotificationRoot extends Component {
  constructor(props) {
    super(props);
    this.timerId = null;
    this.cleanWithAnimation = this.cleanWithAnimation.bind(this);
    this.cleanWithoutAnimation = this.cleanWithoutAnimation.bind(this);
  }
  componentDidMount() {
    EE.on('open', this.props.open);
    EE.on('clean', this.cleanWithAnimation);
    EE.on('cleanNow', this.cleanWithoutAnimation);
  }
  componentWillReceiveProps() {
    this.clearPreviousNotification();
  }
  componentDidUpdate(prevProps) {
    if (
      !_.isEmpty(this.props.notification) &&
      !_.isEqual(this.props.notification, prevProps.notification)
    ) {
      window.scrollTo(0, 0);
      this.notificationBar.animate(
        [
          { maxHeight: '0' },
          { maxHeight: `${this.notificationBar.scrollHeight}px` }
        ], {
          fill: 'forwards',
          easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
          duration: 200
        }
      );
      if (this.props.notification.timeout === true) {
        this.timerId = _.delay(this.cleanWithAnimation,
          _.has(this.props.notification, 'timeoutDelay') ? this.props.notification.timeoutDelay : this.props.timeoutDelay);
      }
    }
  }
  componentWillUnmount() {
    EE.removeListener('open');
    EE.removeListener('clean');
    EE.removeListener('cleanNow');
  }
  clearPreviousNotification() {
    this.notificationBar.style.maxHeight = 0;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
  cleanWithoutAnimation() {
    if (!_.isEmpty(this.props.notification)) {
      this.clearPreviousNotification();
      this.props.clean();
    }
  }
  cleanWithAnimation() {
    if (!_.isEmpty(this.props.notification)) {
      this.notificationBar.animate(
        [
          { maxHeight: `${this.notificationBar.clientHeight}px` },
          { maxHeight: '0' }
        ], {
          fill: 'forwards',
          duration: 100
        }
      );
      _.delay(() => this.props.clean(), 100);
    }
  }

  renderCloseButton(notification) {
    return (
      <Div className="close-button">
        <button onClick={this.cleanWithAnimation}>
          <Icons.Cross fill={notification.type === 'neutral' ? '#333' : '#fff'} height="1.5em" />
        </button>
      </Div>
    );
  }

  render() {
    const notification = this.props.notification;
    return (
      <NotificationBar
        innerRef={(ref) => { this.notificationBar = ref; }}
        className={`${notification.type}`}
      >
        <Div className="content">
          <Div className="icon">
            {renderTypeIcon(notification.type)}
          </Div>
          <Div className="message">
            {notification.content && notification.content.map((contentItem, idx) =>
              renderNotificationMessage(contentItem, idx)
            )}
          </Div>
          {notification.closeButton && this.renderCloseButton(notification)}
        </Div>
      </NotificationBar>
    );
  }
}

NotificationRoot.propTypes = {
  notification: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.func.isRequired,
  clean: PropTypes.func.isRequired,
  timeoutDelay: PropTypes.number.isRequired
};
