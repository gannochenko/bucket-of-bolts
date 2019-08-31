import styled from 'styled-components';

export const defaultTheme = {
    zIndex: null,
    panelVOffset: '0',
};

export const DropPanelContainer = styled.div`
    position: relative;
`;

export const Panel = styled.div`
    position: absolute;
    left: 0;
    top: 100%;
    ${props =>
        props.theme.zIndex !== null ? `z-index: ${props.theme.zIndex};` : ''}
    ${props => (props.open ? '' : 'display: none;')}
    margin-bottom: 1rem;
`;

export const PanelInner = styled.div`
    margin-top: ${props =>
        props.theme.panelVOffset ? props.theme.panelVOffset : ''};
`;
