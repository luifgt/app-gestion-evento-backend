const path = require('path')
const sqlite = require('sqlite3');

const conexionBd = new sqlite.Database(
    path.resolve(__dirname, '../../gestorEventos.db'),
    (error) => {
        if (error) {
            return console.error("Error al conectarse a la BD SQLite:", error.message);
        }
        console.log("Conectado exitosamente a la BD SQLite");

        // Habilitar claves foráneas
        conexionBd.run("PRAGMA foreign_keys = ON;");

        // Crear tabla evento_ubicacion
        const sqlUbicacion = `CREATE TABLE IF NOT EXISTS evento_ubicacion (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                tipo VARCHAR(100)
                            );`;

        // Crear tabla evento con clave foránea a evento_ubicacion
        const sqlEvento = `CREATE TABLE IF NOT EXISTS evento (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            titulo VARCHAR(100) NOT NULL,
                            fecha_hora DATETIME NOT NULL,
                            descripcion VARCHAR(200),
                            id_ubicacion INTEGER,
                            FOREIGN KEY (id_ubicacion) REFERENCES evento_ubicacion(id) ON DELETE CASCADE
                        );`;

        // Ejecutar la creación de tablas
        conexionBd.run(sqlUbicacion, (err) => {
            if (err) {
                return console.error("Error creando la tabla evento_ubicacion:", err.message);
            }
            console.log("Tabla evento_ubicacion creada correctamente");
        });

        conexionBd.run(sqlEvento, (err) => {
            if (err) {
                return console.error("Error creando la tabla evento:", err.message);
            }
            console.log("Tabla evento creada correctamente");
        });
    }
);

module.exports = conexionBd;