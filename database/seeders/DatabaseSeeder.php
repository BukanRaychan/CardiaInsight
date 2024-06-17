<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        // Create 3 doctors
        User::factory()->create([
            'username' => 'dokter1',
            'fullname' => 'Ini Contoh Dokter Satu',
            'email' => 'dokter1@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '1980-01-01',
            'gender' => 1,
            'user_role' => 'doctor',
            'phonenum' => '082200000001'
        ]);

        User::factory()->create([
            'username' => 'dokter2',
            'fullname' => 'Ini Contoh Dokter Dua',
            'email' => 'dokter2@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '1975-05-05',
            'gender' => 0,
            'user_role' => 'doctor',
            'phonenum' => '082200000002'
        ]);

        User::factory()->create([
            'username' => 'dokter3',
            'fullname' => 'Ini Contoh Dokter Tiga',
            'email' => 'dokter3@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '1990-10-10',
            'gender' => 1,
            'user_role' => 'doctor',
            'phonenum' => '082200000003'
        ]);

        // Create 3 patients
        User::factory()->create([
            'username' => 'pasien1',
            'fullname' => 'Ini Contoh Pasien Satu',
            'email' => 'pasien1@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '1995-02-02',
            'gender' => 0,
            'user_role' => 'patient',
            'phonenum' => '082200000004'
        ]);

        User::factory()->create([
            'username' => 'pasien2',
            'fullname' => 'Ini Contoh Pasien Dua',
            'email' => 'pasien2@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '1988-07-07',
            'gender' => 1,
            'user_role' => 'patient',
            'phonenum' => '082200000005'
        ]);

        User::factory()->create([
            'username' => 'pasien3',
            'fullname' => 'Ini Contoh Pasien Tiga',
            'email' => 'pasien3@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '2000-12-12',
            'gender' => 0,
            'user_role' => 'patient',
            'phonenum' => '082200000006'
        ]);

        // Create 1 admin
        User::factory()->create([
            'username' => 'admin',
            'fullname' => 'Ini Contoh Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'birthdate' => '1970-01-01',
            'gender' => 0,
            'user_role' => 'admin',
            'phonenum' => '082200000007'
        ]);

        // Patient::factory(5)->create(); // Membuat patient dummy
        // Doctor::factory(5)->create(); // Membuat doctor dummy

    }
}
