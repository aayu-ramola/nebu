<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoriesController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllCategoriesInTreeData() {
        $categories = Category::where('parent_id', '=', 0)->with('children')->get();
        return response()->json([
					"data" => $categories,
					"isSucceeded" => TRUE
				]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //Validate all variables
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                    "category_title" => "required",
                    "parent_id" => "required"
        ]);
        if ($validator->fails()) {
            return response()->json([
                        "message" => $validator->errors(),
                        "isSucceeded" => FALSE
            ]);
        }
        $categoryTitle = $request->category_title;
        $parentId = $request->parent_id;
        $category = Category::create([
                    'category_title' => $categoryTitle,
                    'parent_id' => $parentId
        ]);
        return response()->json([
                    "message" => "Category inserted successfully.",
                    "isSucceeded" => TRUE,
                    "data" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                    "category_title" => "required",
                    "parent_id" => "required"
        ]);
        if ($validator->fails()) {
            return response()->json([
                        "message" => $validator->errors(),
                        "isSucceeded" => FALSE
            ]);
        }
        $category = Category::find($id);
        $category->category_title = $request->category_title;
        $category->parent_id = $request->parent_id;
        $category->save();
        return response()->json([
                    "message" => "Category updated successfully.",
                    "isSucceeded" => TRUE,
                    "data" => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $category = Category::find($id);
        $category->delete();
        return response()->json([
                    "message" => "Category removed successfully.",
                    "isSucceeded" => TRUE
        ]);
		}
		
		/**
     * Get all categories
     *
     * @return \Illuminate\Http\Response
     */
		public function index() {
			$categories = Category::All();
			return response()->json([
				"data" => $categories,
				"isSucceeded" => TRUE
			]);
		}

    public function import(Request $request) {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
					"categories" => "required|mimes:csv,txt",
        ]);
        if ($validator->fails()) {
					return response()->json([
						"message" => $validator->errors(),
						"isSucceeded" => FALSE
					]);
				}
				
        $file_temporary_path = request()->file('categories')->getRealPath();
        $file_content = file($file_temporary_path);
        $file_content = array_slice($file_content, 1);
        $lines = $file_content;
        $previous_parent_id = 1;
        $previous_parent_for_3rd_level_child = NULL;
        foreach ($lines as $line) {
					$tmp_categories = explode(',', $line);
					foreach ($tmp_categories as $tmp_category_order => $tmp_category_title) {
						$tmp_category_title = trim($tmp_category_title);
						if ($tmp_category_order == 0 && $tmp_category_title != NULL) {
							$previous_parent_id = 1;
							$category_data = Category::create([
								'category_title' => $tmp_category_title,
								'parent_id' => $previous_parent_id
							]);
							$previous_parent_id = $category_data->id;
						} else if ($tmp_category_order == 1 && $tmp_category_title != NULL) {
							$category_data = Category::create([
								'category_title' => $tmp_category_title,
								'parent_id' => $previous_parent_id
							]);
							$previous_parent_for_3rd_level_child = $category_data->id;
						} else if ($tmp_category_order == 2 && $tmp_category_title != NULL && $previous_parent_for_3rd_level_child != NULL) {
							$category_data = Category::create([
								'category_title' => $tmp_category_title,
								'parent_id' => $previous_parent_for_3rd_level_child
							]);
						}
					}
				}
				$categories = Category::where('parent_id', '=', 0)->with('children')->get();
				
        return response()->json([
					"message" => 'File imported successfully',
					"data" => $categories,
					"isSucceeded" => TRUE
        ]);
    }

}
