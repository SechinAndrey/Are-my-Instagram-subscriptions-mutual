import UiModal from "./UiModal";
import {scanFollowedCount, scanFollowersCount, ms2HMS} from '../common/helpers';
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
            <div class="timer-slot">00:00</div>
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
    this.scanningTimer = {
      startDate: null,
      intervalId: null
    };
    this.fetchedFollowedCount = 0;
    this.fetchedFollowersCount = 0;
    this.progressIndicatorEl = this.el.querySelector('.proggress-bar-indicator');
    this.timerSlotEl = this.el.querySelector('.timer-slot');
    document.addEventListener('MODAL_FETCHED', (e) => this.modalFetchedEventProcessor(e))
  }

  clear(){
    this.fetchedFollowedCount = 0;
    this.fetchedFollowersCount = 0;
    this.timerSlotEl.innerHTML = '';
    clearInterval(this.scanningTimer.intervalId);
    this.scanningTimer = {
      startDate: null,
      intervalId: null
    };
    this.changePercentage(0);
  }

  close(){
    this.clear();
    super.close();
  }

  open(){
    if(!this.scanningTimer.startDate){
      this.scanningTimer.startDate = new Date();
      this.setupScanningTimer();
    }
    super.open();
  }

  setupScanningTimer(){
    this.scanningTimer.intervalId = setInterval(() => {
      if(this.scanningTimer.startDate){
        this.timerSlotEl.innerHTML = ms2HMS(new Date() - this.scanningTimer.startDate);
      }
    }, 1000);
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