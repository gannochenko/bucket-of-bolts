import React, { useRef } from 'react';
import { object, func } from 'prop-types';

import { defaultTheme, ScrollPanelContainer, Inner } from 'style';

const getHeight = el => el.getBoundingClientRect().height;

export const ScrollPanel = ({ children, theme }) => {
    const inner = useRef();
    const outer = useRef();
    return (
        <ScrollPanelContainer
            theme={theme}
            ref={outer}
            onWheel={e => {
                const outerNode = outer.current;
                const innerNode = inner.current;

                const bH = getHeight(innerNode);
                if (bH === 0) {
                    console.error('ScrollPane: inner node has zero height.'); // eslint-disable-line no-console
                }

                const oH = getHeight(outerNode);
                if (bH <= oH) {
                    return;
                }

                // blocking scroll up
                if (e.deltaY < 0 && outerNode.scrollTop <= 0) {
                    e.preventDefault();
                    return;
                }

                // blocking scroll down
                if (e.deltaY > 0) {
                    if (outerNode.scrollTop + getHeight(outerNode) >= bH) {
                        e.preventDefault();
                    }
                }
            }}
        >
            <Inner theme={theme} ref={inner}>
                {children()}
            </Inner>
        </ScrollPanelContainer>
    );
};

ScrollPanel.propTypes = {
    theme: object,
    children: func,
};

ScrollPanel.defaultProps = {
    theme: defaultTheme,
    children: () => {},
};
