<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class Job extends Model
{
    //
    protected $fillable = [
        'user_id',
        'company_id',
        'title',
        'descriptions',
        'seo',
        'files',
        'more',
        'type',
        'status',
    ];

    protected $casts = [
        'descriptions' => 'array',
        'seo' => 'array',
        'files' => 'array',
        'more' => 'array',
    ];

    public static function getMore($jobs)
    {
        foreach ($jobs as $key => $item) {
//            $item['more']['skills_array'] = !isset($item['more']['skills']) ? '' : array_keys($item['more']['skills']);
            $item['more']['skills_array'] = !isset($item['more']['skills']) ? '' : explode(',', $item['more']['skills']);
            $jobs[$key] = $item;
        }
        return $jobs;
    }

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'files.images' => 'required',
            'title' => 'required',
            'descriptions.*.heading' => 'required',
            'descriptions.*.value' => 'required',
            'descriptions.*.files' => 'required',
//            'seo.title' => 'required',
//            'seo.description' => 'required',
            'company_id' => 'required',
            'more.address' => 'required',
            'more.skills' => 'required',
            'more.salary' => 'required',
            'more.salary.from' => 'required',
            'more.salary.to' => 'required',
            'more.salary.time' => 'required',
            'type' => 'required',
        ];
        foreach ($excepts as $except) {
            unset($makes[$except]);
        }
        $validator = Validator::make($request->all(), $makes);
        if ($validator->fails()) {
            return $validator;
        }
        return false;
    }
}
