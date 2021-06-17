/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import ACTIVE_FRAME_KEY from "../ACTIVE_FRAME_KEY";
import DataCanvas from "./DataCanvas";

function DataGradient() {
  return {
    before: new DataCanvas(),
    main: new DataCanvas(),
    after: new DataCanvas(),
    activeFrameKey: ACTIVE_FRAME_KEY.MAIN
  };
}

export default DataGradient;
