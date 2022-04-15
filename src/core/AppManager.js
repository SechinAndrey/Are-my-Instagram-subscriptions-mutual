import CheckMutualBtn from './CeckMutualBtn';
import Modal from './Modal';

let followedSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgrP' 
}

let followersSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgr' 
}

export default class AppManager{
  constructor(){
    this.checkMutualBtn = new CheckMutualBtn();
  }
}