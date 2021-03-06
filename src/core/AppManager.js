import CheckMutualBtn from './CeckMutualBtn';
import Modal from './Modal';
import CheckMutualProcceror from './CheckMutualProcceror';
import {sleep, scanFollowedCount, scanFollowersCount, onLoad, nTimesInterval, url2Base64Image} from '../common/helpers';
import ProgressModal from '../ui/ProgressModal';
import Storage from '../common/storage';
import SubscriptionsModal from '../ui/SubscriptionsModal';
import {followedSelectors, followersSelectors, avatarSelectors} from './selectors';

export default class AppManager{
  constructor(){
    this.followedModal = new Modal('followed', followedSelectors);
    this.followersModal = new Modal('followers', followersSelectors);
    this.checkMutualBtn = new CheckMutualBtn();
    this.checkMutualProcceror = new CheckMutualProcceror();
    this.progressModal = new ProgressModal();
    this.subscriptionsModal = new SubscriptionsModal();

    onLoad(() => {
      this.processRescan();
      this.processOpenUnfollowModal();
    });
  }

  async process(){
    let storageUser = await this.getCurentUserFromStorage();
    if(storageUser){
      this.displayScanResult(storageUser);
    }else{
      await this.scan();
      this.displayScanResult(await this.getCurentUserFromStorage());
    }
  }

  async getCurentUserFromStorage(){
    let nickname = window.location.href.split('/').slice(-2, -1);
    let userInStorage = await Storage.get(nickname);
    return userInStorage[nickname];
  }

  displayScanResult(scanResultFromStorage){
    this.subscriptionsModal.open();
    this.subscriptionsModal.renderScanResult(scanResultFromStorage);
  }

  async scan(){
    let followedCount = scanFollowedCount();
    let followersCount = scanFollowersCount();

    if(followedCount > 0 && followersCount > 0){
      let nickname = window.location.href.split('/').slice(-2, -1);
      let avatarEl = document.querySelector(avatarSelectors.own) ||
                     document.querySelector(avatarSelectors.other);
      let avatarUrl = await url2Base64Image(avatarEl.src);
      this.checkMutualProcceror.clear();
      await this.processFollowers();
      await sleep(500);
      await this.processFollowed();
      await Storage.remove(nickname);
      await Storage.processLimit();
      await Storage.saveScanResult({nickname, avatarUrl}, this.checkMutualProcceror.followed);
      console.log('TA-DA!!!!!!!');
    }
  }

  processFollowers(){
    return new Promise(async resolve => {
      this.progressModal.open();
      this.followersModal.open(true);
      await this.followersModal.loadFullList();
      await this.checkMutualProcceror.scanFollowers();
      this.followersModal.close();
      resolve();
    })
  }

  processFollowed(){
    return new Promise(async resolve => {
      this.followedModal.open(true);
      await this.followedModal.loadFullList();
      await this.checkMutualProcceror.scanFollowed();
      await this.checkMutualProcceror.markMutualFollowed();
      this.followedModal.removeSilentModalStyle();
      this.followedModal.close();
      this.progressModal.close();
      resolve();
    })
  }

  toggleProgressModal(isOpen){
    isOpen ? this.progressModal.close() : this.progressModal.open();
  }

  async processOpenUnfollowModal() {
    let {open_unfollow_modal: nickname} = await Storage.get('open_unfollow_modal');

    if(nickname && location.href.includes(nickname)){
      let openFollowModalBtnSelector = '._abni';
      let openFollowModalBtnEl = document.querySelector(openFollowModalBtnSelector);

      let intervalId = nTimesInterval(50, () => {
        if(openFollowModalBtnEl){
          openFollowModalBtnEl.click();
          clearInterval(intervalId);
          Storage.remove('open_unfollow_modal');
        }
        openFollowModalBtnEl = document.querySelector(openFollowModalBtnSelector);
      });
    }
  }

  async processRescan(){
    let {rescan} = await Storage.get('rescan');

    if(rescan){
      let waitProfilePageIntervalId = nTimesInterval(50, async () => {
        if(document.querySelector(followersSelectors.openBtn)){
          clearInterval(waitProfilePageIntervalId);
            await this.scan();
            this.displayScanResult(await this.getCurentUserFromStorage());
            Storage.remove('rescan');
        }
      });
    }
  }
}