import CheckMutualBtn from './CeckMutualBtn';
import Modal from './Modal';
import CheckMutualProcceror from './CheckMutualProcceror';
import {sleep} from '../common/helpers';

let followedSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgrP'
}
followedSelectors.loadingSelector = `${followedSelectors.listWrap} > ul > div > li.wo9IH.QN7kB`;

let followersSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgrP'
}
followersSelectors.loadingSelector = `${followersSelectors.listWrap} > ul > div > li.wo9IH.QN7kB`;

let checkMutualProccerorSelectors = {
  followedListSelector: followedSelectors.listWrap + ' ul',
  followersListSelector: followersSelectors.listWrap + ' ul',
  followedCountSelector: '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > div > span', 
  followersCountSelector: '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > div > span'
}

export default class AppManager{
  constructor(){
    this.followedModal = new Modal(followedSelectors);
    this.followersModal = new Modal(followersSelectors);
    this.checkMutualBtn = new CheckMutualBtn();
    this.checkMutualProcceror = new CheckMutualProcceror(checkMutualProccerorSelectors);
  }

  async process(){
    let followedCount = this.checkMutualProcceror.scanFollowedCount();
    let followersCount = this.checkMutualProcceror.scanFollowedCount();
    let followed = this.checkMutualProcceror.followed;
    let followers = this.checkMutualProcceror.followers;

    if(followedCount > 0 && followersCount > 0){
      if(followers.length === 0){
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
      this.followersModal.open();
      await this.followersModal.loadFullList();
      await this.checkMutualProcceror.scanFollowers();
      this.followersModal.close();
      resolve();
    })
  }

  processFollowed(){
    return new Promise(async resolve => {
      this.followedModal.open();
      await this.followedModal.loadFullList();
      await this.checkMutualProcceror.scanFollowed();
      this.checkMutualProcceror.markMutualFollowed();
      this.followedModal.scrollTop();
      resolve();
    })
  }

  async showMutualFollowed(){
    this.followedModal.open();
    await sleep(500);
    await this.checkMutualProcceror.scanFollowed();
    this.checkMutualProcceror.markMutualFollowed();
  }
}