var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function () {
        return navigator.userAgent.match( /iPhone|iPad|iPod/i );
    },
    touchDevice: function () {
        return navigator.userAgent.match( /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i );
    }
};

function isLgWidth() {
    return $( window ).width() >= app.lgWidth;
} // >= 1200
function isMdWidth() {
    return $( window ).width() >= app.mdWidth && $( window ).width() < app.lgWidth;
} //  >= 992 && < 1200
function isSmWidth() {
    return $( window ).width() >= app.smWidth && $( window ).width() < app.mdWidth;
} // >= 768 && < 992
function isXsWidth() {
    return $( window ).width() < app.smWidth;
} // < 768
function isIOS() {
    return app.iOS();
} // for iPhone iPad iPod
function isTouch() {
    return app.touchDevice();
} // for touch device

// console.log('pathname: ', window.location.pathname);
// console.log('url: ', window.location.href);
// console.log('origin: ', window.location.origin);

window.onload = function () {
    console.log('onload');
    function preloader() {
        $(()=>{

            setTimeout( () => {
                let p = $('#preloader');
                p.addClass('hide');

                setTimeout( () => {
                    p.remove()
                },1000);

            },1000);
        });
    }
    preloader();
    // setTimeout( ()=> preloader(),15000 )
}

$(document).ready(function() {
    console.log('ready');

    // window.addEventListener('resize', () => {
    //     // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    //     if (app.resized == screen.width) { return; }
    //     app.resized = screen.width;
    //     // console.log('resize');
    //     console.log(screen.width);
    //     checkOnResize();
    // });
    //
    // function checkOnResize() {
    //     if (isLgWidth()) {
    //         console.log('isLgWidth');
    //     } else {
    //         console.log('isLgWidth else');
    //     }
    //     // или создаем функцию
    //     // test();
    // }
    //
    // function test() {
    //     if (isLgWidth()) {
    //         console.log('isLgWidth');
    //     } else {
    //         console.log('isLgWidth else');
    //     }
    // }

    let mediaQuerySize = 768;
    let windowWidth = screen.width;
    // console.log(windowWidth);
    if (windowWidth >= mediaQuerySize) {
        console.log('desktop');
        toggleDesktopMenu();
        stikyMenu();
    } else {
        console.log('mobile');
        toggleMobileSubMenu();
        toggleServicesMenu();
    }

    // only desktop function
    function toggleDesktopMenu() {
        let toggle = $('.menu-item-services'),
            drop = $('.header__dropmenu'),
            wrapper = $('.wrapper');

        $('.menu-item-services, .header__dropmenu').hover(
            function(){
                // при вхождении в элемент
                toggle.addClass('active')
                drop.addClass('active')
                $('body').addClass('nav-open');
                wrapper.addClass('blur');
            },
            function(){
                // при покидании элемента
                toggle.removeClass('active')
                drop.removeClass('active')
                $('body').removeClass('nav-open');
                wrapper.removeClass('blur');
            }
        );
    }

    // only desktop function
    function stikyMenu() {
        let HeaderTop = $( '.header__nav' ).offset().top;
        let currentTop = $( window ).scrollTop();

        setNavbarPosition();

        $( window ).scroll( function () {
            setNavbarPosition();
        } );

        function setNavbarPosition() {
            currentTop = $( window ).scrollTop();

            if ( currentTop > HeaderTop ) {
                $( 'header' ).addClass( 'stiky' );
            } else {
                $( 'header' ).removeClass( 'stiky' );
            }
        }

    }

    // only mobile function
    function toggleMobileSubMenu() {
        $('.icon_caret_bottom').click(function(event) {
            event.preventDefault();
            let submenu = $(this).closest('.menu-item').find('.sub-menu').eq(0);
            $(this).toggleClass('active');
            submenu.slideToggle();
        })
    }

    // only mobile function
    function toggleServicesMenu() {
        $('.services__toggle').click(function(event) {
            let menu = $(this).closest('.services__col').find('.services__menu').eq(0);
            $(this).toggleClass('active');
            menu.slideToggle();
        })
    }

    function scrollPage () {
        $('.scroll_js').on('click', function (e) {
            e.preventDefault();
            let id  = $(this).attr('href');
            let top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        });

        // $(window).scroll(function(){
        //     if($(window).scrollTop()>500){
        //         $('.toTop').fadeIn(900)
        //     }else{
        //         $('.toTop').fadeOut(700)
        //     }
        // });
    }
    scrollPage();

    function collapseWidget() {
        let toggle = $('.widget__toggle'),
        list = $('.widget__list');

        console.log('localStorage: ', localStorage.getItem('collapseWidget'));

        if (localStorage.getItem('collapseWidget') !== 'collapse') {
            toggle.addClass('active');
            list.addClass('hide');
            $('.widget__list').slideUp(0);
        }

        toggle.click(function(e) {
            console.log('widget__toggle');
            $(this).toggleClass('active');
            list.toggleClass('hide');

            if (list.hasClass('hide')) {
                list.slideUp();
            } else {
                list.slideDown();
            }

            if (localStorage.getItem('collapseWidget') == 'collapse') {
                localStorage.removeItem("collapseWidget", "collapse");
            } else {
                localStorage.setItem("collapseWidget", "collapse");
                // console.log('сохранить пару ключ/значение.');
            }
        });
    }
    collapseWidget();

    function showModal() {
        $('.show_modal_js').on('click', function (e) {
            e.preventDefault();
            let id  = $(this).attr('href');

            $(id).modal('show');
        });

        $('.modal').on('show.bs.modal', () => {
            // let openedModal = $('.modal.in:not(.popapCalc)');
            let openedModal = $('.modal');
            if (openedModal.length > 0) {
                openedModal.modal('hide');
            }
        });
    }
    showModal();

    function openMobileNav() {
        $('.header__toggle').click(function(event) {
            // console.log('Показ меню');
            $('.header__nav').toggleClass('header__nav_open');
            $('.header__toggle').toggleClass('header__toggle_open');
            $( 'body' ).toggleClass( 'nav-open' );
        });
    };
    openMobileNav();


    function showMore(classItem, btn) {
        // let classItem = '.vacancies__item';
        // let classItem = class;
        let item = $(''+ classItem +'');
        let count = item.length;
        let start = 1;
        let show = 1;

        item.addClass('d-none');
        $('' + classItem + ':lt(' + start + ')').removeClass('d-none');

        $(btn).click(function(e) {
            e.preventDefault();
            $(this).addClass('loading');

            let load = $(this).data('load');
            let more = $(this).data('more');

            start = (start + show <= count) ? start + show : count;

            $(this).text(load);

            setTimeout(() => {
                $(''+ classItem +':lt(' + start + ')').removeClass('d-none');
                if ($(''+ classItem +':not(.d-none)').length == count) {
                    $(this).parent().remove();
                }
                $(this).removeClass('loading');
                $(this).text(more);
            }, 500);
        });

    }
    // showMore('.vacancies__item', '.show_more_v_js');

    function collapsed() {
        let toggle = $('[data-collapse]');

        toggle.on('click', function() {
            let id = $(this).data('collapse'),
            body = $('[data-collapse-body="'+id+'"]'),
            wrap = body.closest('[data-collapse-wrapper]'),
            preview = $('.content__preview');

            if (!id) {
                // $('[data-collapse-wrapper]').removeClass('open');
                body = $(this).parent().find('[data-collapse-body]');
                $(this).toggleClass('open');
                preview.toggleClass('open');
                if ($(this).hasClass('open')) {
                    body.slideDown();
                } else {
                    body.slideUp();
                }
            } else if (id === 'all') {
                body.slideDown();
                preview.addClass('open');
                toggle.addClass('open');
            } else {
                body.slideToggle();
                preview.toggleClass('open');
                $(this).toggleClass('open');
            }
        });
    }
    collapsed();

    function doTabs () {
        $('.tabs__wrapper').each(function() {
            let ths = $(this);
            ths.find('.tab__item').not(':first').hide();
            ths.find('.tab').click(function() {
                ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
                ths.find('.tab__item').hide().eq($(this).index()).fadeIn()
            }).eq(0).addClass('active');
        });
    }
    doTabs();

    function doDrop() {
        $('.drop__toggle').on('click', function() {
            // $('.drop__list').toggleClass('open');
            $(this).toggleClass('active');
            $(this).closest('.drop').find('.drop__list').toggleClass('open');
        });
    };
    doDrop();

    function initSelect2 () {
        function addIcon(icon) {
            if (!icon.id) {
                return icon.text;
            }
            let $icon = $(
                '<span><span></span><i></i></span>'
            );
            $icon.find("span").text(icon.text);
            $icon.find("i").attr("class", "icon_" + icon.element.value.toLowerCase());
            return $icon;
        }

        $('.select').select2({
            placeholder: $(this).data('placeholder'),
            minimumResultsForSearch: Infinity,
            templateSelection: addIcon,
        });

        // $('.select').on('change',function() {
        //     let val = $(this).val();
        //     let form = $(this).closest('.form');
        //     let phone = form.find('.form__row_phone_js');
        //     let mail = form.find('.form__row_email_js');

        //     if ( val == 'mail'){
        //         mail.removeClass('form__row_hide');
        //         mail.find('input').prop('required',true);

        //         phone.addClass('form__row_hide');
        //         phone.find('input').prop('required',false);

        //     } else {
        //         mail.addClass('form__row_hide');
        //         mail.find('input').prop('required',false);

        //         phone.removeClass('form__row_hide');
        //         phone.find('input').prop('required',true);
        //     }
        // })
    }
    initSelect2();

    $(function(){
        $(".phone").mask("+7 ( 9 9 9 ) 9 9 9 - 9 9 - 9 9");
    });

    function initTwentytwenty () {
        $(".twentytwenty-container").twentytwenty({
            default_offset_pct: 0.42, // сколько показывать 'изображение до' в процентах (максимально 1) сразу после загрузки страницы
            orientation: 'horizontal', // ориентация слайдера ('horizontal' или 'vertical')
            before_label: 'До', // подпись 'до'
            after_label: 'После', // подпись 'после'
            no_overlay: true, // не показывать затемнение с надписями 'до' и 'после'
            move_slider_on_hover: false, // двигать "бегунок" слайдера вместе с курсором мыши
            move_with_handle_only: true, // двигать слайдер только за его "бегунок"
            click_to_move: false // разрешить перемещение "бегунка" слайдера по клику на изображении
        });
    }
    // initTwentytwenty(); добавить пример и стили



    function addDataFancybox() {
        let item = $('.itemForDataFancybox_js');
        let num = 0;
        item.each(function(index, el) {
            $(this).find('a').attr('data-fancybox', num);
            num++;
        });
    }
    addDataFancybox();


    // Видео youtube для страницы
    function uploadYoutubeVideo() {
        if ( $( ".js-youtube" ) ) {

            $( ".js-youtube" ).each( function () {
                // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
                $( this ).css( 'background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)' );

                // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
                $( this ).append( $( '<img src="../wp-content/themes/gymn/assets/img/play.png" alt="Play" class="video__play">' ) );

            } );

            $( '.video__play, .video__prev' ).on( 'click', function () {
                // создаем iframe со включенной опцией autoplay
                let wrapp = $( this ).closest( '.js-youtube' ),
                    videoId = wrapp.attr( 'id' ),
                    iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

                if ( $( this ).data( 'params' ) ) iframe_url += '&' + $( this ).data( 'params' );

                // Высота и ширина iframe должны быть такими же, как и у родительского блока
                let iframe = $( '<iframe/>', {
                    'frameborder': '0',
                    'src': iframe_url,
                    'allow': "autoplay"
                } )

                // Заменяем миниатюру HTML5 плеером с YouTube
                $( this ).closest( '.video__wrapper' ).append( iframe );

            } );
        }
    };
    // uploadYoutubeVideo();

    function uploadYoutubeVideoForModal() {
        if ( $( ".youtubeModal_js" ) ) {

            $( '.youtubeModal_js' ).on( 'click', function () {
                $('#modalVideo').modal('show');

                let wrapp = $( this ).closest( '.youtubeModal_js' );
                let videoId = wrapp.attr( 'id' );
                let iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

                // доп параметры для видоса
                // if ( $( this ).data( 'params' ) ) iframe_url += '&' + $( this ).data( 'params' );

                // Высота и ширина iframe должны быть такими же, как и у родительского блока
                let iframe = $( '<iframe/>', {
                    'frameborder': '0',
                    'src': iframe_url,
                    'allow': "autoplay"
                } )
                $(".modalVideo__wraper").append(iframe);

                $("#modalVideo").on('hide.bs.modal', function () {
                    $(".modalVideo__wraper").html('');
                });

            } );
        }
    };
    uploadYoutubeVideoForModal();

    function initOnVisible() {
        function onVisible( selector, callback, repeat = false ) {

            let options = {
                threshold: [ 0.5 ]
            };
            let observer = new IntersectionObserver( onEntry, options );
            let elements = document.querySelectorAll( selector );

            for ( let elm of elements ) {
                observer.observe( elm );
            }

            function onEntry( entry ) {
                entry.forEach( change => {
                    let elem = change.target;
                    // console.log(change);
                    // console.log(elem.innerHTML);
                    if ( change.isIntersecting ) {
                        if ( !elem.classList.contains( 'show' ) || repeat ) {
                            elem.classList.add( 'show' );
                            callback( elem );
                        }
                    }
                } );
            }
        }

        onVisible( '.animate-number-js', function ( e ) {
            animateNumber( e, e.innerHTML );
        } );


        function animateNumber( elem, final, duration = 1000 ) {
            let start = 1;
            if (+final > 400) {
                start = (+final) - 300 ;
            }
            setInterval( function () {
                if ( final >= start ) {
                    elem.innerHTML = start++;
                }
            }, duration / final );
        }

    }
    initOnVisible();

    function initAOS () {
        // https://github.com/michalsnik/aos
        AOS.init({
            disable: 'mobile',
            // anchorPlacement: 'bottom-bottom',
            duration: 1000, // values from 0 to 3000, with step 50ms
            // offset: 20,
            once: true,
        });

        AOS.init({
            disable: function () {
                var maxWidth = 768;
                return window.innerWidth < maxWidth;
            }
        });

    }
    initAOS ();


    // --------------------------------------------------------------------
    // Деление чисел на разряды Например из строки 10000 получаем 10 000
    // Использование: thousandSeparator(1000) или используем переменную.
    // function thousandSeparator(str) {
    //     var parts = (str + '').split('.'),
    //         main = parts[0],
    //         len = main.length,
    //         output = '',
    //         i = len - 1;
    //
    //     while(i >= 0) {
    //         output = main.charAt(i) + output;
    //         if ((len - i) % 3 === 0 && i > 0) {
    //             output = ' ' + output;
    //         }
    //         --i;
    //     }
    //
    //     if (parts.length > 1) {
    //         output += '.' + parts[1];
    //     }
    //     return output;
    // };
    //
    // console.log(thousandSeparator(700));
    // --------------------------------------------------------------------



    // --------------------------------------------------------------------
    // <div class="form__row">
    //     <label class="form__file_label" data-text="Файл не выбран">
    //     <input type="file" required="required"/>
    //     <p class="form__file">Загрузить файл</p>
    //     </label>
    // </div>

    // function addNameFile() {
    //     $('input[type="file"]').change(function (e) {
    //         // console.log('change');
    //         var text = $(this).closest('label').attr('data-text');
    //         // var container = $(this).closest('.tab-item');
    //         if (typeof e.target.files[0] == 'undefined') {
    //             var fileName = text;
    //             $(this).parent().removeClass('active');
    //         } else {
    //             var fileName = e.target.files[0].name;
    //             $(this).parent().addClass('active');
    //             fileName = fileName.substring(0, 20);
    //             // console.log(fileName);
    //         }
    //         $(this).parent().find('p').text(fileName);
    //         // console.log(fileName);
    //         // container.find('[controlBtn_JS]').removeClass('disabled');
    //     });
    // }
    // addNameFile();
    // --------------------------------------------------------------------


    // function reloadPage () {
    //     if (!localStorage.getItem("reload")) {
    //         localStorage.setItem("reload", "true");
    //         location.reload();
    //     }
    //     else {
    //         localStorage.removeItem("reload");
    //     }
    // }


    // Склонение существительных после числительных. https://snipp.ru/php/word-declination
    // ['час', 'часа', 'часов']
    // ['минута', 'минуты', 'минут']
    // function numWord (value, words, show = true) {
    //     let num = value % 100;
    //     if (num > 19) {
    //         num = value % 10;
    //     }

    //     let out = (show) ?  value + ' ' : '';

    //     switch (num) {
    //         case 1:  out += words[0]; break;
    //         case 2:
    //         case 3:
    //         case 4:  out += words[1]; break;
    //         default: out += words[2]; break;

    //     }
    //     // console.log(out);
    //     return out;
    // }



})
// end animate numbers
