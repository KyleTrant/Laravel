<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert([
            [
                'user_id' => 1, 
                'title' => 'Task 1',
                'description' => 'Description for task 1',
                'start_date' => Carbon::now()->toDateString(),
                'end_date' => Carbon::now()->addDays(2)->toDateString(),
                'start_time' => Carbon::now()->format('H:i'),
                'end_time' => Carbon::now()->addHours(2)->format('H:i'),
                'status' => 'in_progress',
            ],
            [
                'user_id' => 1,
                'title' => 'Task 2',
                'description' => 'Description for task 2',
                'start_date' => Carbon::now()->addDays(1)->toDateString(),
                'end_date' => Carbon::now()->addDays(3)->toDateString(),
                'start_time' => Carbon::now()->addHours(1)->format('H:i'),
                'end_time' => Carbon::now()->addHours(3)->format('H:i'),
                'status' => 'completed',
            ],
           
        ]);
    }
}
