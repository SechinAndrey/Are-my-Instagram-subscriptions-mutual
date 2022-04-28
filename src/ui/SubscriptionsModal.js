import UiModal from './UiModal';

export default class SubscriptionsModal extends UiModal {
  constructor(){
    let template = `
    <div id="SubscriptionsModal" class="ui-overlay">
      <div class="ui-overlay-modal subscriptions">
        <div class="ui-overlay-modal-header">
          <h1>Подпписки</h1>
        </div>
        <div class="ui-overlay-modal-body">
          <div class="scannig-info">
            <div class="scannig-date">Отсканировано 23.04.2022 в 12:30</div>
            <div class="amism-btn">Сканировать повторно</div>
          </div>
          <div class="followed-list-wrap">
            <ul class="followed-list">
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
    super("SubscriptionsModal", template);
    this.followedListEl = document.querySelector('.followed-list');


    this.clearItemsList();

    for(let i = 0; i < 100; i++){
      this.addItemToList('leonardodicaprio', 'Leonardo DiCaprio', 'https://instagram.fiev13-1.fna.fbcdn.net/v/t51.2885-19/12558345_1659293120975484_1074689227_a.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fiev13-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=cZv7Z-daVyAAX94clc_&edm=ALbqBD0BAAAA&ccb=7-4&oh=00_AT9hSIOHqaPa3SRXtduELMPsNN3oZZ27jXCR3glfWT3O1A&oe=6270B7D4&_nc_sid=9a90d6');
    }
  }

  clearItemsList(){
    this.followedListEl.innerHTML = "";
  }

  addItemToList(nickname, name, avatarUrl){
    let liEl = document.createElement('li');
    let newLiTemplate = `
      <div class="avatar-with-names">
        <a href="/${nickname}/">
          <img class="followed-item-avatar" src="${avatarUrl}"/>
        </a>
        <div class="names-wrap">
          <a href="/${nickname}/" class="followed-item-nickname">
            ${nickname}
          </a>
          <div class="followed-item-name">
            ${name}
          </div>
        </div>
      </div>
      <div data-nickname="${nickname}" class="followed-item-btn-wrap">
        <div class="amism-btn">Подписки</div>
      </div>
    `;

    liEl.className = 'followed-item';
    liEl.insertAdjacentHTML('afterbegin', newLiTemplate);
    liEl.addEventListener('click', () => {
      this.followedBtnHandler(nickname);
    });

    this.followedListEl.appendChild(liEl);
  }

  followedBtnHandler(nickname){
    console.log(nickname);
  }
}