export default class CheckMutualProcceror {
  constructor(selectors){
    // selectors
    this.followedListSelector = selectors.followedListSelector;
    this.followersListSelector = selectors.followersListSelector;

    this.followedCountSelector = selectors.followedCountSelector;
    this.followersCountSelector = selectors.followersCountSelector;

    // data
    this.followersCount;
    this.followedCount;
    this.followers = [];
    this.followed = [];

    this.matchTemplate = '<span> 🤝 </span>';
  }

  scanCount(selector){
    try {
      return parseInt(document.querySelector(selector).textContent); 
    } catch (error) {
      return -1;
    }
  }

  scanFollowedCount(){
    return this.scanCount(this.followedCountSelector);
  }

  scanFollowersCount(){
    return this.scanCount(this.followersCountSelector);
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
      lis.forEach((el, index) => {
        let userEl = el.querySelector('a > span');
        this[userType].push({
          el: userEl,
          nickname: userEl.textContent
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
    this.followed.forEach((flw) => {
      if(this.followers.some(flwr => flwr.nickname ==  flw.nickname)){
        flw.el.insertAdjacentHTML('afterbegin', this.matchTemplate);
      }
    })
  }
}