<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReviewCategory extends Model
{   
	protected $table = 'review_categories';
    protected $fillable = ['review_id', 'category_id'];
}
