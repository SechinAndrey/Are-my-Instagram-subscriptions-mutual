import storage from "../common/storage";
import prettyBytes from 'pretty-bytes';
import { formatDate } from "../common/helpers";

export default class PopupProccesor {
  getEls(){
    this.instructionEL = document.querySelector('.instruction');
    this.scannedResultsEl = document.querySelector('.scanned-results');
    this.resultsUlEl = this.scannedResultsEl.querySelector('ul.results');
    this.totalSizeEl = this.scannedResultsEl.querySelector('.total-size');
  }

  async onLoad(){
    this.getEls();
    let storageData = await storage.get();
    this.renderScannedResults(storageData);
  }

  clear(){
    this.resultsUlEl.innerHTML = '';
  }

  async renderScannedResult(key, val){
    let liEl = document.createElement('li');
    let size = await storage.getBytesInUse(key);
    let template = `
      <div class="card card-regular">
        <div class="user-card">
          <div class="user-card-left-side">
            <img class="user-card-left-side-avatar" src="${val.avatarUrl}">
            <div class="user-card-left-side-info">
              <div class="nickname">${key}</div>
              <div class="detail">
                <div class="detail-date">${formatDate(val.date)}</div>
                <div class="detail--"> - </div>
                <div class="detail-size">${prettyBytes(size)}</div>
              </div>
            </div>
          </div>
          <div class="right-side">
            <div class="btn remove">Удалить</div>
          </div>
        </div>
      </div>
    `
    liEl.insertAdjacentHTML('afterbegin', template);
    liEl.querySelector('.btn.remove').addEventListener('click', () => {
      storage.remove(key);
      liEl.remove();
      this.renderTotalSize();
    });

    this.resultsUlEl.appendChild(liEl);
  }

  async renderTotalSize(){
    let totalSize = await storage.getBytesInUse();
    this.totalSizeEl.innerHTML = prettyBytes(totalSize);
  }

  async renderScannedResults(storageData){
    this.clear();
    this.renderTotalSize();
    let isResultsShown = false;
    for(let key in storageData){
      let val = storageData[key];
      if(val.avatarUrl){
        this.renderScannedResult(key, val);
        if(!isResultsShown){
          this.instructionEL.style.display = 'none';
          this.scannedResultsEl.style.display = 'block';
          isResultsShown = true;
        }
      }
    }
  }
}