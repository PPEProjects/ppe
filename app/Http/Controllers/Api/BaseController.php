<?php

namespace App\Http\Controllers\Api;

use App\Course;
use App\Http\Controllers\Controller;
use App\Job;
use App\Post;
use App\Project;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function checkSendError($validator){
        $errors = $validator->errors()->all();
        $errors = collect($errors)->flatten()->toArray();
        \Illuminate\Support\Facades\Log::channel('single')->info('$errors', [$errors]);

        return response()->json($errors, 422);
    }

    public function getMenus(Request $request)
    {
        //
        $data = [];
        $lang = $request->lang ?? 'English';
        \Illuminate\Support\Facades\Log::channel('single')->info('$lang', [$lang]);
        
        $course = Course::select('*')
            ->where('language', $lang)
            ->whereRaw("(status IS NULL OR status != 'Deleted')")
            ->first();
        if($course){
            $course->link =  "/Course/{$course->id}";
        }
        $project = Project::select('*')
            ->where('language', $lang)
            ->whereRaw("(status IS NULL OR status != 'Deleted')")
            ->first();
        \Illuminate\Support\Facades\Log::channel('single')->info('$project', [$project]);
        
        if($project){
            $project->link =  "/Project/{$project->id}";
        }
        $job = Job::select('jobs.*')
            ->join('companies', 'companies.id', '=', 'jobs.company_id')
//            ->where('language', $lang)
            ->whereRaw("(jobs.status IS NULL OR jobs.status != 'Deleted')")
            ->first();
        if($job){
            $job->link =  "/Job/{$job->id}";
        }
        $post = Post::select('*')
            ->where('language', $lang)
            ->whereRaw("(status IS NULL OR status != 'Deleted')")
            ->first();
        if($post){
            $post->link =  "/Post/{$post->id}";
        }
        $data['menus'] = [
            'Japanese' => $course,
            'IT' => $project,
            'Job' => $job,
            'About us' => $post,
        ];
        return response()->json($data);
    }
}
