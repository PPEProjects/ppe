<?php

namespace App\Http\Controllers\Api;

use App\Review;
use Illuminate\Http\Request;
use Validator;
use Auth;
use URL;

class ReviewController extends BaseController
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
        if($request->company_id){
            $data['reviews'] = Review::select('*')
                ->where('company_id', $request->company_id)
                ->get()
                ->toArray();
            return response()->json($data);
        }
        if($request->keyBy){
            $data['reviews'] = collect($data['reviews'])
                ->keyBy($request->keyBy)
                ->toArray();
            return response()->json($data);
        }
        $data['reviews'] = Review::select('*');
        if ($request->status) {
            $data['reviews'] = $data['reviews']->where('status', $request->status);
        }
        $data['reviews'] = $data['reviews']
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
        $validator = Review::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['status'] = 'Activated';
        $create = Review::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
        $review = $review->toArray();
        return response()->json($review);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
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
        $validator = Review::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except(['_method', 'files_before', 'admin_register']);
        $data['user_id'] = $user['id'];
        $create = Review::where('id', $id)->update($data);
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
        $delete = Review::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
