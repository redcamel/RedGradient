import ConstBoxShadowType from "./const/ConstBoxShadowType.js";

function DataRedBoxShadow() {
	return {
		type: ConstBoxShadowType.OUTSET,
		offsetX: 0,
		offsetY: 0,
		blur: 0,
		spread: 0,
		color: 'rgba(0,0,0,0.75)'
	};
}

export default DataRedBoxShadow;
