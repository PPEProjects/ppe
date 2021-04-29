<?php

namespace App\Http\Controllers\Api;

use App\Classes;
use App\School;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;
use URL;

class ClassesController extends BaseController
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
            $classId = $_GET['id'];
            $class = \App\Classes::where('id', $classId)->first();
            $class = $class ? $class->toArray() : [];

            $schoolId = $class['school_id'];
            $school = \App\School::where('id', $schoolId)->first();
            $school = $school ? $school->toArray() : [];

            $courseIds = array_keys($class['courses']);
            $courses = \App\Course::whereIn('id', $courseIds)->get()->toArray();

            $learnerIds =array_keys($class['learners']);
            $learners = \App\User::whereIn('id', $learnerIds)->get()->toArray();

            $teacherIds =array_keys($class['teachers']);
            $teachers = \App\User::whereIn('id', $teacherIds)->get()->toArray();

            // $list
            $list = [
                ["Class name: {$class['name']}"],
                ["Teacher: {$teachers[0]['name']}, Course: {$courses[0]['name']}"],
            ];
            $list[] = ["Full name", "Gender", "Birhthday",	"Phone", "Email"];
            foreach ($learners as $learner) {
                $list[] = [
                    $learner['name'],
                    @$learner['infos']["gender"],
                    @$learner['infos']["birhthday"],
                    @$learner['infos']["phone"],
                    @$learner['infos']["email"],
                ];
            }

            // file download
            header("Content-Type: text/csv");
            header("Content-Disposition: attachment; filename={$class['name']}-{$school['name']}.csv");
            function outputCSV($data) {
                $output = fopen("php://output", "wb");
                foreach ($data as $row) fputcsv($output, $row);
                fclose($output);
            }
            outputCSV($list);
            return response()->json([]);
        }
        if($request->keyBy){
            $data['classes'] = Classes::select('*')
                ->orderBy('id', 'desc')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
            $data['classes'] = File::get_images($data['classes']);
            return response()->json($data);
        }
        if($request->learners){
            $classes = Classes::selectRaw('id, name, learners')
                ->where('status', 'Activated')
                ->get()
                ->toArray();
            $data['learners'] = [];
            foreach ($classes as $class) {
                foreach ($class['learners'] as $key => $learner) {
                    $data['learners'][$key] = $class;
                }
            }
            return response()->json($data);
        }
        if($request->is_manager){
            $user = auth('api')->user()->toArray();
            $schools = School::getSchoolsByUser($user);
            $school_ids = collect($schools)->pluck('id');
            $data['classes'] = Classes::select('*')
                ->whereIn('school_id', $school_ids)
                ->whereRaw("(status IS NULL OR status != 'Deleted')")
                ->orderBy('id', 'desc')
                ->get()
                ->toArray();
            $data['classes'] = File::get_images($data['classes']);
            return response()->json($data);
        }
//        if($request->leader_id){
//            $data['classes'] = Classes::select('*')
//                ->whereRaw("(status IS NULL OR status != 'Deleted') AND leaders LIKE '%\"".$request->leader_id."\"%'")
//                ->orderBy('id', 'desc')
//                ->get()
//                ->toArray();
//            $data['classes'] = File::get_images($data['classes']);
//            return response()->json($data);
//        }
        $data['classes'] = Classes::selectRaw("*");
        if ($request->status) {
            $data['classes'] = $data['classes']->where('status', $request->status);
        }
        $data['classes'] = $data['classes']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        $data['classes'] = File::get_images($data['classes']);
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
        $validator = Classes::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['status'] = 'Activated';
        $create = Classes::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Classes  $class
     * @return \Illuminate\Http\Response
     */
    public function show(Classes $class)
    {
        //
        $class = $class->toArray();
        $class = File::get_images([$class]);
        return response()->json($class[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Classes  $class
     * @return \Illuminate\Http\Response
     */
    public function edit(Classes $class)
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

        if ($request->user_change_class) {
            $makes = [
                'learners' => 'required',
            ];
            $validator = Validator::make($request->all(), $makes);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data = $request->all();
            $class = Classes::select('*')
                ->where('id', $id)
                ->first()
                ->toArray();
            $learners = array_replace($class['learners'], $data['learners']);
            \Illuminate\Support\Facades\Log::channel('single')->info('$learners', [$learners]);
            
            Classes::where('id', $id)
                ->update(['learners'=>$learners]);
//            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);
//
//            \Illuminate\Support\Facades\Log::channel('single')->info('$class', [$class]);
            
//            $user['more']['infos']['class_id']
//            $update = User::where('id', $id)->update($data);
            return response()->json($data);
        }
        $validator = Classes::validator($request, []);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method', 'files_before']);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $update = Classes::where('id', $id)->update($data);
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
        $delete = Classes::whereIn('id', $chooses)->update(['status'=>'Deleted']);
        return response()->json($data);
    }
}
