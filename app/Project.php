<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class Project extends Model
{
    //
    protected $fillable = [
        'user_id',
        'name',
        'descriptions',
        'seo',
        'files',
        'more',
        'members',
        'type',
        'status',
        'language',
    ];

    protected $casts = [
        'seo' => 'array',
        'files' => 'array',
        'more' => 'array',
        'members' => 'array',
        'descriptions' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'language' => 'required',
            'files.images' => 'required',
            'name' => 'required',
            'descriptions.*.value' => 'required',
            'descriptions.*.files' => 'required',
//            'seo.title' => 'required',
//            'seo.description' => 'required',
            'more.start_day' => 'required',
            'more.deadline' => 'required',
            'more.version' => 'required',
            'more.installs_number' => 'required',
            'more.installs_countries' => 'required',
            'more.next_release' => 'required',
            'more.revenue' => 'required',
//            'more.android' => 'required',
//            'more.ios' => 'required',
//            'more.website' => 'required',
//            'members' => 'required',
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
