<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Validator;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'types',
        'status',
        'infos',
        'infos_lang',
        'files',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'infos' => 'array',
        'infos_lang' => 'array',
        'files' => 'array',
        'types' => 'array',
    ];


    public static function validatorLogin($request, $excepts=[])
    {
        $validator = Validator::make($request->all(), [
            'infos.day_to_join' => 'required',
            'infos.time_to_join' => 'required',
        ]);
        if ($validator->fails()) {
            return $validator;
        }
    }

    public static function validator($request, $excepts=[])
    {
        $makes = [
            'files.images' => 'required',
            'name' => 'required',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:8',
            'types' => 'required',
        ];
        foreach ($excepts as $except) {
            unset($makes[$except]);
        }
        $validator = Validator::make($request->all(), $makes);
        if ($validator->fails()) {
            return $validator;
        }

        if (isset($request->types['Japanese instructor'])) {
            $validator = Validator::make($request->all(), [
                'infos_lang.*.about_me' => 'required',
                'infos_lang.*.universities' => 'required',
                'infos_lang.*.expertise' => 'required',
                'infos.social_links' => 'required',
//                'files.videos' => 'required',
            ]);
            if ($validator->fails()) {
                return $validator;
            }
        }
        if (isset($request->types['Japanese learner'])) {
            $validator = Validator::make($request->all(), [
                'infos.gender' => 'required',
                'infos.birthday' => 'required',
                'infos.phone' => 'required',
                'infos.email' => 'required',
                'infos.major' => 'required',
                'infos.school' => 'required',
                'infos.hobby' => 'required',
//                'infos.facebook_id' => 'required',
//                'infos.zalo_id' => 'required',
//                'infos.line_id' => 'required',
                'infos.course_id' => 'required',
                'infos.day_to_join' => 'required',
                'infos.time_to_join' => 'required',
            ]);
            if ($validator->fails()) {
                return $validator;
            }
        }
        if (isset($request->types['IT project member'])) {
            $validator = Validator::make($request->all(), [
                'infos.gender' => 'required',
                'infos.birthday' => 'required',
                'infos.phone' => 'required',
                'infos.email' => 'required',
                'infos.major' => 'required',
                'infos.school' => 'required',
                'infos.hobby' => 'required',
//                'infos.facebook_id' => 'required',
//                'infos.zalo_id' => 'required',
//                'infos.line_id' => 'required',
//                'infos.project_id' => 'required',
                'infos.day_to_join' => 'required',
                'infos.time_to_join' => 'required',
            ]);
            if ($validator->fails()) {
                return $validator;
            }
        }
        if (isset($request->types['Job supporter'])) {
            $validator = Validator::make($request->all(), [
                'infos.phone' => 'required',
            ]);
            if ($validator->fails()) {
                return $validator;
            }
        }
        return false;
    }

}
