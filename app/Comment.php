<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;

class Comment extends Model
{
    //
    protected $fillable = [
        'user_id',
        'post_id',
        'content',
        'files',
        'type',
        'status',
    ];

    protected $casts = [
        'files' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
//            'files.images' => 'required',
            'post_id' => 'required',
            'content' => 'required',
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
