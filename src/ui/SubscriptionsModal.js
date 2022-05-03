import UiModal from './UiModal';
import LZString from "lz-string";

export default class SubscriptionsModal extends UiModal {
  constructor(){
    let template = `
    <div id="SubscriptionsModal" class="ui-overlay">
      <div class="ui-overlay-modal subscriptions">
        <div class="ui-overlay-modal-header">
          <h1>Подпписки <span class="ui-overlay-modal-header-count"></span> </h1>
        </div>
        <div class="ui-overlay-modal-body">
          <div class="scannig-info">
            <div class="scannig-date"></div>
            <div id="RescanBtn" class="amism-btn">Сканировать повторно</div>
          </div>
          <div class="followed-list-wrap">
            <ul class="followed-list">
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
    super("SubscriptionsModal", template, true);
    this.followedListEl = document.querySelector('#SubscriptionsModal .followed-list');
    this.scannigDateEl = document.querySelector('#SubscriptionsModal .scannig-date');
    this.followedCountEl = document.querySelector('#SubscriptionsModal .ui-overlay-modal-header-count');
    this.rescanBtnEl = document.querySelector('#SubscriptionsModal #RescanBtn');
  }

  clearItemsList(){
    this.followedListEl.innerHTML = "";
  }

  addItemToList(user){
    let liEl = document.createElement('li');
    let newLiTemplate = `
      <div class="avatar-with-names">
        <a href="/${user.nickname}/">
          <img class="followed-item-avatar" src="${user.avatarUrl}"/>
        </a>
        <div class="names-wrap">
          <a href="/${user.nickname}/" title="${user.nickname}" class="followed-item-nickname">
            <span style="${user.isMutual ? "display: inline" : "display: none"}"> 🤝 </span> ${user.nickname}
          </a>
          <div title="${user.name}" class="followed-item-name">
            ${user.name}
          </div>
        </div>
      </div>
      <div class="followed-item-btn-wrap">
        <div class="amism-btn">Подписки</div>
      </div>
    `;

    liEl.className = 'followed-item';
    liEl.insertAdjacentHTML('afterbegin', newLiTemplate);
    liEl.querySelector('.amism-btn').addEventListener('click', () => {
      this.followedBtnHandler(nickname);
    });

    this.followedListEl.appendChild(liEl);
  }

  followedBtnHandler(nickname){
    console.log(nickname);
  }

  sortingMutualFirst(a, b){
    if (a.isMutual < b.isMutual) {
      return 1;
    }
    if (a.isMutual > b.isMutual) {
      return -1;
    }
    return 0;
  }

  renderScanResult(result){
    let [date, time] = new Date(result.date).toLocaleString('ua-UA', {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).split(', ');
    let followed = JSON.parse(LZString.decompressFromUTF16(result.followed));

    this.scannigDateEl.innerHTML = `Отсканировано ${date} в ${time}`;
    this.followedCountEl.innerHTML = `(${followed.length})`;

    this.rescanBtnEl.addEventListener('click', (e) => {
      this.close();
      this.clearItemsList();
      e.currentTarget.dispatchEvent(new Event('RESCAN_CLICKED'))
    });

    followed.sort((a, b) => {return this.sortingMutualFirst(a, b)}).forEach(flw => {
      this.addItemToList(flw);
    });
  }
}