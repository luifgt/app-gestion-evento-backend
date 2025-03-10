jest.mock("../src/models/evento", () => ({
    selectFindById: jest.fn(),
  }));
  
  const { selectFindByIdEvent } = require("../src/controllers/eventoCtrl");
  const event = require("../src/models/evento");
  
  describe("Pruebas unitarias de selectFindByIdEvent", () => {
    let request, response;
  
    beforeEach(() => {
      request = { params: {} }; // Inicializamos params vacío
      response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    test("Debe retornar 400 si no se proporciona un ID", () => {
      selectFindByIdEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.send).toHaveBeenCalledWith({
        message: "ID del evento es requerido.",
        code: 400,
        status: "ER",
      });
    });
  
    test("Debe retornar 404 si no encuentra un evento", () => {
      request.params.id = "123"; // Simulamos un ID en la petición
  
      event.selectFindById.mockImplementation((_, callback) => callback(null, []));
  
      selectFindByIdEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledWith({
        message: "No se encontró ningún evento con ID 123.",
        code: 404,
        status: "ER",
      });
    });
  
    test("Debe retornar 200 y los datos del evento si lo encuentra", () => {
      request.params.id = "123";
  
      const mockEvent = [{ id: 123, name: "Evento de prueba" }];
  
      event.selectFindById.mockImplementation((_, callback) => callback(null, mockEvent));
  
      selectFindByIdEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(mockEvent);
    });
  
    test("Debe retornar 500 si hay un error en el servidor", () => {
      request.params.id = "123";
  
      event.selectFindById.mockImplementation((_, callback) => callback(new Error("Error DB"), null));
  
      selectFindByIdEvent(request, response);
  
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith({
        message: "Error en el servidor, comuniquese con el administrador.",
        code: 500,
        status: "ER",
      });
    });
  });