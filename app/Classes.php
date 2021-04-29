<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class Classes extends Model
{
    protected $table = 'classes';
    
    //
    protected $fillable = [
        'user_id',
        'school_id',
        'name',
        'infos',
        'courses',
        'learners',
        'teachers',
        'files',
        'status',
    ];

    protected $casts = [
        'infos' => 'array',
        'courses' => 'array',
        'learners' => 'array',
        'teachers' => 'array',
        'files' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
//            'files.images' => 'required',
            'school_id' => 'required',
            'name' => 'required',
            'courses' => 'required',
            'learners' => 'required',
            'teachers' => 'required',
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
