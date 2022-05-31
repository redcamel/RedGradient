import cmd_addGroup from "./group/cmd_addGroup.js";
import cmd_removeGroup from "./group/cmd_removeGroup.js";
import cmd_duplicateGroup from "./group/cmd_duplicateGroup.js";
import cmd_swapGroup from "./group/cmd_swapGroup.js";
import cmd_updateGroupByKey from "./group/cmd_updateGroupByKey.js";
import cmd_addLayer from "./layer/cmd_addLayer.js";
import cmd_removeLayer from "./layer/cmd_removeLayer.js";
import cmd_duplicateLayer from "./layer/cmd_duplicateLayer.js";
import cmd_swapLayer from "./layer/cmd_swapLayer.js";
import cmd_updateLayerByKey from "./layer/cmd_updateLayerByKey.js";
import cmd_setActiveGroupAndLayer from "./cmd_setActiveGroupAndLayer.js";
import cmd_updateLayerValueInfoByKey from "./layer/cmd_updateLayerValueInfoByKey";
import cmd_updateLayerStepInfoByKey from "./layer/step/cmd_updateLayerStepInfoByKey.js";
import cmd_addLayerStepInfo from "./layer/step/cmd_addLayerStepInfo.js";
import cmd_removeLayerStepInfo from "./layer/step/cmd_removeLayerStepInfo.js";
import cmd_duplicateLayerStepInfo from "./layer/step/cmd_duplicateLayerStepInfo.js";
import cmd_reverseLayerStepInfo from "./layer/step/cmd_reverseLayerStepInfo.js";
import cmd_updateLayerByPreset from "./layer/cmd_updateLayerByPreset";
import cmd_sortLayerStepInfo from "./layer/step/cmd_sortLayerStepInfo";
import cmd_addAtLayerStepInfo from "./layer/step/cmd_addAtLayerStepInfo";
import cmd_swapColorStepInfo from "./layer/step/cmd_swapColorStepInfo";
import cmd_copyColorStepInfo from "./layer/step/cmd_copyColorStepInfo";
import cmd_dropLayerStepInfo from "./layer/step/cmd_dropLayerStepInfo";
import cmd_dropLayer from "./layer/cmd_dropLayer";
import cmd_updateSnapToContainer from "./layer/cmd_updateSnapToContainer";

const index = {
	cmd_addGroup,
	cmd_removeGroup,
	cmd_duplicateGroup,
	cmd_swapGroup,
	cmd_updateGroupByKey,
	//
	cmd_addLayer,
	cmd_removeLayer,
	cmd_duplicateLayer,
	cmd_swapLayer,
	cmd_dropLayer,
	cmd_updateLayerByKey,
	cmd_updateLayerValueInfoByKey,
	cmd_updateLayerByPreset,
	//
	cmd_updateLayerStepInfoByKey,
	cmd_addLayerStepInfo,
	cmd_addAtLayerStepInfo,
	cmd_duplicateLayerStepInfo,
	cmd_reverseLayerStepInfo,
	cmd_sortLayerStepInfo,
	cmd_removeLayerStepInfo,
	cmd_swapColorStepInfo,
	cmd_copyColorStepInfo,
	cmd_dropLayerStepInfo: cmd_dropLayerStepInfo,
	//
	cmd_setActiveGroupAndLayer,
	cmd_updateSnapToContainer
}
export default index