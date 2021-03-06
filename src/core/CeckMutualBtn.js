import {getOffset, onLoad} from '../common/helpers'
import {checkMutualBtnSelectors} from './selectors';

let defaultWaitAnchorInterval = {
  id: null,
  perfomedIteration: 0,
  maxIteration: 100,
  ms: 100
}

export default class CheckMutualBtn {
  // 🕵️‍♂️ 🤝
  constructor(){
    this.anchorSelector = checkMutualBtnSelectors.anchorSelector;
    this.followedOpenBtnSelector = checkMutualBtnSelectors.followedOpenBtn;
    this.followersOpenBtnSelector = checkMutualBtnSelectors.followersOpenBtn;
    this.template = '<a id="CheckMutualBtn" class="amism-btn" tabindex="0" title="Показать взаимные подписки">🕵️‍♂️</a>"';
    this.el;
    
    // correctionvalue to positionate CheckMutualBtn
    this.topCorrection = 5;
    this.leftCorrection = 10;

    this.waitAnchorInterval = {...defaultWaitAnchorInterval};

    this.isActivitiesOpen = false;
    this.isSearchDropdonwOpen = false;

    this.isCanProcess = false;

    this.init();
  }

  init(){
    let clicked = new Event('CLICKED');

    // Mount CheckMutualBtn to body
    document.body.insertAdjacentHTML('afterbegin', this.template);
    this.el = document.getElementById('CheckMutualBtn');
    
    this.el.addEventListener('click', () => {
      if(this.isCanProcess) this.el.dispatchEvent(clicked);
    });

    // processing btn position
    window.addEventListener('resize', this.setPosition.bind(this));
    onLoad(() => {
      this.waitAnchor()
    });
    this.initMutationObserver();
    this.setPosition();
    this.toggleDisable();
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
    this.waitAnchor();
  }

  toggleDisable(){
    let isFollowedOpenBtnAvaliable = !!document.querySelector(this.followedOpenBtnSelector),
        isFollowersOpenBtnAvaliable = !!document.querySelector(this.followersOpenBtnSelector);

    this.isCanProcess = isFollowedOpenBtnAvaliable && isFollowersOpenBtnAvaliable;
    
    if(this.isCanProcess){ // enable back
      this.el.style.cursor = 'pointer';
      this.el.style.filter = 'none';
      this.el.title = 'Показать взаимные подписки';
    }else{ // disable button if followed modal cannot be opened
      this.el.style.cursor = 'not-allowed';
      this.el.style.filter = 'grayscale(1)';
      this.el.title = 'Ууупс, подписчики или подписки недоступны или отсутствуют';
    }
  }

  setPosition(){
    let ancorPosition;
    let anchorEl = document.querySelector(this.anchorSelector);

    if(window.innerWidth < 735){
      this.el.style.display = 'none';
      return;
    }

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
  }

  clearwaitAnchorInterval(){
    clearInterval(this.waitAnchorInterval.id);
    this.waitAnchorInterval = {...defaultWaitAnchorInterval};
  }

  waitAnchor(){
    if(this.waitAnchorInterval.id){
      this.clearwaitAnchorInterval()
    }
    
    this.waitAnchorInterval.id = setInterval(() => {
      this.setPosition();
      this.toggleDisable();

      this.waitAnchorInterval.perfomedIteration++;
      if(this.waitAnchorInterval.perfomedIteration >= this.waitAnchorInterval.maxIteration){
        this.clearwaitAnchorInterval();
      }
    }, this.waitAnchorInterval.ms);
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
    let isActivitiesMutated = m.target.classList.toString().includes('_acuj _aa8k') && 
    m.addedNodes[0] && m.addedNodes[0].classList && m.addedNodes[0].classList.toString().includes('_ab6-');

    if(isActivitiesMutated){
      this.isActivitiesOpen = !this.isActivitiesOpen;   
      this.toggleZIndex(this.isActivitiesOpen);
    }
  }

  processSearchDropdownCovering(m){
    let isSearchDropdownMutated = m.target.classList.toString().includes('_aawf _aawg') && 
    m.addedNodes[0] && m.addedNodes[0].classList && m.addedNodes[0].classList.toString().includes('_aaw6') || 
    m.removedNodes[0] && m.removedNodes[0].classList && m.removedNodes[0].classList.toString().includes('_aaw6');

    if(isSearchDropdownMutated){
      this.isSearchDropdonwOpen = !this.isSearchDropdonwOpen;   
      this.toggleZIndex(this.isSearchDropdonwOpen);
    }
  }
}