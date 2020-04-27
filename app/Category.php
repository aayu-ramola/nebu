<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $guarded = ['id'];
    protected $fillable = ['parent_id', 'category_title'];

    public function parentCat() {
        return $this->belongsTo('App\Category', 'parent_id')->where('parent_id', 0);
    }

    public function children() {
        return $this->hasMany('App\Category', 'parent_id')->with('children');
    }

}
