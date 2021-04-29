<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class School extends Model
{
    protected $table = 'schools';

    //
    protected $fillable = [
        'user_id',
        'name',
        'infos',
        'leaders',
        'files',
        'status',
    ];

    protected $casts = [
        'infos'   => 'array',
        'leaders' => 'array',
        'files'   => 'array',
    ];

    public static function validator($request, $excepts = [])
    {
        $makes = [
            'files.images'  => 'required',
            'name'          => 'required',
            'infos.address' => 'required',
            'leaders'       => 'required',
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

    public static function getSchoolsByUser($user)
    {
        if (isset($user['Admin'])) {
            $schools = School::select('*')
                ->whereRaw("(status IS NULL OR status != 'Deleted')");
        } else {
            $schools = School::select('*')
                ->whereRaw("(status IS NULL OR status != 'Deleted') AND leaders LIKE '%\"" . $user['id'] . "\"%'");
        }
        return $schools
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
    }
}
