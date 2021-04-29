<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class Course extends Model
{
    //
    protected $fillable = [
        'user_id',
        'name',
        'content',
        'descriptions',
        'seo',
        'files',
        'more',
        'teachers',
        'type',
        'status',
        'language',
        'syllabus_ids',
    ];

    protected $casts = [
        'seo' => 'array',
        'files' => 'array',
        'more' => 'array',
        'teachers' => 'array',
        'descriptions' => 'array',
        'syllabus_ids' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'language' => 'required',
//            'files.images' => 'required',
            'name' => 'required',
            'descriptions.*.value' => 'required',
            'descriptions.*.files' => 'required',
//            'seo.title' => 'required',
//            'seo.description' => 'required',
//            'type' => 'required',
//            'more.expert' => 'required',
//            'more.self_paced' => 'required',
            'more.time' => 'required',
            'more.price' => 'required',
            'more.discount' => 'required',
            'teachers' => 'required',
//            'syllabus_ids' => 'required',
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
