import React from 'react';

export const ModalContext = React.createContext();
export const withModal = Component => {
    const WithModal = props => (
        <ModalContext.Consumer>
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
        </ModalContext.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithModal.displayName = `withModal(${wrappedComponentName})`;
    return WithModal;
};
