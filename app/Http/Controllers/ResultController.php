<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResultController extends Controller
{
    protected $resultModel;

    public function __construct()
    {
        $this->resultModel = new Result();
    }
    public function index()
    {
        return Inertia::render('Resultpage/Result');
    }
    public function getLatestResult()
    {
        $user = Auth::user();
        $user_id = $user->id;
        $latest = $this->resultModel->getLatestResult($user_id);
        $data = [
            'user' => $user,
            'data' => $latest
        ];
        return response()->json($data);
    }
    public function getResultByID($id)
    {
        $result = $this->resultModel->getResultByID($id);
        return response()->json($result);
    }
}
