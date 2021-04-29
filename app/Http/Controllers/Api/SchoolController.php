<?php

namespace App\Http\Controllers\Api;

use App\School;
use App\User;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;
use URL;

class SchoolController extends BaseController
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

        if($request->csv_download){
            $schoolId = $_GET['id'];
            $school = \App\School::where('id', $schoolId)->first();
            $school = $school ? $school->toArray() : [];
            $classes = \App\Classes::where('school_id', $schoolId)->get()->toArray();
            $leaderIds = array_keys($school['leaders']);
            $leaders = \App\User::whereIn('id', $leaderIds)->get()->toArray();
            // $list
            $list = [
                ["School name: {$school['name']}"],
                ["Address: {$school['infos']['address']}"],
            ];
            $list[] = ["Office leader (".count($leaders).")"];
            foreach ($leaders as $leader) {
                $list[] = [
                    " ".$leader['name'],
                ];
            }
            $list[] = ["Classes (".count($classes).")"];
            foreach ($classes as $class) {
                $list[] = [
                    " ".$class['name'],
                ];
            }
            // file download
            header("Content-Type: text/csv");
            header("Content-Disposition: attachment; filename={$school['name']}.csv");
            function outputCSV($data) {
                $output = fopen("php://output", "wb");
                foreach ($data as $row) fputcsv($output, $row);
                fclose($output);
            }
            outputCSV($list);
            return response()->json([]);
        }
        if($request->keyBy){
            $data['schools'] = School::select('*')
                ->orderBy('id', 'desc')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
            $data['schools'] = File::getImageDescription($data['schools']);
            return response()->json($data);
        }
        if($request->is_manager){
            $user = auth('api')->user()->toArray();
            $data['schools'] = School::getSchoolsByUser($user);
            $data['schools'] = File::get_images($data['schools']);
            return response()->json($data);
        }
//        if($request->leader_id){
//            $data['schools'] = School::select('*')
//                ->whereRaw("(status IS NULL OR status != 'Deleted') AND leaders LIKE '%\"".$request->leader_id."\"%'")
//                ->orderBy('id', 'desc')
//                ->get()
//                ->toArray();
//            $data['schools'] = File::get_images($data['schools']);
//            return response()->json($data);
//        }
        $data['schools'] = School::selectRaw("*");
        if ($request->status) {
            $data['schools'] = $data['schools']->where('status', $request->status);
        }
        $data['schools'] = $data['schools']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        $data['schools'] = File::get_images($data['schools']);
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
        $validator = School::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['status'] = 'Activated';
        $create = School::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\School  $school
     * @return \Illuminate\Http\Response
     */
    public function show(School $school)
    {
        //
        $school = $school->toArray();
        $school = File::get_images([$school]);
        return response()->json($school[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\School  $school
     * @return \Illuminate\Http\Response
     */
    public function edit(School $school)
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
        $validator = School::validator($request, []);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method', 'files_before']);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $update = School::where('id', $id)->update($data);
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
        $delete = School::whereIn('id', $chooses)->update(['status'=>'Deleted']);
        return response()->json($data);
    }
}
