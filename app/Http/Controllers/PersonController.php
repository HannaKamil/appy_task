<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    function index()
    {
        dd(Person::all());

        return response(['status' => 'success', 'posts' => Person::all(), 'code' => 200]);
    }

    function save(Request $request)
    {
        $request->validate(['title' => 'required', 'description' => 'required']);
        $post = new Person();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->save();

        return response(['status' => 'success', 'post' => $post, 'code' => 200]);
    }

    // get post by id
    function get($id)
    {
        $post = Person::find($id);
        return response(['status' => 'success', 'post' => $post, 'code' => 200]);
    }

    function update(Request $request)
    {
        $request->validate(['title' => 'required', 'description' => 'required']);
        $post = Person::find($request->id);
        $post->title = $request->title;
        $post->description = $request->description;
        $post->save();

        return response(['status' => 'success', 'post' => $post, 'code' => 200]);
    }

    function delete($id)
    {
        $post = Person::find($id);
        $post->delete();
        return response(['status' => 'success', 'message' => 'deleted successfully', 'code' => 200]);
    }
}
