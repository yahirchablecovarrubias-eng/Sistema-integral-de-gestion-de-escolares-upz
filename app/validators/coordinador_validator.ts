import vine from '@vinejs/vine'

export const createCoordinadorValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim(),
    apellidoPaterno: vine.string().trim(),
    apellidoMaterno: vine.string().trim(),
    telefono: vine.string().trim(),
    correo: vine.string().email().trim(),
    curp: vine.string().trim(),
    rfc: vine.string().trim(),
    noCedulaProfesional: vine.string().trim(),
    carreraId: vine.number(),
    fechaInicio: vine.date({ formats: ['YYYY-MM-DD'] }),
  })
)
