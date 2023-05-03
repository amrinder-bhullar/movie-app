<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Bookmark::query()->where('user_id', auth()->id())->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "imdbID" => ["required"],
            "poster" => ["string"],
            "title" => ["string"],
            "rating" => ["numeric"],
            "watch_count" => ["numeric"]
        ]);

        $data['user_id'] = $request->user()->id;

        $exists = Bookmark::query()->where('user_id', auth()->id())->where('imdbID', $data['imdbID'])->exists();

        if ($exists) {
            return response("bookmark already exist");
        }

        Bookmark::create($data);

        return response("bookmark created", 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BookmarkController $bookmarkController)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookmarkController $bookmarkController)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookmarkController $bookmarkController)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark)
    {
        $bookmark->delete();
        return response('deletef', 201);
    }
}
