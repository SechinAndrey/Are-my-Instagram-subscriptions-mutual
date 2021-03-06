import {addStyleToHead} from '../common/helpers';

export default class UiModal {
  constructor(name, template, closeOnOverlayClick = false){
    this.name = name;
    // Mount UiModal to body
    document.body.insertAdjacentHTML('afterbegin', template);
    this.el = document.getElementById(name);
    if(closeOnOverlayClick){
      this.el.addEventListener('click', (e) => {
        if (e.target !== e.currentTarget){ return; }
        this.close();
      })
    }
  }

  open(){
    this.addBodyStyle();
    this.el.style.display = 'flex';
  }

  close(){
    this.el.style.display = 'none';
    setTimeout(() => {this.removeBodyStyle()}, 200);
  }

  addBodyStyle(){
    if(document.querySelector('#body-style')){
      return;
    }

    let css = `
      body {
        overflow: hidden !important;
      }
    `;
    addStyleToHead(css, 'body-style'); 
  }

  removeBodyStyle(){
    let el = document.getElementById('body-style');
    if(el){
      el.remove;
    }
  }
}