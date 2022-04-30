import {modalsUserListSelectors, followedSelectors, followersSelectors} from './selectors';

export default class CheckMutualProcceror {
  constructor(){
    // selectors
    this.followedListSelector = modalsUserListSelectors.followedListSelector;
    this.followersListSelector = modalsUserListSelectors.followersListSelector;
    this.followedSelectors = followedSelectors;
    this.followersSelectors = followersSelectors;
    
    // data
    this.followersCount;
    this.followedCount;
    this.followers = [];
    this.followed = [];
  }

  /**
   * 
   * @param {string} userType [followers | followed]
   * @returns Promise
   */
  scanUsers(userType){
    return new Promise (resolve => {
      this[userType] = [];
      let lis = document.querySelectorAll(`${this[userType + 'ListSelector']} li`);
      lis.forEach((li, index) => {
        this[userType].push({
          avatarUrl: li.querySelector('img').src,
          nickname: li.querySelector(this[`${userType}Selectors`].nickname).textContent,
          name: li.querySelector(this[`${userType}Selectors`].name).textContent
        });
        
        if(index + 1 == lis.length){
          resolve();
        }
      })
    })
  }

  scanFollowed(){
    return this.scanUsers('followed');
  }

  scanFollowers(){
    return this.scanUsers('followers');
  }

  markMutualFollowed(){
    return new Promise(resolve => {
      this.followed.forEach((flw, index) => {
        flw.isMutual = this.followers.some(flwr => flwr.nickname ==  flw.nickname);
        if(index + 1 == this.followed.length){
          resolve();
        }
      })
    });
  }

  clear(){
    this.followersCount = undefined;
    this.followedCount = undefined;
    this.followers = [];
    this.followed = [];
  }
}