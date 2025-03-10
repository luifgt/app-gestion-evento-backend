'use strict'

const eventUbiCtrl = require('../controllers/eventoUbiCtrl');
const config = require('../../config')


module.exports = (app) => {
    app.post(config.VERSION_API + '/eventsUbi',eventUbiCtrl.insertEventUbi);
    app.get(config.VERSION_API + '/eventsUbi',eventUbiCtrl.selectAllEventUbi);
    app.put(config.VERSION_API + '/eventsUbi/id',eventUbiCtrl.updateEventUbi);
    //app.delete(config.VERSION_API + '/eventsUbi/id',eventCtrl.deleteEvent);*/
}