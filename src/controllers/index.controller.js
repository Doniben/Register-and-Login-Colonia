const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderPoliticas = (req, res) => {
  res.render('politicas');
};

indexCtrl.renderTerminos = (req, res) => {
  res.render('terminos');
};

/* indexCtrl.renderTerminosPdf = (req, res) => {
  res.render('TERMINOS.pdf');
};

indexCtrl.renderPoliticaPdf = (req, res) => {
  res.render('POLITICA.pdf');
}; */

module.exports = indexCtrl;