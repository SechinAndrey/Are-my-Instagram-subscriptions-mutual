'use strict';

console.log("CONTENT SCRIPT");

import "./css/common.css"
import AppManager  from './core/AppManager'

import SubscriptionsModal from './ui/SubscriptionsModal';

let appManager = new AppManager();

window.onload = () => { 
  document.querySelector('#CheckMutualBtn').addEventListener('CLICKED', () => {
    appManager.process();
  })

  setTimeout(() => {
    let subscriptionsModal = new SubscriptionsModal();
    subscriptionsModal.open();
  }, 100);
}