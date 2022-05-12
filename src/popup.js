'use strict';

console.log('Log from popup script');

import './popup.css';
import { onLoad } from './common/helpers';
import PopupProccesor from './popup/PopupProcessor';

let popupProccesor = new PopupProccesor();

onLoad(async () => {
  popupProccesor.onLoad();
});