const fnB_deco = (arrV) => {
   return (arrV.map(elem => String.fromCodePoint(parseInt(elem, 16)))).join('');
};

module.exports = fnB_deco;