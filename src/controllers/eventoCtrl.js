'use strict'

const event = require('../models/evento');

function insertEvent(request, response) {
  const eventData = {
    id: request.body.id,
    titulo: request.body.titulo,
    fecha_hora: request.body.fecha_hora,
    descripcion: request.body.descripcion,
    id_ubicacion: request.body.id_ubicacion,
  };
  event.insertEvent(eventData, (error, id) => {
    if (error) {
      console.error(error);
      response.status(500).send({
        message:
          "Error en el servidor, no se insertó el evento en la Base de Datos.",
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

function selectAllEvent(request, response) {
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
        message: "No hay datos del evento en la base de datos.",
        code: 404,
        status: "ER",
      });
    } else {
      response.status(200).send(rows);
    }
  });
}

function selectFindByIdEvent(request, response) {
  const eventId = request.params.id;

  if (!eventId) {
    return response.status(400).send({
      message: "ID del evento es requerido.",
      code: 400,
      status: "ER",
    });
  }

  const eventData = { id: eventId };

  event.selectFindById(eventData, (error, id) => {
    if (error) {
      console.error(error);
      response.status(500).send({
        message: "Error en el servidor, comuniquese con el administrador.",
        code: 500,
        status: "ER",
      });
    }

    if (!id || id.length === 0) {
        response.status(404).send({
            message: `No se encontró ningún evento con ID ${eventData.id}.`,
            code: 404,
            status: "ER",
        });
    }
    response.status(200).send(id);
  });
}

function updateEvent(request, response) {

  const eventId = request.params.id;

  if (!eventId) {
    return response.status(400).send({
      message: "ID del evento es requerido.",
      code: 400,
      status: "ER",
    });
  }

  const eventData = {
    titulo: request.body.titulo,
    fechaHora: request.body.fecha_hora,  
    descripcion: request.body.descripcion,
    idUbicacion: request.body.id_ubicacion,
    id: eventId
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

function deleteEvent(request, response) {
  const eventId = request.params.id;

  if (!eventId) {
    return response.status(400).send({
      message: "ID del evento es requerido.",
      code: 400,
      status: "ER",
    });
  }

  const eventData = { id: eventId };

  event.deleteEvent(eventData, (error, changes) => {
    if (error) {
      console.error(error);
      response.status(500).send({
        message: "Error en el servidor, comuniquese con el administrador.",
        code: 500,
        status: "ER",
      });
    }

    if (!changes || changes.cambio === 0) {
      response.status(404).send({
        message: `No se encontró ningún evento con ID ${eventData.id}.`,
        code: 404,
        status: "ER",
      });
    } else {
      response.status(200).send({
        message: "Registro eliminado correctamente",
        code: 200,
        status: "OK",
        data: changes,
      });
    }
  });
}

module.exports = {
    insertEvent,
    selectAllEvent,
    selectFindByIdEvent,
    updateEvent,
    deleteEvent
}
