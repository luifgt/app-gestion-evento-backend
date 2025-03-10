jest.mock("../src/models/evento", () => ({
    updateEvent: jest.fn(),
  }));
  
  const { updateEvent } = require("../src/controllers/eventoCtrl");
  const event = require("../src/models/evento");
  
  describe("Pruebas unitarias de updateEvent", () => {
    let request, response;
  
    beforeEach(() => {
      request = { params: {}, body: {} }; // Inicializamos params y body vacío
      response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    test("Debe retornar 400 si no se proporciona un ID", () => {
      updateEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.send).toHaveBeenCalledWith({
        message: "ID del evento es requerido.",
        code: 400,
        status: "ER",
      });
    });
  
    test("Debe retornar 404 si el evento no existe", () => {
      request.params.id = "123";
      request.body = {
        titulo: "Nuevo título",
        fecha_hora: "2025-03-10T12:00:00",
        descripcion: "Descripción actualizada",
        id_ubicacion: 5,
      };
  
      event.updateEvent.mockImplementation((_, callback) =>
        callback(null, { cambio: 0 }) // Simula que no se actualizó nada
      );
  
      updateEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledWith({
        message: "No se encontró ningún evento con ID 123.",
        code: 404,
        status: "ER",
      });
    });
  
    test("Debe retornar 200 si la actualización fue exitosa", () => {
      request.params.id = "123";
      request.body = {
        titulo: "Nuevo título",
        fecha_hora: "2025-03-10T12:00:00",
        descripcion: "Descripción actualizada",
        id_ubicacion: 5,
      };
  
      const mockResponse = { cambio: 1 }; // Simula que se actualizó correctamente
  
      event.updateEvent.mockImplementation((_, callback) => callback(null, mockResponse));
  
      updateEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        message: "Registro actualizado correctamente",
        code: 200,
        status: "OK",
        data: mockResponse,
      });
    });
  
    test("Debe retornar 500 si hay un error en la base de datos", () => {
      request.params.id = "123";
      request.body = {
        titulo: "Nuevo título",
        fecha_hora: "2025-03-10T12:00:00",
        descripcion: "Descripción actualizada",
        id_ubicacion: 5,
      };
  
      event.updateEvent.mockImplementation((_, callback) => callback(new Error("Error DB"), null));
  
      updateEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith({
        message: "Error en el servidor, no se actualizó el evento en la Base de Datos.",
        code: 500,
        status: "ER",
      });
    });
  });