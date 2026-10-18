const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

window.onload = renderTasks;

// 添加任务
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    
    const task = {
        id: Date.now(), // 修复Date.nom → Date.now
        content: text,
        done: false     // 修复fakse → false
    };
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    taskInput.value = '';
}

// 保存到本地存储
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 读取任务
function getTasks() {
    // 修复 localStorage.getTasks → getItem
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
}

// 渲染列表
function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.done) li.classList.add('done');
        li.innerHTML = `
          <span onclick="toggleDone(${task.id})">${task.content}</span>
          <button onclick="deleteTask(${task.id})">删除</button>
        `;
        taskList.appendChild(li);
    });
}

// 切换完成状态
function toggleDone(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) task.done = !task.done;
    saveTasks(tasks);
    renderTasks();
}

// 删除任务
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    renderTasks();
}