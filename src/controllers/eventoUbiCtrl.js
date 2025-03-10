'use strict'

const event = require('../models/eventoUbicacion');

function insertEventUbi(request, response) {
  const eventData = {
    id: request.body.id,
    tipo: request.body.tipo,
  };
  event.insertEvent(eventData, (error, id) => {
    if (error) {
      console.error(error);
      response.status(500).send({
        message:
          "Error en el servidor, no se insertó la ubicación del evento en la Base de Datos.",
        code: 500,
        status: "ER",
      });
    } else {
      response.status(200).send({
        message: "Registro insertado correctamente",
        code: 200,
        status: "OK",
        data: id,
      });
    }
  });
}

function selectAllEventUbi(request, response) {
  event.selectAll((error, rows) => {
    if (error) {
      console.error(error);
      response.status(500).send({
        message: "Error en el servidor, comuniquese con el administrador.",
        code: 500,
        status: "ER",
      });
    } else if (!Object.keys(rows).length) {
      response.status(404).send({
        message: "No hay datos de la ubicación evento en la base de datos.",
        code: 404,
        status: "ER",
      });
    } else {
      response.status(200).send(rows);
    }
  });
}

function updateEventUbi(request, response) {
  const eventData = {
    id: request.body.id,
    tipo: request.body.tipo
  };

  event.updateEvent(eventData, (error, id) => {
    if (error) {
      console.error(error);
      response.status(500).send({
        message:
          "Error en el servidor, no se actualizó el evento en la Base de Datos.",
        code: 500,
        status: "ER",
      });
    }

    if (!id || id.cambio === 0) {
      response.status(404).send({
        message: `No se encontró ningún evento con ID ${eventData.id}.`,
        code: 404,
        status: "ER",
      });
    } else {
      response.status(200).send({
        message: "Registro actualizado correctamente",
        code: 200,
        status: "OK",
        data: id,
      });
    }
  });
}

module.exports = {
    insertEventUbi,
    selectAllEventUbi,
    updateEventUbi
}