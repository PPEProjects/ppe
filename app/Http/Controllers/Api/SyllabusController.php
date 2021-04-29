<?php

namespace App\Http\Controllers\Api;

use App\Syllabus;
use Auth;
use Illuminate\Http\Request;
use Validator;

class SyllabusController extends BaseController
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
        if ($request->course_id) {
            $data['syllabuses'] = Syllabus::select('*')
                ->where('course_id', $request->course_id)
                ->orderBy('id', 'desc')
                ->get()
                ->pluck('contents')
                ->flatten(1);
            return response()->json($data);
        }
        if ($request->syllabus_ids) {
            $data['syllabuses'] = Syllabus::select('*')
                ->whereIn('id', $request->syllabus_ids)
                ->get()
                ->toArray();
            return response()->json($data);
        }
        $data['syllabuses'] = Syllabus::select('*');
        if ($request->status) {
            $data['syllabuses'] = $data['syllabuses']->where('status', $request->status);
        }
        $data['syllabuses'] = $data['syllabuses']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        \Illuminate\Support\Facades\Log::channel('single')->info('$data[\'syllabuses\']', [$data['syllabuses']]);

        if ($request->lang) {
            foreach (@$data['syllabuses'] as $key => $item) {
                foreach ($item['contents'] as $key1 => $content) {
                    \Illuminate\Support\Facades\Log::channel('single')->info('$content', [$content]);
                    $topic = explode("\n", $content['topic']);
                    $lists = explode("\n", $content['lists']);
                    if ($request->lang == 'English') {
                        $content['topic'] = @$topic[1];
                        $content['lists'] = @$lists[1];
                    }
                    if ($request->lang == 'Japanese') {
                        $content['topic'] = @$topic[0];
                        $content['lists'] = @$lists[0];
                    }
                    if ($request->lang == 'Vietnamese') {
                        $content['topic'] = @$topic[2];
                        $content['lists'] = @$lists[2];
                    }
                    $data['syllabuses'][$key]['contents'][$key1] = $content;
                    \Illuminate\Support\Facades\Log::channel('single')->info('$lists', [$lists]);

                }
            }

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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Syllabus::validator($request);
        if ($validator && $validator->fails()) {
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['contents'] = array_values($data['contents']);
        $data['status'] = 'Activated';
        $create = Syllabus::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Syllabus $syllabus
     * @return \Illuminate\Http\Response
     */
    public function show(Syllabus $syllabus)
    {
        //
        $syllabus = $syllabus->toArray();
        return response()->json($syllabus);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Syllabus $syllabus
     * @return \Illuminate\Http\Response
     */
    public function edit(Syllabus $syllabus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Syllabus::validator($request);
        if ($validator && $validator->fails()) {
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method']);
        $data['user_id'] = $user['id'];
        $data['contents'] = array_values($data['contents']);
        $create = Syllabus::where('id', $id)->update($data);
        return response()->json($create);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $data = $request->except([]);
        $chooses = $data['chooses'] ? json_decode($data['chooses'], true) : [];
        $delete = Syllabus::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
