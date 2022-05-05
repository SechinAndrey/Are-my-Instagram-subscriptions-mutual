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

function onLoad(fn){
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      fn();
    });
  }
}

function nTimesInterval(attempts, fn, ms = 500){
  let attempt = 0;
  let intervalId = setInterval(() => {   
    fn();
    attempt++;
    if(attempt >= attempts){
      clearInterval(intervalId);
    }
  }, ms)
  return intervalId;
}

function ms2HMS(duration){
  let h = Math.floor(duration/(1000*60*60)),
      m = Math.floor(duration/(1000*60))%60,
      s = Math.floor(duration/1000)%60;
  return `${h != 0 ? h.toString().padStart(2, 0) + ':' : ''}${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)}`;
}

export {
  getOffset,
  sleep,
  scanInt,
  scanFollowedCount,
  scanFollowersCount,
  addStyleToHead,
  onLoad,
  nTimesInterval,
  ms2HMS
}