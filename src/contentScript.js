'use strict';

console.log("CONTENT SCRIPT");

import "./core/pageStyle.css"
import AppManager  from './core/AppManager'

let appManager = new AppManager();

window.onload = () => { 
  document.querySelector('#CheckMutualBtn').addEventListener('CLICKED', () => {
    appManager.process();
  })
}