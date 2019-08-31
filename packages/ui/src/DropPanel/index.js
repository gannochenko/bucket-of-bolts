/**
 * todo: apply effects on show/hide, open "up" if there is no room at the bottom
 */

import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import { defaultTheme, DropPanelContainer, Panel, PanelInner } from 'packages/ui/src/DropPanel/style';

export class DropPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.panel = React.createRef();
        this.preventClose = false;
    }

    componentDidMount() {
        if (!this.props.disableEvents) {
            window.addEventListener('click', this.onDocumentClick);
            window.addEventListener('keydown', this.onDocumentKeyPress);
        }
        if (this.props.open) {
            this.open();
        }
    }

    componentWillUnmount() {
        if (!this.props.disableEvents) {
            window.removeEventListener('click', this.onDocumentClick);
            window.removeEventListener('keydown', this.onDocumentKeyPress);
        }
    }

    onDocumentClick = e => {
        if (!this.state.open) {
            return;
        }

        if (this.preventClose) {
            return;
        }

        let node = e.target;
        while (node) {
            if (node === this.panel.current) {
                clearTimeout(this.timer);
                this.timer = null;
                return;
            }
            node = node.parentNode;
        }

        this.closeImmediate();
    };

    onDocumentKeyPress = e => {
        if (!this.state.open) {
            return;
        }

        if (e.code === 'Escape') {
            this.closeImmediate();
        }
    };

    open(options) {
        options = options || {};
        const { preventClose } = options;

        if (preventClose) {
            this.preventClose = true;
        }

        this.setState({
            open: true,
        });
        if (preventClose) {
            setTimeout(() => {
                this.preventClose = false;
            }, 100);
        }
    }

    close = () => {
        this.timer = setTimeout(() => {
            this.timer = null;
            this.closeImmediate();
        }, 300);
    };

    toggle = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    closeImmediate = () => {
        this.setState({
            open: false,
        });
        this.props.onClose();
    };

    render() {
        const { children, theme, panel, openOnChildrenClick } = this.props;
        return (
            <DropPanelContainer ref={this.panel}>
                {!!openOnChildrenClick && (
                    <div onClick={this.toggle}>
                        {children({ closePanel: this.close })}
                    </div>
                )}
                {!openOnChildrenClick && children({ closePanel: this.close })}
                <Panel theme={theme} open={this.state.open}>
                    <PanelInner theme={theme}>
                        {panel({ closePanel: this.close })}
                    </PanelInner>
                </Panel>
            </DropPanelContainer>
        );
    }
}

DropPanel.propTypes = {
    theme: object,
    panel: func,
    children: func,
    openOnChildrenClick: bool,
    disableEvents: bool,
    onClose: func,
    open: bool,
};

DropPanel.defaultProps = {
    theme: defaultTheme,
    panel: () => {},
    children: () => {},
    openOnChildrenClick: false,
    onClose: () => {},
    disableEvents: false,
    open: false,
};
