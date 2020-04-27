<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Category;
use App\Response;
use App\ReviewCategory;
use App\ResponseTracker;
use DB;
class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllCategoryResponse() {
        $data = \DB::table("responses")
        ->select("responses.*",\DB::raw("GROUP_CONCAT(categories.category_title) as tagsname"))
        ->leftjoin("categories",\DB::raw("FIND_IN_SET(categories.id,responses.category_id)"),">",\DB::raw("'0'"))
        ->groupBy("responses.id")
        ->get();
        if(!empty($data)){
            return response()->json([
                "data" => $data->toArray(),
                "isSucceeded" => TRUE
            ]);    
        }else{
            return response()->json([
                "data" => '',
                "isSucceeded" => FALSE
            ]);    
        } 
    }

    public function getDataAccordingReviewId(Request $request){
        $reviewId = $request->input('review_id');
        $categoriesIds = $request->input('categories_id');
        $status = $request->input('status');
        $data = [];
        $message = '';
        $resCode = FALSE;
        $arrCatIdAr = [];
        if(!empty($categoriesIds) && !empty($reviewId)){

            $response  = ReviewCategory::create([
                'category_id' => $categoriesIds,
                'review_id' => $reviewId
            ]); 
            if($status){
                $catIdArray = explode(',', $categoriesIds);
                $arrMain = [];
                foreach ($catIdArray as $key => $value) {                    
                    $query = DB::table('responses')->whereRaw('FIND_IN_SET(?,category_id)', [$value])->get(); 
                    $arrMain[] = json_decode(json_encode($query->toArray()), True);
                }
                $finalArra = [];
                foreach ($arrMain as $arrMainKey => $arrMainValue) {
                    foreach ($arrMainValue as $secondMainKey => $secondMainValue) {
                        $finalArra[$secondMainKey] = $secondMainValue;
                    }
                }
                $data['cat_res'] = array_unique($finalArra, SORT_REGULAR);
            }
            $message = "Review categories inserted successfully.";
            $resCode = TRUE;
        }else if(empty($categoriesIds) && !empty($reviewId)) {
            $reviewCatIds = ReviewCategory::where('review_id', $reviewId)->orderBy('created_at', 'DESC')->first();      
            $reviewCatIds = \DB::table("review_categories")
                    ->select("review_categories.*",\DB::raw("GROUP_CONCAT(categories.category_title) as category_name"))
                    ->leftjoin("categories",\DB::raw("FIND_IN_SET(categories.id,review_categories.category_id)"),">",\DB::raw("'0'"))
                    ->groupBy("review_categories.id")
                    ->where(['review_categories.review_id' => $reviewId])
                    ->orderBy('created_at', 'DESC')
                    ->first(); 

                   if($reviewCatIds){
                      $arrCatIdAr = explode(',', $reviewCatIds->category_id);

                      $arrCatNameAr = array_reverse(explode(',', $reviewCatIds->category_name));
                      $createIdAndValueArra = [];
                    
                      foreach ($arrCatNameAr as $arrCatNamekey => $arrCatNamevalue) {
                          $id = $arrCatIdAr[$arrCatNamekey];
                          $createIdAndValueArra[$id] =  $arrCatNamevalue;
                      }
                         $reviewCatIds->category_name = $createIdAndValueArra;

                   }
                   
                    
            if(!empty($reviewCatIds)){
                $data['review_cat_id'] = $reviewCatIds;
                $message = 'Review categories get successfully.';
                $resCode = TRUE;
            }else{
                $message = 'There is no data for this review id.';
                $resCode = FALSE;
            }
        }
        return response()->json([
            "message" => $message,
            "isSucceeded" => $resCode,
            "data" => $data
        ]);            
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $response = new Response;
        $selectedOption = $request->input('selectedOption');
        $allSel = [];
        foreach ($selectedOption as $key => $value) {
            $allSel[] = $value['value'];
        }
        $allCatId = implode(',',$allSel);
        $content = $request->input('content');
        $response = Response::create([
            'category_id' => $allCatId,
            'response' => $content
        ]);
        return response()->json([
            "message" => "Response inserted successfully.",
            "isSucceeded" => TRUE,
            "data" => $response
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function show(Response $response)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function edit(Response $response)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Response $response)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function destroy(Response $response)
    {
        //
    }

    public function responseSave(Request $request){
        if ($request->isMethod('post') && $request->input('review_id')) {
            $responseTracker = new ResponseTracker;
            $review_id = $request->input('review_id');
            $mode = $request->input('mode');
            $review = $request->input('review');
            $first_name = $request->input('first_name');
            $last_name = $request->input('last_name');
            $phone_number = $request->input('phone_number');
            $email = $request->input('email');
            $maiArra = $request->all();
            $responseTracker = ResponseTracker::create([
                'review_id' => $review_id,
                'mode' => $mode,
                'review' => $review,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'phone_number' => $phone_number,
                'email' => $email,
            ]);
            return response()->json([
                "message" => "Response inserted successfully.",
                "isSucceeded" => TRUE,
                "data" => $responseTracker
            ]);
        }
        die;
    }

    public function getResponse(){
         $response_trackers = DB::table('response_trackers')->get();
         $arrayByMode       = [];
         foreach($response_trackers as $response_tracker){
              if(array_key_exists($response_tracker->mode,$arrayByMode)){
                $arrayByMode[$response_tracker->mode][]=$response_tracker;
              }else{
                $arrayByMode[$response_tracker->mode][]=$response_tracker;
              }
         }

          if(!empty($arrayByMode)){
            return response()->json([
                "data" => $arrayByMode,
                "isSucceeded" => TRUE
            ]);    
        }else{
            return response()->json([
                "data" => '',
                "isSucceeded" => FALSE
            ]);    
        } 
    }
}
