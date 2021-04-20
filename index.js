const makeGradientDom = (gradient) => {
  const cvs = document.createElement('button');
  document.body.appendChild(cvs);
  cvs.style.cssText = 'padding : 30px;width:100%;border:0';
  cvs.style.background = gradient;
  return cvs;
};
const makeTextDom = (parent, gradient) => {
  const txt = document.createElement('div');
  parent.appendChild(txt);
  txt.style.cssText = 'color:#fff;text-align:center;padding:4px 12px;background:#000;display:inline-block;border-radius:12px;border:2px solid rgba(255,255,255,1)';
  txt.style.background = gradient;
  txt.innerHTML = gradient;
  return txt
};
const makeLinearGradient = (list) => {
  list.forEach(v => {
    const gradient = `linear-gradient(${v}, blue, pink)`;
    makeTextDom(makeGradientDom(gradient), gradient);
  });
};
makeLinearGradient([
  '45deg',
  'to left',
  'to right',
  'to top left',
  'to left top',
]);

const makePercentLinearGradient = (len = 10) => {
  const list = new Array(len);
  list.fill(len);
  list.forEach((v, index) => {
    const gradient = `linear-gradient(to right, red ${index * 100 / list.length}% ,blue)`;
    makeTextDom(makeGradientDom(gradient), gradient);
  });
};
makePercentLinearGradient();

const makePercentLinearGradient2 = (len = 10) => {
  const list = new Array(len);
  list.fill(len);
  list.forEach((v, index) => {
    const gradient = `linear-gradient(to right, red 0% ${index * 100 / list.length}% ,blue ${index * 100 / list.length}% 100%)`;
    makeTextDom(makeGradientDom(gradient), gradient);
  });
};
makePercentLinearGradient2();
const makeRepeatingLinearGradient = (len = 10) => {
  const list = new Array(len);
  list.fill(len);
  list.forEach((v, index) => {
    const gradient = `repeating-linear-gradient(to right, red ${index * 100 / list.length}% ,blue)`;
    makeTextDom(makeGradientDom(gradient), gradient);
  });
};
makeRepeatingLinearGradient();
const makeRepeatingLinearGradient2 = (len = 10) => {
  const list = new Array(len);
  list.fill(len);
  list.forEach((v, index) => {
    const gradient = `repeating-linear-gradient(to right, red ${index * 100 / list.length}% ,blue ${(index * 100 / list.length) + 10}%, yellow )`;
    makeTextDom(makeGradientDom(gradient), gradient);
  });
};
makeRepeatingLinearGradient2();
const makeRepeatingLinearGradient3 = (len = 10) => {
  const gradient = `
        linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black),
        linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black)
    `;
  const cvs = makeGradientDom(gradient)
  const txt =makeTextDom(cvs, gradient)
  cvs.style.backgroundSize=`50px 50px`;
  cvs.style.backgroundPosition=`0 0, 25px 25px`;
  txt.style.background=`#000`;
};
makeRepeatingLinearGradient3();
const makeRepeatingLinearGradient4 = (len = 10) => {
  const gradient = `
        linear-gradient(45deg, blue 25%, transparent 25%, transparent),
        linear-gradient(-45deg, blue 25%, transparent 25%, transparent),
        linear-gradient(45deg, transparent 75%, blue 75%),
        linear-gradient(-45deg, transparent 75%, blue 75%)
    `;
  const cvs = makeGradientDom(gradient)
  const txt =makeTextDom(cvs, gradient)
  cvs.style.backgroundSize=`50px 50px`;
  txt.style.background=`#000`;
};
makeRepeatingLinearGradient4();
