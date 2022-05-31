import ConstBoxBorderPropertyModeType
	from "../../editor/panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";

const DataBorderColor = function () {
	return {
		mode: ConstBoxBorderPropertyModeType.MERGE,
		[ConstBoxBorderPropertyModeType.MERGE]: {
			borderColor: '#000000'
		},
		[ConstBoxBorderPropertyModeType.SOLO]: {
			topBorderColor: '#000000',
			rightBorderColor: '#000000',
			leftBorderColor: '#000000',
			bottomBorderColor: '#000000',
		}
	}
}
export default DataBorderColor