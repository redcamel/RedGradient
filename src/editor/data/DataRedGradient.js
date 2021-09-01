/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import ACTIVE_FRAME_KEY from "../../js/const/ACTIVE_FRAME_KEY";
import DataCanvas from "./DataCanvas";
import DataDevice from "./DataDevice";

function DataRedGradient() {
  return {
    device : new DataDevice(),
    before: new DataCanvas(),
    main: new DataCanvas(),
    after: new DataCanvas(),
    activeFrameKey: ACTIVE_FRAME_KEY.MAIN
  };
}

export default DataRedGradient;