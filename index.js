const items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Функция для загрузки задач из localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    const tasks = savedTasks ? JSON.parse(savedTasks) : items;

    items.length = 0;
    items.push(...tasks);
}


// Функция получения всех задач из DOM
function getTasksFromDOM() {
    return Array.from(
        document.querySelectorAll(".to-do__item-text"),
        el => el.textContent
    );
}

// Функция сохранения массива задач
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для обновления localStorage
function updateStorage() {
    const currentTasks = getTasksFromDOM();

    items.length = 0;
    items.push(...currentTasks);

    localStorage.setItem("tasks", JSON.stringify(items));
}

// Функция создания нового элемента задачи на основе шаблона
function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    deleteButton.addEventListener('click', function () {
        clone.remove();
        updateStorage()
    });

    duplicateButton.addEventListener("click", () => {
        const clone = createItem(textElement.textContent);
        listElement.prepend(clone);
        updateStorage();
    });

    editButton.addEventListener('click', function () {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', function () {
        textElement.setAttribute('contenteditable', 'false');
        updateStorage();
    });

    return clone;
}

// Загрузка и отображение задач
loadTasks();
items.forEach(task => {
    listElement.append(createItem(task));
});

// Функция отправки формы
formElement.addEventListener("submit", event => {
    event.preventDefault();

    const value = inputElement.value.trim();
    if (!value) return;

    listElement.prepend(createItem(value));
    updateStorage();
    inputElement.value = "";
});