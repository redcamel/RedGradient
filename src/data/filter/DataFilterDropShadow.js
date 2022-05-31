import ConstFilterType from "../const/ConstFilterType.js";

const DataFilterDropShadow = function () {
	return {
		type: ConstFilterType.DROP_SHADOW,
		visibleYn: true,
		setting: {
			offsetX: 0,
			offsetY: 0,
			blur: 0,
			color: 'rgba(0,0,0,0.75)'
		}
	}
}
export default DataFilterDropShadow