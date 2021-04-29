<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use URL;
use Validator;

class Company extends Model
{
    //
    protected $fillable = [
        'user_id',
        'name',
        'about_us',
        'seo',
        'files',
        'more',
        'type',
        'status',
        'language',
    ];

    protected $casts = [
        'seo' => 'array',
        'files' => 'array',
        'more' => 'array',
    ];

    public static function getMore($companies)
    {
        foreach ($companies as $key => $item) {
            $item['more']['category'] = isset($item['more']['categories']) ? implode(', ', array_keys($item['more']['categories'])) : '';
            $companies[$key] = $item;
        }
        return $companies;
    }

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'language' => 'required',
            'files.images' => 'required',
            'name' => 'required',
            'about_us' => 'required',
//            'seo.title' => 'required',
//            'seo.description' => 'required',
            'type' => 'required',
            'more.members.from' => 'required',
            'more.members.to' => 'required',
            'more.country' => 'required',
            'more.time.from' => 'required',
            'more.time.to' => 'required',
            'more.categories.*' => 'required',
            'more.address' => 'required',
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
