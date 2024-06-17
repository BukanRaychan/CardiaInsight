<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check() || Auth::user()->user_role !== $role) {
            abort(403, 'Unauthorized Action.');
        }
    }
}

// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class RoleMiddleware
// {
//     public function handle(Request $request, Closure $next, ...$roles)
//     {
//         if (!Auth::check()) {
//             return redirect('login'); // Mengarahkan pengguna ke halaman login jika belum terotentikasi
//         }

//         if (!in_array($request->user()->user_role, $roles)) {
//             return redirect('home'); // Mengarahkan pengguna ke halaman home jika tidak memiliki peran yang sesuai
//         }

//         return $next($request);
//     }
// }
