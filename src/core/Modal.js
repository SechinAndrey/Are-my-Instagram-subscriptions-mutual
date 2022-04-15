export default class Modal{
  /**
   * Ctrate object that allow you to manipulate modals(followers/followed)
   * 
   * @param {string} openBtn 
   * @param {string} closeBtn 
   * @param {string} listWrap - list wrap that contain ul with followers/followed
   */
  constructor(openBtn, closeBtn, listWrap){
    this.openBtn = openBtn;
    this.closeBt = closeBtn;
    this.listWra = listWrap;
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

  scroll(){
    let listWrapEl = document.querySelector(this.listWrap);
    let listEl = document.querySelector(`${this.listWrap} > ul`);
    
    if(!listWrapEl || !listEl) { 
      return 
    }

    listWrapEl.scroll(0, listEl.offsetHeight);
  }
};