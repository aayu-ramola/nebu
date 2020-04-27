<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    //
    protected $table = 'responses';
    protected $fillable = ['response', 'category_id'];
}
