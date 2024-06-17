<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Login'
        ];
        return view('auth.login.index', $data);
    }
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'emailLogin' => 'required|email:dns,email',
            'passwordLogin' => 'required',
        ]);

        $credentials['email'] = $credentials['emailLogin'];
        unset($credentials['emailLogin']);

        $credentials['password'] = $credentials['passwordLogin'];
        unset($credentials['passwordLogin']);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();
            $role = $user->user_role;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'redirect' => $this->getRedirectUrl($role)
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Invalid credentials',
        ], 401);
    }

    private function getRedirectUrl($role)
    {
        switch ($role) {
            case 'patient':
                return '/homepage';
            case 'doctor':
                return '/doctor';
            case 'admin':
                return '/admin';
            default:
                return '/';
        }
    }

    public function test()
    {
        $data =
            [
                'nama' => 'hai'
            ];
        return response()->json($data);
    }
}
