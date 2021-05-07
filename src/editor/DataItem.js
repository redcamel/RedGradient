let uuid = 0
function DataItem() {
  return {
    title: `gradient${uuid++}`,
    type: 'linear-gradient',
    deg: 90,
    visible: true,
    position: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
    colorList: [
      {color: 'rgba(255,255,255,1)', range: 0},
      {color: 'rgba(255,255,255,0.1)', range: 100}
    ]
  };
}

export default DataItem;
