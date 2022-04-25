import {scanFollowedCount, scanFollowersCount, addStyleToHead} from '../common/helpers';
import {modalsUserListSelectors} from '../core/selectors'

export default class UiModal {
  constructor(){
    this.fetchedFollowedCount = 0;
    this.fetchedFollowersCount = 0;
    this.template = `
      <div id="UiModal" class="ui-overlay">
        <div class="ui-overlay-modal">
          <div class="ui-overlay-modal-header">
            <span class="magnifier-icon"> 🔍 </span>
            <h1>Сканирование</h1>
          </div>
          <div class="ui-overlay-modal-body">
            <!-- <div class="scanning-info"> 
              Отсканировано подписчиков 25 из 90
            </div> -->
            <div class="proggers-slot">
              <div class="proggress-bar">
                <div class="proggress-bar-indicator">
                </div>
              </div>
            <div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init(){
    // Mount UiModal to body
    document.body.insertAdjacentHTML('afterbegin', this.template);
    this.el = document.getElementById('UiModal');
    this.progressIndicatorEl = this.el.querySelector('.proggress-bar-indicator');
    document.addEventListener('MODAL_FETCHED', (e) => this.modalFetchedEventProcessor(e))
  }

  open(){
    this.addBodyStyle();
    this.el.style.display = 'flex';
  }

  close(){
    this.el.style.display = 'none';
    setTimeout(() => {this.removeBodyStyle()}, 200);
  }

  modalFetchedEventProcessor(e){
    if(e.detail.name == 'followers'){
      this.fetchedFollowersCount = this.scanFetchedFollowersCount();
    }else{
      this.fetchedFollowedCount = this.scanFetchedFollowedCount();
    }
    let percent = (this.fetchedFollowersCount + this.fetchedFollowedCount) / (scanFollowersCount() + scanFollowedCount()) * 100;
    this.changePercentage(percent);
  }

  changePercentage(percent){
    this.progressIndicatorEl.style.width = percent + '%';
  }

  scanItemCount(selector){
    return document.querySelectorAll(selector).length
  }

  scanFetchedFollowedCount(){
    return this.scanItemCount(modalsUserListSelectors.followedListSelector + ' li');
  }

  scanFetchedFollowersCount(){
    return this.scanItemCount(modalsUserListSelectors.followersListSelector + ' li');
  }

  addBodyStyle(){
    let css = `
      body {
        overflow: hidden !important;
      }
    `;
    addStyleToHead(css, 'body-style'); 
  }

  removeBodyStyle(){
    document.getElementById('body-style').remove();
  }
}