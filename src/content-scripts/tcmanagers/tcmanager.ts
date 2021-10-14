import { Strategy } from '../../utils/types';

export class TCManager {
    readonly name;

    constructor() {
        this.name = "default";
    }

    applyStrategy(strategy: string) {
        switch (strategy) {
            case Strategy.REJECT_ALL:
                console.log("We will reject all consent");
                this.selectRejectAllBtn()
                    .then((el) => this.handleConsentBtn(el))
                    .catch(() => console.log("Reject all error"));
                break;
            case Strategy.ACCEPT_ALL:
                console.log("We will accept all consent");
                this.selectAcceptAllBtn()
                    .then((el) => this.handleConsentBtn(el))
                    .catch(() => console.log("accept all error"));
                break;
            case Strategy.DO_NOTHING:
                console.log("We will let you decide");
                break;
            default:
                console.log("should not come here");
                break;
        }
    }

    async selectAcceptAllBtn(): Promise<HTMLElement> {
        return new Promise((_, reject) => reject());
    }

    async selectRejectAllBtn(): Promise<HTMLElement> {
        return new Promise((_, reject) => reject());
    }

    async isHere(): Promise<boolean> {
        return new Promise((_, reject) => reject());
    }

    /*
    handles action to execute on the button we found
    */ 
    handleConsentBtn(btn: HTMLElement) {
        console.log(btn);
        // btn.click();
    }
}
