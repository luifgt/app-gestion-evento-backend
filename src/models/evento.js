'use strict'

const connection = require('./conexion');

let eventModel = {}

eventModel.insertEvent = (eventData, callback) => {
    const sql = `INSERT INTO evento (id, titulo, fecha_hora, descripcion, id_ubicacion) 
                 VALUES (?, ?, ?, ?, ?)`;
    connection.run(sql, [eventData.id, eventData.titulo, eventData.fecha_hora, eventData.descripcion, eventData.id_ubicacion], function(error){
        if (error) {
            callback(error, null);
        } else {
            callback(null, { id: this.lastID, mensaje: "Evento creado con éxito" });
        }
    });
}

eventModel.selectAll = (callback) => {
    const sql = `SELECT * FROM evento`;
    connection.all(sql, (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    })
}

eventModel.selectFindById = (eventData, callback) => {
    const sql = `SELECT * FROM evento WHERE id = ?`;
    connection.get(sql, [eventData.id], (error, row) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, row);
        }
    })
}

eventModel.updateEvent = (eventData, callback) => {
    const sql = `UPDATE evento SET titulo = ?, fecha_hora = ?, descripcion = ?, id_ubicacion = ? WHERE id = ?`;
    connection.run(sql, [eventData.titulo, eventData.fechaHora, eventData.descripcion, eventData.idUbicacion, eventData.id], function(error){
        if (error) {
            callback(error, null);
        } else {
            callback(null, { cambio: this.changes, mensaje: "Evento actualizado con éxito" });
        }
    });
}

eventModel.deleteEvent = (eventData, callback) => {
    const sql = `DELETE FROM evento WHERE id = ?`;
    connection.run(sql, [eventData.id], function(error){
        if (error) {
            callback(error, null);
        } else {
            callback(null, { cambio: this.changes, mensaje: "Evento eliminado con éxito" });
        }
    });
}

module.exports = eventModel;