export default class CheckMutualProcceror {
  constructor(){
    // selectors
    this.followedCountSelector = '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > div > span';
    this.followersCountSelector = '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > div > span'

    // data
    this.followersCount;
    this.followedCount;
    this.followersNicknames = [];
    this.followedNicknames = [];
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

  scanFollowedNicknames(){
    console.log('TODO: scanFollowedNicknames');
  }
}