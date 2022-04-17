import { sleep } from "../common/helpers";

export default class Modal{
  /**
   * Ctrate object that allow you to manipulate modals(followers/followed)
   * 
   * @param {object} selectors
   * openBtn, 
   * closeBtn, 
   * listWrap - list wrap that contain ul with followers/followed,
   * loadingSelector - to loading element after sroll
   */
  constructor(selectors){    
    this.openBtn = selectors.openBtn;
    this.closeBt = selectors.closeBtn;
    this.listWrap = selectors.listWrap;
    this.loadingSelector = selectors.loadingSelector;
  }

  getModalList(){
    return document.querySelector(this.listWrap);
  }

  open(){
    document.querySelector(this.openBtn).click();
  }

  close(){
    document.querySelector(this.closeBtnSelector).click();
  }

  scrollToTheEndOfList(listWrapEl, listEl){
    if(!listWrapEl || !listEl) { 
      return;
    }

    listWrapEl.scroll(0, listEl.offsetHeight);
  }

  async loadFullListProcessorProcessor(resolve, listWrapEl, listEl, prevListElHeight = -1){
    if(listEl.offsetHeight == prevListElHeight){
      return resolve();
    }else{
      let listElHeight = listEl.offsetHeight;
      this.scrollToTheEndOfList(listWrapEl, listEl);
      await sleep(100);

      let waitLoadingInterval = setInterval(async () => {
        let loadingEl = document.querySelector(this.loadingSelector);
        if(!loadingEl){
          clearInterval(waitLoadingInterval);
          return await this.loadFullListProcessorProcessor(resolve, listWrapEl, listEl, listElHeight);
        }
      }, 100)
    }
  }

  async loadFullList(){
    return new Promise( async (resolve, reject) => {
      let listWrapEl;
      let listEl;

      await new Promise(resolve => {
        let waitListElInterval = setInterval(() => {
          listEl = document.querySelector(`${this.listWrap} > ul`);
          listWrapEl = document.querySelector(this.listWrap);

          if(listEl){
            clearInterval(waitListElInterval);
            resolve();
          }
        }, 100)
      })

      await new Promise(resolve => {
        this.loadFullListProcessorProcessor(resolve, listWrapEl, listEl);
      });

      resolve();
    })
  }
};