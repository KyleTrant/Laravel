<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Interfaces\ITaskService;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    private ITaskService $taskService;

    public function __construct(ITaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index(): Response
    {
        try {
            return Inertia::render('Tasks/Index', [
                'tasks' => $this->taskService->getUserTasks(Auth::id())
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage() 
            ]);
        }
    }

   
    public function store(TaskRequest $request): Response
    {
        try {
            $this->taskService->createTask(Auth::id(), $request->validated());
            return Inertia::render('Tasks/Index', [
                'tasks' => $this->taskService->getUserTasks(Auth::id())
            ]);

        } 
        catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage() 
            ]);
        }
    }
    public function update(TaskRequest $request, int $id): Response
    {
        try {
            $this->taskService->updateTask(Auth::id(), $id, $request->validated());
            return Inertia::render('Tasks/Index', [
                'tasks' => $this->taskService->getUserTasks(Auth::id())
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage()
            ]);
        }
    }
    public function destroy(int $id): Response
    {
        try {
            $this->taskService->deleteTask(Auth::id(), $id);
            return Inertia::render('Tasks/Index', [
                'tasks' => $this->taskService->getUserTasks(Auth::id())
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Error', [
                'message' => $e->getMessage()
            ]);
        }
    }
}