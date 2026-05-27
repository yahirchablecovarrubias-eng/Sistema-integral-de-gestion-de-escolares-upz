import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'yahirchablecovarrubias@gmail.com' },
      {
        fullName: 'Yahir Chable',
        email: 'yahirchablecovarrubias@gmail.com',
        password: 'asd123',
      }
    )
  }
}
