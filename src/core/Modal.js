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

  async loadFullList(prevListElHeight = -1, prewlistWrapEl = undefined, prevListEl = undefined){
    let listWrapEl = prewlistWrapEl;
    let listEl = prevListEl;
    let listElHeight;

    if(!listEl){
      // init list, first scroll
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
    }

    listElHeight = listEl.offsetHeight;

    if(listElHeight == prevListElHeight){
      return;
    }

    this.scrollToTheEndOfList(listWrapEl, listEl);

    await sleep(200);

    let waitLoadingInterval = setInterval(() => {
      let loadingEl = document.querySelector(this.loadingSelector);
      if(!loadingEl){
        clearInterval(waitLoadingInterval);
        this.loadFullList(listElHeight, listWrapEl, listEl);
      }
    }, 100)
  }
};