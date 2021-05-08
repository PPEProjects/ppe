<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Image;
use URL;

class File extends Model
{
    protected $fillable = [
        'user_id',
        'files',
        'type',
    ];

    protected $casts = [
        'files' => 'array',
    ];

    public static function get_image($data)
    {
        foreach ($data as $key => $item) {
            $image = isset($item['files']['images'][0]) ? $item['files']['images'][0] : "/files/images/avatars/1.jpg";
            $item['image'] = URL::to('/') . $image;
            $data[$key] = $item;
        }
        return $data;
    }

    public static function get_images($data)
    {
        foreach ($data as $key => $item) {
            foreach ($item['files']['images'] ?? [] as $key1 => $image) {
                $item['files']['images'][$key1] = URL::to('/') . $image;
            }
            $image = isset($item['files']['images'][0]) ? $item['files']['images'][0] : URL::to('/') . "/files/images/avatars/1.png";
            $item['image'] = $image;
            $data[$key] = $item;
        }
        return $data;
    }

    public static function get_videos($data)
    {
        foreach ($data as $key => $item) {
            foreach ($item['files']['videos'] ?? [] as $key1 => $video) {
                $item['files']['videos'][$key1] = URL::to('/') . $video;
            }
            $video = isset($item['files']['videos'][0]) ? $item['files']['videos'][0] : URL::to('/') . "/files/images/avatars/1.png";
            $item['video'] = $video;
            $data[$key] = $item;
        }
        return $data;
    }

    public static function getImageDescription($data)
    {
        $data = self::get_images($data);
        foreach ($data as $key => $item) {
//            $item['image'] = URL::to('/'). ($item['files']['images'][0] ?? "/files/images/avatars/1.jpg");
            $descriptions = $item['descriptions'] ?? [];
            $item['description'] = '';
            $image = null;
            \Illuminate\Support\Facades\Log::channel('single')->info('$descriptions', [$descriptions]);

            foreach ($descriptions as $key1 => $description) {
                $item['description'] .= $description['value'] . ', ';
                foreach ($description['files'] ?? [] as $key2 => $file) {
                    $description['files'][$key2] = URL::to('/') . $file;
                    $image = empty($image) ? URL::to('/') . $file : $image;
                }
                $descriptions[$key1] = $description;
            }
            $item['image'] = $image;
            $item['descriptions'] = $descriptions;
            \Illuminate\Support\Facades\Log::channel('single')->info('$item', [$item]);

            $data[$key] = $item;
        }
        return $data;
    }

    public static function descriptions_files($descriptions)
    {
        $descriptions = empty($descriptions) ? [] : array_values($descriptions);
        foreach ($descriptions as $key => $val) {
            foreach ($val['files'] ?? [] as $key1 => $val1) {
                $val1 = str_replace(URL::to('/'), '', $val1);
                $file = str_replace('tmp/', 'images/', $val1);
                @rename(public_path($val1), public_path($file));
                $descriptions[$key]['files'][$key1] = $file;
            }
        }
        return $descriptions;
    }

    public static function add_images($files)
    {
        \Illuminate\Support\Facades\Log::channel('single')->info('add_images', [$files]);

        $files = empty($files) ? ['images' => [], 'videos' => []] : $files;
        $files['images'] = isset($files['images']) ? $files['images'] : [];
        foreach ($files['images'] as $key => $val) {
            $val = str_replace(URL::to('/'), '', $val);
            $file = str_replace('tmp/', 'images/', $val);
            @rename(public_path($val), public_path($file));
            $files['images'][$key] = $file;
        }
        return $files;
    }

    public static function add_videos($files)
    {
        $files = empty($files) ? ['images' => [], 'videos' => []] : $files;
        $files['videos'] = isset($files['videos']) ? $files['videos'] : [];
        foreach ($files['videos'] as $key => $val) {
            $val = str_replace(URL::to('/'), '', $val);
            $file = str_replace('tmp/', 'videos/', $val);
            @rename(public_path($val), public_path($file));
            $files['videos'][$key] = $file;
        }
        return $files;
    }

    public static function thumb_images($files, $sizes = [])
    {
        $files = empty($files) ? ['images' => []] : $files;
        foreach ($files['images'] as $key => $image_path) {
            $image = Image::make(public_path($image_path));
            $image_name = str_replace('tmp/', 'thumb_images/', $image_path);
            if ($image->extension == 'gif') {
                copy(public_path($image_path), public_path($image_name));
                $files['images'][$key] = $image_name;
            } else {
                $resize_image = Image::make(public_path($image_path));
                $resize_image
                    ->fit($sizes['w'], $sizes['h'])
                    ->save(public_path($image_name), 100);
            }
            $file = $image_name;
            $files['images'][$key] = $file;
        }
        return $files;
    }

    public static function deletes($files)
    {
        $files = empty($files) ? ['images' => []] : $files;
        foreach ($files['images'] as $key => $val) {
            @unlink(public_path($val));
        }
    }

    public static function getImageEditorJS($data, $key = 'content')
    {
        foreach ($data as &$datum) {
            $contents = json_decode($datum[$key], true);
            foreach ($contents ?? [] as $content) {
                if (isset($content['type']) &&
                    $content['type'] == 'image' &&
                    isset($content['data']['file']['url'])) {
                    $datum['image'] = $content['data']['file']['url'];
                }
            }
        }
        \Illuminate\Support\Facades\Log::channel('single')->info('getImageEditorJS $data', [$data]);

        return $data;

    }


}
