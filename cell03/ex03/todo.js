document.addEventListener('DOMContentLoaded', function() {
    const ft_List = document.getElementById('ft_list');
    const btn = document.getElementById('New');

    loadTodos();

    btn.addEventListener('click', function() {
        const todo = prompt('Create to do list');
        if (todo && todo.trim() !== '') {
            addTodo(todo);
            saveTodos();
        }
    });

    function addTodo(todo) {
        const div = document.createElement('div');
        div.className = 'item';
        
        const todoText = document.createElement('span');
        todoText.textContent = todo;
        div.appendChild(todoText);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'removeBTN';
        removeButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this to do ? ')) {
                ft_List.removeChild(div);
                saveTodos();
            }
        });
        div.appendChild(removeButton);

        ft_List.insertBefore(div,ft_List.firstChild);
    }

    function saveTodos() {
        const todos = Array.from(ft_List.children).map(div => div.firstChild.textContent);
        document.cookie = `todos=${JSON.stringify(todos)}; path=/`;
    }

    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            todos.forEach(addTodo);
        }
    }
});