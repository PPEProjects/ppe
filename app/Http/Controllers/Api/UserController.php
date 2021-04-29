<?php

namespace App\Http\Controllers\Api;

use App\Classes;
use App\File;
use App\Log;
use App\Mail\ForgetPassword;
use App\Mail\SendPassword;
use App\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use URL;
use Validator;

class UserController extends BaseController
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $method = $request->method();
            if ($request->get_info && !auth('api')->user()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $data = [];
        $user = auth('api')->user();
        if ($user) {
            $user = $user->toArray();
        }

        if ($request->check_email) {
            if (User::where('email', $request->email)->exists()) {
                return response()->json(['status' => 'success']);
            }
            return response()->json(['No exits'], 422);
        }
        if ($request->get_info) {
//            $user['image'] = URL::to('/') . $user['files']['images'][0] ?? "/files/avatars/1.jpg";
            $user = File::get_images([$user])[0];
            return response()->json($user);
        }
        if ($request->keyBy) {
            $data['users'] = User::select('*')
                ->get()
                ->keyBy($request->keyBy)
                ->toArray();
            $data['users'] = File::get_images($data['users']);
            $data['users'] = File::get_videos($data['users']);
            return response()->json($data);
        }
        if ($request->user_ids) {
            $data['users'] = User::select('*')
                ->whereIn('id', $request->user_ids)
                ->get()
                ->toArray();
            $data['users'] = File::get_images($data['users']);
            $data['users'] = File::get_videos($data['users']);
            return response()->json($data);
        }
        $data['users'] = User::select('*');
        if ($request->startDate) {
            $data['users'] = User::selectRaw("*, REPLACE(JSON_EXTRACT(infos, '$.course_id'), '\"', '') AS course_id")
                ->whereRaw("types like '%Japanese learner%' AND '{$request->startDate}' <= DATE(created_at) AND DATE(created_at) <= '{$request->endDate}'")
                ->get()
                ->where('course_id', $request->course_id)
                ->toArray();
            $data['users'] = array_values($data['users']);
            $data['users'] = File::get_images($data['users']);
            $data['users'] = File::get_videos($data['users']);
            return response()->json($data);
        }
        if ($request->course_id) {
            $data['users'] = User::selectRaw("*, REPLACE(JSON_EXTRACT(infos, '$.course_id'), '\"', '') AS course_id")
                ->whereRaw("types like '%Japanese learner%'")
                ->get()
                ->where('course_id', $request->course_id)
                ->toArray();
            $data['users'] = array_values($data['users']);
            $data['users'] = File::get_images($data['users']);
            $data['users'] = File::get_videos($data['users']);
            return response()->json($data);
        }
        if ($request->types) {
            $sql = "";
            foreach ($request->types as $type) {
                $sql .= (empty($sql) ? "" : "OR ") . "types like '%$type%' ";
            }
            $sql = "($sql)";
            $data['users'] = $data['users']->whereRaw($sql);
        }
        if ($request->status) {
            $data['users'] = $data['users']->where('status', $request->status);
        }
        $data['users'] = $data['users']
            ->orderBy('id', 'desc')
            ->get()
            ->toArray();
        $data['users'] = File::get_images($data['users']);
        $data['users'] = File::get_videos($data['users']);
//        $data['users_log'] = Log::get_users($data['users']);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::channel('single')->info('1', []);

        if ($request->userCheckExits) {
            $validator = Validator::make($request->all(), [
                'email' => 'exists:users',
            ]);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            return response()->json(["status" => true]);
        }
        if ($request->userCheckUnique) {
            $validator = Validator::make($request->all(), [
                'email' => 'unique:users',
            ]);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            return response()->json(["status" => true]);
        }
        if ($request->ForgetPasswordPage) {
            \Illuminate\Support\Facades\Log::channel('single')->info('2', []);

            $data = $request->except(['ForgetPasswordPage']);
            $validator = Validator::make($request->all(), [
                'email' => 'email|required|exists:users',
            ]);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);

            \Illuminate\Support\Facades\Log::channel('single')->info('4', []);

            $user = User::where('email', $data['email'])
                ->first()
                ->toArray();
            \Illuminate\Support\Facades\Log::channel('single')->info('$user', [$user]);

            Mail::to($user['email'])->send(new ForgetPassword($user));
            return response()->json($user);
        }
        if ($request->user_registerLogin) {
            $validator = User::validatorLogin($request);
            if ($validator && $validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data = $request->except(['user_registerLogin']);
            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);

            $user = auth('api')->user();
            if ($user) {
                $user = $user->toArray();
            }
            \Illuminate\Support\Facades\Log::channel('single')->info('$user', [$user]);
            $user['infos'] = $user['infos'] ?? [];
            $user['infos']['day_to_join'] = $data['infos']['day_to_join'];
            $user['infos']['time_to_join'] = $data['infos']['time_to_join'];
            $user['types'] = array_merge($user['types'], $data['types']);
            $user_data = array_intersect_key($user, array_flip(array('infos', 'types')));
            $update = User::where('id', $user['id'])->update($user_data);
//                \Illuminate\Support\Facades\Log::channel('single')->info('$user', [$user]);

//            User::create($data);
            Log::add_user($user);
            return response()->json($user);
        }
        if ($request->user_register) {
            $data = $request->except(['user_register']);
            $data['email'] = @$data['infos']['email'];
            $validator = User::validator($request, ['files.images', 'password']);
            if ($validator && $validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data['password'] = Hash::make(@$data['password']);
            $data['files'] = File::add_images([]);
            $data['files'] = ['images' => ["/files/avatars/" . rand(1, 5) . ".jpg"]];
            $data['status'] = 'Activated';
            $user = User::create($data)->toArray();
            \Illuminate\Support\Facades\Log::channel('single')->info('user_register', [$user]);

            Log::add_user($user);
            Mail::to($user['email'])->send(new SendPassword($user));

            return response()->json($user);
        }

        if ($request->admin_register) {
            $data = $request->except(['admin_register']);
            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);
            
            $validator = User::validator($request, ['name', 'infos']);
            if ($validator && $validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data['password'] = Hash::make($data['password']);
            $data['files'] = File::add_images(@$data['files']);
            $data['files'] = File::add_videos(@$data['files']);
            $data['status'] = 'Activated';
            $create = User::create($data);
            Log::add_user($create);
            return response()->json($create);
        }

        if ($request->sign_in) {
            $data = $request->except(['sign_in']);
            $validator = Validator::make($request->all(), [
                'email'    => 'email|required|exists:users',
                'password' => 'required|min:8',
            ]);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }

            // via code in mail
            $user = User::where('email', $data['email'])
                ->first();
            $updated_at = strtotime($user->updated_at);
            $code = substr($updated_at, -8, 8);
            if ($data['password'] == $code) {
                $access_token = $user->createToken('authToken')->accessToken;
                $res = ['user' => $user, 'access_token' => $access_token];
                \Illuminate\Support\Facades\Log::channel('single')->info('$res', [$res]);
                return response()->json($res);
            }
            if (!auth()->attempt($data)) {
                return response(['message' => 'Wrong email or password.<br/>Please visit <a href="/ForgotPassword" class="text-indigo-700 hover:underline">forgot password page</a> to get it.', 'code' => 401], 401);
            }
            $access_token = auth()->user()->createToken('authToken')->accessToken;
            $user = auth()->user()->toArray();
            $update = \Illuminate\Support\Facades\DB::update("UPDATE users SET updated_at = now() WHERE id='{$user['id']}'");
            \Illuminate\Support\Facades\Log::channel('single')->info('$update', [$update]);

            return response()->json(['user' => $user, 'access_token' => $access_token]);
        }

        if ($request->sign_up) {
            $data = $request->except(['sign_up']);
            $validator = Validator::make($request->all(), [
                'email'    => 'email|required|unique:users',
                'password' => 'required|min:8|confirmed',
            ]);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data['types'] = ['Admin' => 'on'];
            $data['password'] = Hash::make($data['password']);
            $data['files'] = File::add_images([]);
            $data['files'] = ['images' => ["/files/avatars/" . rand(1, 5) . ".jpg"]];
            $data['status'] = 'Activated';

            $user = User::where('email', $data['email'])
                ->first();

            if (!$user) {
                $user = User::create($data);
                Log::add_user($user);
            }
            $access_token = $user->createToken('authToken')->accessToken;
            return response()->json(['user' => $user, 'access_token' => $access_token]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
        $user = $user->toArray();
        $user = File::get_images([$user]);
        $user = File::get_videos($user);
        return response()->json($user[0]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        if ($request->change_password) {
            $makes = [
                'password' => 'required|min:8|confirmed',
            ];
            $validator = Validator::make($request->all(), $makes);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data = $request->except(['_method', 'change_password', 'password_confirmation']);
            $data['password'] = Hash::make($data['password']);
            $update = User::where('id', $id)->update($data);
            return response()->json($data);
        }
        if ($request->change_information) {
            $makes = [
                'name' => 'required',
            ];
            $validator = Validator::make($request->all(), $makes);
            if ($validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data = $request->except(['_method', 'files_before', 'change_information']);
            $data['files'] = File::add_images(@$data['files']);
            $update = User::where('id', $id)->update($data);
            return response()->json($data);
        }
        if ($request->admin_register) {
            $validator = User::validator($request, ['email', 'password', 'name']);
            if ($validator && $validator->fails()) {
                return $this->checkSendError($validator);
            }
            $data = $request->except(['_method', 'files_before', 'admin_register']);
//            $data['password'] = Hash::make($data['password']);
            $data['files'] = File::add_images(@$data['files']);
            \Illuminate\Support\Facades\Log::channel('single')->info('$id', [$id]);
            
            \Illuminate\Support\Facades\Log::channel('single')->info('$data', [$data]);
            
            $update = User::where('id', $id)->update($data);
            return response()->json($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $user = auth('api')->user();
        if ($user) {
            $user = $user->toArray();
        }
        $data = $request->except([]);
        $chooses = $data['chooses'] ? json_decode($data['chooses'], true) : [];
        if (isset($chooses[$user['id']])) {
            $errors = ["Can't delete your self"];
            return response()->json($errors, 422);
        }
        $delete = User::whereIn('id', $chooses)->update(['status' => 'Deleted']);
        return response()->json($data);
    }
}
