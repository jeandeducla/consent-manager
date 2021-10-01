// TODO:
// - add a timeout
/*
wrapper that waits for DOM to fully load to select the targeted button
*/ 
export function waitForDOMElement(selector: () => HTMLElement | null): Promise<HTMLElement> {
    return new Promise((resolve, _) => {
        var el = selector();
        if (el) {
            resolve(el);
        }
        new MutationObserver((_, observer) => {
            var el = selector();
            if (el) {
                resolve(el);
                observer.disconnect();
            }
        })
        .observe(document, {
            childList: true,
            subtree: true
        });
    });
}
