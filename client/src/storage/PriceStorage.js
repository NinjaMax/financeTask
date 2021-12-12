import { makeAutoObservable, configure } from "mobx";

configure({ useProxies: "never", });
 class PriceStorage {

    constructor() {
        this.quotes = [];
    
        makeAutoObservable(this);
    }

    setPriceTicker(quotes) {
        this.quotes = quotes;
    }
    get priceTicker() {
        return this.quotes;
    }
 
}

const priceStore = new PriceStorage();
export default priceStore;
export {PriceStorage};