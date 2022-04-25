export default {
  get(keys = []){
    return chrome.storage.local.get(keys);
  },

  set(key, value){
    return chrome.storage.local.set({[key]: value});
  },

  getBytesInUse(){
    return chrome.storage.local.getBytesInUse();
  }
}