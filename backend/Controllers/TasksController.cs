using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new List<TaskItem>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks() => Ok(tasks);

        [HttpPost]
        public ActionResult<TaskItem> AddTask([FromBody] TaskItem newTask)
        {
            newTask.Id = nextId++;
            tasks.Add(newTask);
            return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}/toggle")]
        public IActionResult ToggleTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            task.IsCompleted = !task.IsCompleted;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            tasks.Remove(task);
            return NoContent();
        }
    }
}