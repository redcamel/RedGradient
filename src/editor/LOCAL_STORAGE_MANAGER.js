/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

const LOCAL_STORAGE_MANAGER = {
  getTabOpenYn: (key) => {
    let searchkey = 'redGradient_openYn_' + key
    let t0 = localStorage.getItem(searchkey);
    if (t0 === undefined || t0 === null || t0 === 'true') t0 = true
    else t0 = false
    console.log('getTabOpenYn', searchkey, t0)
    return t0
  },
  toggleTabOpenYn: (key) => {
    let searchkey = 'redGradient_openYn_' + key
    let t0 = !LOCAL_STORAGE_MANAGER.getTabOpenYn(key)
    console.log(t0)
    localStorage.setItem(searchkey, t0)
    console.log('toggleTabOpenYn', searchkey, t0)
  }
};
export default LOCAL_STORAGE_MANAGER;
