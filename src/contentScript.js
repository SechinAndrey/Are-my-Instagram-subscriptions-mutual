'use strict';

console.log("CONTENT SCRIPT");

import "./css/common.css"
import AppManager  from './core/AppManager'
import { onLoad } from './common/helpers'

let appManager = new AppManager();

onLoad(() => { 
  document.querySelector('#CheckMutualBtn').addEventListener('CLICKED', () => {
    appManager.process();
  })
})