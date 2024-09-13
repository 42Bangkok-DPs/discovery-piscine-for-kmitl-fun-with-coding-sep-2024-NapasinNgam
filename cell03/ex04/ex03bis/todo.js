$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $btn = $('#New');

    loadTodos();

    $btn.click(function() {
        const todo = prompt('Create to-do list');
        if (todo && todo.trim() !== '') {
            addTodo(todo);
            saveTodos();
        }
    });

    function addTodo(todo) {
        const $div = $('<div></div>').addClass('item');
        
        const $todoText = $('<span></span>').text(todo);
        $div.append($todoText);

        const $removeButton = $('<button></button>').text('X').addClass('removeBTN');
        $removeButton.click(function() {
            if (confirm('Are you sure you want to remove this to-do?')) {
                $div.remove();
                saveTodos();
            }
        });
        $div.append($removeButton);

        $ftList.append($div);
    }

    function saveTodos() {
        const todos = $ftList.children().map(function() {
            return encodeURIComponent($(this).find('span').text());
        }).get();
        document.cookie = `todos=${JSON.stringify(todos)}; path=/`;
    }

    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            todos.forEach(todo => addTodo(decodeURIComponent(todo)));
        }
    }
});
