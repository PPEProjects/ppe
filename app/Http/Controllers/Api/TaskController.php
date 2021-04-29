<?php

namespace App\Http\Controllers\Api;

use App\Task;
use App\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Auth;

class TaskController extends BaseController
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
        if($request->by_status){
            $tasks = Task::selectRaw('project_id, contents')
                ->get()
                ->toArray();
            $tasks1 = [];
            foreach ($tasks as $key => $task) {
                $id = $task['project_id'];
                $tasks1[$id] = $tasks1[$id] ?? [];
                $tasks1[$id]['all'] = $tasks1[$id]['all'] ?? 0;
                $tasks1[$id]['done'] = $tasks1[$id]['done'] ?? 0;
                $tasks1[$id]['all'] += count($task['contents']);
                foreach ($task['contents'] as $content) {
                    $tasks1[$id][$content['status']] = $tasks1[$id][$content['status']] ?? 0;
                    $tasks1[$id][$content['status']] += 1;
                }
            }
            $data['tasks'] = $tasks1;
            return response()->json($data);
        }
        if($request->project_id){
            $data['tasks'] = Task::select('*')
                ->where('project_id', $request->project_id)
                ->orderBy('tasks.id', 'desc')
                ->get()
                ->pluck('contents')
                ->flatten(1);
            return response()->json($data);
        }
        $data['tasks'] = Task::select('tasks.*');
        if ($request->status) {
            $data['tasks'] = $data['tasks']
                ->where('language', $request->lang)
                ->join('projects', 'projects.id', '=', 'tasks.project_id')
                ->where('tasks.status', $request->status);
            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);
            
        }
        $data['tasks'] = $data['tasks']
            ->orderBy('tasks.id', 'desc')
            ->get()
            ->toArray();
        foreach ($data['tasks'] as $key => $item) {
            $item['content'] = '';
            foreach ($item['contents'] as $key1 => $content) {
                $item['content'] .= $content['name'].' ';
            }
            $data['tasks'][$key] = $item;
        }
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
        $validator = Task::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['contents'] = array_values($data['contents']);
        $data['status'] = 'Activated';
        $create = Task::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
        $task = $task->toArray();
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
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
        $validator = Task::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method']);
        $data['user_id'] = $user['id'];
        $data['contents'] = array_values($data['contents']);
        $create = Task::where('id', $id)->update($data);
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
        $delete = Task::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
