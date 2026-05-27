import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    // Sincronizar dinámicamente todas las secuencias en PostgreSQL
    await this.db.rawQuery(`
      DO $$
      DECLARE
          r RECORD;
      BEGIN
          FOR r IN
              SELECT table_name, column_name
              FROM information_schema.columns
              WHERE table_schema = 'public'
                AND column_default LIKE 'nextval(%'
          LOOP
              BEGIN
                  EXECUTE 'SELECT setval(pg_get_serial_sequence(' || quote_literal(r.table_name) || ', ' || quote_literal(r.column_name) || '), coalesce((SELECT MAX(' || quote_ident(r.column_name) || ') FROM ' || quote_ident(r.table_name) || '), 0) + 1, false);';
              EXCEPTION WHEN OTHERS THEN
                  -- Ignorar errores si hay alguna secuencia sin permisos o bloqueada
                  RAISE NOTICE 'No se pudo sincronizar la secuencia para %.%', r.table_name, r.column_name;
              END;
          END LOOP;
      END $$;
    `)
  }

  async down() {
    // No requiere reversión de esquema
  }
}