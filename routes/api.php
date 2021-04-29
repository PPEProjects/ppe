<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return response()->json(['status' => true]);
});
//
//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('base/menus', 'Api\BaseController@getMenus');
Route::resource('files', 'Api\FileController');
Route::resource('users', 'Api\UserController');
Route::resource('courses', 'Api\CourseController');
Route::resource('syllabuses', 'Api\SyllabusController');

Route::resource('projects', 'Api\ProjectController');
Route::resource('tasks', 'Api\TaskController');
Route::resource('releases', 'Api\ReleaseController');

Route::resource('companies', 'Api\CompanyController');
Route::resource('jobs', 'Api\JobController');
Route::resource('reviews', 'Api\ReviewController');
Route::resource('posts', 'Api\PostController');
Route::resource('comments', 'Api\CommentController');

Route::resource('schools', 'Api\SchoolController');
Route::resource('classes', 'Api\ClassesController');
//->middleware('auth:api');
