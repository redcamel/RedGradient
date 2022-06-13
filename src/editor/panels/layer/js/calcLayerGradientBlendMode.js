const calcLayerGradientBlendMode = (groupList) => {
	return groupList.map(v => {

		if (v['visibleYn']) return v.children.map(v2 => {
			if (v2['visibleYn']) return v2['blendMode']
			return null
		}).filter(Boolean)
		return []
	}).filter(Boolean).join(',')
}

export default calcLayerGradientBlendMode