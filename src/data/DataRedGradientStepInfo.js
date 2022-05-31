import ConstGradientStepMode from "./const/ConstGradientStepMode";
import ConstUnitPxPercentAuto from "./const/ConstUnitPxPercentAuto.js";

let uuid = 0

function DataRedGradientStepInfo(initData = {}) {
	return {
		label: 'step' + uuid++,
		mode: initData['mode'] || ConstGradientStepMode.SINGLE,
		start: {
			stop: initData['startStop'] || 0,
			stopUnit: initData['startStopUnit'] || ConstUnitPxPercentAuto.PERCENT,
			colorHint: initData['startColorHint'] || 'white',
			divideYn: false
		},
		end: {
			stop: initData['endStop'] || 0,
			stopUnit: initData['endStopUnit'] || ConstUnitPxPercentAuto.PERCENT,
			colorHint: initData['endColorHint'] || 'black',
			divideYn: false
		}
	};
}

export default DataRedGradientStepInfo;
