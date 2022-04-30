import CheckMutualBtn from './CeckMutualBtn';
import Modal from './Modal';
import CheckMutualProcceror from './CheckMutualProcceror';
import {sleep, scanFollowedCount, scanFollowersCount} from '../common/helpers';
import ProgressModal from '../ui/ProgressModal';
import Storage from '../common/storage';
import SubscriptionsModal from '../ui/SubscriptionsModal';
import {followedSelectors, followersSelectors} from './selectors';

export default class AppManager{
  constructor(){
    this.followedModal = new Modal('followed', followedSelectors);
    this.followersModal = new Modal('followers', followersSelectors);
    this.checkMutualBtn = new CheckMutualBtn();
    this.checkMutualProcceror = new CheckMutualProcceror();
    this.progressModal = new ProgressModal();
    this.subscriptionsModal = new SubscriptionsModal();
  }

  async process(){
    let followedCount = scanFollowedCount();
    let followersCount = scanFollowersCount();
    let nickname = window.location.href.split('/').slice(-2, -1);
    let userInStorage = await Storage.get(nickname);

    if(userInStorage && userInStorage[nickname]){
      this.subscriptionsModal.open();
      this.subscriptionsModal.renderScanResult(userInStorage[nickname]);
    }else if(followedCount > 0 && followersCount > 0){
      this.checkMutualProcceror.clear();
      await this.processFollowers();
      await sleep(500);
      await this.processFollowed();
      // check if profiles in storage > 10 delete last
      // todo: add
      // save results to store
      await Storage.saveScanResult(nickname, this.checkMutualProcceror.followed);
      // show subscriptions modal
      this.subscriptionsModal.open();
      // todo: error check!!
      this.subscriptionsModal.renderScanResult(userInStorage[nickname]);
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
}