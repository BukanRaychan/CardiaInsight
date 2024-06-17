<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cholesterol_level',
        'glucose_level',
        'systole',
        'diastole',
        'weight',
        'height',
        'is_smoking',
        'is_exercising',
        'prediction',
        'doctor_id',
        'doctor_feedback'
    ];
    public function getResultByID($result_id)
    {
        return $this->where('id', $result_id)->with('user')->get();
    }
    public function getResultByDoctorId($doctor_id)
    {
        // return $this->where('doctor_id', $doctor_id)->get();
        return $this->where('doctor_id', $doctor_id)
            ->join('users', 'results.user_id', '=', 'users.id')
            ->select('results.*', 'users.fullname')
            ->get();
    }
    public function getUnassignedResult()
    {
        return Result::whereNull('doctor_id')->with('user')->get();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getResultsByUser($user_id)
    {
        return $this->where('user_Id', $user_id)->get();
    }
    public function getLatestResult($user_id)
    {
        return $this->where('user_id', $user_id)->latest()->first();
    }
}
