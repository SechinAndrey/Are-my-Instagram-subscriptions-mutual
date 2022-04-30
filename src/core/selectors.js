let followedSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgrP',
  nickname: 'div > div.t2ksc > div.enpQJ > div.d7ByH > span > a > span',
  name: 'div > div.t2ksc > div.enpQJ > div.wFPL8'
};
followedSelectors.loadingSelector = `${followedSelectors.listWrap} > ul > div > li.wo9IH.QN7kB`;

let followersSelectors = {
  openBtn: '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a',
  closeBtn: 'body > div.RnEpo.Yx5HN > div > div > div > div:nth-child(1) > div > div.WaOAr._8E02J > div > button',
  listWrap: 'body > div.RnEpo.Yx5HN > div > div > div > div.isgrP',
  nickname: 'div > div.t2ksc > div.enpQJ > div.d7ByH > span > a > span',
  name: 'div > div.t2ksc > div.enpQJ > div.wFPL8'
}
followersSelectors.loadingSelector = `${followersSelectors.listWrap} > ul > div > li.wo9IH.QN7kB`;

let countSelectors = {
  followedCountSelector: '#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > div > span', 
  followersCountSelector: '#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > div > span'
};

let modalsUserListSelectors = {
  followedListSelector: followedSelectors.listWrap + ' ul',
  followersListSelector: followersSelectors.listWrap + ' ul'
}

let checkMutualBtnSelectors = {
  anchorSelector: '#react-root > section > main > div > header > section > ul > li:nth-child(3)',
  followedOpenBtn: followedSelectors.openBtn,
  followersOpenBtn: followersSelectors.openBtn
}

export {followedSelectors, followersSelectors, countSelectors, modalsUserListSelectors, checkMutualBtnSelectors}