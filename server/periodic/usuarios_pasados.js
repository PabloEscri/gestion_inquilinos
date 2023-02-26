const mongoose = require("mongoose");
const cron = require("node-cron");
const moment = require("moment");
const Inquilino = require("../models/inquilino");
const { existsSync } = require("fs");

// Función para cambiar el estado activo de los inquilinos
const cambiarEstadoActivo = async () => {
  try {
    console.log("Comprobando inquilinos...");

    // Obtenemos todos los inquilinos activos
    const inquilinos = await Inquilino.find({ active: true });

    // Obtenemos la fecha de hoy en formato "YYYY-MM-DD"
    const fechaHoy = moment().format("YYYY-MM-DD");

    // Comprobamos cada inquilino
    for (let i = 0; i < inquilinos.length; i++) {
      const inquilino = inquilinos[i];

      // Comprobamos si la fecha de salida es anterior al día de hoy
      if (moment(inquilino.fecha_salida, "YYYY-MM-DD").isBefore(fechaHoy)) {
        console.log(`El inquilino ${inquilino.name} debe ser desactivado.`);
        console.log(
          `La fecha de hoy es: ${fechaHoy} y la fecha de salida es: ${inquilino.fecha_salida}`
        );
        // Desactivamos al inquilino
        await Inquilino.findByIdAndUpdate(inquilino._id, { active: false });
      }
    }
  } catch (e) {
    console.log("Error en cambiarEstadoActivo ", e);
  }
};

// Programamos la tarea diaria
cron.schedule("0 0 * * *", cambiarEstadoActivo);
