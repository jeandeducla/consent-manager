/*
 * wrapper that waits for DOM to fully load to select the targeted button
 */ 
export function waitForDOMElement(selector: () => HTMLElement | null): Promise<HTMLElement> {
    return new Promise((resolve) => {
        // check if we have a direct answer
        const el = selector();
        if (el) {
            resolve(el);
        }
        // check if we have a direct answer
        const observer = new MutationObserver((_, observer) => {
            const el = selector();
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        });
        observer.observe(document, {
            childList: true,
            subtree: true
        });
    });
}

/*
 * a timeout wrapper for promises
 */ 
export class PromiseTimeOut {
    timeoutPromise: Promise<never>;
    id: number | undefined;

    constructor(delay: number) {
        let id;
        this.timeoutPromise = new Promise((_, reject) => {
            id = setTimeout(() => reject(), delay);
        });
        this.id = id;
    }

    wrap<T>(promise: Promise<T>): Promise<T> {
        return Promise.race([
            promise,
            this.timeoutPromise
        ])
        .finally(() => this.clear());
    }

    clear() {
        if (!this.id) {
            clearTimeout(this.id);
        }
    }
}
