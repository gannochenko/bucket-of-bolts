import React from 'react';

export const Context = React.createContext();
export const withNotification = Component => {
    const WithNotification = props => (
        <Context.Consumer>
            {reference => (
                <Component
                    {...props}
                    notify={(...args) => reference.current.notify(...args)}
                />
            )}
        </Context.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithNotification.displayName = `withNotification(${wrappedComponentName})`;
    return WithNotification;
};
