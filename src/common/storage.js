import LZString from "lz-string";

export default {
  get(keys = []){
    return chrome.storage.local.get(keys);
  },

  set(key, value){
    return chrome.storage.local.set({[key]: value});
  },

  getBytesInUse(){
    return chrome.storage.local.getBytesInUse();
  },

  saveScanResult(nickname ,followed){
    this.set(nickname, {
      date: new Date().toISOString(),
      followed: LZString.compressToUTF16(JSON.stringify(followed))
    })
  }
}