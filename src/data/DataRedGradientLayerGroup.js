import DataRedGradientLayer from "./DataRedGradientLayer.js";

let uuid = 0

function DataRedGradientLayerGroup(emptyLayer=false) {
	return {
		label: 'Group' + uuid++,
		openYn: true,
		visibleYn: true,
		children: emptyLayer ? [] : [new DataRedGradientLayer()]
	};
}

export default DataRedGradientLayerGroup;
