<?php

use App\Models\Blog;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::post('/upload', function () {
//TODO : need to fix this url no correct
    $fileName = request()->file('file')->getClientOriginalName();
    $path = request()->file('file')->storeAs('uploads', $fileName, 'public');;
    return response()->json(['location' => url('storage/' . $path)]);

    /*$imgpath = request()->file('file')->store('uploads', 'public');
    return response()->json(['location' => "/storage/$imgpath"]);*/
});

Route::post('/blogs', function () {
    $formData = request()->validate([
        'title' => 'required',
        'content' => 'required',
    ]);
    $formData['slug'] = Str::slug($formData['title']);
    Blog::create($formData);
    return redirect('/');
});

Route::get('/blogs/view', function () {
    $blog = Blog::all()->first();
    return Inertia::render('View', ['blog' => $blog]);
});
