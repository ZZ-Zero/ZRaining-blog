(function ($) {
    if ($('.ZZZeroPhoto').length <= 0) return

    var index = {
        page: 1,
        offset: 20,
        init: function () {
            var that = this;
            $.getJSON("/photo/output.json", function (data) {
                that.render(that.page, data);

                that.scroll(data);
            });
        },

        render: function (page, data) {
            var begin = (page - 1) * this.offset;
            var end = page * this.offset;
            if (begin >= data.length) return;
            var html, li = "";
            for (var i = begin; i < end && i < data.length; i++) {
                var size = '20'
                if (i === 0) size = '100'
                if (i > 0 && i <= 4) size = '50'
                if (i > 4 && i <= 16) size = '33'
                if (i > 16 && i <= 48) size = '25'

                li += '<div class="figure fig-'+size+'" style="width:;">\
                        <a class="fancybox" href="http://od4j70p7r.bkt.clouddn.com/'+ data[i] +'" title="" data-fancybox-group="" target="_blank" rel="external">\
                            <img class="fig-img" src="http://od4j70p7r.bkt.clouddn.com/'+ data[i] +'-mini" alt="">\
                        </a>\
                    </div>'
            }

            $("#mainGallery").append(li);
            // $("#mainGallery").lazyload();
            $("a[rel=external]").fancybox();
        },

        scroll: function (data) {
            var that = this;
            $(window).scroll(function() {
                var windowPageYOffset = window.pageYOffset;
                var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                var sensitivity = 0;

                var offsetTop = $("#mainGallery").offset().top + $("#mainGallery").height();

                if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                    that.render(++that.page, data);
                }
            })
        }
    }
    index.init()
}(jQuery))