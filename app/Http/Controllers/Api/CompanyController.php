<?php

namespace App\Http\Controllers\Api;

use App\Company;
use Illuminate\Http\Request;
use App\File;
use Validator;
use Auth;
use URL;

class CompanyController extends BaseController
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
            $data['companies'] = Company::select('*')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
            $data['companies'] = File::get_images($data['companies']);
            return response()->json($data);
        }
        $data['companies'] = Company::selectRaw("*, REPLACE(JSON_EXTRACT(more, '$.ranking'), '\"', '') AS ranking");
        if ($request->status) {
            $data['companies'] = $data['companies']->where('status', $request->status);
        }
        $data['companies'] = $data['companies']
            ->orderBy('ranking', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        $data['companies'] = File::get_images($data['companies']);
        $data['companies'] = Company::getMore($data['companies']);
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
        $validator = Company::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $user = auth('api')->user()->toArray();
        $data = $request->except([]);
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);
        $data['status'] = 'Activated';
        $create = Company::create($data);
        return response()->json($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        //
        $company = [$company->toArray()];
        $company = File::get_images($company);
        $company = Company::getMore($company);
        return response()->json($company[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
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
        $validator = Company::validator($request);
        if($validator && $validator->fails()){
            return $this->checkSendError($validator);
        }
        $data = $request->except(['_method', 'files_before']);
        $user = auth('api')->user()->toArray();
        $data['user_id'] = $user['id'];
        $data['files'] = File::add_images(@$data['files']);

        $create = Company::where('id', $id)->update($data);
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
        $delete = Company::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
