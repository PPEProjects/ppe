<?php

namespace App\Http\Controllers\Api;

use App\Comment;
use Illuminate\Http\Request;
use Validator;
use Auth;
use URL;
use App\File;

class CommentController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $data = [];
        if($request->keyBy){
            $data['comments'] = Comment::select('*')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
            $data['comments'] = File::get_images($data['comments']);
            return response()->json($data);
        }
        $data['comments'] = Comment::select('*');
        if ($request->status) {
            $data['comments'] = $data['comments']->where('status', $request->status);
        }
        $data['comments'] = $data['comments']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        $data['comments'] = File::get_images($data['comments']);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Comment::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['status'] = 'Activated';
        $create = Comment::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
        $comment = $comment->toArray();
        $comment = File::get_image([$comment]);
        return response()->json($comment[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Comment::validator($request, []);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $data = $request->except(['_method', 'files_before']);
        $update = Comment::where('id', $id)->update($data);
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $data = $request->except([]);
        $chooses = $data['chooses'] ? json_decode($data['chooses'], true) : [];
        $delete = Comment::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
