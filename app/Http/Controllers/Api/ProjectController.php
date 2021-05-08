<?php

namespace App\Http\Controllers\Api;

use App\Project;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;
use URL;

class ProjectController extends BaseController
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
            $data['projects'] = Project::selectRaw("*, REPLACE(JSON_EXTRACT(more, '$.ranking'), '\"', '') AS ranking")
                ->orderBy('ranking', 'asc')
                ->orderBy('id', 'desc')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
//            $data['projects'] = File::getImageDescription($data['projects']);
            $data['projects'] = File::get_images($data['projects']);
            return response()->json($data);
        }
        if($request->lang){
            $data['projects'] = Project::select('*')
                ->where('language', $request->lang)
                ->orderBy('id', 'desc');
            if ($request->status) {
                $data['projects'] = $data['projects']->where('status', $request->status);
            }
            $data['projects'] = $data['projects']
                ->get()
                ->toArray();
//            $data['projects'] = File::getImageDescription($data['projects']);
            $data['projects'] = File::get_images($data['projects']);
            return response()->json($data);
        }
        $data['projects'] = Project::selectRaw("*, REPLACE(JSON_EXTRACT(more, '$.ranking'), '\"', '') AS ranking");
        if ($request->status) {
            $data['projects'] = $data['projects']->where('status', $request->status);
        }
        $data['projects'] = $data['projects']
            ->orderBy('ranking', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
//        $data['projects'] = File::getImageDescription($data['projects']);
        $data['projects'] = File::get_images($data['projects']);
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
        $validator = Project::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        $data['status'] = 'Activated';
        $create = Project::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
        $project = $project->toArray();
        $project = File::getImageDescription([$project]);
        return response()->json($project[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
        $project = $project->toArray();
        $item['image'] = URL::to('/'). ($item['files']['images'][0] ?? "/files/images/avatars/1.jpg");
        $descriptions = $item['descriptions'];
        $item['description'] = '';
        foreach ($descriptions as $key1 => $description) {
            $item['description'] .= $description['value'].', ';
            foreach ($description['files']??[] as $key2 => $file) {
                $description['files'][$key2] = URL::to('/').$file;
            }
            $descriptions[$key1] = $description;
        }
        $item['descriptions'] = $descriptions;
        $data['projects'][$key] = $item;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Project::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method', 'files_before']);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        $create = Project::where('id', $id)->update($data);
        return response()->json($create);
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
        $delete = Project::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
