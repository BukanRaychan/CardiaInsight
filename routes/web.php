<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\LandingpageController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ResultController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//  Development TOKEN
Route::get('/getToken', [RegisterController::class, 'getToken']);
//  Development TOKEN

Route::get('/', [LandingpageController::class, 'index'])->middleware('guest');
Route::get('/auth', [AuthController::class, 'index']);

Route::get('/admin', [AdminController::class, 'index'])->middleware('auth');
Route::get('/admin/getunassignedresult', [AdminController::class, 'getUnassignedResult'])->middleware('auth');
Route::get('/admin/getdoctors', [AdminController::class, 'getDoctors'])->middleware('auth');

// blum dipake
Route::post('/admin/assign-doctor/{patientId}', [AdminController::class, 'assignDoctor']);
// blum dipake


Route::get('/doctorrecom', function () {
    return Inertia::render('doctorpage/DoctorRecom');
});

Route::get('/doctor', [DoctorController::class, 'index'])->middleware('auth');
Route::get('/doctor/getPatientData', [DoctorController::class, 'getPatientData'])->middleware('auth');
Route::post('doctor/addFeedback/{id}', [DoctorController::class, 'addFeedback'])->middleware('auth');


//Route::get('/homepage', [HomepageController::class, 'index'])->middleware(['auth', 'verified'])->name('homepage');

Route::middleware('auth')->group(function () {
    // OLD
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // OLD

    // GET
    Route::get('/getUserData', [DataController::class, 'getUserData']);
    Route::get('/result', [ResultController::class, 'index']);
    Route::get('/homepage', [HomepageController::class, 'index']);
    Route::get('/history', [HistoryController::class, 'index']);
    Route::get('/test', [DataController::class, 'test']);
    Route::get('/getHistory', [HistoryController::class, 'getHistory']);
    Route::get('/getResult', [ResultController::class, 'getLatestResult']);
    Route::get('/getResultById/{id}', [ResultController::class, 'getResultByID']);

    // POST
    Route::post('/homepage/showUser', [DataController::class, 'showUser']);
    Route::post('/getData', [DataController::class, 'test']);
    Route::post('/addResult', [DataController::class, 'addResult']);
    Route::post('/patient/sendData', [DataController::class, 'sendData']);
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

require __DIR__ . '/auth.php';
