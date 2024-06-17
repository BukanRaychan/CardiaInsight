<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Result;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataController extends Controller
{
    protected $userModel;
    public function __construct()
    {
        $this->userModel = new User();
    }

    //CONTOH POST
    public function showUser(Request $request)
    {
        return Inertia::render(
            'homepage/Homepage',
            [
                'userData' => User::where('username', $request->user)->first(), 'data' => User::all()
            ]
        );
    }

    public function getUserData()
    {
        $user = Auth::user();
        $data = [
            'userData' => $user
        ];
        return response()->json($user);
    }

    public function getData()
    {
        $systol = 0;
        $diastol = 0;
        $bpm = 0;
        $gula = 0;
        $kolesterol = 0;
        $data = [
            'systol' => $systol,
            'diastol' => $diastol,
            'bpm' => $bpm,
            'gula' => $gula,
            'kolesterol' => $kolesterol
        ];
        return response()->json($data);
    }
    public function test()
    {
        // DATA DUMMY, KIRIM DRI FRONTEND
        $cholerstrolLevel = 2;
        $glucoseLevel = 2;
        $smoke = 0;
        $alcohol = 0;
        $physicalActive = 1;
        $beratBadan = 72;
        // DATA DUMMY, KIRIM DRI FRONTEND

        // $user = $this->userModel->getUserbyUsername('rasjidzz');
        $user = Auth::user();

        $fullname = $user->fullname;
        $birthdate = $user->birthdate;
        $umur = round(Carbon::parse($birthdate)->diffInDays(Carbon::now()));

        $data = [
            'fullname' => $fullname,
            'berat_badan' => $beratBadan,
            'umur' => $umur,
            'kolesterol' => $cholerstrolLevel,
            'glukosa' => $glucoseLevel,
            'Merokok' => $smoke,
            'Alkohol' => $alcohol,
            'Olaraga' => $physicalActive
        ];

        return response()->json($data);
    }

    public function addResult()
    {
        // DATA DUMMY, KIRIM DRI FRONTEND
        $cholerstrolLevel = 1;
        $glucoseLevel = 1;
        $smoke = 0;
        $physicalActive = 1;
        $weight = 65;
        $systol = 90;
        $diastol = 120;
        $height = 170;
        // DATA DUMMY, KIRIM DRI FRONTEND

        $user = Auth::user();

        $data = [
            'user_id' => $user->id,
            'cholesterol_level' => $cholerstrolLevel,
            'glucose_level' => $glucoseLevel,
            'systole' => $systol,
            'diastole' => $diastol,
            'weight' => $weight,
            'height' => $height,
            'is_smoking' => $smoke,
            'is_exercising' => $physicalActive,
            'prediction' => 0.5
        ];

        Result::create($data);

        return response()->json($data);
    }
    public function sendData(Request $request)
    {
        $user = Auth::user();

        $gender = $user->gender;
        if ($gender == 0) {
            $gender = 1;
        } else if ($gender == 1) {
            $gender = 2;
        }
        $birthdate = $user->birthdate;
        $umur = round(Carbon::parse($birthdate)->diffInDays(Carbon::now()));

        // Ambil data dari request
        $cholesterol = $request->input('cholesterol');
        if ($cholesterol < 200) {
            $cholesterolLevel = 1;
        } elseif ($cholesterol >= 200 && $cholesterol <= 239) {
            $cholesterolLevel = 2;
        } elseif ($cholesterol > 239) {
            $cholesterolLevel = 3;
        }
        $glucose = $request->input('glucose');
        if ($glucose < 140) {
            $glucoseLevel = 1;
        } elseif ($glucose >= 140 && $glucose <= 200) {
            $glucoseLevel = 2;
        } elseif ($glucose > 200) {
            $glucoseLevel = 3;
        }
        $smoke = $request->input('smoke') === 'yes' ? 1 : 0;
        $alcohol = $request->input('alcohol') === 'yes' ? 1 : 0;
        $physicalActive = $request->input('sport') === 'yes' ? 1 : 0;
        $beratBadan = intval($request->input('weight'));
        $height = intval($request->input('height')); // Assuming you need height as well
        $systol = intval($request->input('systolic'));
        $diastol = intval($request->input('diastolic'));

        try {
            $dataForAi = [
                'age' => $umur,
                'gender' => $gender,
                'height' => $height,
                'weight' => $beratBadan,
                'ap_hi' => $systol,
                'ap_lo' => $diastol,
                'cholesterol' => $cholesterolLevel,
                'gluc' => $glucoseLevel,
                'smoke' => $smoke,
                'alco' => $alcohol,
                'active' => $physicalActive,
            ];

            $response = Http::asForm()->post('http://127.0.0.1:5000/get-prediction', $dataForAi);

            if ($response->successful()) {
                $result = $response->json();
                $prediction = $result['result'];
                // return $result;
                $data = [
                    'user_id' => $user->id,
                    'cholesterol_level' => $cholesterolLevel,
                    'glucose_level' => $glucoseLevel,
                    'systole' => $systol,
                    'diastole' => $diastol,
                    'weight' => $beratBadan,
                    'height' => $height,
                    'is_smoking' => $smoke,
                    'is_exercising' => $physicalActive,
                    'prediction' => $prediction
                ];
                Result::create($data);
                return response()->json($data);
            } else {
                return response()->json(['error' => 'Request failed'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }
}
