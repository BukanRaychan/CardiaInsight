<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class doctor_patient extends Model
{
    use HasFactory;

    protected $table = 'doctor_patient';

    // Atribut yang dapat diisi secara massal
    protected $fillable = [
        'doctor_id',
        'patient_id',
    ];

    // Menonaktifkan timestamps jika tidak digunakan
    public $timestamps = false;

    // Relasi ke model User sebagai doctor
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    // Relasi ke model User sebagai patient
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
