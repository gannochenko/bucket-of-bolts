import React from 'react';
import { object } from 'prop-types';

import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import {
    defaultTheme,
    NotificationContainer,
    Message,
    MessageGap,
    MessageWrap,
    Text,
    Close,
} from './style';

const isne = str => isString(str) && str.length > 0;
const ione = obj => isObject(obj) && Object.keys(obj).length > 0;

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.messageHeights = {};
        this.messages = [];
    }

    notify(message) {
        if (isne(message)) {
            message = {
                text: message,
                type: 'info',
            };
        }

        if (!ione(message) || !isne(message.text)) {
            return;
        }

        if (isne(message.code)) {
            this.closeMessagesByCode(message.code);
        }

        const id = Math.floor(Math.random() * 1000000);
        message = {
            id,
            text: message.text,
            type: message.type || '',
            icon: message.icon || '',
            closeable: message.closeable !== false,
            closing: false,
            code: message.code,
            lifeTime: message.lifeTime || 0,
        };

        if (message.lifeTime > 0) {
            setTimeout(() => {
                this.closeMessage(id);
            }, message.lifeTime);
        }

        this.messages.push(message);

        this.forceUpdate();
    }

    closeMessage(id) {
        const message = this.messages.find(item => item.id === id);

        if (message) {
            const heightNode = this.messageHeights[id];
            if (heightNode) {
                // lock the height of the element to let the animation know it
                heightNode.style.height = `${heightNode.offsetHeight}px`;
            }

            setTimeout(() => {
                this.removeMessage(id);
            }, 500);

            message.closing = true;

            this.forceUpdate();
        }
    }

    closeMessagesByCode(code) {
        this.messages
            .filter(message => message.code === code)
            .forEach(message => {
                this.closeMessage(message.id);
            });
    }

    removeMessage(id) {
        this.messages = this.messages.filter(message => message.id !== id);
        delete this.messageHeights[id];
        this.forceUpdate();
    }

    render() {
        const { theme } = this.props;
        return (
            <NotificationContainer theme={theme}>
                {this.messages.map(message => (
                    <MessageWrap
                        key={message.id}
                        ref={ref => {
                            this.messageHeights[message.id] = ref;
                        }}
                        closing={message.closing}
                        theme={theme}
                    >
                        <MessageGap theme={theme}>
                            <Message theme={theme}>
                                <Text
                                    type={message.type}
                                    icon={message.icon}
                                    theme={theme}
                                >
                                    {message.text}
                                </Text>
                                {message.closeable && (
                                    <Close
                                        onClick={() =>
                                            this.closeMessage(message.id)
                                        }
                                        theme={theme}
                                    />
                                )}
                            </Message>
                        </MessageGap>
                    </MessageWrap>
                ))}
            </NotificationContainer>
        );
    }
}

Notification.propTypes = {
    theme: object,
};

Notification.defaultProps = {
    theme: defaultTheme,
};

export default Notification;
