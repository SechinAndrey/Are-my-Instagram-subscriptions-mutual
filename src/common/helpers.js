import {countSelectors} from '../core/selectors';

function getOffset(el) {
  let rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scanInt(selector, attr = 'textContent'){
  try {
    return parseInt(document.querySelector(selector)[attr].replaceAll(',', '').trim()); 
  } catch (error) {
    return -1;
  }
}

function scanFollowedCount(){
  return scanInt(countSelectors.followedCountSelector, 'title') || scanInt(countSelectors.followedCountSelector);
}

function scanFollowersCount(){
  return scanInt(countSelectors.followersCountSelector, 'title') || scanInt(countSelectors.followersCountSelector);
}

function addStyleToHead(css, id){
  let head = document.head,
  style = document.createElement('style');

  style.id = id;
  head.appendChild(style);
  style.appendChild(document.createTextNode(css)); 
}

export {getOffset, sleep, scanInt, scanFollowedCount, scanFollowersCount, addStyleToHead}