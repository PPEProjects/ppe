<?php

use Illuminate\Support\Facades\Route;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/csv_download', function () {

    $classId = $_GET['id'];
    $class = \App\Classes::where('id', $classId)->first();
    $class = $class ? $class->toArray() : [];

    $schoolId = $class['school_id'];
    $school = \App\School::where('id', $schoolId)->first();
    $school = $school ? $school->toArray() : [];

    $courseIds = array_keys($class['courses']);
    $courses = \App\Course::whereIn('id', $courseIds)->get()->toArray();

    $learnerIds =array_keys($class['learners']);
    $learners = \App\User::whereIn('id', $learnerIds)->get()->toArray();

    $teacherIds =array_keys($class['teachers']);
    $teachers = \App\User::whereIn('id', $teacherIds)->get()->toArray();

    // $list
    $list = [
        ["Class name: {$class['name']}"],
        ["Teacher: {$teachers[0]['name']}, Course: {$courses[0]['name']}"],
    ];
    $list[] = ["Full name", "Gender", "Birhthday",	"Phone", "Email"];
    foreach ($learners as $learner) {
        $list[] = [
            $learner['name'],
            @$learner['infos']["gender"],
            @$learner['infos']["birhthday"],
            @$learner['infos']["phone"],
            @$learner['infos']["email"],
        ];
    }

    // file download
    header("Content-Type: text/csv");
    header("Content-Disposition: attachment; filename={$class['name']}-{$school['name']}.csv");
    function outputCSV($data) {
        $output = fopen("php://output", "wb");
        foreach ($data as $row) fputcsv($output, $row);
        fclose($output);
    }
    outputCSV($list);

});
Route::get('/', function () {
    dd(1);
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('A1', 'Hello World !');
    $sheet->setCellValue('A1', 'A1 Cell Data Here');
    $sheet->setCellValue('B1', 'B1 Cell Data Here');
    $writer = new Xlsx($spreadsheet);
    $writer->save('lcw.xlsx');
//    $writer = new Xlsx($spreadsheet);
    dd(1);
    return response()->json(['status' => true]);
});

//Auth::routes();
Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home');
