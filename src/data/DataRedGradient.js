import ConstCanvasViewKey from "./const/ConstCanvasViewKey.js";
import ConstCanvasFrameLayout from "./const/ConstCanvasFrameLayout.js";
import ConstLayerSizeType from "./const/ConstLayerSizeType.js";
import DataRedGradientLayerGroup from "./DataRedGradientLayerGroup.js";
import ConstLayerPreviewBackgroundType from "./const/ConstLayerPreviewBackgroundType.js";
import DataRedPositionInfo from "./DataRedPositionInfo.js";
import ConstBoxSizingType from "./const/ConstBoxSizingType.js";
import ConstBlendModeType from "./const/ConstBlendModeType.js";
import DataRedBoxShadowInfo from "./DataRedBoxShadow.js";
import DataBorder from "./border/DataBorder.js";
import DataRedOutline from "./DataRedOutline.js";
import ConstEditMode from "./const/ConstEditMode";
import ContextProjectInfo from "../editor/contexts/static/ContextProjectInfo";

let uuid = 0

function DataRedGradient(projectName, deviceInfo, sizeInfo, backgroundColor = 'transparent') {
	console.log('생성', projectName, deviceInfo, sizeInfo, backgroundColor)
	const BEFORE_DATA = {
		viewKey: ConstCanvasViewKey.BEFORE,
		containerInfo: {
			sizeInfo,
			positionInfo: new DataRedPositionInfo(),
			backgroundColor: 'transparent',
			boxSizing: ConstBoxSizingType.BORDER_BOX,
			mixBlendMode: ConstBlendModeType.NORMAL,
			boxShadowInfo: new DataRedBoxShadowInfo(),
			outlineInfo: new DataRedOutline(),
			borderInfo: new DataBorder(),
			filterInfo: []
		},
		//
		deviceVisible: true,
		rulerVisible: false,
		overflowHiddenYn: true,
		visualGradientEditorVisible: false,
		editMode: ConstEditMode.GRADIENT,
		withView: [],
		viewTransformInfo: {
			viewScale: 1,
			viewOffset: {x: 0, y: 0}
		},
		layerGroupInfo: {
			activeGroupIndex: 0,
			activeGroupLayerIndex: 0,
			groupList: [new DataRedGradientLayerGroup(true)]
		}
	}
	const MAIN_DATA = {
		viewKey: ConstCanvasViewKey.MAIN,
		containerInfo: {
			sizeInfo,
			positionInfo: new DataRedPositionInfo(),
			backgroundColor: backgroundColor,
			boxSizing: ConstBoxSizingType.BORDER_BOX,
			mixBlendMode: ConstBlendModeType.NORMAL,
			boxShadowInfo: new DataRedBoxShadowInfo(),
			outlineInfo: new DataRedOutline(),
			borderInfo: new DataBorder(),
			filterInfo: []
		},
		//
		deviceVisible: true,
		rulerVisible: false,
		overflowHiddenYn: true,
		visualGradientEditorVisible: false,
		editMode: ConstEditMode.GRADIENT,
		withView: [],
		viewTransformInfo: {
			viewScale: 1,
			viewOffset: {x: 0, y: 0}
		},
		layerGroupInfo: {
			activeGroupIndex: 0,
			activeGroupLayerIndex: 0,
			groupList: [new DataRedGradientLayerGroup()]
		}
	}
	const AFTER_DATA = {
		viewKey: ConstCanvasViewKey.AFTER,
		containerInfo: {
			sizeInfo,
			positionInfo: new DataRedPositionInfo(),
			backgroundColor: 'transparent',
			boxSizing: ConstBoxSizingType.BORDER_BOX,
			mixBlendMode: ConstBlendModeType.NORMAL,
			boxShadowInfo: new DataRedBoxShadowInfo(),
			outlineInfo: new DataRedOutline(),
			borderInfo: new DataBorder(),
			filterInfo: []
		},
		//
		deviceVisible: true,
		rulerVisible: false,
		overflowHiddenYn: true,
		visualGradientEditorVisible: false,
		editMode: ConstEditMode.GRADIENT,
		withView: [],
		viewTransformInfo: {
			viewScale: 1,
			viewOffset: {x: 0, y: 0}
		},
		layerGroupInfo: {
			activeGroupIndex: 0,
			activeGroupLayerIndex: 0,
			groupList: [new DataRedGradientLayerGroup(true)]
		}
	}
	return {
		version: ContextProjectInfo.version,
		projectName: projectName || 'untitled' + uuid++,
		create: (new Date()).getTime(),
		lastUpdate: (new Date()).getTime(),
		deviceInfo,
		//
		otherContainerDummyRenderYn: false,
		snapToContainer: true,
		//
		timelineInfo: {
			time: 0,
			duration: 0
		},
		layerGroupViewSizeInfo: {
			size: ConstLayerSizeType.WIDE,
			previewBackgroundType: ConstLayerPreviewBackgroundType.TRANSPARENT
		},
		systemFrameLayoutInfo: {
			activeLayoutKey: ConstCanvasFrameLayout.SINGLE,
			[ConstCanvasFrameLayout.SINGLE]: {
				viewList: [ConstCanvasViewKey.MAIN],
				activeWindowIndex: 0
			},
			[ConstCanvasFrameLayout.VERTICAL]: {
				viewList: [ConstCanvasViewKey.BEFORE, ConstCanvasViewKey.MAIN],
				activeWindowIndex: 0
			},
			[ConstCanvasFrameLayout.HORIZON]: {
				viewList: [ConstCanvasViewKey.BEFORE, ConstCanvasViewKey.MAIN],
				activeWindowIndex: 0
			},
			[ConstCanvasFrameLayout.TRIPLE]: {
				viewList: [ConstCanvasViewKey.BEFORE, ConstCanvasViewKey.AFTER, ConstCanvasViewKey.MAIN],
				activeWindowIndex: 0
			},
		},
		canvasInfo: {
			[ConstCanvasViewKey.BEFORE]: BEFORE_DATA,
			[ConstCanvasViewKey.MAIN]: MAIN_DATA,
			[ConstCanvasViewKey.AFTER]: AFTER_DATA,
			// [ConstCanvasViewKey.ALL]: {
			// 	viewKey: ConstCanvasViewKey.MAIN,
			// 	deviceVisible: true,
			// 	rulerVisible: false,
			// 	overflowHiddenYn: true,
			// 	viewTransformInfo: {
			// 		viewScale: 1,
			// 		viewOffset: {x: 0, y: 0}
			// 	}
			// }
		}
	};
}

export default DataRedGradient;
