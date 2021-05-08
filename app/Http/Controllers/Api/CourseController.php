<?php

namespace App\Http\Controllers\Api;

use App\Course;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;
use URL;

class CourseController extends BaseController
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
        if($request->keyBy){
            $data['courses'] = Course::select('*')
                ->orderBy('ranking', 'asc')
                ->orderBy('id', 'desc')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
//            $data['courses'] = File::getImageDescription($data['courses']);
            $data['courses'] = File::getImageEditorJS($data['courses']);
            return response()->json($data);
        }
        if($request->lang ){
            $data['courses'] = Course::selectRaw("*, REPLACE(JSON_EXTRACT(more, '$.ranking'), '\"', '') AS ranking")
                ->where('language', $request->lang)
                ->orderBy('ranking', 'asc')
                ->orderBy('id', 'desc');
            if ($request->status) {
                $data['courses'] = $data['courses']->where('status', $request->status);
            }
            $data['courses'] = $data['courses']
                ->get()
                ->toArray();
//            $data['courses'] = File::getImageDescription($data['courses']);
            $data['courses'] = File::getImageEditorJS($data['courses']);
            return response()->json($data);
        }
        if($request->teacher_id){
            $data['courses'] = Course::select('*')
                ->whereRaw("(status IS NULL OR status != 'Deleted') AND teachers LIKE '%\"".$request->teacher_id."\"%'")
                ->orderBy('id', 'desc')
                ->get()
                ->toArray();
//            $data['courses'] = File::getImageDescription($data['courses']);
            $data['courses'] = File::getImageEditorJS($data['courses']);
            return response()->json($data);
        }
        $data['courses'] = Course::selectRaw("*, REPLACE(JSON_EXTRACT(more, '$.ranking'), '\"', '') AS ranking");
        if ($request->status) {
            $data['courses'] = $data['courses']->where('status', $request->status);
        }
        $data['courses'] = $data['courses']
            ->orderBy('ranking', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
//        $data['courses'] = File::getImageDescription($data['courses']);
        $data['courses'] = File::getImageEditorJS($data['courses']);
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
        $validator = Course::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        $data['status'] = 'Activated';
        $create = Course::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        //
        $course = $course->toArray();
        $course = File::getImageDescription([$course]);
        return response()->json($course[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
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
        $validator = Course::validator($request, []);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method', 'files_before']);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);

        $update = Course::where('id', $id)->update($data);
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
        $delete = Course::whereIn('id', $chooses)->update(['status'=>'Deleted']);
        return response()->json($data);
    }
}
