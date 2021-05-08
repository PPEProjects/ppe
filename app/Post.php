<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class Post extends Model
{
    //
    protected $fillable = [
        'user_id',
        'title',
        'descriptions',
        'seo',
        'files',
        'type',
        'status',
        'language',
    ];

    protected $casts = [
        'descriptions' => 'array',
        'seo' => 'array',
        'files' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'language' => 'required',
//            'files.images' => 'required',
            'title' => 'required',
            'descriptions.*.value' => 'required',
            'descriptions.*.files' => 'required',
//            'seo.title' => 'required',
//            'seo.description' => 'required',
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
