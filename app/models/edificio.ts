import { EdificioSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Salon from '#models/salon'

export default class Edificio extends EdificioSchema {
    static table = 'edificio'
	@hasMany(() => Salon)
	declare salones: HasMany<typeof Salon>
}
