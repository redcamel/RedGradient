/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import DataCanvas from "./DataCanvas.js";
import ACTIVE_EDIT_KEY from "../ACTIVE_EDIT_KEY.js";

function DataRedGradient() {
  return {
    before: new DataCanvas(),
    main: new DataCanvas(),
    after: new DataCanvas(),
    activeEditKey : ACTIVE_EDIT_KEY.MAIN
  }
}

export default DataRedGradient;
