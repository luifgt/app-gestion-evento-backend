'use strict'

const eventCtrl = require('../controllers/eventoCtrl');
const config = require('../../config')


module.exports = (app) => {
    app.post(config.VERSION_API + '/events',eventCtrl.insertEvent);
    app.get(config.VERSION_API + '/events',eventCtrl.selectAllEvent);
    app.get(config.VERSION_API + '/events/:id',eventCtrl.selectFindByIdEvent);
    app.put(config.VERSION_API + '/events/:id',eventCtrl.updateEvent);
    app.delete(config.VERSION_API + '/events/:id',eventCtrl.deleteEvent);
}