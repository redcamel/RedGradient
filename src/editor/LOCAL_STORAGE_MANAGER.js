/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import RedTitleTB from "../core/RedTitleTB";

const LOCAL_STORAGE_MANAGER = {
  check: () => {
    let test = 0;
    RedTitleTB.TAB_LIST.forEach(v => {
      let searchKey = 'redGradient_openYn_' + v;
      let t0 = localStorage.getItem(searchKey);
      if (t0 === null) test++;
    });
    if (test === RedTitleTB.TAB_LIST.length) {
      console.log('도냐')
      RedTitleTB.TAB_LIST.forEach((v, index) => {
        let searchKey = 'redGradient_openYn_' + v;
        localStorage.setItem(searchKey, index === RedTitleTB.TAB_LIST.length - 1);
      });
    }
  },
  checkAllClose: () => {
    let test = true;
    RedTitleTB.TAB_LIST.forEach(v => {
      let searchKey = 'redGradient_openYn_' + v;
      let t0 = localStorage.getItem(searchKey);
      if (t0 === 'true') test = false
    });
    return test
  },
  getTabOpenYn: (key) => {
    let searchKey = 'redGradient_openYn_' + key;
    let t0 = localStorage.getItem(searchKey);
    t0 = t0 === undefined || t0 === null || t0 === 'true';
    console.log('getTabOpenYn', searchKey, t0);
    return t0;
  },
  toggleTabOpenYn: (key) => {
    let searchKey = 'redGradient_openYn_' + key;
    let t0 = !LOCAL_STORAGE_MANAGER.getTabOpenYn(key);
    RedTitleTB.TAB_LIST.forEach(v => {
      let searchKey = 'redGradient_openYn_' + v;
      localStorage.setItem(searchKey, false);
    });
    console.log(t0);
    localStorage.setItem(searchKey, t0);
    console.log('toggleTabOpenYn', searchKey, t0);
  }
};
export default LOCAL_STORAGE_MANAGER;
