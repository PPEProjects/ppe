<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;

class Release extends Model
{
    //
    protected $fillable = [
        'user_id',
        'project_id',
        'contents',
        'status',
    ];

    protected $casts = [
        'contents' => 'array',
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'project_id' => 'required',
            'contents.*.name' => 'required',
            'contents.*.date' => 'required',
            'contents.*.status' => 'required',
            'contents.*.description' => 'required',
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
