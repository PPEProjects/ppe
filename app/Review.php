<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;

class Review extends Model
{
    //
    protected $fillable = [
        'user_id',
        'company_id',
        'title',
        'content',
        'star',
        'type',
        'status',
    ];

    protected $casts = [
    ];

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'company_id' => 'required',
            'title' => 'required',
            'content' => 'required',
            'star' => 'required',
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
