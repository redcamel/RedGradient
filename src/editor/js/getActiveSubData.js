/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const getActiveSubData = (state) => {
  return state.layers[state.activeLayerIndex || 0]['items'][state.activeSubDataIndex || 0];
};
export default getActiveSubData;
