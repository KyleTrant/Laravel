<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
            return [
                'user_id'    => 'required|exists:users,id', 
                'title'      => 'required|string|max:255', 
                'description'=> 'required|string|max:1000', 
                'start_date' => 'required|date',
                'end_date'   => 'required|date|after_or_equal:start_date', 
                'start_time' => 'required|date_format:H:i', 
                'end_time'   => ['required', 'date_format:H:i', function ($attribute, $value, $fail) {
                    $start_time = $this->input('start_time'); 
                    if (strtotime($value) <= strtotime($start_time)) {
                        $fail('The ' . $attribute . ' must be after start time.');
                    }
                }],
                'status'     => 'required',
            ];
    
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'The user is required.',
            'user_id.exists' => 'The selected user does not exist.',
            'title.required' => 'The title is required.',
            'title.string' => 'The title must be a string.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'description.required' => 'The description is required.',
            'description.string' => 'The description must be a string.',
            'description.max' => 'The description may not be greater than 1000 characters.',
            'start_date.required' => 'The start date is required.',
            'start_date.date' => 'The start date must be a valid date.',
            'end_date.required' => 'The end date is required.',
            'end_date.date' => 'The end date must be a valid date.',
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
            'start_time.required' => 'The start time is required.',
            'start_time.date_format' => 'The start time must be in the format HH:MM (24-hour format).',
            'end_time.required' => 'The end time is required.',
            'end_time.date_format' => 'The end time must be in the format HH:MM (24-hour format).',
            'status.required' => 'The status is required.',
        ];
    }
}
