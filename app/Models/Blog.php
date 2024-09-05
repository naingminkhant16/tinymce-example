<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Make src of image be replaced with full URL in content when inserting into database
     * @return Attribute
     */
    protected function content(): Attribute
    {
        return Attribute::make(set: function (string $value) {
            return preg_replace_callback('/src="(.*?)"/', function ($matches) {
                $relativeUrl = $matches[1];

                // If the URL starts with 'storage/', convert it to a full URL
                if (str_starts_with($relativeUrl, 'storage/')) {
                    return '<img src="' . asset($relativeUrl) . '"';
                }

                return $matches[0];  // Return original if not a relative URL
            }, $value);
        });
    }
}
