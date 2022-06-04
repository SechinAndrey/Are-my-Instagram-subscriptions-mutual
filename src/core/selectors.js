let followedSelectors = {
  openBtn: 'li._aa_5:nth-child(3) > a:nth-child(1)',
  closeBtn: '._ab9y > button:nth-child(1)',
  listWrap: '._aano',
  nickname: 'div:nth-child(1) > div:nth-child(1) span:nth-child(1) a:nth-child(1) span:nth-child(1)',
  name: 'div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)'
};
followedSelectors.loadingSelector = `${followedSelectors.listWrap} ._aaei._aae_`;

let followersSelectors = {
  openBtn: 'li._aa_5:nth-child(2) > a:nth-child(1)',
  closeBtn: '._ab9y > button:nth-child(1)',
  listWrap: '._aano',
  nickname: 'div:nth-child(1) > div:nth-child(1) span:nth-child(1) a:nth-child(1) span:nth-child(1)',
  name: '._aacl'
}
followersSelectors.loadingSelector = `${followersSelectors.listWrap} ._aaei._aae_`;

let countSelectors = {
  followedCountSelector: 'li._aa_5:nth-child(3) > a:nth-child(1) > div:nth-child(1) > span:nth-child(1)', 
  followersCountSelector: 'li._aa_5:nth-child(2) > a:nth-child(1) > div:nth-child(1) > span:nth-child(1)'
};

let modalsUserListSelectors = {
  followedListSelector: followedSelectors.listWrap + ' ul',
  followersListSelector: followersSelectors.listWrap + ' ul'
}

let checkMutualBtnSelectors = {
  anchorSelector: 'li._aa_5:nth-child(3) > a:nth-child(1) > div:nth-child(1)',
  followedOpenBtn: followedSelectors.openBtn,
  followersOpenBtn: followersSelectors.openBtn
}

let avatarSelectors = {
  own: '._aadp',
  other: '._aarf > span:nth-child(2) > img:nth-child(1)'
}

export {
  followedSelectors,
  followersSelectors,
  countSelectors,
  modalsUserListSelectors,
  checkMutualBtnSelectors,
  avatarSelectors
}