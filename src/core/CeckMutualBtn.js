import {getOffset} from '../common/helpers'

let defaultPositionInterval = {
  id: null,
  perfomedIteration: 0,
  maxIteration: 100,
  msInterval: 100
}

export default class CheckMutualBtn {
  constructor(){
    // element to positionate CheckMutualBtn
    this.anchorSelector = '#react-root > section > main > div > header > section > ul > li:nth-child(3)';
    this.template = '<a id="CheckMutualBtn" tabindex="0" title="Показать взаимные подписки">🤝</a>"';
    this.el;
    
    // correctionvalue to positionate CheckMutualBtn
    this.topCorrection = 5;
    this.leftCorrection = 10;

    this.positionInterval = {...defaultPositionInterval};

    this.isActivitiesOpen = false;

    this.init();
  }

  init(){
    // Mount CheckMutualBtn to body
    document.body.insertAdjacentHTML('afterbegin', this.template);
    this.el = document.getElementById('CheckMutualBtn');
    
    // processing btn position
    window.addEventListener('resize', this.setPosition.bind(this));
    window.onload = () => { this.setPositionWithInterval()}
    this.initMutationObserver();
    this.setPosition();
  }

  initMutationObserver(){
    // detect url change
    let lastUrl = location.href;
    new MutationObserver((mutations) => {
      const url = location.href;
      if (url !== lastUrl) {
        this.onUrlChange(url, lastUrl);
        lastUrl = url;
      }

      this.processActivityModalCovering(mutations);

    }).observe(document.body, {subtree: true, childList: true});
  }

  onUrlChange(newUrl, oldUrl){
    this.setPositionWithInterval();
  }

  setPosition(){
    let anchorEl = document.querySelector(this.anchorSelector);

    if(!anchorEl || window.innerWidth < 735){
      this.el.style.display = 'none';
      return;
    }

    let ancorPosition = getOffset(anchorEl);
    this.el.style.display = 'block';
    this.el.style.top = ancorPosition.top - this.topCorrection + 'px';
    this.el.style.left = ancorPosition.left - this.el.offsetWidth - this.leftCorrection + 'px';
    this.el.style.left = ancorPosition.left - this.el.offsetWidth - this.leftCorrection + 'px';
  }

  clearPositionInterval(){
    clearInterval(this.positionInterval.id);
    this.positionInterval = {...defaultPositionInterval};
  }

  setPositionWithInterval(){
    if(this.positionInterval.id){
      this.clearPositionInterval()
    }
    
    this.positionInterval.id = setInterval(() => {
      let ancorPosition;
      let anchorEl = document.querySelector(this.anchorSelector);

      if(anchorEl){
        ancorPosition = getOffset(anchorEl);

        this.el.style.display = 'block';
        this.el.style.top = ancorPosition.top - this.topCorrection + 'px';
        this.el.style.left = ancorPosition.left - this.el.offsetWidth - this.leftCorrection + 'px';
        this.el.style.left = ancorPosition.left - this.el.offsetWidth - this.leftCorrection + 'px';
      }else{
        if(this.el){
          this.el.style.display = 'none';
        }
      }

      this.positionInterval.perfomedIteration++;

      if(this.positionInterval.perfomedIteration >= this.positionInterval.maxIteration){
        this.clearPositionInterval();
      }
    }, this.positionInterval.msInterval);
  }

  processActivityModalCovering(mutations){
    mutations.forEach(m => {
      if(m.target.classList.toString().includes('_0ZPOP kIKUG') && 
      m.addedNodes[0] && m.addedNodes[0].classList.toString().includes('_8-yf5')){
        this.isActivitiesOpen = !this.isActivitiesOpen;   
        this.el.style.zIndex = this.isActivitiesOpen ? 0 : 1;
      }
    });
  }
}