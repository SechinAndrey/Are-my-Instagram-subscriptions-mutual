import LZString from "lz-string";

export default {
  scanResultLimit: 5,

  get(keys){
    return chrome.storage.local.get(keys);
  },

  set(key, value){
    return chrome.storage.local.set({[key]: value});
  },

  remove(keys){
    return chrome.storage.local.remove(keys);
  },

  getBytesInUse(keys){
    return chrome.storage.local.getBytesInUse(keys);
  },

  saveScanResult(user ,followed){
    return new Promise(async (resolve) => {
      let resultTosave = {
        avatarUrl: user.avatarUrl,
        date: new Date().toISOString(),
        followed: LZString.compressToUTF16(JSON.stringify(followed))
      }
      await this.set(user.nickname, resultTosave)
      resolve();
    });
  },
  
  processLimit(){
    return new Promise(async (resolve) => {
      let oldestKey;
      let oldestResult;

      let scanResults = await this.get();
      let scanResultsKeys = Object.keys(scanResults);

      if(scanResultsKeys.length >= this.scanResultLimit){
        scanResultsKeys.forEach((key, index) => {
          let scanResult = scanResults[key];

          if(oldestResult){
            if(scanResult.date && oldestResult.date && new Date(scanResult.date) < new Date(oldestResult.date)){
              oldestResult = scanResult;
              oldestKey = key;
            }
          }else{
            oldestResult = scanResult;
            oldestKey = key;
          }

          if(index + 1 == scanResultsKeys.length){
            this.remove(oldestKey);
            resolve();
          }
        });
      }else{
        resolve();
      }
    });  
  }
}