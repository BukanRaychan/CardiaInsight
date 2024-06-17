<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    protected $userModel;
    protected $resultModel;
    public function __construct()
    {
        $this->userModel = new User();
        $this->resultModel = new Result();
    }
    public function index()
    {
        return Inertia::render('historypage/Historypage');
    }
    public function getHistory()
    {
        $user = Auth::user();
        $user_id = $user->id;
        $result = $this->resultModel->getResultsByUser($user_id);
        return response()->json($result);
    }
}
