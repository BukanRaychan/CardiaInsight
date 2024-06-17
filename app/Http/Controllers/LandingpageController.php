<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingpageController extends Controller
{
    public function index()
    {
        return Inertia::render('landing/LandingPage');
    }
}
