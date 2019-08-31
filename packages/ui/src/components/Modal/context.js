import React from 'react';

export const Context = React.createContext();
export const withModal = Component => {
    const WithModal = props => (
        <Context.Consumer>
            {reference => (
                <Component
                    {...props}
                    openModal={(...args) =>
                        reference.current.openExternal(...args)
                    }
                    openConfirmModal={(...args) =>
                        reference.current.openConfirm(...args)
                    }
                    closeModal={(...args) =>
                        reference.current.closeExternal(...args)
                    }
                />
            )}
        </Context.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithModal.displayName = `withModal(${wrappedComponentName})`;
    return WithModal;
};
