import React from 'react';
import { object, oneOfType, arrayOf } from 'prop-types';

import {
    defaultTheme,
    VerticalTripletContainer,
    Top,
    Middle,
    Bottom,
} from './style';

export const VerticalTriplet = ({ top, bottom, children }) => (
    <VerticalTripletContainer>
        {!!top && <Top>{top}</Top>}
        <Middle>{children}</Middle>
        {!!bottom && <Bottom>{bottom}</Bottom>}
    </VerticalTripletContainer>
);

VerticalTriplet.propTypes = {
    theme: object,
    top: object,
    bottom: object,
    children: oneOfType([object, arrayOf(object)]),
};

VerticalTriplet.defaultProps = {
    theme: defaultTheme,
    top: null,
    bottom: null,
    children: null,
};
