export const hasParentNode = (node: HTMLElement, parent: HTMLElement) => {
    let next = node;
    while (next) {
        if (next === parent) {
            return true;
        }

        if (!next.parentElement) {
            return false;
        }
        next = next.parentElement;
    }

    return false;
};

export const getSelectedText = () => {
    let text = '';
    if (window.getSelection) {
        const selection = window.getSelection();
        if (selection) {
            text = selection.toString();
        }
        // @ts-ignore
    } else if (document.selection && document.selection.type !== 'Control') {
        // @ts-ignore
        // eslint-disable-next-line prefer-destructuring
        text = document.selection.createRange().text;
    }
    return text;
};
