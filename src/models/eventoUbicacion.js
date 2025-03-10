'use strict'

const connection = require('./conexion');

let eventUbiModel = {}

eventUbiModel.insertEvent = (eventData, callback) => {
    const sql = `INSERT INTO evento_ubicacion (id, tipo) 
                 VALUES (?, ?)`;
    connection.run(sql, [eventData.id, eventData.tipo], function(error){
        if (error) {
            callback(error, null);
        } else {
            callback(null, { id: this.lastID, mensaje: "Ubicación del evento creada con éxito" });
        }
    });
}

eventUbiModel.selectAll = (callback) => {
    const sql = `SELECT * FROM evento_ubicacion`;
    connection.all(sql, (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    })
}

eventUbiModel.updateEvent = (eventData, callback) => {
    const sql = `UPDATE evento_ubicacion SET tipo = ? WHERE id = ?`;
    connection.run(sql, [eventData.tipo, eventData.id], function(error){
        if (error) {
            callback(error, null);
        } else {
            callback(null, { cambio: this.changes, mensaje: "Ubicación del evento actualizada con éxito" });
        }
    });
}


module.exports = eventUbiModel;