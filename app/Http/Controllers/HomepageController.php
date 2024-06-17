<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('homepage/Homepage', ['data' => $user]);
    }
    public function test()
    {
        $data = [
            'test' => 'test halo'
        ];
        return response()->json($data);
    }
}
