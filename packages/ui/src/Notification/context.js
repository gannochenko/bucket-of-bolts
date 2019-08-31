import React from 'react';

export const NotificationContext = React.createContext();
export const withNotification = Component => {
    const WithNotification = props => (
        <NotificationContext.Consumer>
            {reference => (
                <Component
                    {...props}
                    notify={(...args) => reference.current.notify(...args)}
                />
            )}
        </NotificationContext.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithNotification.displayName = `withNotification(${wrappedComponentName})`;
    return WithNotification;
};
