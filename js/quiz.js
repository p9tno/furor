
$(document).ready(function() {

    let total = 0;


    $('.quiz-question').each(function(indexInArray, valueOfElement) {
        let questionBlock = indexInArray + 1
        $(this).attr('data-q', questionBlock);
        $(this).find('input').attr('name', 'q-' + questionBlock)
        total = total + 1;
        $('.quiz_total_step_js').text(total);

    });

    let lineStep = 100 / total;
    let line;

    let questionNumber = 1;
    let inputNumber;

    let elem = $('.quiz-form').find("input");


    $(elem).on('change', function() {
        $('.quiz-arrow__next').removeAttr('disabled');
    });

    $('.quiz-question label').click(function() {
        let answerNumber = $(this).find('input').attr('name');
        if ($(this).find('input').attr('type') == 'radio') {
            $('.quiz-question input[name="' + answerNumber + '"').parent('label').removeClass('active');
            $(this).addClass('active');
        } else if ($(this).find('input').attr('type') == 'checkbox') {
            if ($(this).find('input').is(':checked')) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        }

    });

    let valid = {};

    $('.quiz-arrow__next, .quiz-question input[type="radio"], .quiz-question__slider-input input[type="checkbox"]').click(function() {
        $('.quiz-hint').hide();
        $('.quiz-arrow__prev').css('display', 'flex');

        let quizId = $('#quiz');
        let quizScroll = $(quizId).offset().top;

        if (questionNumber < total) {
            setTimeout(() => {
                questionNumber++;
                $('.quiz-arrow__next').attr('disabled', 'true')
                validNumber = questionNumber - 1
                valid['quiestion-' + validNumber] = true;
                console.log(valid)
                if (valid['quiestion-' + questionNumber] == true) {
                    $('.quiz-arrow__next').removeAttr('disabled');
                }
                $('.quiz-question.active').hide();
                $('.quiz-question.active').removeClass('active');
                $('.quiz-question[data-q=' + questionNumber + ']').fadeIn('slow')
                $('.quiz-question[data-q=' + questionNumber + ']').addClass('active');
                // $('.quiz-question[data-q=' + questionNumber + ']').fadeIn('slow')
                // $('.quiz-arrow__next').attr('disabled', 'true');
                $('html, body').animate({
                    scrollTop: quizScroll
                }, 1000);
                lineWidth()
            }, 500);

        } else if (questionNumber = total) {
            setTimeout(() => {
                // $('.quiz-load').show();
                $('html, body').animate({
                    scrollTop: quizScroll
                }, 1000);
                $('.quiz-container').hide();
                // setTimeout(() => {
                    $('.quiz-load').hide();
                    $('.quiz-result').show();
                    $('.quiz-result').addClass('active');

                    // }, 1500);

                }, 500);

            }
        });


        $('.quiz-arrow__prev').click(function() {
            let quizId = $('#quiz');
            let quizScroll = $(quizId).offset().top;

            if (questionNumber > 2) {
                questionNumber--;
                if (valid['quiestion-' + questionNumber] == true) {
                    $('.quiz-arrow__next').removeAttr('disabled');
                    console.log('valid')
                }
                // $('.quiz-arrow__next').removeAttr('disabled');
                $('.quiz-question.active').hide();
                $('.quiz-question.active').removeClass('active');
                $('.quiz-question[data-q=' + questionNumber + ']').fadeIn('slow')
                $('.quiz-question[data-q=' + questionNumber + ']').addClass('active');

                $('html, body').animate({
                    scrollTop: quizScroll
                }, 0);
            } else if (questionNumber == 2) {
                $('html, body').animate({
                    scrollTop: quizScroll
                }, 0);
                questionNumber--;
                $('.quiz-arrow__next').removeAttr('disabled');
                $('.quiz-question.active').hide();
                $('.quiz-question.active').removeClass('active');
                $('.quiz-question[data-q=' + questionNumber + ']').fadeIn('slow')
                $('.quiz-question[data-q=' + questionNumber + ']').addClass('active');
                $('.quiz-hint').css('display', 'flex');
                $('.quiz-arrow__prev').hide();
            }
            lineWidth()
        });



        let lineCurrent;

        function lineWidth() {
            lineCurrent = Math.round(questionNumber / total * 100)
            $('.quiz-line__current').text(lineCurrent + '%');
            line = lineStep * (questionNumber);
            line = 'calc(' + line + '% )';
            $('.quiz-line__bg').css('width', line)
            $('.quiz_current_step_js').text(questionNumber);
            $('.quiz_total_step_js').text(total);
        }

        function addNameFile() {
            $('input[type="file"]').change(function (e) {
                // console.log('change');
                var text = $(this).closest('label').attr('data-text');
                // var container = $(this).closest('.tab-item');
                if (typeof e.target.files[0] == 'undefined') {
                    var fileName = text;
                    $(this).parent().removeClass('active');
                } else {
                    var fileName = e.target.files[0].name;
                    $(this).parent().addClass('active');
                    fileName = fileName.substring(0, 20);
                    // console.log(fileName);
                }
                $(this).parent().find('p').text(fileName);
                console.log(fileName);

                // container.find('[controlBtn_JS]').removeClass('disabled');
            });

        }
        addNameFile();


    })
