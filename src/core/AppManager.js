import CheckMutualBtn from './CeckMutualBtn';
import Modal from './Modal';
import CheckMutualProcceror from './CheckMutualProcceror';

let followedSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgrP'
}
followedSelectors.loadingSelector = `${followedSelectors.listWrap} > ul > div > li.wo9IH.QN7kB`;

let followersSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgr'
}
followersSelectors.loadingSelector = `${followersSelectors.listWrap} > ul > div > li.wo9IH.QN7kB`;

export default class AppManager{
  constructor(){
    this.followedModal = new Modal(followedSelectors);
    this.followersModal = new Modal(followersSelectors);
    this.checkMutualBtn = new CheckMutualBtn();
    this.checkMutualProcceror = new CheckMutualProcceror();
  }

  process(){
    let followedCount = this.checkMutualProcceror.scanFollowedCount();
    let followersCount = this.checkMutualProcceror.scanFollowedCount();

    if(followedCount > 0 && followersCount > 0){
      this.followedModal.open();
      // TODO: async await
      this.followedModal.loadFullList(); 
      this.checkMutualProcceror.scanFollowedNicknames();
    }
  }
}