<?php

namespace App\Http\Controllers\Api;

use App\File;
use App\Post;
use Auth;
use Illuminate\Http\Request;
use URL;
use Validator;

class PostController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $data = [];
        if ($request->keyBy) {
            $data['posts'] = Post::select('*')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
//            $data['posts'] = File::getImageDescription($data['posts']);
            return response()->json($data);
        }
        if ($request->lang) {
            $data['posts'] = Post::select('*')
                ->where('language', $request->lang)
                ->whereRaw("(status IS NULL OR status != 'Deleted')")
                ->orderBy('id', 'desc');
            if ($request->status) {
                $data['posts'] = $data['posts']->where('status', $request->status);
            }
            $data['posts'] = $data['posts']
                ->get()
                ->toArray();
//            $data['posts'] = File::getImageDescription($data['posts']);
            return response()->json($data);
        }
        $data['posts'] = Post::select('*');
        if ($request->status) {
            $data['posts'] = $data['posts']->where('status', $request->status);
        }
        $data['posts'] = $data['posts']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
//        $data['posts'] = File::getImageDescription($data['posts']);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Post::validator($request);
        if ($validator && $validator->fails()) {
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
//        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        $data['status'] = 'Activated';
        $create = Post::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
        $post = $post->toArray();
        $post = File::getImageDescription([$post]);
        return response()->json($post[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Post::validator($request);
        if ($validator && $validator->fails()) {
            return $this->checkSendError($validator);
        }
        $data = $request->except(['_method', 'files_before']);
        $data['files'] = File::add_images(@$data['files']);
//        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);

        $update = Post::where('id', $id)->update($data);
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $data = $request->except([]);
        $chooses = $data['chooses'] ? json_decode($data['chooses'], true) : [];
        $delete = Post::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
