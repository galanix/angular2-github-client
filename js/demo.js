var search_button = /** @class */ (function () {
    function search_button() {
    }
    search_button.prototype.Onclick = function () {
        document.getElementById("result_search").innerHTML = '';
        document.getElementById("result_search_body").innerHTML = '';
        /* - Вызов функции для записи в переменные введенных пользователем данных для дальнейшей работы - */
        getValueFunction();
    };
    return search_button;
}());
/* - Функция для записи в переменные введенных пользователем данных для дальнейшей работы - */
function getValueFunction() {
    /* - Собираем данные при клике на кнопку поиска - */
    var search_words = document.getElementById("search_words");
    var radio_button = document.getElementById("radio_button");
    var checkbox_button = document.getElementById("checkbox_button");
    /* - -------------------------------------------------------------------------------------------------------------- - */
    /* - Получить значение текстового поля для поиска - */
    var val_search_words = search_words.value;
    var not_value = 0;
    if (val_search_words <= not_value)
        alert("Вы ничего не ввели!");
    /* - -------------------------------------------------------------------------------------------------------------- - */
    /* - Получить значение radio кнопки из группы c применением Prototype - */
    var input_radio_button = document.getElementsByName("radio_search"); //значене радиокнопки для поиска (поиск происходит по атрибуту "Name")
    var selectedValue_radio_button = -1;
    var input_len_radio_button = input_radio_button.length;
    for (var i = 0; i < input_len_radio_button; i++) {
        if (input_radio_button[i].checked) {
            selectedValue_radio_button = input_radio_button[i].value;
            break; //Выходим из цикла, если искомое значение получено
        }
    }
    /* - -------------------------------------------------------------------------------------------------------------- - */
    var input_checkbox_button = document.getElementsByName("checkbox_search"); //значене checkbox для поиска (поиск происходит по атрибуту "Name")
    var selectedValue_checkbox_button = -1;
    var input_len_checkbox_button = input_checkbox_button.length;
    for (var i = 0; i < input_len_checkbox_button; i++) {
        if (input_checkbox_button[i].checked) {
            selectedValue_checkbox_button = input_checkbox_button[i].value;
            break; //Выходим из цикла, если искомое значение получено
        }
    }
    if (selectedValue_checkbox_button < 0)
        selectedValue_checkbox_button = null;
    /* - -------------------------------------------------------------------------------------------------------------- - */
    if (selectedValue_radio_button.toString() == "repa") {
        var type_search = "repositories";
        var type_write = "Репозитории - ";
    }
    else if (selectedValue_radio_button.toString() == "uzer") {
        var type_search = "users";
        var type_write = "Пользователи - ";
    }
    else {
        var type_search = null;
    }
    //let urlAddrNode:string = 'https://api.github.com/search/' + type_search +'?q=' + val_search_words;
    //console.log(urlAddrNode);
    /* - -------------------------------------------------------------------------------------------------------------- - */
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос
    xhr.open('GET', 'https://api.github.com/search/' + type_search + '?q=' + val_search_words, false);
    // 3. Отсылаем запрос
    xhr.send();
    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    }
    else {
        var myObj = JSON.parse(xhr.responseText);
        // вывести результат
        var selectedValue_checkbox_button_2 = selectedValue_checkbox_button;
        if (selectedValue_checkbox_button_2 === "exact_query") {
            document.getElementById("result_search").innerHTML = 'Результаты поиска по точному запросу: ' + type_write + val_search_words + '<br/><br/>';
            myObj.items.forEach(function (items, i) {
                if (selectedValue_radio_button.toString() == "repa" && myObj.items[i].name.toString() === val_search_words) {
                    document.getElementById("result_search_body").innerHTML += '<div class="items-wrapper"><div class="item-wrapper">' +
                        '<div class="item-name"><span class="item-title">Название проекта: </span><span class="item-value">' + myObj.items[i].name + '</span></div>' +
                        '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="' + myObj.items[i].html_url + '" target="_blank">' + myObj.items[i].html_url + '</a></span></div>' +
                        '<div class="item-description"><span class="item-title">Описание: </span><span class="item-value">' + myObj.items[i].description + '</span></div>' +
                        '<div class="item-language"><span class="item-title">Язык: </span><span class="item-value">' + myObj.items[i].language + '</span></div>' +
                        '<div class="item-forks"><span class="item-title">Кол-во форков: </span><span class="item-value">' + myObj.items[i].forks + '</span></div>' +
                        '<div class="item-watchers"><span class="item-title">Кол-во просмотров: </span><span class="item-value">' + myObj.items[i].watchers_count + '</span></div>' +
                        '<div class="item-stargazers-count"><span class="item-title">Кол-во звёзд: </span><span class="item-value">' + myObj.items[i].stargazers_count + '</span></div>' +
                        '<div class="item-created-at"><span class="item-title">Дата создания: </span><span class="item-value">' + myObj.items[i].created_at + '</span></div>' +
                        '<div class="item-owner-login"><span class="item-title">Имя разработчика: </span><span class="item-value">' + myObj.items[i].owner.login + '</span></div>' +
                        '<div class="item-owner-html-url"><span class="item-title">Его профиль: </span><span class="item-value"><a href="' + myObj.items[i].owner.html_url + '" target="_blank">' + myObj.items[i].owner.html_url + '</span></div>' +
                        '</div></div>';
                }
                else if (selectedValue_radio_button.toString() == "uzer" && myObj.items[i].login.toString() === val_search_words) {
                    document.getElementById("result_search_body").innerHTML += '<div class="items-wrapper"><div class="item-wrapper">' +
                        '<div class="item-name"><a href="' + myObj.items[i].html_url + '" target="_blank"><img src="' + myObj.items[i].avatar_url + ' alt="' + myObj.items[i].login + '" /></a></div>' +
                        '<div class="item-name"><span class="item-title">Имя пользователя: </span><span class="item-value">' + myObj.items[i].login + '</span></div>' +
                        '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="' + myObj.items[i].html_url + '" target="_blank">' + myObj.items[i].html_url + '</a></span></div>' +
                        '<div class="item-description"><span class="item-title">Рейтнг: </span><span class="item-value">' + myObj.items[i].score + '</span></div>' +
                        '</div></div>';
                }
                else { }
            });
        }
        else {
            document.getElementById("result_search").innerHTML = 'Результаты поиска по запросу: ' + type_write + val_search_words + '<br/><br/>';
            myObj.items.forEach(function (items, i) {
                if (selectedValue_radio_button.toString() == "repa") {
                    document.getElementById("result_search_body").innerHTML += '<div class="items-wrapper"><div class="item-wrapper">' +
                        '<div class="item-name"><span class="item-title">Название проекта: </span><span class="item-value">' + myObj.items[i].name + '</span></div>' +
                        '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="' + myObj.items[i].html_url + '" target="_blank">' + myObj.items[i].html_url + '</a></span></div>' +
                        '<div class="item-description"><span class="item-title">Описание: </span><span class="item-value">' + myObj.items[i].description + '</span></div>' +
                        '<div class="item-language"><span class="item-title">Язык: </span><span class="item-value">' + myObj.items[i].language + '</span></div>' +
                        '<div class="item-forks"><span class="item-title">Кол-во форков: </span><span class="item-value">' + myObj.items[i].forks + '</span></div>' +
                        '<div class="item-watchers"><span class="item-title">Кол-во просмотров: </span><span class="item-value">' + myObj.items[i].watchers_count + '</span></div>' +
                        '<div class="item-stargazers-count"><span class="item-title">Кол-во звёзд: </span><span class="item-value">' + myObj.items[i].stargazers_count + '</span></div>' +
                        '<div class="item-created-at"><span class="item-title">Дата создания: </span><span class="item-value">' + myObj.items[i].created_at + '</span></div>' +
                        '<div class="item-owner-login"><span class="item-title">Имя разработчика: </span><span class="item-value">' + myObj.items[i].owner.login + '</span></div>' +
                        '<div class="item-owner-html-url"><span class="item-title">Его профиль: </span><span class="item-value"><a href="' + myObj.items[i].owner.html_url + '" target="_blank">' + myObj.items[i].owner.html_url + '</span></div>' +
                        '</div></div>';
                }
                else if (selectedValue_radio_button.toString() == "uzer") {
                    document.getElementById("result_search_body").innerHTML += '<div class="items-wrapper"><div class="item-wrapper">' +
                        '<div class="item-name"><a href="' + myObj.items[i].html_url + '" target="_blank"><img src="' + myObj.items[i].avatar_url + ' alt="' + myObj.items[i].login + '" /></a></div>' +
                        '<div class="item-name"><span class="item-title">Имя пользователя: </span><span class="item-value">' + myObj.items[i].login + '</span></div>' +
                        '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="' + myObj.items[i].html_url + '" target="_blank">' + myObj.items[i].html_url + '</a></span></div>' +
                        '<div class="item-description"><span class="item-title">Рейтнг: </span><span class="item-value">' + myObj.items[i].score + '</span></div>' +
                        '</div></div>';
                }
                else { }
            });
        }
    }
}
window.onload = function () {
    var obj_click = new search_button();
    var search_but = document.getElementById("search_button");
    search_but.onclick = function () {
        obj_click.Onclick();
    };
};
