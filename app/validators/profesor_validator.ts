// app/validators/profesor_validator.ts
import vine from '@vinejs/vine'

export const createProfesorValidator = vine.create({
    nombre: vine
        .string()
        .trim()
        .minLength(2)
        .maxLength(100)
        .toUpperCase(),

    apellidoPaterno: vine
        .string()
        .trim()
        .minLength(2)
        .maxLength(100)
        .toUpperCase(),

    apellidoMaterno: vine
        .string()
        .trim()
        .minLength(2)
        .maxLength(100)
        .toUpperCase(),

    email: vine
        .string()
        .trim()
        .email(),
    telefono: vine
        .string()
        .trim()
        .regex(/^\d{3}-\d{3}-\d{4}$/),

    curp: vine
        .string()
        .trim()
        .fixedLength(18)
        .toUpperCase(),

    rfc: vine
        .string()
        .trim()
        .fixedLength(13)
        .toUpperCase(),

    noCedulaProfesional: vine
        .string()
        .trim()
        .regex(/^[0-9]+$/),

    especialidad: vine
        .string()
        .trim()
        .minLength(3)
        .maxLength(150)
        .toUpperCase(),
})