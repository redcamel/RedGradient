/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

const getActiveLayerData = (state) => {
  return state.layers[state.activeLayerDataIndex || 0]
}
export default getActiveLayerData