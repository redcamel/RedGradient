import DataRedGradientLayer from "./DataRedGradientLayer.js";

let uuid = 0

function DataRedGradientLayerGroup() {
	return {
		label: 'Group' + uuid++,
		openYn: true,
		visibleYn: true,
		children: [new DataRedGradientLayer()]
	};
}

export default DataRedGradientLayerGroup;
