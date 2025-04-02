export interface Task {
    id: number;
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    status: string;
  }