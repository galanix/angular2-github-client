(function($) {
    $(document).ready(function() {

        var search_button = $("#search_button");
        
        /* - Собираем данные при клике на кнопку поиска - */
        search_button.click(function(){
            var search_words = $("#search_words");
            var radio_button = $("#radio_button");
            var checkbox_button = $("#checkbox_button");
            $('#result_search').html('');
            $('#result_search_body').html('');
            //$("#search_words").val('');
            /* - Вызов функции для записи в переменные введенных пользователем данных для дальнейшей работы - */
            getValueFunction();


        });

        /* - Функция для записи в переменные введенных пользователем данных для дальнейшей работы - */
        function getValueFunction(){
            /* - Получить значение текстового поля для поиска - */
            var val_search_words = 0;
            val_search_words = search_words.value;
            if (val_search_words <= 0)
              alert ("Вы ничего не ввели!");
            
            /* - Получить значение checkbox кнопки из группы c применением jQuery- */
            //var selectedValue_radio_button = $('input[name="checkbox_search"]:checked').val();
            /* - Получить значение radio кнопки из группы c применением Prototype - */
            var input_radio_button = document.getElementsByName("radio_search");            //значене радиокнопки для поиска (поиск происходит по атрибуту "Name")
            var selectedValue_radio_button = -1;
            var input_len_radio_button = input_radio_button.length;
            for (var i = 0; i < input_len_radio_button; i++) {
                if (input_radio_button[i].checked) {
                    selectedValue_radio_button = input_radio_button[i].value;
                    break;                                                                  //Выходим из цикла, если искомое значение получено
                }
            }
            /* if (selectedValue_radio_button < 0)
              alert ("Вы ничего не выбрали");*/


            /* - Получить значение checkbox кнопки из группы c применением jQuery- */
            //var input_checkbox_button = $('input[name="checkbox_search"]:checked').val();
            /* - Получить значение checkbox кнопки из группы c применением Prototype - */
            var input_checkbox_button = document.getElementsByName("checkbox_search");      //значене checkbox для поиска (поиск происходит по атрибуту "Name")
            var selectedValue_checkbox_button = -1;
            var input_len_checkbox_button = input_checkbox_button.length;
            for (var i = 0; i < input_len_checkbox_button; i++) {
                if (input_checkbox_button[i].checked) {
                    selectedValue_checkbox_button = input_checkbox_button[i].value;
                    break;                                                                  //Выходим из цикла, если искомое значение получено
                }
            }
            if (selectedValue_checkbox_button < 0)
              selectedValue_checkbox_button = null;

            /* - -------------------------------------------------------------------------------------------------------------- - */
            
            if(selectedValue_radio_button == "repa"){
                var type_search = "repositories";
                var type_write = "Репозитории - ";
            }
            /*else if(selectedValue_radio_button == "org"){
                var type_search = "org";
            }*/
            else if(selectedValue_radio_button == "uzer"){
                var type_search = "users";
                var type_write = "Пользователи - ";
            }
            else{
                var type_search = null;
            }
            var urlAddrNode = 'https://api.github.com/search/' + type_search +'?q=' + val_search_words;
                /*$.ajax({
                  url:'https://api.github.com/users/'+ val_search_words,
                  data:{
                    client_id:'89eac5b59255701bd3f8',
                    client_secret:'92784e24d022805b1753e3bd96b75ad24fa580ef'
                  }
                }).done(function(user){
                    $.ajax({
                        url:'https://api.github.com/users/'+ val_search_words +'/repos',
                        data:{
                          client_id:'89eac5b59255701bd3f8',
                          client_secret:'92784e24d022805b1753e3bd96b75ad24fa580ef',
                          sort: 'created: asc',
                          per_page: 5
                        }
                      }).done(function(repos){
                        var urlAddrNode = 'https://api.github.com/search/' + type_search +'?q=' + val_search_words;*/
                            $.ajax({
                                type: 'GET',
                                url: urlAddrNode,
                                async: false,
                                jsonCallback: 'jsonCallback',
                                contentType: 'json',
                                dataType: 'json',
                                success: function(json) {
                                    if(selectedValue_checkbox_button === "exact_query"){
                                        $('#result_search').append('Результаты поиска по точному запросу: ' + type_write + val_search_words + '<br/><br/>'); 
                                        
										
										$.each(json["items"], function(i, node) {
											
                                            if(selectedValue_radio_button == "repa" && json.items[i].name === val_search_words){
												console.log(json.items);
                                                $('#result_search_body').append('<div class="items-wrapper"><div class="item-wrapper">' +
                                                    '<div class="item-name"><span class="item-title">Название проекта: </span><span class="item-value">' + json.items[i].name + '</span></div>' +
                                                    '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="'+ json.items[i].html_url + '" target="_blank">' + json.items[i].html_url + '</a></span></div>' +
                                                    '<div class="item-description"><span class="item-title">Описание: </span><span class="item-value">' + json.items[i].description + '</span></div>' +
                                                    '<div class="item-language"><span class="item-title">Язык: </span><span class="item-value">' + json.items[i].language + '</span></div>' +
                                                    '<div class="item-forks"><span class="item-title">Кол-во форков: </span><span class="item-value">' + json.items[i].forks + '</span></div>' +
                                                    '<div class="item-watchers"><span class="item-title">Кол-во просмотров: </span><span class="item-value">' + json.items[i].watchers_count + '</span></div>' +
                                                    '<div class="item-stargazers-count"><span class="item-title">Кол-во звёзд: </span><span class="item-value">' + json.items[i].stargazers_count + '</span></div>' +
                                                    '<div class="item-created-at"><span class="item-title">Дата создания: </span><span class="item-value">' + json.items[i].created_at + '</span></div>' +
                                                    '<div class="item-owner-login"><span class="item-title">Имя разработчика: </span><span class="item-value">' + json.items[i].owner.login + '</span></div>' +
                                                    '<div class="item-owner-html-url"><span class="item-title">Его профиль: </span><span class="item-value"><a href="'+ json.items[i].owner.html_url + '" target="_blank">' + json.items[i].owner.html_url + '</span></div>' +
                                                '</div></div>');
                                            }else if(selectedValue_radio_button == "uzer" && json.items[i].login === val_search_words){
                                                 $('#result_search_body').append('<div class="items-wrapper"><div class="item-wrapper">' +
                                                    '<div class="item-name"><a href="'+ json.items[i].html_url + '" target="_blank"><img src="'+ json.items[i].avatar_url + ' alt="'+ json.items[i].login + '" /></a></div>' +
                                                    '<div class="item-name"><span class="item-title">Имя пользователя: </span><span class="item-value">' + json.items[i].login + '</span></div>' +
                                                    '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="'+ json.items[i].html_url + '" target="_blank">' + json.items[i].html_url + '</a></span></div>' +
                                                    '<div class="item-description"><span class="item-title">Рейтнг: </span><span class="item-value">' + json.items[i].score + '</span></div>' +
                                                 '</div></div>');
                                            }else{}
                                        });

                                    }else{
                                        $('#result_search').append('Результаты поиска по запросу: ' + type_write + val_search_words + '<br/><br/>');
                                        $.each(json["items"], function(i, node) {
                                            if(selectedValue_radio_button == "repa"){
                                                $('#result_search_body').append('<div class="items-wrapper"><div class="item-wrapper">' +
                                                    '<div class="item-name"><span class="item-title">Название проекта: </span><span class="item-value">' + json.items[i].name + '</span></div>' +
                                                    '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="'+ json.items[i].html_url + '" target="_blank">' + json.items[i].html_url + '</a></span></div>' +
                                                    '<div class="item-description"><span class="item-title">Описание: </span><span class="item-value">' + json.items[i].description + '</span></div>' +
                                                    '<div class="item-language"><span class="item-title">Язык: </span><span class="item-value">' + json.items[i].language + '</span></div>' +
                                                    '<div class="item-forks"><span class="item-title">Кол-во форков: </span><span class="item-value">' + json.items[i].forks + '</span></div>' +
                                                    '<div class="item-watchers"><span class="item-title">Кол-во просмотров: </span><span class="item-value">' + json.items[i].watchers_count + '</span></div>' +
                                                    '<div class="item-stargazers-count"><span class="item-title">Кол-во звёзд: </span><span class="item-value">' + json.items[i].stargazers_count + '</span></div>' +
                                                    '<div class="item-created-at"><span class="item-title">Дата создания: </span><span class="item-value">' + json.items[i].created_at + '</span></div>' +
                                                    '<div class="item-owner-login"><span class="item-title">Имя разработчика: </span><span class="item-value">' + json.items[i].owner.login + '</span></div>' +
                                                    '<div class="item-owner-html-url"><span class="item-title">Его профиль: </span><span class="item-value"><a href="'+ json.items[i].owner.html_url + '" target="_blank">' + json.items[i].owner.html_url + '</span></div>' +
                                                '</div></div>');
                                            }else if(selectedValue_radio_button == "uzer"){
                                                 $('#result_search_body').append('<div class="items-wrapper"><div class="item-wrapper">' +
                                                    '<div class="item-name"><a href="'+ json.items[i].html_url + '" target="_blank"><img src="'+ json.items[i].avatar_url + ' alt="'+ json.items[i].login + '" /></a></div>' +
                                                    '<div class="item-name"><span class="item-title">Имя пользователя: </span><span class="item-value">' + json.items[i].login + '</span></div>' +
                                                    '<div class="item-html-url"><span class="item-title">Гитхаб-проект: </span><span class="item-value"><a href="'+ json.items[i].html_url + '" target="_blank">' + json.items[i].html_url + '</a></span></div>' +
                                                    '<div class="item-description"><span class="item-title">Рейтнг: </span><span class="item-value">' + json.items[i].score + '</span></div>' +
                                                 '</div></div>');
                                            }else{}
                                        });
                                    }
                                },
                                 error: function(e) {
                                    console.log(e.message);
                                }
                            /*});
                        });*/
                });
        };

    });
})(jQuery);