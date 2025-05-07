export default function TaskCard({ task }) {
    return (
      <div className="border p-3 rounded">
        <h2 className="font-bold text-lg">{task.title}</h2>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">Due: {task.dueDate?.slice(0, 10)}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
      </div>
    );
  }
  