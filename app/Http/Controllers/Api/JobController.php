<?php

namespace App\Http\Controllers\Api;

use App\Job;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;
use URL;

class JobController extends BaseController
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
            $data['jobs'] = Job::select('*')
                ->orderBy('id', 'desc')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
            $data['jobs'] = File::getImageDescription($data['jobs']);
            $data['jobs'] = Job::getMore($data['jobs']);
            return response()->json($data);
        }
        if($request->lang && $request->status){
            $data['jobs'] = Job::selectRaw("jobs.*, REPLACE(JSON_EXTRACT(jobs.more, '$.ranking'), '\"', '') AS ranking")
                ->join('companies', 'companies.id', '=', 'jobs.company_id')
                ->where('language', $request->lang)
                ->where('jobs.status', $request->status)
                ->orderBy('ranking', 'asc')
                ->orderBy('jobs.id', 'desc')
                ->get()
                ->toArray();
            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);
            
            $data['jobs'] = File::getImageDescription($data['jobs']);
            $data['jobs'] = Job::getMore($data['jobs']);
            return response()->json($data);
        }
        if($request->lang){
            $data['jobs'] = Job::selectRaw("jobs.*, REPLACE(JSON_EXTRACT(jobs.more, '$.ranking'), '\"', '') AS ranking")
                ->join('companies', 'companies.id', '=', 'jobs.company_id')
                ->where('language', $request->lang)
                ->orderBy('ranking', 'asc')
                ->orderBy('jobs.id', 'desc')
                ->get()
                ->toArray();
            $data['jobs'] = File::getImageDescription($data['jobs']);
            $data['jobs'] = Job::getMore($data['jobs']);
            return response()->json($data);
        }
        $data['jobs'] = Job::selectRaw("jobs.*, REPLACE(JSON_EXTRACT(jobs.more, '$.ranking'), '\"', '') AS ranking");
        if ($request->status) {
            \Illuminate\Support\Facades\Log::channel('single')->info('2', []);
            
            $data['jobs'] = $data['jobs']->where('jobs.status', $request->status);
        }
        $data['jobs'] = $data['jobs']
            ->orderBy('ranking', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        $data['jobs'] = File::getImageDescription($data['jobs']);
        $data['jobs'] = Job::getMore($data['jobs']);
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
        $validator = Job::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        $data['status'] = 'Activated';
        $create = Job::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        //
        $job = [$job->toArray()];
        $job = File::getImageDescription($job);
        $job = Job::getMore($job);
        return response()->json($job[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        //
        $validator = Job::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $data = $request->except(['_method', 'files_before']);
        $data['files'] = File::add_images(@$data['files']);
        $data['descriptions'] = File::descriptions_files(@$data['descriptions']);
        $update = Job::where('id', $job->id)->update($data);
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
        $delete = Job::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
