<?php

namespace App\Http\Controllers\Api;

use App\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Image;
use URL;
use Validator;

class FileController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = [];
        $data['filesType'] = [
            'Pictures for Home page slider',
            'Pictures for Japanese Tab slider',
            'Pictures for IT Tab slider',
            'Pictures for Advertisement'
        ];
        $data['filesObj'] = File::selectRaw('*')
            ->get()
            ->keyBy('type')
            ->toArray();
        $data['filesObj'] = File::get_images($data['filesObj']);
        \Illuminate\Support\Facades\Log::channel('single')->info('$data[\'filesObj\']', [$data['filesObj']]);
        $data['filesObj']['Pictures for Advertisement'] = File::getImageDescription([@$data['filesObj']['Pictures for Advertisement']['files']])[0];
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        $request->validate([
            'type'       => 'required',
            'file_paths' => 'nullable|array',
            'file_ids'   => 'nullable|array',
        ]);
        $files = ['images' => [], 'videos' => []];

        if ($request->type && $request->type == 'video-editorjs') {
            $file = $request->video;
            $fileName = date('Y-m-d') . '-' . time() . rand() . '-' . Auth::id() . '.' . $file->getClientOriginalExtension();
            $path = '/files/tmp/';
            $file->move(public_path() . $path, $fileName);
            return response()->json([
                "success" => 1,
                "file"    => [
                    "url" => URL::to('/')."$path$fileName",
                ]
            ]);
        }
        if ($request->type && $request->type == 'image-editorjs') {
            $image = $request->image;
            $image_name = '/files/tmp/' . date('Y-m-d') . '-' . time() . rand() . '-' . Auth::id() . '.' . $image->getClientOriginalExtension();
            $resize_image = Image::make($image->getRealPath())
                ->fit(600, 600)
                ->save(public_path($image_name), 100);
            return response()->json([
                "success" => 1,
                "file"    => [
                    "url" => URL::to('/')."$image_name",
                ]
            ]);
        }
        if ($request->saveDB) {
            $user = auth('api')->user()->toArray();
            $data = $request->except([]);
            $data['user_id'] = $user['id'];
            if ($data['type'] == 'Pictures for Advertisement') {
                $data['files']['descriptions'] = File::descriptions_files(@$data['descriptions']);
            } else {
                $data['files'] = File::add_images(@$data['files']);
            }
            $create = File::updateOrCreate(
                ['type' => $data['type']],
                ['files' => $data['files'], 'user_id' => $data['user_id']]);
            return response()->json($create);
        }
        if ($request->type && $request->type == 'csv') {
            $request->validate([
                'file_paths.*' => 'file|max:' . self::_getMaxSize(),
            ]);
            $contents = [];
            $files = $request->file_paths ?? [];
            foreach ($files as $key => $val) {
                $file = $val;
                $file_name = '/files/tmp/' . date('Y-m-d') . '-' . time() . rand() . '-' . Auth::id() . '.' . $file->getClientOriginalExtension();
                $file_path = public_path($file_name);
                move_uploaded_file($file, $file_path);
                $reader = \PhpOffice\PhpSpreadsheet\IOFactory::load($file_path);
                $schedules = $reader->getActiveSheet()->toArray();

                foreach ($schedules as $key => $schedule) {
                    if (!$key) {
                        continue;
                    }
                    $content = [];
                    if (strtolower($schedule[0]) == 'topic') {
                        unset($schedule[0]);
                        $content['topic'] = implode("\n", $schedule);
                        $content['type'] = "csv";
                        $contents[] = $content;
                        continue;
                    }
                    unset($schedule[0]);
                    $content['lists'] = implode("\n", $schedule);
                    $content['type'] = "csv";
                    $contents[] = $content;
                }
            }
            $contents = array_reverse($contents);
            return response()->json($contents);
        }

        if ($request->file_paths) {
            switch ($request->type) {
                case 'delete_images':
                case 'delete_videos':
                    foreach ($request->file_paths as $key => $val) {
                        $val = str_replace(URL::to('/'), '', $val);
                        if (preg_match('#avatars#mis', $val)) {
                            continue;
                        }
                        $like = preg_replace('/^.*?(\d{4}-\d{2}-\d{2}-\d+).*?$/mis', '$1', $val);
                        $fileFirst = File::whereRaw("files LIKE '%$like%'")
                            ->first();
                        if($fileFirst){
                            $fileFirst = $fileFirst->toArray();
                            $images = $fileFirst['files']['images'];
                            foreach ($images as $key => $image) {
                                if(preg_match("#$like#mis", $image))
                                    unset($images[$key]);
                            }
                            $images = array_values($images);
                            $fileFirst['files']['images'] = $images;
                            File::whereRaw("files LIKE '%$like%'")
                                ->update(['files'=> $fileFirst['files']]);
                        }
                        @unlink(public_path($val));
                    }
                    break;
                case 'add_images_sizes':
                    $request->validate([
                        'file_paths.*' => 'file|image|max:' . self::_getMaxSize(),
                        'size_w'       => 'numeric|required',
                        'size_h'       => 'numeric|required',
                    ]);
                    foreach ($request->file_paths as $key => $val) {
                        $image = $val;
                        $image_name = '/files/tmp/' . date('Y-m-d') . '-' . time() . rand() . '-' . Auth::id() . '.' . $image->getClientOriginalExtension();
                        if ($image->getClientOriginalExtension() == 'gif') {
                            copy($image->getRealPath(), public_path($image_name));
                            $files['images'][$request->file_ids[$key]] = $image_name;
                        } else {
                            $resize_image = Image::make($image->getRealPath());
                            $resize_image
                                ->fit($request->size_w, $request->size_h);
                            if ($resize_image
                                ->save(public_path($image_name), 100)
                            ) {
                                $files['images'][$request->file_ids[$key]] = $image_name;
                            }
                        }
                    }
                    break;
                case 'add_images':
                    $validator = Validator::make($request->all(), [
                        'file_paths'   => 'array|max:100',
                        'file_paths.*' => 'file|image|max:' . self::_getMaxSize(),
                    ], [
                        'file_paths.max' => 'Maximum is 100 files',
                    ]);
                    if ($validator->fails()) {
                        return $this->checkSendError($validator);
                    }
                    foreach ($request->file_paths as $key => $image) {
                        $image_name = '/files/tmp/' . date('Y-m-d') . '-' . time() . rand() . '-' . Auth::id() . '.' . $image->getClientOriginalExtension();
                        if ($image->getClientOriginalExtension() == 'gif') {
                            copy($image->getRealPath(), public_path($image_name));
                            $files['images'][$request->file_ids[$key]] = $image_name;
                            continue;
                        }
                        $resize_image = Image::make($image->getRealPath());
                        if ($resize_image->width() >= 600) {
                            $resize_image->resize(600, null, function ($constraint) {
                                $constraint->aspectRatio();
                            });
                        }
                        if ($resize_image->save(public_path($image_name), 75)) {
                            $files['images'][$request->file_ids[$key]] = URL::to('/') . $image_name;
                        }
                    }
                    break;
                case 'add_videos':
                    $validator = Validator::make($request->all(), [
                        'file_paths'   => 'array|max:1',
                        'file_paths.*' => 'mimes:mp4,mov,ogg,qt|max:200000',
                    ], [
                        'file_paths.max' => 'Maximum is 1 file',
                    ]);
                    if ($validator->fails()) {
                        return $this->checkSendError($validator);
                    }
                    foreach ($request->file_paths as $key => $file) {
                        \Illuminate\Support\Facades\Log::channel('single')->info('$file', [$file]);

                        $filename = date('Y-m-d') . '-' . time() . rand() . '-' . Auth::id() . '.' . $file->getClientOriginalExtension();
                        $path = '/files/tmp/';
                        $file->move(public_path() . $path, $filename);
                        $files['videos'][$request->file_ids[$key]] = URL::to('/') . $path . $filename;
                    }
                    break;
                case 'replace_image':
                    $request->validate([
                        'file_paths.*' => 'required|image',
                        'img_url'      => 'required',
                    ]);
                    $img_url = $request->img_url;

                    // check if edit page, edit image when click btn save.
                    $image_path = dirname($img_url);
                    $_folder = basename($image_path);
                    if ($_folder != 'tmp') {
                        $img_url = str_replace('images/', 'tmp/', $img_url);
                    }
                    $image = $request->file_paths[0];
                    $image_name = basename($img_url);
                    $image_path = dirname($img_url);

                    $image->move(public_path($image_path), $image_name);
                    $files['images'][$request->file_ids[0]] = [$request->img_url, $img_url];
                    break;
            }
        }

        return response()->json([
            'files' => $files
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function show(
        $id
    ) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function edit(
        $id
    ) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function update(
        Request $request,
        $id
    ) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function destroy(
        $id
    ) {
        //
    }


    protected
    function _getMaxSize()
    {
        $max_size = 0;
        $post_max_size = self::parse_size(ini_get('post_max_size'));
        if ($post_max_size > 0) {
            $max_size = $post_max_size;
        }
        $upload_max = self::parse_size(ini_get('upload_max_filesize'));
        if ($upload_max > 0 && $upload_max < $max_size) {
            $max_size = $upload_max;
        }
        return $max_size;
    }

    protected
    function parse_size(
        $size
    ) {
        $unit = preg_replace('/[^bkmgtpezy]/i', '', $size);
        $size = preg_replace('/[^0-9\.]/', '', $size);
        if ($unit) {
            return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
        } else {
            return round($size);
        }
    }
}
