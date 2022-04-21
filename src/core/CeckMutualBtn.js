import {getOffset} from '../common/helpers'

let defaultPositionInterval = {
  id: null,
  perfomedIteration: 0,
  maxIteration: 100,
  msInterval: 100
}

export default class CheckMutualBtn {
  // 🕵️‍♂️ 🤝
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
    this.isSearchDropdonwOpen = false;

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
      let url = location.href;
      if (url !== lastUrl) {
        this.onUrlChange(url, lastUrl);
        lastUrl = url;
      }

      this.processCovering(mutations);

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

  toggleZIndex(condition){
    this.el.style.zIndex = condition ? 0 : 1;
  }

  processCovering(mutations){
    mutations.forEach(m => {
      this.processActivitiesCovering(m);
      this.processSearchDropdownCovering(m);
    });
  }

  processActivitiesCovering(m){
    let isActivitiesMutated = m.target.classList.toString().includes('_0ZPOP kIKUG') && 
    m.addedNodes[0] && m.addedNodes[0].classList.toString().includes('_8-yf5');

    if(isActivitiesMutated){
      this.isActivitiesOpen = !this.isActivitiesOpen;   
      this.toggleZIndex(this.isActivitiesOpen);
    }
  }

  processSearchDropdownCovering(m){
    let isSearchDropdownMutated = m.target.classList.toString().includes('QY4Ed P0xOK') && 
    m.addedNodes[0] && m.addedNodes[0].classList.toString().includes('jLwSh') || 
    m.removedNodes[0] && m.removedNodes[0].classList.toString().includes('jLwSh');

    if(isSearchDropdownMutated){
      this.isSearchDropdonwOpen = !this.isSearchDropdonwOpen;   
      this.toggleZIndex(this.isSearchDropdonwOpen);
    }
  }
}