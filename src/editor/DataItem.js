let uuid = 0;

function DataItem() {
  return {
    title: `gradient${uuid++}`,
    type: 'linear-gradient',
    repeatType: 'repeat',
    deg: 90,
    visible: true,
    position: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
    size: {w: 0, wUnit: '%', h: 0, hUnit: '%'},
    colorList: [
      {color: 'rgba(255,255,255,1)', rangeUnit:'%',range: 0},
      {color: 'rgba(255,255,255,0.1)',rangeUnit:'%',range: 100}
    ]
  };
}

export default DataItem;