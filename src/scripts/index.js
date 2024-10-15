const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task-button');
const newTaskInput = document.getElementById('new-task');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task');
const editStatusCheckbox = document.getElementById('edit-status');
const updateTaskButton = document.getElementById('update-task-button');
const cancelEditButton = document.getElementById('cancel-edit-button');

let tasks = [];
let currentEditIndex = null;

// Função para carregar tarefas
async function loadTasks() {
    const response = await fetch('https://to-dolist-do90.onrender.com/api/', {
        method: 'GET',
    });
    tasks = await response.json();
    renderTasks();
}

// Função para renderizar tarefas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerText = `${task.task} - ${task.done ? 'Feita' : 'Pendente'}`;
        
        // Botão de editar
        const editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.onclick = () => {
            // Redireciona para a tela de login se não estiver logado
            if (!localStorage.getItem('token')) {
                alert('Você precisa estar logado para editar a tarefa.');
                window.location.href = 'login.html'; // Redireciona para a tela de login
            } else {
                currentEditIndex = index;
                editTaskInput.value = task.task;
                editStatusCheckbox.checked = task.done;
                editModal.style.display = 'block';
            }
        };
        li.appendChild(editButton);

        // Botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
        deleteButton.onclick = async () => {
            // Redireciona para a tela de login se não estiver logado
            if (!localStorage.getItem('token')) {
                alert('Você precisa estar logado para excluir a tarefa.');
                window.location.href = 'login.html'; // Redireciona para a tela de login
            } else {
                await fetch(`https://to-dolist-do90.onrender.com/api/${task.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                loadTasks(); // Recarrega a lista de tarefas
            }
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Função para adicionar nova tarefa
addTaskButton.onclick = async () => {
    const newTask = newTaskInput.value.trim(); // Remove espaços em branco
    console.log('Tentando adicionar tarefa:', newTask); // Debug para verificar o valor

    if (!newTask) {
        alert('Por favor, insira uma tarefa antes de adicionar.'); // Alerta para tarefa vazia
        return; // Impede a adição se estiver vazio
    }

    // Verifique se o usuário está logado
    if (!localStorage.getItem('token')) {
        alert('Você precisa estar logado para adicionar uma tarefa.');
        console.log('Redirecionando para login...');
        window.location.href = 'login.html'; // Redireciona para a tela de login
        return;
    }

    await fetch('https://to-dolist-do90.onrender.com/api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ task: newTask, done: false })
    });
    newTaskInput.value = ''; // Limpa o campo de entrada
    loadTasks(); // Recarrega a lista de tarefas
};

// Função para atualizar tarefa
updateTaskButton.onclick = async () => {
    const updatedTask = {
        task: editTaskInput.value,
        done: editStatusCheckbox.checked
    };
    
    await fetch(`https://to-dolist-do90.onrender.com/api/${tasks[currentEditIndex].id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedTask)
    });
    editModal.style.display = 'none';
    loadTasks();
};

// Cancela a edição
cancelEditButton.onclick = () => {
    editModal.style.display = 'none';
};

// Carrega tarefas ao abrir a página
loadTasks();
