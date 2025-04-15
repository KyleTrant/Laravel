<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Services\Task\ITaskService;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enums\TaskStatus;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private ITaskService $taskService;

    public function __construct(ITaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index(Request $request): Response
    {
        
        try {
            $filters = [
                'status' => $request->get('status'),
                'start_date' => $request->get('start_date'),
                'end_date' => $request->get('end_date'),
                'title' => $request->get('title'),  
                'end_time' => $request->get('end_time'),
                'start_time' => $request->get('start_time'),          
                'description' => $request->get('description'),
            ];
        $tasks = $this->taskService->getUserTasks(Auth::id(), $filters)->withQueryString();
        return Inertia::render('Task/Index', [
            'pagination' => $tasks, 
            'statuses' => TaskStatus::all(),
        ]);
        } catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage() 
            ]);
        }
    }

   
    public function store(TaskRequest $request)
    {
        try {
            $this->taskService->createTask(Auth::id(), $request->validated());
            return to_route('tasks.index');

        } 
        catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage() 
            ]);
        }
    }
    public function update(TaskRequest $request, int $id)
    {
        try {
            $this->taskService->updateTask(Auth::id(), $id, $request->validated());
            return to_route('tasks.index');
        } catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage()
            ]);
        }
    }
    public function destroy(int $id)
    {
        try {
            $this->taskService->deleteTask(Auth::id(), $id);
            return to_route('tasks.index');
        } catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage()
            ]);
        }
    }
   
}