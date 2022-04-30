import UiModal from "./UiModal";
import {scanFollowedCount, scanFollowersCount, addStyleToHead} from '../common/helpers';
import {modalsUserListSelectors} from '../core/selectors'

export default class ProgressModal extends UiModal{
  constructor(){
    let template = `
      <div id="ProgressModal" class="ui-overlay">
        <div class="ui-overlay-modal">
          <div class="ui-overlay-modal-header">
            <span class="magnifier-icon"> 🔍 </span>
            <h1>Сканирование</h1>
          </div>
          <div class="ui-overlay-modal-body">
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
    
    super('ProgressModal', template);
    this.fetchedFollowedCount = 0;
    this.fetchedFollowersCount = 0;
    this.progressIndicatorEl = this.el.querySelector('.proggress-bar-indicator');
    document.addEventListener('MODAL_FETCHED', (e) => this.modalFetchedEventProcessor(e))
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
}