/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const LOCAL_STORAGE_MANAGER = {
  getTabOpenYn: (key) => {
    let searchKey = 'redGradient_openYn_' + key
    let t0 = localStorage.getItem(searchKey);
    t0 = t0 === undefined || t0 === null || t0 === 'true';
    console.log('getTabOpenYn', searchKey, t0)
    return t0
  },
  toggleTabOpenYn: (key) => {
    let searchKey = 'redGradient_openYn_' + key
    let t0 = !LOCAL_STORAGE_MANAGER.getTabOpenYn(key)
    console.log(t0)
    localStorage.setItem(searchKey, t0)
    console.log('toggleTabOpenYn', searchKey, t0)
  }
};
export default LOCAL_STORAGE_MANAGER;
