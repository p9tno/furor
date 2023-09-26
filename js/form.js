// ФОРМА
function submitForm() {
    let modal = $('#info');
    let message = modal.find('.form__message');
        // при закрытии окна, чистим
    modal.on('hidden.bs.modal', function (e) {
    message.html('');
});
    // проверка клавиши enter
    $("[type=submit]").keyup(function(event){
        if(event.keyCode == 13){
            $(this).click();
        }
    });

    $('[type=submit]').on('click tab', function (e) {
        //отменяем стандартную обработку нажатия и табу по кнопке запрет на отправку
        e.preventDefault();

        // записуем объект относящийся к ЭТОЙ кнопке
        let form = $(this).closest('.form');

        // проверка спама
        let notspam = form.find('[name="notspam"]');
        notspam.val('Not spam');

        // Поиск потомков внутри каждого элемента в текущем наборе ОБЯЗАТЕЛЬНЫЕ ПОЛЯ!!!
        let fields = form.find('[required]');

        // Записываем значение атрибута формы action
        let url = form.attr('action');

        // Записываем значения полей форм. Обязателен атрибут name у полей с уникальным значением
        let formData = form.serialize();

        

        // для счетчика (колличесто не заполненых полей)
        let empty = 0;


        // выполняет функцию для каждого элемента. each - Итерация над объектом JQuery, выполняет функцию для каждого элемента(циклические операции над DOM-элементами)
        fields.each(function (index, el) {
            // проверка заполнения полей. val - Метод позволяет получать и изменять значения элементов форм
            if ($(this).val() === '') {
                $(this).addClass('invalid');
                empty++;
            } else {
                $(this).removeClass('invalid');
            }
        });

        setTimeout(function () {
            fields.removeClass('invalid');
        }, 1500);


        if (empty === 0) {
            // отправляем форму
            // $('.form').submit();
            $.ajax({
                url:url,
                type: "POST",
                dataType: "html",
                data: formData,
                success: function (responce) {
                    // $('#success').modal('show');
                    console.log('success');
                    modal.modal('show');
                    // Пример с перенаправлением на другую страницу
                    // document.location.href = "js.html";
                    // Пример вывода текста в какой то блок
                    message.html('Ваше сообщение отправлено. <br> Мы свяжемся с вами в ближайшее время.');
                    // message.text('Ваша форма успешно отправлена. <br> Мы свяжемся с вами в ближайшее время.');
                    // Дополнительно можно удалить текст из блока спустя какое то время
                    // setTimeout(function () {
                        //         message.html('');
                        //     }, 5000);
                    },
                    error: function (responce) {
                        console.log('error');
                        modal.modal('show');
                        message.html('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                        // message.text('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                        // setTimeout(function () {
                            //     message.html('');
                            // }, 5000);
                        }
                    })
                }
            });
}
submitForm();

function disabledButton() {
    $('.check_checked_js').on('change', function () {
        if ( $(this).prop('checked') ) {
            $(this).closest('.form').find('.btn_didisabled_js').attr('disabled', false);

        } else {
            $(this).closest('.form').find('.btn_didisabled_js').attr('disabled', true);
        }
    });

}
disabledButton();
