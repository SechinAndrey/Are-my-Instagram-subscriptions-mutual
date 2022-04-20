import { sleep, addStyleToHead } from "../common/helpers";

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
  constructor(name, selectors){    
    this.name = name;
    this.openBtnSelector = selectors.openBtn;
    this.closeBtnSelector = selectors.closeBtn;
    this.listWrapSelector = selectors.listWrap;
    this.loadingSelector = selectors.loadingSelector;

    this.modalScrolled = new CustomEvent('MODAL_FETCHED', {detail: {name: this.name}});
  }

  getModalList(){
    return document.querySelector(this.listWrapSelector);
  }

  open(silent = false){
    if(silent) this.addSilentModalStyle();
    document.querySelector(this.openBtnSelector).click();
  }

  close(){
    document.querySelector(this.closeBtnSelector).click();
    this.removeSilentModalStyle();
  }

  scrollTop( listWrapEl = document.querySelector(this.listWrapSelector), 
    listEl = document.querySelector(`${this.listWrapSelector} > ul`)){
    if(!listWrapEl || !listEl) { 
      return;
    }

    listWrapEl.scroll(0, 0);
  }

  scrollEnd(listWrapEl, listEl){
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
      this.scrollEnd(listWrapEl, listEl);
      await sleep(100);

      let waitLoadingInterval = setInterval(async () => {
        let loadingEl = document.querySelector(this.loadingSelector);
        if(!loadingEl){
          clearInterval(waitLoadingInterval);
          document.dispatchEvent(this.modalScrolled);
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
          listEl = document.querySelector(`${this.listWrapSelector} > ul`);
          listWrapEl = document.querySelector(this.listWrapSelector);

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

  addSilentModalStyle(){
    let css = `
      .RnEpo.Yx5HN {
        right: 999999px;
      }
    `;
    addStyleToHead(css, 'amism-modal');
  }

  removeSilentModalStyle(){
    document.getElementById('amism-modal').remove();
  }
};