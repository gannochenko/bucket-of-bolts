/**
 * Todo:
 * * close by overlay click
 * * mouse wheel prevent default
 * * close by escape
 */

import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import {
    Overlay,
    Panel,
    PanelOffset,
    Cross,
    Question,
    Buttons,
    defaultTheme,
} from './style';

export class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            children: null,
        };
        this.panelReference = React.createRef();
    }

    componentDidMount() {
        if (this.props.closeOnEscape) {
            window.document.addEventListener('keydown', this.onEscapePress);
        }
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.onEscapePress);
    }

    open = children => {
        this.setState({ open: true, children });
    };

    close = () => {
        this.setState({ open: false, children: () => {} });
    };

    openExternal = children => {
        if (this.props.active) {
            this.open(children);
        }
    };

    closeExternal = () => {
        if (this.props.active) {
            this.close();
        }
        this.props.onClose();
    };

    onOpenClick = () => {
        this.openExternal();
    };

    onCloseClick = () => {
        this.closeExternal();
    };

    onOverlayClick = e => {
        if (!this.props.closeOnOverlayClick) {
            return;
        }

        let inside = false;
        let next = e.target;
        while (next) {
            if (next === this.panelReference.current) {
                inside = true;
                break;
            }

            next = next.parentElement;
        }

        if (!inside) {
            this.closeExternal();
        }
    };

    onEscapePress = e => {
        if (e.key === 'Escape') {
            this.closeExternal();
        }
    };

    openConfirm = (
        question = 'A very important question',
        buttons = () => {},
    ) => {
        this.openExternal((...args) => (
            <>
                <Question>{question}</Question>
                <Buttons>{buttons(...args)}</Buttons>
            </>
        ));
    };

    render() {
        const { children, central, active, open, theme } = this.props;
        const stateChildren = this.state.children;
        if (!active && !open) {
            return null;
        }

        if (active && !this.state.open) {
            return null;
        }

        return (
            <Overlay
                central={central}
                onWheel={e => e.preventDefault()}
                theme={theme}
                onClick={this.onOverlayClick}
            >
                <Panel theme={theme} ref={this.panelReference}>
                    <Cross theme={theme} onClick={this.onCloseClick} />
                    <PanelOffset theme={theme}>
                        {!!stateChildren &&
                            stateChildren({ closeModal: this.onCloseClick })}
                        {!stateChildren &&
                            children({ closeModal: this.onCloseClick })}
                    </PanelOffset>
                </Panel>
            </Overlay>
        );
    }
}

Modal.propTypes = {
    active: bool, // if active is set to true, the modal controls whether it is open or not internally
    open: bool,
    onClose: func,
    central: bool,
    theme: object,
    children: func,
    closeOnOverlayClick: bool,
    closeOnEscape: bool,
};

Modal.defaultProps = {
    active: false,
    open: false,
    onClose: () => {},
    central: false,
    theme: defaultTheme,
    children: () => {},
    closeOnOverlayClick: false,
    closeOnEscape: false,
};
