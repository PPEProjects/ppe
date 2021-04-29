<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Log extends Model
{
    //
    protected $fillable = [
        'user_id',
        'type',
        'type_id',
        'content',
        'status',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public static function add_user($user){
        $create = Log::create([
            'user_id' => Auth::id(),
            'type' => 'user',
            'type_id' => $user['id'],
            'content' => $user,
        ]);
        return $create;
    }

    public static function get_users($users){
        $user_logs = Log::selectRaw('id AS log_id, content, created_at AS sold_at')
            ->where('type', 'user')
            ->whereIn('type_id', array_column($users, 'id'))
            ->orderBy('id', 'desc')
            ->get();
        $user_logs = $user_logs->map(function ($item) {
            $item = $item->toArray();
            $content = $item['content'];
            return $content;
        });
        $user_logs = $user_logs
            ->toArray();
        return $user_logs;
    }
}
