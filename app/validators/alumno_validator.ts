import vine from '@vinejs/vine'

export const createAlumnoValidator = vine.create({
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
        .maxLength(100)
        .toUpperCase()
        .optional(),

    email: vine
        .string()
        .trim()
        .email()
        .optional(),

    telefono: vine
        .string()
        .trim()
        .regex(/^\d{3}-\d{3}-\d{4}$/)
        .optional(),

    curp: vine
        .string()
        .trim()
        .fixedLength(18)
        .toUpperCase()
        .optional(),

    matricula: vine
        .string()
        .trim()
        .maxLength(12)
        .toUpperCase(),

    planEstudiosId: vine.number(),

    periodo: vine.enum(['ENERO-ABRIL', 'MAYO-AGOSTO', 'SEPTIEMBRE-DICIEMBRE']),

    cuatrimestre: vine.number().min(1).max(10),

    estadoAcademico: vine.enum(['REGULAR', 'IRREGULAR'])
})
