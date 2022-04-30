'use strict';

console.log("CONTENT SCRIPT");

import "./css/common.css"
import AppManager  from './core/AppManager'

let appManager = new AppManager();

window.onload = () => { 
  document.querySelector('#CheckMutualBtn').addEventListener('CLICKED', () => {
    appManager.process();
  })
}