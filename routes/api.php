<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'Auth\LoginController@login');

Route::get('categories/getAllCategoriesInTreeData', 'CategoriesController@getAllCategoriesInTreeData');

Route::get('categories/get', 'CategoriesController@index');

Route::post('categories/add', 'CategoriesController@store');


Route::post('categories/update/{id}', 'CategoriesController@update');

Route::delete('categories/delete/{id}', 'CategoriesController@destroy');

Route::post('categories/import', 'CategoriesController@import');

Route::post('response/store', 'ResponseController@store');

Route::get('response/getAllCategoryResponse', 'ResponseController@getAllCategoryResponse');

Route::post('response/getDataAccordingReviewId', 'ResponseController@getDataAccordingReviewId');

Route::post('response/response_save', 'ResponseController@responseSave');

Route::get('response/getResponse','ResponseController@getResponse');

Route::fallback(function() {
    return response()->json(['message' => 'Not Found.'], 404);
});