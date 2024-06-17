<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorController extends Controller
{
    protected $resultModel;
    public function __construct()
    {
        $this->resultModel = new Result();
    }
    public function index()
    {
        $user_doctor = Auth::user();
        $user_id = $user_doctor->id;
        $result = $this->resultModel->getResultByDoctorId($user_id);
        $data = [
            'user' => $user_doctor,
            'user_id' => $user_id,
            'patient_data' => $result
        ];
        return Inertia::render('doctorpage/Doctor', $data);
    }

    public function getPatientData()
    {
        $user_doctor = Auth::user();
        $user_id = $user_doctor->id;
        $result = $this->resultModel->getResultByDoctorId($user_id);
        $data = [
            'user' => $user_doctor,
            'user_id' => $user_id,
            'patient_data' => $result
        ];
        return response()->json($data);
    }
    public function addFeedback(Request $request, $id)
    {
        $request->validate([
            'doctor_feedback' => 'required|string',
        ]);

        $result = Result::findOrFail($id);
        $result->doctor_feedback = $request->doctor_feedback;
        $result->save();

        return response()->json(['message' => 'Feedback submitted successfully'], 200);
    }
}
