function Tools(){}
/**
 *  获取查询参数
 *  @return args {key: value, ....}  查询参数键值对
 */
Tools.prototype.getArgs = function(){
    var args = [];
    var qs = location.search.length > 0 ? location.search.substring(1) : '';
    var items = qs.split('&');
    var item = null, name = null, value = null;
    for(var i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = item[0], value = item[1];

        args[name] = value;
    }

    return args;
}
/* 获取url协议 */
Tools.prototype.getProtocol = function(){
    return window.location.protocol;
}
/* 获取url端口 */
Tools.prototype.getPort = function(){
    return window.location.port;
}
/* 获取主机（协议+端口） */
Tools.prototype.getHost = function(){
    return window.location.host;
}
/* 获取计算后样式 */
Tools.prototype.getStyle = function(dom, style, pseudo){
    if(typeof dom == 'string'){
        dom = document.querySelector(dom);
    }
    var styles = window.getComputedStyle(dom, pseudo);
    return styles.getPropertyValue(style);
}
/* 根据nodelist获取里面的图片 */
Tools.prototype.getStyleImgs = function(elements, imgs, container) {
    var ctx = this,
        bgReg = /url\((.+?)\)/i,
        bgsReg = new RegExp(bgReg.source, 'ig'),
        htmlTemp = [],
        elements1,
        match,
        bg;

    Array.prototype.forEach.bind(elements, function(e){
        bg = ctx.getStyle(e, 'background-image');

        if(bg && (match = bg.match(bgsReg))) {
            match.forEach(function(b, _){
                b = b.match(bgReg);
                b && b[1] && imgs.push(b[1]);
            });
        }
        if(e.nodeName.toLowerCase() == 'img'){
            imgs.push(e.src);
        }
        if(e.nodeName.toLowerCase() == 'script' && e.type == 'text/html'){
            container.innerHTML = e.innerHTML;
            elements1 = container.getElementsByTagName('*');
            tools.getStyleImgs(elements1, imgs);
            container.innerHTML = '';
        }
    })();
    elements1 = bg = bgsReg = bgReg = match = elements = ctx = container = htmlTemp = null;
    return this;
}
/**
 *  图片预加载
 *  @param  imgs [imgUrl, ...]  图片路径数组
 *  @return 延迟对象Promise
 */
Tools.prototype.loadImg = function(imgs){
    return $.Deferred(function(){
        var dtd = this,
            index = 0;

        if(!imgs || !imgs.length){
            dtd.reject();
            return;
        }

        var img = new Image();

        img.onerror = img.onload = function(){
            next();
        }
        function next() {
            if(++ index < imgs.length) {
                run();
            } else {
                imgs = img = run = null;
                dtd.resolve();
            }
        }

        run();

        function run() {
            // 避免重名BUG
            if(index && imgs[index] === imgs[index - 1]){
                next();
                return;
            }
            var nowSrc = imgs[index];
            var start = nowSrc.indexOf('image/');
            if(start != -1){
                nowSrc = nowSrc.substring(start);
            }
            nowSrc = nowSrc.replace(/"|'$/, '');
            img.src = nowSrc;

            var percent = Math.round(((index + 1) / imgs.length) * 100);
            dtd.notify(percent);
        }
    });
}
/**
 *  设置显示错误的界面
 *  @param errorTip 显示错误的jquery元素或string
 */
Tools.prototype.setErrorTipPanel = function(errorTip){
    if(typeof errorTip == 'string') errorTip = $(errorTip);
    this.errorTipPanel = errorTip;

    return this;
}
/**
 *  显示错误
 *  @param errorMsg 错误信息
 */
Tools.prototype.errorTip = function(errorMsg){
    if(!this.errorTipPanel){
        return false;
    }
    var errorTipPanel = this.errorTipPanel;
    errorTipPanel.stop().show().find('span').html('<i>!</i>' + errorMsg);
    clearTimeout(this.errorHideTimer);
    this.errorHideTimer = setTimeout(function(){
        errorTipPanel.stop().hide();
    }, 3500);

    return this;
}
/**
 *  获取元素内容区域的宽高
 *  @param e DOM元素
 *  @return {h: 元素内容区域高, w: 元素内容区域宽}
 */
Tools.prototype.clientSize = function(e){
    var elem;
    if(!e){
        if(document.documentElement && document.documentElement.clientHeight) {
            elem = document.documentElement;
        }
        else if(document.body) {
            elem = document.body;
        }
    } else if('string' == typeof e) {
        elem = document.querySelector(e);
    } else {
        elem = e;
    }
    return {
        h: elem.clientHeight,
        w: elem.clientWidth
    };
}
/* 获取元素的滚动宽高 */
Tools.prototype.scrollSize = function(e){
    var elem;
    if(!e){
        return {
            h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
            w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth)
        }
    } else if('string' == typeof e) {
        elem = document.querySelector(e);
    } else {
        elem = e;
    }
    return {
        h: elem.scrollHeight,
        w: elem.scrollWidth
    };
}
/* 滚动条的位置 */
Tools.prototype.scrollPos = function(e){
    var elem;
    if(!e){
        if(document.documentElement && document.documentElement.scrollTop) {
            elem = document.documentElement;
        }
        else if(document.body) {
            elem = document.body;
        }
    } else if('string' == typeof e) {
        elem = document.querySelector(e);
    } else {
        elem = e;
    }
    return {
        t: elem.scrollTop,
        l: elem.scrollLeft
    };
}
/* 获取元素的偏移宽高 */
Tools.prototype.offsetSize = function(e){
    return {
        h: e.offsetHeight,
        w: e.offsetWidth
    }
}
/* 获取相对父元素的位置 */
Tools.prototype.offsetPos = function(e){
    var p = e.offsetParent,
        pt = e.offsetTop,
        pl = e.offsetLeft,
        cs = this.scrollSize(p),
        es = this.offsetSize(e);

    return {
        t: pt,
        l: pl,
        b: cs.h - pt - es.h,
        r: cs.w - pl - es.w
    }
}
/* 克隆对象 */
Tools.prototype.cloneObj = function(obj){
    if(obj == null){
        return null;
    } else if(obj instanceof Array){
        return obj.slice(0);
    }
    var props = Object.getOwnPropertyNames(obj),
        newObj = Object.create(Object.getPrototypeOf(obj));
    props.forEach(function(prop){
        Object.defineProperty(newObj, prop, Object.getOwnPropertyDescriptor(obj, prop));
    });
    return newObj;
}
/*
 比较两个对象的值是否相等
 @param o1 被比较的第一个对象
 @param o2 被比较的第二个对象
 @param skipFunction 是否跳过对象内的function（当两边都是function的时候）
 */
Tools.prototype.isEqualObj = function(o1, o2, skipFunction){
    var type, isArray, i,
        _checkObj = function(o1, o2){
            var keys, k1, k2, d1, d2;

            k1 = Object.getOwnPropertyNames(o1),
                k2 = Object.getOwnPropertyNames(o2);

            if(k1.length !== k2.length){
                return false;
            }
            keys = this.unique(k1.concat(k2));
            if(keys.length !== k1.length){
                return false;
            }
            for (i = 0; i < keys.length; i ++)
            {
                d1 = Object.getOwnPropertyDescriptor(o1, keys[i]),
                    d2 = Object.getOwnPropertyDescriptor(o2, keys[i]);

                if(d1 && !d2 || !d1 && d2){
                    return false;
                }
                if(!d1 && !d2 || skipFunction && typeof d1.value === 'function' && typeof d2.value === 'function'){
                    continue;
                }
                if(!this.isEqualObj(d1.value, d2.value, skipFunction)){
                    return false;
                }
            }

            return true;
        };


    if(o1 === o2){
        return true;
    }
    if(o1 === null && o2 !== null || o1 !== null && o2 === null){
        return false;
    }
    if(o1 === undefined && o2 !== undefined || o1 !== undefined && o2 === undefined){
        return false;
    }

    type = typeof o1,
        isArray = Array.isArray(o1);

    if(type !== typeof o2){
        return false;
    }
    if(isArray && !Array.isArray(o2) || !isArray && Array.isArray(o2)){
        return false;
    } else if(isArray){
        if(o1.length != o2.length){
            return false;
        }
        for (i = 0; i < o1.length; i ++)
        {
            if(!this.isEqualObj(o1[i], o2[i], skipFunction)){
                return false;
            }
        }

        return true;
    } else if(type == 'object'){
        if(o1 === null && o2 === null){
            return true;
        }
        if(o1.prototype && !o2.prototype || !o1.prototype && o2.prototype){
            return false;
        }

        if(!_checkObj.bind(this)(o1, o2)){
            return false;
        }

        if(o1.prototype){
            if(o1.prototype === o2.prototype){
                return true;
            }

            if(!_checkObj.bind(this)(o1.prototype, o2.prototype)){
                return false;
            }
        }

        return true;
    }

    return o1 === o2;
}
/*
 合并对象
 @param tar 目标对象
 @param src 被复制对象或对象数组
 @param deep 是否进行深度复制以及合并原型 true：深度复制且不复制原型 1：深度复制且合并原型 0：不深度复制且合并原型
 */
Tools.prototype.combineObj = function(tar, src, deep){
    var ctx = this, keys;

    if(Array.isArray(src)){
        src.forEach(function(src, _){
            ctx.combineObj(tar, src, deep);
        });

        return tar;
    }

    keys = Object.getOwnPropertyNames(src);
    keys.forEach(function(key, _){
        var desSrc = Object.getOwnPropertyDescriptor(src, key),
            desTar = Object.getOwnPropertyDescriptor(tar, key);

        if(!desTar || !deep || typeof desSrc.value != 'object'){
            Object.defineProperty(tar, key, desSrc);
        } else {
            ctx.combineObj(desTar.value, desSrc.value, deep);
        }
    });
    if((deep === 1 || deep === 0) && src.prototype){
        if(!tar.prototype){
            tar.prototype = src.prototype;
        } else {
            this.combineObj(tar.prototype, src.prototype, deep);
        }
    }

    return tar;
}
/* 获取touchEvent */
Tools.prototype.getTouchEvent = function(e){
    var events;
    if (e.changedTouches) events = e.changedTouches[0];
    else events = e.originalEvent.touches[0];
    return events;
}
/* 滑动 */
Tools.prototype.slide = function(dom, fn_l, fn_r, fn_t, fn_b, sensitive){
    var pageTouch = false,
        pageTouchX,
        pageTouchY,
        left = false,
        right = false,
        top = false,
        bottom = false,
        ctx = this;

    var distance = sensitive != undefined ? (sensitive < 0 ? 0 : (sensitive > 0 ? '2' : '.5')) : 0;

    dom.addEventListener('touchstart', function(e){
        e.preventDefault();
        e.stopPropagation();

        if(top || bottom || left || right){
            return false;
        }

        pageTouch = true;
    }, false);
    dom.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(!pageTouch){
            return false;
        }

        var e = ctx.getTouchEvent(e);

        var moveX = e.pageX - pageTouchX,
            moveY = e.pageY - pageTouchY;

        if(moveX > distance){
            // 右
            right = true;
            left = false;
        } else if(moveX < - distance){
            // 左
            left = true;
            right = false;
        } else {
            left = false;
            right = false;
        }

        if(moveY > distance){
            // 下
            bottom = true;
            top = false;
        } else if(moveY < - distance){
            // 上
            top = true;
            bottom = false;
        } else {
            top = false;
            bottom = false;
        }

        if(top || bottom || left || right){
            // 确定最终的运动方向
            if(Math.abs(moveX) > Math.abs(moveY)){
                top = false;
                bottom = false;
            } else {
                right = false;
                left = false;
            }

            pageTouch = false;

            return;
        }

        pageTouchX = e.pageX,
            pageTouchY = e.pageY;
    }, false)
    dom.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();

        pageTouch = false;
        pageTouchX = pageTouchY = undefined;

        if(left && typeof fn_l == 'function') {
            fn_l.bind(dom, Array.prototype.slice.bind(arguments)())();
        } else if(right && typeof fn_r == 'function'){
            fn_r.bind(dom, Array.prototype.slice.bind(arguments)())();
        } else if(top && typeof fn_t == 'function') {
            fn_t.bind(dom, Array.prototype.slice.bind(arguments)())();
        } else if(bottom && typeof fn_b == 'function'){
            fn_b.bind(dom, Array.prototype.slice.bind(arguments)())();
        }

        top = false,
            bottom = false,
            right = false,
            left = false;
    }, false);

    return this;
}
Tools.prototype.slideHorizontal = function(dom, fn_l, fn_r, sensitive){
    var pageTouch = false,
        pageTouchX,
        left = false,
        right = false,
        ctx = this;

    var distance = sensitive != undefined ? (sensitive < 0 ? 0 : (sensitive > 0 ? this.getComputedSize('.4rem') : this.getComputedSize('.2rem'))) : 0;

    dom.addEventListener('touchstart', function(e){
        e.preventDefault();
        e.stopPropagation();

        pageTouch = true;
    }, false);
    dom.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(!pageTouch){
            return false;
        }

        var e = ctx.getTouchEvent(e);

        if(!pageTouchX) {
            pageTouchX = e.pageX;
            return;
        }

        var moveX = e.pageX - pageTouchX;
        pageTouchX = e.pageX;

        if(moveX > distance){
            // 右
            right = true;
            left = false;
        } else if(moveX < - distance){
            // 左
            left = true;
            right = false;
        } else {
            left = false;
            right = false;
        }
    }, false)
    dom.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();

        pageTouch = false;
        pageTouchX = null;

        if(left && typeof fn_l == 'function') {
            fn_l.bind(dom, Array.prototype.slice.bind(arguments)())();
        } else if(right && typeof fn_r == 'function'){
            fn_r.bind(dom, Array.prototype.slice.bind(arguments)())();
        }

        right = false,
            left = false;
    }, false);

    return this;
}
Tools.prototype.slideVertical = function(dom, fn_t, fn_b, sensitive){
    var pageTouch = false,
        pageTouchY,
        top = false,
        bottom = false,
        ctx = this;

    var distance = sensitive != undefined ? (sensitive < 0 ? 0 : (sensitive > 0 ? this.getComputedSize('.4rem') : this.getComputedSize('.2rem'))) : 0;

    dom.addEventListener('touchstart', function(e){
        e.preventDefault();
        e.stopPropagation();

        pageTouch = true;
    }, false);
    dom.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(!pageTouch){
            return false;
        }

        var e = ctx.getTouchEvent(e);

        if(!pageTouchY) {
            pageTouchY = e.pageY;
            return;
        }

        var moveY = e.pageY - pageTouchY;
        pageTouchY = e.pageY;

        if(moveY > distance){
            // 下
            bottom = true;
            top = false;
        } else if(moveY < - distance){
            // 上
            top = true;
            bottom = false;
        } else {
            top = false;
            bottom = false;
        }
    }, false)
    dom.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();

        pageTouch = false;
        pageTouchY = null;

        if(top && typeof fn_t == 'function') {
            fn_t.bind(dom, Array.prototype.slice.bind(arguments)())();
        } else if(bottom && typeof fn_b == 'function'){
            fn_b.bind(dom, Array.prototype.slice.bind(arguments)())();
        }

        bottom = false,
            top = false;
    }, false);

    return this;
}
/* 根据rem获取对应的像素 */
Tools.prototype.getComputedSize = function(rem){
    if(!this.bw) this.bw = this.rem2px();

    rem = (rem + '').toLowerCase();
    if(rem.lastIndexOf('rem') != -1){
        rem = parseFloat(rem);
        return Math.round(rem * this.bw);
    }
    rem = parseFloat(rem);
    return Math.round(rem);
}
/* 获取1rem对应的像素 */
Tools.prototype.rem2px = function(){
    return parseFloat(document.documentElement.style.fontSize);
}
/* 获取1像素对应的rem */
Tools.prototype.px2rem = function(){
    var bw = this.getComputedSize('1rem');
    return 1 / bw;
}
Tools.prototype.clearBw = function(){
    this.bw = null;
    return this;
}
Tools.prototype.getNumsByNum = function(num){
    return (num + '').split('');
}
Tools.prototype.aGet = function(data, sFn, ajaxBfFn, ajaxCpFn){
    return this.ajax(data, 'get', sFn, ajaxBfFn, ajaxCpFn);
}
Tools.prototype.aPost = function(data, sFn, ajaxBfFn, ajaxCpFn){
    return this.ajax(data, 'post', sFn, ajaxBfFn, ajaxCpFn);
}
Tools.prototype.ajax = function(data, method, sFn, ajaxBfFn, ajaxCpFn){
    var ctx = this;

    var noErrorTip = data.noErrorTip;

    data = this.addAjaxData(data);

    if(!data.ajaxUrl && data.ajaxKey){
        data.ajaxUrl = tools.getUrlByKey(data.ajaxKey);
    }

    if(this.debug){
        alert('请求参数：\n' + JSON.stringify(data, null, 4));
    }
    if(this.simAjax || true){
        console.debug('%c --------------------------------------------', 'color: #ff0000');
        console.debug('%c 请求参数：\n' + JSON.stringify(data, null, 4), 'color: #C86019');
    }

    if(this.simAjax && !data.simKey){
        data.simKey = data.ajaxUrl.replace(/.+\/(.+)/, '$1');
    }

    return $.Deferred(function(){
        var defer = this;

        (ctx.simAjax ?
            ctx.simAjax.ajax({
                data: data,
                beforeSend: ajaxBfFn || (!data.noAjaxReaction ? ctx.ajaxBfFn : null),
                complete: ajaxCpFn || (!data.noAjaxReaction ? ctx.ajaxCpFn : null)
            }) :
            $.ajax({
                url: ctx.baseUrl + (data.ajaxUrl || ''), // ajaxUrl为请求后缀
                data: data,
                type: method || 'get',
                dataType: 'json',
                beforeSend: ajaxBfFn || (!data.noAjaxReaction ? ctx.ajaxBfFn : null),
                complete: ajaxCpFn || (!data.noAjaxReaction ? ctx.ajaxCpFn : null),
            }))
            .then(function(data){
                if(ctx.debug){
                    // 打印回复结果信息
                    alert(JSON.stringify(data, null, 4));
                }
                if(ctx.simAjax || true){
                    console.debug('%c 回复：\n' + JSON.stringify(data, null, 4), 'color: #179DC1');
                    console.debug('%c --------------------------------------------', 'color: #ff0000');
                }

                setTimeout(function(){
                    if(data.model){
                        var temp = data;
                        data = data.model;
                        data.model = temp.model;
                    }
                    (typeof sFn == 'function') && sFn(data);
                    defer.resolve(data);
                }, 200);
            }, function(reason){
                if(ctx.simAjax){
                    alert(reason);
                }
                if(!noErrorTip){
                    ctx.errorTip(data.ajaxErrorTip || '服务器忙，请稍后再试！');
                }
                defer.reject(reason);
            });
    });

}
Tools.prototype.addAjaxData = function(data){
    data = data || {};
    for(var i in this.basicData) {
        data[i] = this.basicData[i];
    }
    return data;
}
Tools.prototype.setAjaxBasicData = function(baseUrl, data){
    this.baseUrl = baseUrl,
        this.basicData = data || {};
    return this;
}
Tools.prototype.addAjaxBasicData = function(data){
    for(var i in data) {
        this.basicData[i] = data[i];
    }
    return this;
}
Tools.prototype.setUrlByKey = function(key, url){
    if(arguments.length == 1){
        for (var k in key)
        {
            this.setUrlByKey(k, key[k]);
        }
        return this;
    }
    if(!this.ajaxUrlMap){
        this.ajaxUrlMap = {};
    }

    this.ajaxUrlMap[key] = url;

    return this;
}
Tools.prototype.getUrlByKey = function(key){
    return (this.ajaxUrlMap || {})[key];
}
Tools.prototype.setDebugMode = function(debug){
    this.debug = debug;
    if(debug){
        window.onerror = function(){
            alert('控制台报错：/n' + JSON.stringify(arguments, null, 4));
        }
    }
    return this;
}
/**
 模拟ajax请求
 */
Tools.prototype.setSimAjax = function(simAjax){
    this.simAjax = simAjax;
    return this;
}
/**
 设置ajax开始和结束的方法
 */
Tools.prototype.setAjaxExtraFunction = function(bfFn, afFn){
    this.ajaxBfFn = bfFn,
        this.ajaxCpFn = afFn;

    return this;
}
/**
 滚动加载更多
 */
Tools.prototype.scrollCallBack = function(callBack, dom){
    dom = dom || window;
    var scrollFn = function() {
        var scrollTop = $(this).scrollTop(),
            scrollHeight = $(document).height(),
            windowHeight = $(this).height();

        (scrollTop + windowHeight >= scrollHeight * 4 / 5) && callBack();
    }
    $(dom).on('scroll.scrollCallBack', scrollFn);

    return this;
}
/**
 取消滚动加载更多
 */
Tools.prototype.offScrollCallBack = function(dom){
    dom = dom || window;
    $(dom).off('.scrollCallBack');

    return this;
}
/* 数组升序 */
Tools.prototype.ascendingArray = function(arr){
    return arr.sort(function(a, b){
        return 	a - b;
    });
}
/* 数组去重 */
Tools.prototype.unique = function(arr){
    arr.sort(function(i1, i2){
        if(i1 === i2){
            return 0;
        } else {
            return 1;
        }
    });

    for(var i = 1; i < arr.length; i ++){
        if(arr[i] === arr[i - 1]){
            arr.splice(i, 1);
            i--;
        }
    }

    return arr;
}
/* 播放音乐 */
Tools.prototype.audio = function(src, loop, volume){
    var audio = new Audio();
    audio.setAttribute('src', src);
    audio.loop = loop || false;
    audio.volume = volume || 1;
    audio.preload = 'auto';
    audio.pause();

    return audio;
}
/* 检测图片 */
Tools.prototype.imgCheck = function(file){
    return $.Deferred(function(){
        var files = file.files,
            dtd = this,
            img = new Image();

        img.onload = function(e) {
            if(!window.FileReader)
                window.URL.revokeObjectURL(img.src); //图片加载后，释放object URL

            dtd.resolve(img);
        }
        img.onerror = function(e){
            dtd.reject();
        }
        if(window.FileReader){
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function(e){
                img.src = this.result;
            }
        } else if(window.URL){
            img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
        }
    });
}
/* form序列化 */
Tools.prototype.serialize = function(form){
    var serializeObj = {};

    Array.prototype.forEach.bind(form.querySelectorAll('input, textarea, select'))(function(e, index){
        var value;
        if(e.nodeName == 'INPUT'){
            if(e.type == 'checkbox'){
                var name = e.name;
                if(serializeObj[name]){
                    return true;
                }

                value = '';
                Array.prototype.forEach.bind(form.querySelectorAll('input[type=checkbox][name=' + name + ']'))(function(c, index){
                    if(c.checked){
                        value += ',' + c.value
                    }
                });
                value = value.substring(1);
            } else if(e.type == 'radio'){
                if(e.checked == false){
                    return true;
                } else {
                    value = e.value;
                }
            } else if(e.type == 'reset' || e.type == 'submit' || e.type == 'button'){
                return true;
            } else {
                value = e.value;
            }
        } else if(e.nodeName == 'TEXTAREA'){
            value = e.value;
        } else if(e.nodeName == 'SELECT'){
            value = '';
            Array.prototype.forEach.bind(e.querySelectorAll('option'))(function(o, i){
                if(o.selected){
                    value += ',' + o.value
                }
            });
            value = value.substring(1);
        }
        serializeObj[e.name] = value;
    });

    return serializeObj;
}
/* 相关元素 */
Tools.prototype.linkTarget = (function(){
    var target;

    return {
        link: function($dom){
            typeof $d == 'string' && ($d = $($d));
            target = $dom;
        },
        unlink: function(){
            target = null;
        },
        fire: function(fn, isKeep){
            fn.bind(target)();
            !isKeep && unlink();
        },
        linking: function(fn){
            target = fn;
        },
        unlinking: function(){
            this.unlink();
        },
        firing: function(isKeep){
            typeof target == 'function' && (target(), !isKeep && (target = null));
        }
    }
})();
Tools.prototype.linkTargets = (function(){
    var targets = [],
        tid = 0;

    return {
        link: function($dom){
            typeof $d == 'string' && ($d = $($d));
            targets.push($dom.data('tid', tid ++));

            return tid;
        },
        unlink: function(tid){
            for (var i = 0; i < targets.length; i ++)
            {
                if (targets[i].data('tid') == tid)
                {
                    targets.splice(i, 1);
                    break;
                }
            }
        },
        unlinkAll: function(){
            targets = [],
                tid = 0;
        },
        fire: function(fn, tid, isKeep){
            for (var i = 0; i < targets.length; i ++)
            {
                if (targets[i].data('tid') == tid)
                {
                    fn.bind(targets[i])();
                    !isKeep && unlink(tid);
                    break;
                }
            }
        }
    }
})();
/* 检测手机号 */
Tools.prototype.mobileCheck = (function(){
    /*
     中国移动：134、135、136、137、138、139、147、150、151、152、157(TD)、158、159、178、182、183、184、187、188、1705（虚拟运营商移动号段）
     中国联通：130、131、132、145(数据卡号段)、155、156、176、185、186、1709（虚拟运营商联通号段）
     中国电信：133、134、153、177、180、181、189、1700（虚拟运营商电信号段）
     */
    var telReg = new RegExp('^(?:130|131|132|133|134|135|136|137|138|139|145|147|150|151|152|153|155|156|157|158|159|1700|1705|1709|176|177|178|180|181|182|183|184|185|186|187|188|189)\\d{8}$'),
        simpleTelReg = /^1\d{10}$/;  // 简易检测

    return function(mobile, easy){
        return (easy ? mobile.match(simpleTelReg) : mobile.match(telReg)) || this.simAjax && mobile === '/';
    }
})();
/* 
 产生随机数
 @param max 上限（不可达）number
 @param min 下限（可达）number
 @param noFix 是否不取整 boolean
 */
Tools.prototype.rand = function(max, min, noFix){
    if(arguments.length == 0){
        return Math.random();
    }
    typeof min === 'boolean' && (noFix = min, min = 0);
    min = min || 0;
    if(max > min){
        max = max ^ min;
        min = min ^ max;
        max = max ^ min;
    }

    var rand = Math.random() * (max - min) + min;

    return noFix ? rand : rand >>> 0;
}
/* 
 比较两个时间大小
 @return d1,d2相等（0） d1早于d2（-1） d1晚于d2（1）
 */
Tools.prototype.timeCompare = function(d1, d2){
    d1 = Date.parse(d1 instanceof Date ? d1.toJSON() : d1),
        d2 = Date.parse(d2 instanceof Date ? d2.toJSON() : d2);

    if(d1 - d2 == 0){
        // 相等
        return 0;
    }
    if(d1 - d2 < 0){
        // d1早于d2
        return -1;
    }
    if(d1 - d2 > 0){
        // d1晚于d2
        return 1;
    }
}
/* 
 日期格式化
 @param date 传入时间
 @param format 需要的格式 如：YYYY-MM-DD hh:mm:ss
 */
Tools.prototype.dateFormat = (function(){
    var formatReg = new RegExp('^(?:((?:YY)?YY)([^YMDhms])?)?(MM)?(?:([^YMDhms])?(DD))?(?=(?:(?:(\\s)?(?:(hh)([^YMDhms])?)?(mm)?(?:([^YMDhms])?(ss))?)|)$)');

    return function(date, format){
        var dateMatcher,
            dateFormatArr = [];

        if(arguments.length == 0) {
            date = new Date();
        }

        if(date && typeof date === 'string' && (dateMatcher = date.match(formatReg))){
            format = date,
                date = new Date();
        }

        format = format || 'YYYY-MM-DD hh:mm:ss';
        (typeof date === 'string' || typeof date === 'number') && (date = new Date(date));

        /*
         1 (YY)YY
         2 -
         3 MM
         4 -
         5 DD
         6
         7 hh
         8 :
         9 mm
         10 :
         11 ss
         */
        !dateMatcher && (dateMatcher = format.match(formatReg));
        if(isNaN(date.getTime())){
            throw new TypeError('非法的时间！');
        }

        if(!dateMatcher){
            throw new TypeError(format + '：时间格式无法匹配！请输入合法的时间格式如：YYYY-MM-DD hh:mm:ss');
        }

        dateMatcher[1] && dateFormatArr.push(date.getFullYear());
        dateMatcher[2] && dateFormatArr.push(dateMatcher[2]);
        dateMatcher[3] && dateFormatArr.push('0' + (date.getMonth() + 1));
        dateMatcher[4] && dateFormatArr.push(dateMatcher[4]);
        dateMatcher[5] && dateFormatArr.push('0' + date.getDate());
        dateMatcher[6] && dateFormatArr.push(dateMatcher[6]);
        dateMatcher[7] && dateFormatArr.push('0' + date.getHours());
        dateMatcher[8] && dateFormatArr.push(dateMatcher[8]);
        dateMatcher[9] && dateFormatArr.push('0' + date.getMinutes());
        dateMatcher[10] && dateFormatArr.push(dateMatcher[10]);
        dateMatcher[11] && dateFormatArr.push('0' + date.getSeconds());

        return dateFormatArr.map(function(v, i){
            if(i == 0 && dateMatcher[1] == 'YY'){
                return v % 100;
            }
            return v.length == 3 ? v.substring(1, v.length) : v;
        }).join('');
    }
})();
/* 模拟进度 */