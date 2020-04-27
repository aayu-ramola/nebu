<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ResponseTracker extends Model
{
    //
    protected $table = 'response_trackers';
    protected $fillable = ['first_name', 'last_name','phone_number','email','review','review_id', 'mode'];
}
