import db from '@adonisjs/lucid/services/db'

export default async function () {
  const result = await db.rawQuery(`SELECT setval('alumno_id_seq', coalesce((SELECT MAX(id) + 1 FROM "alumno"), 1), false);`)
  console.log('Secuencia actualizada:', result.rows)
}
