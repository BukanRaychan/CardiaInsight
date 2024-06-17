<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    protected $userModel;
    protected $resultModel;
    public function __construct()
    {
        $this->resultModel = new Result();
        $this->userModel = new User();
    }
    public function index()
    {
        // $data = $this->resultModel->getUnassignedResult();
        // return Inertia::render('adminpage/Admin', $data);
        $results = $this->resultModel->getUnassignedResult();

        $patients = $results->map(function ($result) {
            return [
                'id' => $result->id,
                'name' => $result->user->fullname,
                'age' => calculateAge($result->user->birthdate),
                'PKVStatus' => $result->prediction == 1 ? 'Yes' : 'No',
            ];
        });

        return Inertia::render('adminpage/Admin', [
            'patients' => $patients,
        ]);
    }

    public function getUnassignedResult()
    {
        $unassignedResults = $this->resultModel->getUnassignedResult();
        return response()->json($unassignedResults);
    }
    public function getDoctors()
    {
        $doctors = $this->userModel->getDoctors();
        return response()->json($doctors);
    }
    public function assignDoctor(Request $request, $patientId)
    {
        $validatedData = $request->validate([
            'doctorId' => 'required|integer|exists:users,id,user_role,doctor',
        ]);

        $doctorId = $validatedData['doctorId'];

        try {
            // Lakukan proses penugasan dokter ke pasien di sini
            $result = $this->resultModel->where('id', $patientId)->firstOrFail();
            $result->doctor_id = $doctorId;
            $result->save();

            return response()->json(['message' => 'Doctor assigned successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to assign doctor'], 500);
        }
    }
}
function calculateAge($birthdate)
{
    $dob = new \DateTime($birthdate);
    $now = new \DateTime();
    $age = $now->diff($dob);
    return $age->y;
}
