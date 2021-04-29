<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;

class Syllabus extends Model
{
    protected $table = 'syllabus';

    //
    protected $fillable = [
        'user_id',
        'name',
        'contents',
        'status',
    ];

    protected $casts = [
        'contents' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'name' => 'required',
//            'contents.*.topic' => 'required',
//            'contents.*.lists' => 'required',
            'descriptions.*.value' => 'required',
            'status' => 'required',
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
