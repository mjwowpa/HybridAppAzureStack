
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'Billing', year: new Date().getFullYear(), message: 'Gestion Facturation' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'SAV', year: new Date().getFullYear(), message: 'Gestion SAV' });
};
