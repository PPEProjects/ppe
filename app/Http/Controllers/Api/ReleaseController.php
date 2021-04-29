<?php

namespace App\Http\Controllers\Api;

use App\Release;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;

class ReleaseController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $data = [];
        if($request->project_id){
            $data['releases'] = Release::select('*')
                ->where('project_id', $request->project_id)
                ->orderBy('id', 'desc')
                ->get()
                ->pluck('contents')
                ->flatten(1);
            return response()->json($data);
        }
        $data['releases'] = Release::select('*');
        if ($request->status) {
            $data['releases'] = $data['releases']->where('status', $request->status);
        }
        $data['releases'] = $data['releases']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
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
        $validator = Release::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['contents'] = array_values($data['contents']);
        $data['status'] = 'Activated';
        $create = Release::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function show(Release $release)
    {
        //
        $release = $release->toArray();
        return response()->json($release);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function edit(Release $release)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Release::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method', 'files_before']);
        $data['user_id'] = $user['id'];
        $data['contents'] = array_values($data['contents']);
        $create = Release::where('id', $id)->update($data);
        return response()->json($create);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $data = $request->except([]);
        $chooses = $data['chooses'] ? json_decode($data['chooses'], true) : [];
        $delete = Release::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
