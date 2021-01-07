/**
 @name: ilha sihaha
$(function(){
    $.fn.airDrops({
        dropType:'flower',
        minSize: 5,
        offsetSize: 50,
        newIn: 300
    });
});
*/
(function($){
    $.fn.airDrops = function(options){
        var flowerIcons = ['&#10047;', '&#10048;','&#10049;'],
            rainDropIcons = ['&#00046;', '&#12290;'],// ['&#10061;'];
            snowIcons = ['&#10042;', '&#10043;','&#10044;','&#10045;', '&#10052;', '&#10054;', '&#10057;', '&#10061;'];
        var documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                pendType:'append',
                pendTo:'body',
                dropType: 'rain',
                minSize: 1,
                offsetSize: 10,
                newIn: 1000,
                dropColor: "#AFDAEF" /* 此处可以定义雪花颜色，若要白色可以改为#FFFFFF */
            },
            icons = rainDropIcons;
        switch(options.dropType){
            case 'flower':
                icons = flowerIcons;
                defaults.dropColor = "#EFAFE7";
                defaults.minSize = 20;
                defaults.offsetSize = 50;
                defaults.newIn = 1000;
                break;
            case 'rain':
                icons = rainDropIcons;
                defaults.dropColor = "#B7CDD8";//"#FFFFFF";// "#B7CDD8";
                defaults.minSize = 1;
                defaults.offsetSize = 2;
                defaults.newIn = 7;
                break;
            case 'snow':
                icons = snowIcons;
                defaults.dropColor = "#AFDAEF";
                defaults.minSize = 10;
                defaults.offsetSize = 20;
                defaults.newIn = 1000;
                break;
            default:
                break;
        }
        options = $.extend({}, defaults, options);
        var getIdx = function(initId){
            var rd = (Math.random() * 10),
                idx = parseInt((rd + initId) % icons.length);
            return idx;
        };
        var getDropTemplate = function(idx){
            icon = icons[idx];
            return $('<div class="airDropsBox" />')
                .css({'position': 'absolute'
//                ,'z-index':'9999'
                , 'top': '-50px'}).html(icon);
        };
        var idxA = getIdx(0), idxB = getIdx(idxA);
        var $dropA = getDropTemplate(idxA),
            $dropB = getDropTemplate(idxB);
        var idx = $('body').data('air-drop');
        if(idx !== undefined){
            clearInterval(idx);
        }//else{}
        var interval= setInterval( function(){
            var startPositionLeft = Math.random() * documentWidth - 100,
                startOpacity = 0.5 + Math.random(),
                sizeDrop = options.minSize + Math.random() * options.offsetSize,
                endPositionTop = documentHeight - 200,
                endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
                durationFall = (5000 * options.minSize) + (Math.random() * 5 * options.newIn);
            var $drop = (parseInt(Math.random(2) * 100) % 2 == 0 ? $dropA : $dropB);
            var isAppend = (options.pendType == 'append');
            var zIndex = isAppend? '9999': 'auto';
            var $dropClone = isAppend
                ? $drop.clone().appendTo(options.pendTo)
                : $drop.clone().prependTo(options.pendTo);
            $dropClone.css({
                left: startPositionLeft,
                opacity: startOpacity,
                'font-size': sizeDrop,
                color: options.dropColor
            }).animate({
                top: endPositionTop,
                left: endPositionLeft,
                'z-index':zIndex,
                opacity: 0.2
            },durationFall,'linear', function(){
                $(this).remove()
            });
        }, options.newIn);
        $('body').data('air-drop', interval);
    };
})(jQuery);
