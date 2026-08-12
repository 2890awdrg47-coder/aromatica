// best 캐러셀
$(document).ready(function () {
    var $carousel = $('.best_carousel');
    var $indicator = $('.scroll_indicator');
    var $thumb = $('.scroll_indicator_thumb');

    $carousel.owlCarousel({
        margin: 42,
        loop: true,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    function updateIndicator(event) {
        var carousel = event.relatedTarget;
        if (!carousel) return;

        // 전체 실제 아이템 수
        var total = carousel.items().length;

        // 현재 한 화면에 보이는 개수
        var visible = carousel.options.items;

        // 이동 가능한 횟수
        var moveCount = total - visible;

        if (moveCount <= 0) {
            $thumb.css({
                width: '100%',
                transform: 'translateX(0)'
            });
            return;
        }

        // 현재 위치
        var current = carousel.relative(event.item.index);

        // thumb 길이
        var thumbWidth = (visible / total) * 100;

        // 이동 가능한 거리
        var maxMove = 100 - thumbWidth;

        // 진행률
        var progress = current / moveCount;

        // 실제 이동 거리
        var move = progress * maxMove;

        $thumb.css({
            width: thumbWidth + '%',
            transform: 'translateX(' + move + '%)'
        });
    }

    $carousel.on(
        'initialized.owl.carousel',
        function (event) {
            updateIndicator(event);
        }
    );

    $carousel.on('changed.owl.carousel', function (event) {
            updateIndicator(event);
        }
    );
});


// hair 캐러셀
$(function () {
    var $hairCarousel = $('.hair_box_wrap');

    $hairCarousel.owlCarousel({
        loop: false,
        margin: 8,          // 기존 gap: 8px 값을 그대로 유지
        nav: false,
        dots: false,
        items: 4,            // 데스크탑 기준 이미지처럼 4개 노출
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1024: {
                items: 3
            },
            1280: {
                items: 4
            }
        },
        onInitialized: updateScrollbar,
        onTranslated: updateScrollbar,
        onResized: updateScrollbar
    });

    // owl-carousel의 이동/초기화 이벤트에 맞춰
    // .hair_scrollbar_thumb의 위치와 너비를 갱신합니다.
    function updateScrollbar(event) {
        var carousel = event.relatedTarget;
        var totalItems = carousel.items().length;
        var itemsInView = carousel.settings.items;

        // 화면에 보이는 아이템이 전체보다 많거나 같으면 스크롤바 숨김
        if (itemsInView >= totalItems) {
            $('.hair_scrollbar').hide();
            return;
        } else {
            $('.hair_scrollbar').show();
        }

        var current = carousel.relative(carousel.current());
        var maxIndex = totalItems - itemsInView;

        var thumbWidthPercent = (itemsInView / totalItems) * 100;
        var thumbLeftPercent = maxIndex > 0
            ? (current / maxIndex) * (100 - thumbWidthPercent)
            : 0;

        $('.hair_scrollbar_thumb').css({
            width: thumbWidthPercent + '%',
            left: thumbLeftPercent + '%'
        });
    }
});

// origin 캐러셀
$(document).ready(function () {

    var $carousel = $('.origin_box_wrap');
    var $indicator = $('.origin_scrollbar');
    var $thumb = $('.origin_scrollbar_thumb');


    /* ========================================
       실제 아이템
    ======================================== */

    var $items = $carousel.find('.origin_box');

    var total =
        $items.length;


    /* ========================================
       OWL CAROUSEL
    ======================================== */

    $carousel.owlCarousel({

        loop: true,

        margin: 108,

        nav: false,

        dots: false,

        items: 4.5,

        responsive: {

            0: {
                items: 1
            },

            600: {
                items: 2
            },

            1024: {
                items: 3
            },

            1440: {
                items: 4.5
            },

            1920: {
                items: 4.5
            }

        }

    });


    /* ========================================
       INDICATOR
    ======================================== */

    function updateIndicator(event) {

        var carousel =
            event.relatedTarget;

        if (!carousel) return;


        /* ========================================
           현재 화면에 보이는 개수
        ======================================== */

        var visible =
            carousel.options.items;


        /* ========================================
           인디케이터 실제 크기
        ======================================== */

        var indicatorWidth =
            $indicator.width();


        if (!indicatorWidth) return;


        /* ========================================
           검정색 바 크기

           실제 12개 기준
        ======================================== */

        var thumbWidth =
            indicatorWidth *
            (visible / total);


        /* ========================================
           검정색 바 이동 가능 거리
        ======================================== */

        var maxMove =
            indicatorWidth -
            thumbWidth;


        /* ========================================
           현재 실제 아이템 번호
        ======================================== */

        var current =
            carousel.relative(
                event.item.index
            );


        /* ========================================
           loop 처리

           실제 아이템은 0 ~ 11
        ======================================== */

        current =
            ((current % total) + total) %
            total;


        /* ========================================
           0 ~ 11을 0 ~ 1로 변환
        ======================================== */

        var progress =
            current / (total - 1);


        /* ========================================
           검정색 바 위치
        ======================================== */

        var move =
            progress * maxMove;


        /* ========================================
           적용
        ======================================== */

        $thumb.css({

            width:
                thumbWidth + 'px',

            transform:
                'translate3d(' +
                move +
                'px, 0, 0)'

        });

    }


    /* ========================================
       INITIALIZED
    ======================================== */

    $carousel.on(
        'initialized.owl.carousel',
        function (event) {

            updateIndicator(event);

        }
    );


    /* ========================================
       CHANGED
    ======================================== */

    $carousel.on(
        'changed.owl.carousel',
        function (event) {

            updateIndicator(event);

        }
    );


    /* ========================================
       RESIZE
    ======================================== */

    $(window).on(
        'resize',
        function () {

            var carousel =
                $carousel.data(
                    'owl.carousel'
                );

            if (!carousel) return;


            var current =
                carousel.relative(
                    carousel.current()
                );


            current =
                ((current % total) + total) %
                total;


            var visible =
                carousel.options.items;


            var indicatorWidth =
                $indicator.width();


            var thumbWidth =
                indicatorWidth *
                (visible / total);


            var maxMove =
                indicatorWidth -
                thumbWidth;


            var progress =
                current / (total - 1);


            var move =
                progress * maxMove;


            $thumb.css({

                width:
                    thumbWidth + 'px',

                transform:
                    'translate3d(' +
                    move +
                    'px, 0, 0)'

            });

        }

    );

});

/*
$(function () {
    var $originCarousel = $('.origin_box_wrap');

    $originCarousel.owlCarousel({
        loop: false,
        margin: 108,
        nav: false,
        dots: false,
        items: 4.5,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1024: { items: 3 },
            1440: { items: 4.5 },
            1920: { items: 4.5 }
        },
        onInitialized: updateScrollbar,
        onTranslated: updateScrollbar,
        onResized: updateScrollbar
    });

    function updateScrollbar(event) {
        var carousel = event.relatedTarget;
        var totalItems = carousel.items().length;
        var itemsInView = carousel.settings.items;

        if (itemsInView >= totalItems) {
            $('.origin_scrollbar').hide();
            return;
        }
        $('.origin_scrollbar').show();

        var current = carousel.relative(carousel.current());
        var maxIndex = totalItems - itemsInView;

        var thumbWidthPercent = (itemsInView / totalItems) * 100;
        var thumbLeftPercent = maxIndex > 0
            ? (current / maxIndex) * (100 - thumbWidthPercent)
            : 0;

        $('.origin_scrollbar_thumb').css({
            width: thumbWidthPercent + '%',
            left: thumbLeftPercent + '%'
        });
    }
});
*/

// 서브 캐러셀
$(document).ready(function(){
    $('.online_box_wrap').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoWidth: true,
        stagePadding: 0
    });
});