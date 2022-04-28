import CheckMutualBtn from './CeckMutualBtn';
import Modal from './Modal';
import CheckMutualProcceror from './CheckMutualProcceror';
import {sleep, scanFollowedCount, scanFollowersCount} from '../common/helpers';
import ProgressModal from '../ui/ProgressModal';

import {followedSelectors, followersSelectors, modalsUserListSelectors} from './selectors';

export default class AppManager{
  constructor(){
    this.followedModal = new Modal('followed', followedSelectors);
    this.followersModal = new Modal('followers', followersSelectors);
    this.checkMutualBtn = new CheckMutualBtn();
    this.checkMutualProcceror = new CheckMutualProcceror(modalsUserListSelectors);
    this.progressModal = new ProgressModal();
  }

  async process(){
    let followedCount = scanFollowedCount();
    let followersCount = scanFollowersCount();
    let followed = this.checkMutualProcceror.followed;
    let followers = this.checkMutualProcceror.followers;
    
    if(followedCount > 0 && followersCount > 0){
      if(followers.length === 0 && followed.length === 0){
        // first time click
        await this.processFollowers();
        await sleep(500);
        await this.processFollowed();
        console.log('TA-DA!!!!!!!');
      }else{
        this.showMutualFollowed();
      }
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
      this.checkMutualProcceror.markMutualFollowed();
      this.followedModal.scrollTop();
      this.progressModal.close();
      this.followedModal.removeSilentModalStyle();
      resolve();
    })
  }

  async showMutualFollowed(){
    this.followedModal.open();
    await sleep(500);
    await this.checkMutualProcceror.scanFollowed();
    this.checkMutualProcceror.markMutualFollowed();
  }

  toggleProgressModal(isOpen){
    isOpen ? this.progressModal.close() : this.progressModal.open();
  }
}