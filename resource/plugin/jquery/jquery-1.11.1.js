/*!
 * jQuery JavaScript Library v1.11.1
// jQuery JavaScript库v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 // 内含Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 // 版权 2005,2014 jQuery基金会，股份有限公司和其它贡献者
 // 基于MIT证书发布
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 // 日期：2014-05-01 17:42
 */
(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		// 针对CommonJS或类似CommonJS提供了一个合适的window对象的环境，执行工厂方法获得jQuery
		// 针对window对象中没有document的环境（例如Node.js），用module.exports暴露一个生成jQuery的工厂方法
		// 用户需要传入一个真实的window对象
		// 例如var jQuery = require("jquery")(window);
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				// window中没有document会抛出一个错误
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
// 如果window尚未定义就传入this
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
// 不能这样做因为几款包括ASP.NET在内的app通过arguments.caller.callee追踪堆栈，而火狐通过‘严格模式’调用链追踪会挂掉
// 支持：火狐18+

var deletedIds = [];

var slice = deletedIds.slice;  // 可以在具有length属性的类数组对象上使用对象冒充来使用数组的slice方法，例如slice.call(obj)

var concat = deletedIds.concat;  // 可以在具有length属性的类数组对象上使用对象冒充来使用数组的concat方法

var push = deletedIds.push;  // 可以在具有length属性的类数组对象上使用对象冒充来使用数组的push方法

var indexOf = deletedIds.indexOf;  // 可以在具有length属性的类数组对象上使用对象冒充来使用数组的indexOf方法

var class2type = {};  // 存放对象真实类型的对象

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;  // 对象本身是否具有某个属性而不是原型链上

var support = {};  // 存放浏览器兼容性的对象



var
	version = "1.11.1",  // 版本号

	// Define a local copy of jQuery
	/*
		定义一个私有的jQuery副本
		@param {String|...} selector 选择器字符串等
		@param {Element|Document} context 上下文元素
	*/
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		// jQuery实际的构造函数其实是jQuery.prototype.init
		// 需要init如果jQuery被调用（如果没有包含允许抛出错误）
		// 创建jQuery实例不用加关键字new
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	// 支持：Android<4.1, IE<9
	// 确保裁剪掉BOM和NBSP
	// 字符串首尾的空格
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	// 为驼峰式匹配短划线字符串
	rmsPrefix = /^-ms-/,  // -ms- IE专属前缀
	rdashAlpha = /-([\da-z])/gi, // 例如'-ms-transform'中的'-t'  转驼峰法时使用

	// Used by jQuery.camelCase as callback to replace()
	// 用于jQuery转驼峰式的回调，用在.replace()方法
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

// 此处表明，jQuery.fn就是jQuery.prototype
jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	// jQuery当前的版本
	jquery: version,

	// constructor指向jQuery
	constructor: jQuery,

	// Start with an empty selector
	// 开始于一个空选择器
	selector: "",

	// The default length of a jQuery object is 0
	// 默认length为0
	length: 0,

	// 把类数组对象转成数组
	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array 
	/*
		$().get
		返回当前jQuery实例中第num个匹配元素。当不传num返回所有匹配元素并以数组的形式返回
		@param {Number} num 获取第几个元素
	*/
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			// 如果num小于0，就从后往前
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			// 返回所有元素在一个干净的数组
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	/*
		$().pushStack
		传入一个元素数组，把该数组的所有元素加入栈中，返回由这些匹配元素构成的新jQuery实例
		@param {Array} elems 需要入栈的元素数组
		@returns {jQuery} ret 匹配元素生成的新jQuery实例
	*/
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		// 创建一个新的匹配元素的jQuery实例
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		// 添加旧实例的指向
		ret.prevObject = this;  // 指定新对象的前一个对象是当前对象
		ret.context = this.context;  // 指定新对象的前一个context是当前context

		// Return the newly-formed element set
		// 返回新的jQuery实例（新jQuery实例中不包括原来的匹配元素）
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	/*
		$().each
		遍历匹配集合中的每一个元素执行回调（参数args是一个数组，但仅供内部使用）
	*/
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},
	/*
		$().map
		传入一个回调，通过该回调对当前实例中的每一个匹配元素进行改造。并返回匹配这些改造元素的新jQuery实例
		@param {Function} callback 回调
		@returns {jQuery} 新的jQuery实例
	*/
	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},
	/*
		$().slice
		根据传入的开始到结束位置，截取并返回新的jQuery实例
	*/
	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},
	/*
		$().first
		由当前实例匹配的第1个元素构成的jQuery实例
	*/
	first: function() {
		return this.eq( 0 );
	},
	/*
		$().last
		由当前实例匹配的最后1个元素构成的jQuery实例
	*/
	last: function() {
		return this.eq( -1 );
	},
	/*
		$().eq
		由当前实例匹配的最后i个元素构成的jQuery实例
		@param {Number} i 索引
	*/
	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );  // i可以传入负数，则从后往前数
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );  // 如果索引值非法将返回空jQuery实例（length = 0）
	},
	/**
		$().end
		返回与之相关的此前的一个jQuery实例，如果为空，则返回空jQuery实例
	*/
	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	// 以下类数组方法仅供内部使用
	// 具备数组方法行为，不像jQuery方法
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};
/*
	jQuery.extend扩展jQuery对象本身，即jQuery.XXX
	jQuery.fn.extend扩展jQuery原型，即jQuery.prototype.XXX
*/
jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1, // i的目的是指向被拷贝对象的参数位置
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	// 是否深度扩展
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		// 跳过布尔值的参数
		target = arguments[ i ] || {};
		i++; // 多了个布尔值参数，指针往后移一位
	}

	// Handle case when target is a string or something (possible in deep copy)
	// 处理target是字符串或者其他什么的情况（在深度拷贝会出现）
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {  // target必须是object或function
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	// 如果只传入一个参数就扩展jQuery本身
	if ( i === length ) {  
		target = this;
		i--; // 没有传target，指针往前移一位
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		// 只处理非null、非undefined的值
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			// 扩展基本对象
			for ( name in options ) {
				src = target[ name ];  // 原来target中的属性
				copy = options[ name ]; // 对应被拷贝的属性

				// Prevent never-ending loop
				// 防止无休止的循环
				if ( target === copy ) {  // 如果原来等于现在，就不动作
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				// 被拷贝对象是一个纯粹对象或者数组并且指定了深度扩展
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					// 如果被拷贝对象是一个数组
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];  // 如果源对象不是数组，指定一个数组
					// 被拷贝对象对象是一个纯粹对象
					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};  // 如果源对象不是纯粹对象，指定一个纯粹对象
					}

					// Never move original objects, clone them
					// 不要去动原来的对象，克隆它们
					target[ name ] = jQuery.extend( deep, clone, copy );  // 针对deep的情况递归扩展属性内部深入的对象或数组

				// Don't bring in undefined values
				// 不要带来undefined值
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	// 返回被扩展的对象
	return target;
};
// jQuery.extend扩展jQuery本身的属性
jQuery.extend({
	// Unique for each copy of jQuery on the page
	// 本属性对页面的所有jQuery拷贝具有唯一性
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	// 假定jQuery是ready状态而不管ready模块
	isReady: true,

	/**
		$.error
		jQuery抛出错误
		@param {String} msg 错误信息
	*/
	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},  // 一个空函数

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	// 检测对象是不是一个方法
	// 自从1.3版本，DOM方法以及像alert等的方法不再被支持，在IE中返回false
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	// 检测对象是不是一个数组
	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// 检测对象是不是window
	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		// JSHint ，发现错误和潜在问题的社区驱动的工具
		return obj != null && obj == obj.window;
	},

	// 检测对象是不是数字
	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// parseFloat在转一些非数字的时候误报（例如null|true|false|""）
		// 但在转一些数字开头的字符串的时候曲解，特别是十六进制（"0x..."）
		// 作减法强制无穷大为NaN
		// 不懂！！！
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	// 检测对象是不是空对象
	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// 检测对象是不是纯粹对象（通过 "{}" 或者 "new Object" 创建的）
	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		// 首先必须是Object
		// 由于IE的原因，我们同样需要检查constructor属性的存在
		// 当然，保证DOM节点或者window对象不能通过
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			// 对象obj的属性constructor是非继承属性。默认情况下，属性constructor继承自构造函数的原型对象。如果属性constructor是非继承属性，说明该属性已经在自定义构造函数中被覆盖
			// 对象obj的原型对象中没有属性isPrototypeOf。属性isPrototypeOf是Object原型对象的特有属性，如果对象obj的原型对象中没有，说明不是由构造函数Object()创建，而是由自定义构造函数创建
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			// IE8,9会在某些宿主对象上抛一个异常
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		// 支持：IE<9
		// 处理迭代继承的属性先于本身的属性的情况
		// 如果自有属性在后头
		if ( support.ownLast ) {
			for ( key in obj ) {
				// 只会检测第一个对象，如果是继承属性返回'假'，如果是自己的属性，返回'真'；由于迭代是先继承属性，故只要第一个属性是自己的属性，后面的属性皆是
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		// 迭代自有属性先于继承属性的情况
		// 自有属性首先必须是可枚举的，只要最后一个属性是自有的，则所有属性都是自有的
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	// 返回对象的类型
	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";  // 如果是null，返回"null"
		}
		// 如果是基本数据类型，直接用typeof obj，如果是object或者function，用class2type对象返回，没有对应的返回'object'
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	// 在全局context中解析一段script字符串
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			// 在IE中用execScript
			// 使用匿名函数让context指向window而不是jQuery在火狐
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	// 把连接符的属性名变成驼峰式写法（例如：data-foo => dataFoo）
	// 把IE专属属性前缀'-ms-'中的最前面一个'-'去掉，用于css和data模块
	// 微软搞忘了把这个'-'去掉
	camelCase: function( string ) {
		// rmsPrefix = /^-ms-/,  // -ms- IE专属前缀
		// rdashAlpha = /-([\da-z])/gi,
		/*
			fcamelCase = function( all, letter ) {
				return letter.toUpperCase();
			};
		*/
		// 执行结果：'-ms-transform' => 'msTransform'
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	// 判断元素的nodeName是不是给定的name
	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	// 遍历执行回调方法
	// args只供内部方法使用
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		// 传入了args的情况
		if ( args ) {
			// 数组和类数用for循环
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );  // 有args时，对象冒充用apply，因为args是数组
					// 如果callback返回了false 退出循环
					if ( value === false ) {
						break;
					}
				}
			} else {
				// 对象用for...in循环
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );
					// 如果callback返回了false 退出循环
					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		// 未传入args的情况
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );  // 无args时，对象冒充用call

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	// 支持：Android<4.1, IE<9
	// 清除字符串前后的空格
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	/**
		$.makeArray
		根据数组或类数组arr创建数组
		@param {Array|ArrayLike|...} arr 源
		@param {Array} results 目标数组（仅供内部使用）
	*/
	makeArray: function( arr, results ) {
		var ret = results || [];  // 目标数组

		if ( arr != null ) {
			// 如果arr是数组或类数组，就将其跟ret合并
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				// 直接将arr添加进ret这个数组或类数组中
				push.call( ret, arr );
			}
		}

		return ret;
	},

	/**
		$.inArray
		元素是否在数组中
		@param {...} elem 待查找元素
		@param {Array} arr 被查找数组
		@param {Number} i 从第几位开始查找
		@returns {Number} 如果找到返回元素的索引，否则-1
	*/
	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			// 如果支持Array.indexOf
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;  // 如果传入了参数i，就从i位开始查找，如果i为负数就倒着查找

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				// 松散数组（类数组）中的跳跃访问
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},
	/**
		$.merge
		把第B数组（类数组）中的每一个元素追加于A数组（类数组）
		@param {Array|ArrayLike} first 目标数组（类数组）
		@param {Array|ArrayLike} second 源数组（类数组）
		@returns {Array|ArrayLike} first 返回源数组（类数组）
	*/
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		// 支持：IE<9
		// 解决在类数组对象的length属性返回NaN的情况（如NodeLists）
		// NaN !== NaN
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}
		// 设置类数组对象的length属性
		first.length = i;

		return first;
	},
	/**
		$.grep
		筛选出符合条件的元素
		@param {Array|ArrayLike} elems 源数组（类数组）
		@param {Function} callback 校验回调函数
		@param {Boolean} invert 是否反转
		@returns {Array} matches 所有符合条件的元素数组
	*/
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;  // 是否不反转

		// Go through the array, only saving the items
		// that pass the validator function
		// 遍历数组，仅仅保存通过校验方法的成员
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );  // 未通过验证
			// 未通过验证 - 反转 | 通过验证 - 不反转
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	/**
		$.map
		通过回调对数组（类数组）或对象中的每一个成员进行改造，并返回由改造元素构成的新数组
		@param {Array|ArrayLike|Object} elems 源数组（类数组）或对象
		@param {Function} callback 回调函数
		@param {arg} 回调函数的第3个参数（仅供内部使用）
		@returns {Array} ret 由改造元素构成的新数组
	*/
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		// 遍历数组，把里面的每一个成员转变成新值
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );
				// 如果运行得到的结果不为null (null == undefined: true)
				if ( value != null ) {  
					ret.push( value );
				}
			}

		// Go through every key on the object,
		// 遍历对象的每一个键
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );
				// 如果运行得到的结果不为null (null == undefined: true)
				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		// 扁平化任意嵌套数组
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	// 对objects的一个全局GUID计数器
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	/**
		绑定一个方法的上下文，可以传入任意参数
		@param {Function|Object} fn 需要被代理的方法或由包含需要被代理的方法的执行上下文对象
		@param {Object|...|String} context 方法上下文或指定fn中需要被代理的方法的键名
		@returns {Function} proxy 返回生成的代理方法
	*/
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		// 如果context是一个字符串键名
		if ( typeof context === "string" ) {
			tmp = fn[ context ];  // 获取运行方法fn
			context = fn;  // context就是fn本身
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		// 快速检查目标是否可执行，按照常理此处应该抛出一个TypeError，但我们仅仅返回undefined
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		// 模拟绑定
		args = slice.call( arguments, 2 );  // 获取代理方法的参数数组。需要截掉fn和context
		// 代理函数
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		// 给该代理函数和fn一个相同的唯一性的guid，这样将来可以移除它
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// 返回当前系统时间
	now: function() {
		return +( new Date() ); // 返回类型：number
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	// 检测各种环境兼容性的对象
	// jQuery.support不是核心属性，但是其他地方需要用到它故需要它的存在
	support: support
});

// Populate the class2type map
// '类 - 类型'映射
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();  // 如class2type["[object Array]"] = array
});

// 判断一个对象是不是数组或类数组
function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	// 如果是function或window
	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}
	// 具有length属性的dom元素可以视为类数组
	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	// type是数组，或者obj具有length属性且length为0，或者obj具有length属性且length属性是一个数字且obj具有索引值为length - 1的元素
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 // Sizzle选择器引擎v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 // 版权 2013 jQuery基金会，股份有限公司和其它贡献者
 // 基于MIT证书发布
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 // 日期：2014-04-18
 */
(function( window ) {

var i,  // 用于循环变量
	support,  // 记录当前环境各种方法属性的兼容性
	Expr,  // Expr = Sizzle.selectors
	getText,  // 获取dom或者dom数组的纯文本内容
	isXML,  // 当前文档是否是XML文档
	tokenize,  // 对选择器字符串进行分词解析
	compile,  // 选择器编译函数
	select,  // 一个底层的选择器函数，基于compile
	outermostContext,  // 查询范围的最外层祖先元素
	sortInput,  // 对搜索结果进行排序去重的数组
	hasDuplicate,  // 结果数组是否有重复

	// Local document vars
	// 本地document变量
	setDocument,  // 检测当前document环境兼容性的方法
	document, // 此document只是一个变量
	docElem, // docElem = doc.documentElement 
	documentIsHTML,  // 是否是HTML文档
	rbuggyQSA,  // querySelectorAll的bug正则
	rbuggyMatches,  // document.documentElement.matches的bug正则
	matches, // docElem.matches
	contains,  // 检测两个对象是否具有包含关系的方法

	// Instance-specific data
	// 实例的具体数据
	expando = "sizzle" + -(new Date()), // 用于标记的扩展属性
	preferredDoc = window.document,  // 首选的document
	dirruns = 0,  // 用于缓存的标记。生命周期：每一轮完整的查询
	done = 0,  // 用于缓存标记。生命周期：下一个连接符之前
	classCache = createCache(),  // 保存过滤class函数的缓存
	tokenCache = createCache(),  // 分词器缓存
	compilerCache = createCache(), // 编译函数缓存
	// 为检测重复而进行的排序
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;  // 有重复
		}
		return 0;  // 返回零代表假设a、b相等
	},

	// General-purpose constants
	// 通用常量
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31, // 最大的负数-2147483648

	// Instance methods
	// 实例方法
	hasOwn = ({}).hasOwnProperty, // 对象本身是否具有某属性，而非原型上
	arr = [],
	pop = arr.pop,  // 从数组或类数组开头取出一个对象并返回该对象
	push_native = arr.push,  // 从数组或类数组尾部取出某对象并返回新长度
	push = arr.push, 
	slice = arr.slice,  // 该方法可以把类数组对象转成数组
	// Use a stripped-down indexOf if we can't use a native one
	// 不支持数组indexOf的浏览器，我们自己写一个
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	// '真假'属性正则
	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions
	// 正则表达式
	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",  // 各种空格
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",  // 变量名或值

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),  // 给characterEncoding的[\\w-]多加了个#，[\\w#-]，应该是CSS的ID选择器

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	// 属性正则 例如"[name^='foo']"等
	// 捕获1 属性名
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		// 捕获2 关系符'= != *='等
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		// 捕获3（单引号）、捕获4（双引号）、捕获5（无引号）：属性值
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	// 伪类正则，例如":nth-child(1)"等
	// 捕获1 伪类类型，例如nth-child
	// 捕获2 括号里面的参数
	// 捕获3 括号里面的字符串
	// 捕获4 括号里面单引号的字符串
	// 捕获5 括号里面双引号的字符串
	// 捕获6 括号里面不带引号的多个转义字符或者多个非'\\'，非'('，非')'，非'['，非']'的字符或者属性正则（attributes）或者什么都没有
	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	// 开始或结束位置的空格
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),  // 字符串开头的逗号
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),  // 连接器 (子元素 >|下一个元素 +|兄弟元素 ~|后代元素 )

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ), // 这种形式 '=XXX]'

	rpseudo = new RegExp( pseudos ),  // 伪类正则
	ridentifier = new RegExp( "^" + identifier + "$" ),  // 变量名或值正则

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),  // ID选择器匹配
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),  // class选择器匹配
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),  // TAG选择器匹配
		"ATTR": new RegExp( "^" + attributes ),  // 属性选择器匹配
		"PSEUDO": new RegExp( "^" + pseudos ),  // 伪类选择器匹配
		/*
			捕获1 only|first|last|nth|nth-last
			捕获2 child|of-type
			捕获3 括号里面的参数
			捕获4 括号里面的前面的数字和正负 '([+-]|)(\\d*)n|'
			捕获5 括号里面的前面的数字前面的正负
			捕获6 括号里面的前面的数字不含正负
			捕获7 括号前面数字后面的加减
			捕获8 括号后面数字
		*/
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),  // 子选择器匹配，例如':last-of-type(-4n + 12)'
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),  // 布尔值选择器匹配，例如':checked'
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		// 是否需要一个上下文元素（选择器以连接符（ 、>、+、~）开头或者属于位置伪类（:even、:odd等）选择器）
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,  // 表单元素
	rheader = /^h\d$/i, // 标题元素，h1 - h6

	rnative = /^[^{]+\{\s*\[native \w/, // 判断是不是内部方法 [native ...

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	// id选择器、class选择器或标签选择器的简易正则
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,  // 兄弟选择器 '+'：匹配所有紧接在 prev 元素后的 next 元素；'~'：匹配 prev 元素之后的所有 siblings 元素
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	// 不是很明白
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
// 优化push.apply( _, NodeList )
// 在类数组中使用push方法
try {
	// push = arr.push
	// 直接push nodeList
	push.apply(
		// preferredDoc = window.document
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	// 支持：Android<4.0
	// 默默检测push.apply失败
	arr[ preferredDoc.childNodes.length ].nodeType;  // 获取第length个元素的nodeType，如果push失败将被catch捕获
} catch ( e ) {
	push = { apply: arr.length ?  // 如果arr存在长度，也就是'arr = slice.call( preferredDoc.childNodes ))'执行成功

		// Leverage slice if possible
		// 如果可以的话利用slice
		function( target, els ) {
			// push_native = arr.push
			// 把nodeList转成数组再push
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		// 支持：IE<9
		// 其余情况直接追加
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			// 用循环的方式添加
			// 不能信任NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

/**
	Sizzle引擎
	@param {String} selector 选择器字符串
	@param {Element|Document} context 选择器的上下文元素元素，默认document（在此元素以内查找）
	@param {Array} results 如果存在results，将把最终的筛选元素放入此数组
	@param {Array} seed 候选元素数组。如果有，所有最终的筛选元素都存在于内
	@returns {Array} 所以符合条件的元素的数组
*/
function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		// querySelectorAll变量
		i, groups, old, nid, newContext, newSelector;

	// 还没有设置doucment，设置之（检测各种浏览器兼容性，添加基本方法等）
	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document /* 此document只是一个变量 */) {
		setDocument( context );
	}

	context = context || document;  // 选择的上下文元素
	results = results || []; // 选择结果数组

	// 必须要有一个选择器并且选择器必须是string
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	// context必须是document或者元素节点
	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return []; // 返回空结果
	}

	// 如果是html文档并且没有候选元素
	if ( documentIsHTML && !seed ) {

		// Shortcuts
		// 快捷方式
		// rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,  // id选择器、class选择器或标签选择器的简易正则
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			// 只传入一个ID选择器，用getElementById
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );  // document.getElementById
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					// 检查parentNode以排除黑莓4.6返回不再属于该文档的node
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						// 解决IE, Opera, 和 Webkit返回name冒充ID的情况
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					// context不是document
					// 由于document才具有getElementById方法，故先获取到context对应的document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			// 只传入一个元素tag选择器，用getElementsByTagName
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			// 只传入一个class选择器，用getElementsByClassName
			// 需要浏览器支持getElementsByClassName并且getElementsByClassName可靠才在此获取并返回
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		// 支持querySelectorAll并且querySelectorAll没有bug或者当前selector在bug集合中不存在
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			// expando = "sizzle" + -(new Date())
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			// querySelectorAll在元素节点下面查询有问题
			// 我们用给根元素指定一个额外ID的方式来处理
			// IE8在object（多媒体）元素上无效
			// 如果context是元素节点并且context不是'object'
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );  // 获取分词信息
				// 如果context有ID
				if ( (old = context.getAttribute("id")) ) {
					// rescape = /'|\\/g,
					nid = old.replace( rescape, "\\$&" );
				// 否则指定一个ID
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;  // 根据逗号分隔选择器条件
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] ); // 把每一个tokens序列化为一个选择器字符串，并在前面加上"[id='" + nid + "'] "
				}
				// rsibling = /[+~]/
				// 如果有查兄弟节点，最好是以context的父元素替代context
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				// 生成终极选择器字符串
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results; // 查询成功直接返回结果。如果不成功将会被catch，就调用后面底层的select方法
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id"); // 如果是临时指定的id需要删除
					}
				}
			}
		}
	}

	// All others
	// 其余情况，祭出强大的sizzle引擎！！！
	// rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
 /**
	创建有限数量键值对缓存
	@returns 返回添加缓存函数cache，缓存是这样保存的：把key作为cache函数的属性予以指定，并赋值value
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		// 给键名加空格来避免与原型属性冲突
		// cacheLength: 50
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			// 最多存50个，多了就把把前面的删掉
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);  // 添加并返回
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
 /**
	为Sizzle的特殊应用创造一个function标记
	@param {Function} fn 要被标记的函数
	@return {Function} fn 返回传入的函数
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
 /**
	浏览器兼容性测试
	传入一个function，创建一个div执行返回一个'真假'结果
	@param {Function} fn 测试函数
	@param {Boolean} 测试是否通过
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );  // 返回'真假'
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		// 默认从其父元素移除
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		// 防止IE内存泄露
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
 /**
	给指定的属性添加统一的取值方法
	@param {String} 以'|'分割的属性列表
	@param {Function} 需要被应用的处理方法
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
 /**
	检测两个兄弟节点在文档中的顺序
	@param {Element} a a元素
	@param {Element} b b元素
	@returns {Number} 若a在b之前返回负数，a在b之后返回正数
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		// 用IE专有的sourceIndex属性来比较，sourceIndex返回元素在整个文档中的索引
		// 若果传入了a、b两个元素并且a、b都是元素节点
		// 将两个元素的索引加1再取反相减 —— 如果a的索引大于b的索引，相减为正，否则为负
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -  // ~运算相当于加1再取反
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	// 如果通过IE的sourceIndex计算出了位置就直接返回
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	// 检测是否b在a之后
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;  // 如果没传参数返回-1
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
 /*
	创建检测input的type的方法
	@param {String} type 类型字符串
	@returns {Function} 检测方法
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;  // 必须是input且type为指定type
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
 /*
	穿件检测buttons的type的方法
	@param {String} type 类型字符串
	@returns {Function} 检测方法
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
 /**
	创建位置伪类筛选函数
	@param {Function} fn 一个返回所有符合条件索引数组的函数。
	@returns {Function} 位置伪类筛选函数
 */
function createPositionalPseudo( fn ) {
	/*
		@param {String} argument 伪类参数，如:eq(-1)中的-1
	*/
	return markFunction(function( argument ) {  // 运行markFunction后该闭包函数将具有pseudo属性，用于表明这是一个位置伪类筛选函数
		argument = +argument;
		/*
			@param {Array} seed 候选的'种子'元素数组（由于是筛选函数，这个seed必须）
			@param {Array} matches 把匹配的元素放入这个数组对应的索引位
		*/
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),  // 运行fn 获得所有符合条件的索引的数组
				i = matchIndexes.length;  // 符合条件的索引的个数

			// Match elements found at the specified indexes
			// 根据找到的索引循环查找元素
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);  // 把匹配的那位的元素放入matches的对应位，并且把seed的对应位变成false
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
 /**
	检查一个节点有效性来作为Sizzle的context
	@param {Element|Object} context
	@returns {Element|Object|Boolean} 如果输入node有效则返回其本身，否则false
 */
function testContext( context ) {
	// context的tagName不能为空
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
// 为了方便测试暴露support变量
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
 /**
	检查传入的elem所属文档是不是xml而非HTML，若是，返回true
	@param {Element|Object} elem 元素或document
	@returns {Boolean} 真假
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	// documentElement被检查是基于其可能尚不存在的情况（例如IE中正在加载的iframes）
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
 /**
	检测当前document的兼容性并设置相关方法，返回当前document
	@param {Element|Object} node 用来设置document的元素或document对象
	@returns {Object} 返回当前document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc, // 获取document,有node基于node，无则用preferredDoc
		parent = doc.defaultView;  // 返回当前document对象所关联的window对象  IE > 8

	// If no document and documentElement is available, return
	// 如果已经设置或者没有文档或没有文档元素可用，返回
	if ( doc === document /* 此document只是一个变量 */ || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	// 设置我们document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	// 是不是HTML文档
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	// 支持IE>8
	// 如果当前document设置了iframe的文档变量，当iframe被reload之后，当访问这些变量的时候IE会抛出"permission denied"错误？
	// IE6-8不支持defaultView属性所以parent变量是undefined
	// top 返回当前窗口的最顶层浏览器窗口
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		// IE11不支持attachEvent，所以必须做兼容
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();  // 在unload的时候再设置一次document
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	//属性
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	// 支持 IE < 8
	// 检查getAttribute真正返回的是attributes而不是properties
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");  // 用getAttribute获取className：IE6-IE7返回i, 其它返回null
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	// 检测getElementsByTagName("*")是不是只返回元素
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );  // 创建一个注释节点
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	// 检查getElementsByClassName是否可被信任
	// rnative = /^[^{]+\{\s*\[native \w/  是不是内部方法
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		// ?
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		// 捕获getElementsByClassName在非首位class失败
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	// 支持 IE < 10
	// 检查getElementById是否根据元素name返回
	// 错误的getElementById不是获取程序设置的名字所以用getElementsByName替代测试
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length; // 设置ID然后用getElementsByName去拿
	});

	// ID find and filter
	// 设置sizzle的ID选择器和过滤器
	// 如果getElementById被支持
	if ( support.getById ) {
		// 选择器
		// Expr = Sizzle.selectors
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				// 检查parentNode是因为黑莓4.6会返回不再在document中的节点
				return m && m.parentNode ? [ m ] : [];
			}
		};
		// 过滤器
		Expr.filter["ID"] = function( id ) {
			// runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" )
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	// 如果getElementById不被支持
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		// getElementById不是一个可靠的方法，删除之
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");  // getAttributeNode获取属性节点对象
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	// 设置sizzle的标签选择器
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			// 淘汰掉可能的注释节点
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {  // 只有元素节点才被纳入
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	// 设置sizzle的class选择器
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	// querySelectAll/matches
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	// 在IE9/Opera 11.5 matchesSelector(:active)当true时返回false
	rbuggyMatches = [];  // matches bug集合

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	// 在Chrome 21 querySelectAll(:focus)当true时返回false
	// 我们允许这个bug因为在IE8/9当'document.activeElement'去访问一个iframe将抛出一个错误，所以我们允许:focus通过querySelectAll检测来避免IE的error？
	rbuggyQSA = [];  // querySelectAll bug集合
	// 当浏览器支持document.querySelectorAll
	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		// 创建querySelectorAll正则
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			// select设置空字符串的目的是测试IE没有明确指定一个布尔值属性的情况
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			// 支持：IE8, Opera 11-12.16
			// 当'^='或者'$='或者'*='去查找空字符串的时候将不能匹配到任何元素
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" ); // 将正则匹配放入bug
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			// 支持：IE8
			// 布尔值属性和value没有被正确对待的情况
			if ( !div.querySelectorAll("[selected]").length ) {
				// booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );  // 将正则匹配放入bug
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			// Webkit/Opera - :checked将返回选中的option元素
			// IE8在此会抛出一个错误，将不进行下面的测试
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			// 支持Windows 8 Native Apps
			// 通过.innerHTML指定type和name属性将会受到限制
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			// 支持：IE8
			// 获取name属性大小写必须敏感
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			// FireFox3.5 :enabled/:disabled 和 hidden元素 (hidden元素仍然是enabled)
			// IE8在此会抛出一个错误，不进行后面的测试
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			// Opera 10-11在后逗号的错误伪类不会抛出一个异常
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	// 当浏览器支持document.documentElement.matches
	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			// 检查matchesSelector能否在一个脱离文档node上执行
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			// 下面的操作本来应该排除一个错误
			// Gecko内核不报错，而是返回false
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );  // 把rbuggyQSA数组转成大正则
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );  // 把rbuggyMatches数组转成大正则

	/* Contains
	// 包含
	---------------------------------------------------------------------- */
	// compareDocumentPosition 比较文档中两个元素的位置 IE > 9
	/*
		1：没有关系，这两个节点不属于同一个文档。
		2：第一节点（P1）位于第二个节点后（P2）。
		4：第一节点（P1）定位在第二节点（P2）前。
		8：第一节点（P1）位于第二节点内（P2）。
		16：第二节点（P2）位于第一节点内（P1）。
		32：没有关系的，或是两个节点在同一元素的两个属性。
	*/
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	// b是否位于a内
	// 忽略掉a和b是同一个元素的情况
	contains = hasCompare || rnative.test( docElem.contains ) ?  // IE < 9以contains取代
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16  // (& 按位与，运算符优先级高于&&) 经测试只有bup位于a内即compareDocumentPosition结果为16(‭00010000‬)，跟16按位与才得16，其余为0
			));
		} :
		function( a, b ) {
			if ( b ) {
				// 用向上循环的方式去检测
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	// 排序
	---------------------------------------------------------------------- */

	// Document order sorting
	/*
		文档元素排序
		a节点在b节点前，返回-1
		b节点在a节点前，返回1
		两个节点相同返回0
	*/
	sortOrder = hasCompare ?
	// 支持compareDocumentPosition的方法
	function( a, b ) {

		// Flag for duplicate removal
		// 标记重复
		if ( a === b ) {
			hasDuplicate = true;  // 有重复
			return 0; // 相同返回0
		}

		// Sort on method existence if only one input has compareDocumentPosition
		// 如果只有一个元素支持compareDocumentPosition（不支持应该是说明不在当前文档内，因为目前是hasCompare为真的情况下）
		// false - true = -1 || true - false = 1
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare; // a支持返回-1，b支持返回1
		}

		// Calculate position if both inputs belong to the same document
		// 如果两个元素位于同一document，则计算位置
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			// 否则他们不属于同一文档
			1; 

		// Disconnected nodes
		// 若两个元素位于不同文档
		if ( compare & 1 ||
			// 若浏览器判断不在同一个文档有误，用反过来比较得到一样的比较结果就断定不在同一个文档
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			// 取第一个元素作为与当前document相关元素
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1; // 返回-1
			}
			// 取第二个元素作为与当前document相关元素
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1; // 返回1
			}

			// Maintain original order
			// 两个元素与当前document都不相关，保持原来的顺序
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :  // 如果a在b前，返回负数，b在a前，返回正数
				0;
		}
		// compare = 4 => a节点在b节点前
		return compare & 4 ? -1 : 1;
	} :
	// 不支持compareDocumentPosition的方法
	function( a, b ) {
		// Exit early if the nodes are identical
		// 相同元素，早点结束
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		// 都是document或者都是脱离文档的节点
		if ( !aup || !bup ) {
			return a === doc ? -1 : // a是当前文档
				b === doc ? 1 : // b是当前文档
				aup ? -1 : // b脱离文档
				bup ? 1 : // a脱离文档
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :  // 原有顺序
				0;

		// If the nodes are siblings, we can do a quick check
		// 若a与b是兄弟节点
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		// 否则我们需要完整遍历a同b的祖先节点
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );  // 塞入数组前部
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );  // 塞入数组前部
		}

		// Walk down the tree looking for a discrepancy
		// 一层层往下循环之
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			// 若a、b具有相同祖先，则开启同胞测试（sibling check）
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			// 否则，他们不在一个文档，那么以在当前文档中的node为先
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;  // 两个都不在当前文档
	};

	return doc;
};

/**
	根据选择器字符串筛选元素
	@param {String} expr 选择器字符串
	@param {Array} elements 待筛选的元素集合
	@returns {Array} 通过筛选的元素集合
*/
Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

/**
	检测元素是否满足于一个选择器表达式
	@param {Element} elem 待检测的元素
	@param {String} expr 选择器字符串
	@returns {Boolean} 是否满足
*/
Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	// 如果需要，设置document变量
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	// 确保属性值有引号
	// rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ), // 这种形式 '=XXX]'
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// 如果当浏览器支持matchesSelector并且是HTML文档并且当前环境针对expr表达式的matches方法和querySelectAll方法都没有bug
	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );  // 尝试用matchesSelector来检测

			// IE 9's matchesSelector returns false on disconnected nodes
			// IE9用matchesSelector测试脱离文档节点返回false
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					// 由于IE9的原因，如果是DocumentFragment不能信任测试结果
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}
	// 用底层的Sizzle引擎去测试
	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

/**
	检测元素elem是否包含在context内
	@param context {Object|Element} 元素节点或document对象
	@param elem {Element} 元素节点
	@returns {Boolean} 是否包含
*/
Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	// 如果需要设置document变量
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};
/**
	获取元素的属性值
	@param {Element} elem 元素
	@param {String] name 属性名
*/
Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	// 如果还没有执行setDocument方法，就先执行之
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],  // 根据属性名的小写得到获取属性值的方法
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		// 有可能根据name拿到了Object原型上的方法，例如valueOf等，所以先用hasOwn进行判断
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :  // 获取属性
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :  // 如果前面没有获取到就用getAttribute去获取
			(val = elem.getAttributeNode(name)) && val.specified ?  // getAttribute还没获取到就用getAttributeNode
				val.value :
				null; // 没有获取到返回null
};
// 选择器表达式语法错误
Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
 /**
	文档排序和去重
	@param {ArrayLike} results 结果数组
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	// 除非我们能检测重复，否则假设已经重复
	hasDuplicate = !support.detectDuplicates;  // 如果浏览器支持重复元素检测的话，将是否有重复标记置位'假'
	sortInput = !support.sortStable && results.slice( 0 );  // 如果浏览器的排序算法可靠的话
	results.sort( sortOrder );  // 对results进行是否有重复的检测，sortOrder的方法在setDocument里面

	// 如果有重复
	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );  // 将重复元素的索引位放入duplicates数组，push返回新数组的长度
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );  // 剔除重复元素
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	// 去掉sortInput的引用防止内存泄漏
	sortInput = null;

	return results; // 返回已经去重的数组
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
 /**
	获取dom或者dom数组的纯文本内容
	@param {Array|Element} elem 元素或者元素数组
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		// 如果elem没有，就认定其为数组
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			// 循环递归取之
			// 不要获取注释节点的内容
			ret += getText( node );
		}
	// 如果是元素节点或者document或者文档碎片
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		// 用textContent来获取
		// innerText的使用破坏新行的连续性
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			// 没有获取到textContent，循环它的儿子们并递归之
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	// 如果是文本节点或者CDATA
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;  // 直接获取它的nodeValue
	}
	// Do not include comment or processing instruction nodes
	// 不要包含注释节点（nodeType=8）或者处理指令节点（nodeType=7）

	return ret;  // 返回文本字符串
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	// 能够被用户修改
	cacheLength: 50,  // 缓存的上限

	createPseudo: markFunction,  // 创建伪类标记

	match: matchExpr,  // 各种选择符正则

	attrHandle: {},  // 获取属性值对应的方法

	find: {},  // 不同选择符对应的查找方法

	/* 关系符对应的查找对象 */
	relative: {
		">": { dir: "parentNode", first: true }, // 子元素
		" ": { dir: "parentNode" },  // 后代元素
		"+": { dir: "previousSibling", first: true },  // 下一个兄弟节点
		"~": { dir: "previousSibling" } // 所有兄弟节点
	},

	/* 预处理 */
	preFilter: {
		"ATTR": function( match ) {
			/*
				// 属性正则 例如"[name^='foo']"等
				// 捕获1 属性名
				attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
					// Operator (capture 2)
					// 捕获2 关系符'= != *='等
					"*([*^$|!~]?=)" + whitespace +
					// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
					// 捕获3（单引号）、捕获4（双引号）、捕获5（无引号）：属性值
					"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
					"*\\]",
			*/
			match[1] = match[1].replace( runescape, funescape );  // 属性名

			// Move the given value to match[3] whether quoted or unquoted
			// 把属性值赋给match[3]，如果没有就是""
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";  // 对于包含（以空格分开）的情况，故需给属性值前后加空格
			}

			return match.slice( 0, 4 );  //match[4]、match[5]没用了 截掉
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			/*
				捕获1 only|first|last|nth|nth-last
				捕获2 child|of-type
				捕获3 括号里面的参数
				捕获4 括号里面的前面的数字和正负 '([+-]|)(\\d*)n|'
				捕获5 括号里面的前面的数字前面的正负
				捕获6 括号里面的前面的数字不含正负（xn + y里面的x）
				捕获7 括号前面数字后面的运算符
				捕获8 括号后面数字（xn + y里面的y）
			*/
			match[1] = match[1].toLowerCase();  // 把捕获1小写化

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				// nth-*需要参数，也就是后面必须要有括号和括号里面的参数
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				// 处理括号里面运算符前面的部分
				// 如果前面是（even|odd），不论奇偶，都给match[4]赋值+2（2 * true = 2）
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				// 处理括号里面运算符和运算符后面的部分
				// 如果不含后面的运算符，如果match[3]是奇（odd），那么就给match[5]赋值+1；偶（even）就给match[5]赋值+0。（后面最终偶数even的运算符为(2n)，而奇数odd为(2n +/- 1)）
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			// 其余类型不能带参数
			} else if ( match[3] ) {  // 只有nth|nth-last后面才需要括号
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			/*
				pseudos = ":(" + characterEncoding + ")(?:\\((" +
				// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
				// 1. quoted (capture 3; capture 4 or capture 5)
				"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
				// 2. simple (capture 6)
				"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
				// 3. anything else (capture 2)
				".*" +
				")\\)|)"
				// 捕获1 伪类类型，例如nth-child
				// 捕获2 括号里面的参数
				// 捕获3 括号里面的字符串
				// 捕获4 括号里面单引号的字符串
				// 捕获5 括号里面双引号的字符串
				// 捕获6 括号里面不带引号的多个转义字符或者多个非'\\'，非'('，非')'，非'['，非']'的字符或者属性正则（attributes）或者什么都没有
			*/
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {  // 对于child的伪类不归该函数处理
				return null;
			}

			// Accept quoted arguments as-is
			// 引号参数
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";  // 如果括号里面是带引号字符串，就存入match[2]

			// Strip excess characters from unquoted arguments
			// 从没有引号的参数中去掉多余的字符（没太懂）
			// 如果参数没有引号并且参数是伪类类型
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				// 并且参数通过分词器解析后有剩余
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				// 并且从剩余位置开始找到')'出现的位置-参数长度不为0
				// 把从剩余位置开始找到')'出现的位置-参数长度赋给excess（负数）
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				// 从整个伪类字符串（match[0]）、参数（match[2]）中截掉多余的部分
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			// 只返回伪类过滤器需要的部分（类型和参数）
			return match.slice( 0, 3 );
		}
	},
	/* 过滤器，传入选择器字符串，返回匹配函数 */
	filter: {
		// 标签名
		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :  // 如果校验的nodeNameSelector为'*'，都返回true
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},
		// class
		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];  // 根据className从缓存里面取出校验函数

			// 如果有直接返回，如果没有则生成并且存入缓存
			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},
		// 属性值
		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name ); // 根据name获取元素的属性值

				if ( result == null ) {
					return operator === "!=";  // 如果所获得的属性值为null，那么当操作符是'不等于'的时候通过
				}
				if ( !operator ) {
					return true;  // 属性值不为null，说明属性存在，直接通过
				}

				result += "";  // 把属性值转成字符串

				return operator === "=" ? result === check :  // 等于
					operator === "!=" ? result !== check :  // 不等于
					operator === "^=" ? check && result.indexOf( check ) === 0 :  // 开头等于
					operator === "*=" ? check && result.indexOf( check ) > -1 :  // 含有
					operator === "$=" ? check && result.slice( -check.length ) === check :  // 结尾等于
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :  // 包含（以空格分开）
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" : // 等于或者是前缀
					false;
			};
		},
		// 子类 :nth-(child|of-type) :nth-last-(child|of-type) :first-(child|of-type) :last-(child|of-type) :only-(child|of-type)
		/*
			@param type only|first|last|nth|nth-last
			@param what child|of-type
			@param argument 括号里面的参数
			@param first '(xn + y)' 里面的x
			@param last '(xn + y)' 里面的y
		*/
		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth", // 是否是简易格式only|first|last
				forward = type.slice( -4 ) !== "last",  // 是否是从前往后
				ofType = what === "of-type";  // 是不是根据type

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				// 括号里面是n的情况，即选取所有子类，例如:nth-child(n)
				function( elem ) {
					return !!elem.parentNode;  // 必须有父元素
				} :

				function( elem, context, xml ) {
					var cache /* type缓存数组 */, outerCache /* 保存在父元素上的缓存 */, node /* 元素指针对象 */, diff /* 当前elem在childNodes中的索引 */, nodeIndex /* 用于缓存当前已遍历到的索引 */, start,
						/*
							simple !== forward:
								nth-child
								last-child
							simple === forward:
								nth-last-child
								only-child
								first-child
						*/ 
						dir = simple !== forward ? "nextSibling" : "previousSibling",  // last从后往前，first从前往后
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),  // 根据类型的情况需要判断nodeName
						useCache = !xml && !ofType;  // 非xml文档下非类型可以使用缓存

					if ( parent ) {  // 必须有父元素

						// :(first|last|only)-child
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false; // first前面不能有，last后面不能有，only前后不能有
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								// 针对':only-*'改变检测方向，再来一次
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;  // 通过检测
						}

						start = [ forward ? parent.firstChild : parent.lastChild ]; // 如果从前往后就放parent的firstChild，否则parent的lastChild

						// non-xml :nth-child(...) stores cache data on `parent`
						// 非xml文档的:nth-child(...)在parent上面保存缓存
						// 如果从前往后并且使用缓存
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {}); // 取出总缓存对象
							cache = outerCache[ type ] || [];  // 取出type缓存数组，type = nth
							nodeIndex = cache[0] === dirruns && cache[1]; // 如果cache属于本轮sizzle，拿到nodeIndex
							diff = cache[0] === dirruns && cache[2];  // 如果cache属于本轮sizzle，拿到diff
							node = nodeIndex && parent.childNodes[ nodeIndex ];  // 如果从缓存中获得nodeIndex，根据nodeIndex拿到node

							// 从缓存得到的node开始往nextSibling方向遍历
							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								// 若果缓存遍历没有成功就从头开始
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								// 每遍历一次，diff加1
								// 只要遍历到了待校验element，在爹上缓存type数组，并且跳出循环
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						// :nth-last-child的情况。如果之前有缓存了索引，直接从缓存中取
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						// xml下的:nth-child(...) 或者 :nth-last-child(...) 或者 :nth(-last)?-of-type(...)的情况
						} else {
							// Use the same loop as above to seek `elem` from the start
							// 采用跟上面一样找elem的循环方法从start开始
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {
								// of-type必须node的nodeName跟elem的nodeName相同，否则必须是元素节点
								// 每遍历一个node, diff + 1
								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									// 如果需要缓存，则将每个遇到的元素的索引缓存之
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}
									// 遍历到待校验的元素，跳出循环
									if ( node === elem ) {
										break;
									}
								}
							}
						}
						// Incorporate the offset, then check against cycle size
						// first * n + last
						diff -= last;  // 减去偏移量last
						// 如果结果等于first（n = 1的情况）或者diff是first的倍数(n > 1的情况)，返回真
						// diff必须与first同号，即diff与first必须同方向
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},
		// 伪类
		/*
			@param pseudo 伪类名
			@param argument 括号里面的参数
		*/
		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			// 根据伪类名获取filter方法
			// 伪类名是大小写敏感的
			// 优先考虑有大写情况的Expr.pseudos
			// 而后考虑继承自伪类的Expr.setFilters
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			// 用户可以用createPseudo（markFunction）方法标记处理函数表明需要传入argument参数来创建一个过滤方法，就像Sizzle做的那样
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			// 保持对旧签名的支持？
			// 如果fn的长度大于1
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					// 如果Expr.setFilters中有这个小写的伪类处理方法名
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),  // 运行fn获取匹配的元素集合
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );  // 获取元素在候选seed数组中的位置
							seed[ idx ] = !( matches[ idx ] = matched[i] );  // 把匹配元素放入matches对应位，并且seed对应位变成false
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn; // 直接返回filter函数
		}
	},
	// 伪类过滤函数
	pseudos: {
		// Potentially complex pseudos
		// 潜在的复杂伪类
		/*
			@param selector :not(selector)里面的selector
		*/
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			// 把selector前后的空格去掉以避免在编译时把它当做了后代连接符
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );  // 生成编译函数

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );  // 把elem当做'种子'元素运行刚才的编译的匹配函数（'种子'元素必须放在数组里面）
					return !results.pop();  // 只有匹配函数返回的结果不包含elem才为真
				};
		}),

		/**
			以elem为context搜索selector能返回结果
		*/
		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),
		
		/**
			elem包含text内容
		*/
		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		/**
			语言伪类
			“一个元素是否是匹配:lang()选择器是基于元语言值等于标识符C，或者开始于此标识符C并紧跟一个"-"。
			标识符C对元素的值进行不区分大小写的匹配。
			标识符C不必是一个有效的语言名称”
			@param {String} lang 语言名称标识符
		*/ 
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			// 参数lang必须是一个合法的标识符
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				// 循环，往祖先元素方向遍历
				do {
					if ( (elemLang = documentIsHTML ?
						// 如果是HTML文档
						elem.lang :
						// 如果是XML文档
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						// 如果当前语言等于lang或者以lang开头并紧跟一个"-"
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		// 其它
		// hash目标
		"target": function( elem ) {
			var hash = window.location && window.location.hash;  // 获取hash
			return hash && hash.slice( 1 ) === elem.id;
		},

		// 文档根节点
		"root": function( elem ) {
			return elem === docElem;
		},

		// 当前焦点对象
		"focus": function( elem ) {
			// elem必须是当前文档的活跃对象并且当前文档必须活跃并且elem必须（有type类型（input）或者有href或者elem的tabIndex不为-1）
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		// 布尔值伪类
		// elem可用
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		// elem不可用
		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		// checked
		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// 此伪类只针对input[type=checkbox]、input[type=radio]或者option有效
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		// selected
		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			// 针对Safari获取default-select有问题的一点处理
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		// 内容为空
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			// :empty对于元素节点、文本节点，cdata、实体对象敏感
			// 对于其他情况诸如注释节点、处理指令等不敏感
			// nodeType < 6会把属性节点（nodeType = 2）一并排斥，但由于获取子元素不会把属性节点包括在内，所以没有关系
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		// 是父的节点
		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );  // 必须有内容即可
		},

		// Element/input types
		// h1 - h6
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		// 表单元素
		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		// button元素或者input[type=button]
		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		// input[type=text]包括不写type默认的情况
		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				// 由于h5的一些新type例如search，获取elem.type也是"text"，故而需要增加下面的判断
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		// 位置伪类，具体去看createPositionalPseudo函数
		// 第一位
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		// 最后一位
		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		// 指定位
		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];  // 输入负数就从后往前
		}),

		// 偶数
		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {  // 0、2、4...
				matchIndexes.push( i );  // 把匹配索引放入matchIndexes
			}
			return matchIndexes;
		}),

		// 奇数
		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {  // 1、3、5...
				matchIndexes.push( i );  // 把匹配索引放入matchIndexes
			}
			return matchIndexes;
		}),

		// 小于
		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		// 大于
		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];  // :nth伪类和:eq伪类同

// Add button/input type pseudos
// button和input type伪类
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
// 继承自伪类的setFilter
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

/*
	分词器
	@param {String} selector 选择器字符串
	@param {Boolean} parseOnly 是否只解析（检查解析式是否正确）
*/
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched /* 是否存在匹配（作为循环与否的标识） */, match /* 正则匹配 */, tokens /* 一个tokens代表一个唯一条件的完整选择器分词信息 */, type,
		soFar /* 目前剩余待处理的选择器字符串部分 */, groups, preFilters,
		cached = tokenCache[ selector + " " ];  // selector字符串对应的缓存

	/*
		说明：一个tokens数组存放一个唯一条件的选择器分词信息，即如果某个selector字符串是以逗号隔开的多个条件选择表达式，那么分词器将以逗号来分隔出每一个选择器条件，每一个选择器条件就代表一个完整的选择器条件表达式，将其分词结果存入一个token。例如表达式 '#test1, .test2, #test3 > div' 中有三个选择条件（两个逗号），那么就需要3个tokens来存放
		然后tokens再以连接器、基本选择器去从左往右匹配每个选择器条件，将匹配结果信息以对象的形式保存，放入tokens数组
		再最后，将每个tokens放入终极分词结果groups中
	*/

	// 直接从缓存里头取
	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );  
	}

	soFar = selector;
	groups = [];  // 终极分词结果
	preFilters = Expr.preFilter;  // 对选择器的预加工（例如给没有加引号的属性加上引号等等）

	// 循环分词
	while ( soFar ) {

		// Comma and first run
		// 逗号和第一轮循环
		// rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" )
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				// 把匹配的开始逗号截掉
				// 尾部的逗号不要
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );  // 每两个逗号之间就代表一个完整的选择器，添加一个tokens，第一次也加一个token
		}

		matched = false;

		// Combinators
		// 连接器
		// rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" )
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,  // 整个匹配字符串
				// Cast descendant combinators to space
				// 把后代选择器转成一个空格
				type: match[0].replace( rtrim, " " )  // 连接器类型
			});
			soFar = soFar.slice( matched.length );  // 把处理的部分截掉
		}

		// Filters
		// 过滤器
		/*
			matchExpr = {
				"ID": new RegExp( "^#(" + characterEncoding + ")" ),
				"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
				"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
				"ATTR": new RegExp( "^" + attributes ),
				"PSEUDO": new RegExp( "^" + pseudos ),
				"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
					"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
					"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
				"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
				"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
					whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
			},
		*/
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,  // 整个匹配字符串
					type: type,  // id class tag...
					matches: match  // 匹配的结果信息集合
				});
				soFar = soFar.slice( matched.length );  // 把处理的部分截掉
			}
		}

		if ( !matched ) {  // 没有matched说明处理完毕，否则继续循环之
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	// 如果只是解析，就只返回选择器字符串剩余长度，否则返回tokens结果
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			// 缓存之
			tokenCache( selector, groups ).slice( 0 );
};
/**
	把tokens序列化为选择器字符串
*/
function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value; // value存放的是整个匹配字符串
	}
	return selector;
}

/*
	根据连接器进行匹配
	@param {Function} matcher 匹配函数
	@param {String} combinator 连接关系符 '>   + ~'
	@param {Boolean} base 如果dir是"parentNode"，是否允许匹配非元素节点
	@returns {Function} 生成的连接器匹配函数
*/
function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,  // 连接符所代表的关系（parentNode、previousSibling）
		checkNonElements = base && dir === "parentNode",  // 是否允许非元素节点
		doneName = done++;  // 用于缓存，done的生命周期为下一个连接符之前

	return combinator.first ? // '> +'
		// Check against closest ancestor/preceding element
		// 只检测最近的一个后代或兄弟节点函数
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {  // 如果是元素节点或者允许非元素节点的情况
					return matcher( elem, context, xml );  // 用传入的匹配函数进行匹配，由于只匹配最近的所以立即返回匹配结果
				}
			}
		} :

		// Check against all ancestor/preceding elements
		// 检测所有的后代或兄弟节点函数
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];  // 匹配函数运行结果缓存

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			// 基于XML的节点无法设置任意data，所以我们不能使用关系符缓存
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {  // 如果是元素节点或者允许非元素节点的情况
						if ( matcher( elem, context, xml ) ) {  // 用传入的匹配函数进行匹配，由于是匹配所有节点，所以必须完整遍历
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						// 拿取或设置绑定在元素上的关系符缓存
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							// 直接返回关系符缓存记录的匹配结果
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							// 放入新缓存
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							// 匹配上我们就成功了，匹配不上那么我们必须继续匹配。并将匹配情况记入缓存
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}
/*
	生成根据元素匹配函数
	根据已有的matchers匹配函数数组，返回一个新函数，该函数是依次运行matchers里面的匹配函数直到不匹配返回false，全部通过返回true
	@param {Array} matchers 匹配函数数组
	@returns {Function} 生成的匹配函数
*/
function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			// 从右往左依次运行matchers里头的匹配函数
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;  // 不匹配返回false
				}
			}
			return true;
		} :
		matchers[0];  // 如果matchers只有一个函数，就直接返回该函数
}
/**
	根据一个contexts数组和selector获取所有匹配元素
	@param {String} selector 选择器字符串
	@param {Array} contexts context数组
	@param {Array} results 结果数组
*/
function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

/**
	通过过滤函数筛选出所有符合条件的元素，并把元素在数组中的索引放入map
	@param {Array} unmatched 待匹配的数组集合
	@param {Array} map 放置元素所在数组索引的集合
	@param {Function} filter 过滤函数
	@param {Element|Document} context 上下文元素
	@param {Boolean} xml 是否是xml文档
	@return {Array} 所有匹配元素的数组
*/
function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i ); // 把索引放入map
				}
			}
		}
	}

	return newUnmatched;
}

/*
	生成根据元素集合筛选匹配的函数
	@param {Function} preFilter  当前位置伪类之前的过滤器
	@param {String} selector 当前位置伪类之前的选择器字符串
	@param {Function} matcher 当前位置伪类过滤函数
	@param {Function} postFilter 当前位置伪类之后截至到下一个连接符之前（不包含下一个连接符）的tokens生成的匹配函数
	@param {Function} postFinder 下一个连接符以及之后tokens生成的匹配函数
	@param {String} postSelector 下一个连接符之后的选择器字符串
*/
function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );  // 将postFilter变成筛选函数，如果postFilter已经是筛选函数，不处理
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );  // 将postFinder变成筛选函数，如果postFinder已经是筛选函数，不处理
	}
	/**
		生成筛选函数（将元素集合进行筛选，淘掉不符合的元素）
		@param {Array} seed 候选'种子'元素数组
		@param {Array} results 结果数组
		@param {Element|Document} context 搜索上下文
		@param {Boolean} xml 是否xml文档
	*/
	return markFunction(function( seed, results, context, xml ) {  // markFunction加工的方法具有了expando参数
		var temp, i, elem,
			preMap = [], // 存放通过前过滤器校验的元素在elems中的索引
			postMap = [], // 存放通过后过滤器校验的元素在elems中的索引
			preexisting = results.length, // results中先前是否已存在元素

			// Get initial elements from seed or context
			// 通过seed或context数组获取初始元素集合（当前位置之前的选择器字符串选取的元素）
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			// 运行前过滤器
			// 如果有preFilter 并且 有seed或者没有selector 才去执行前过滤器
			// 而没有seed或者有selector的情况，因为前面的multipleContexts方法已经筛选好了
			// matcherIn（matcher方法执行前的元素数组）放淘过之后剩下的元素，preMap放剩下元素在elems中的索引
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			// matcherOut（matcher方法执行后的元素数组）
			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				//如果有matcher 
				//如果有postFinder，或者有seed和preFilter，或者没有seed但有postFilter或者result里面有元素
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					// matcherOut便是一个空数组
					[] :

					// ...otherwise use results directly
					//否则直接用results
					results :
				// 没有matcher方法的话matcherOut等于matcherIn
				matcherIn;

		// Find primary matches
		// 运行matcher  把匹配的那位的元素放入matcherOut的对应位，并且把matcherIn的对应位变成false
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml ); // matcherOut放淘过之后剩下的元素，索引位与matcherIn相同，matcherIn相应位变成false
		}

		// Apply postFilter
		// 运行后过滤器
		if ( postFilter ) {
			temp = condense( matcherOut, postMap ); // 把matcherOut中每个元素对应的索引放入postMap，并返回一个存放着每个元素的新数组
			postFilter( temp, [], context, xml ); // 运行postFilter，temp数组中匹配位的元素变成false，注意是匹配位

			// Un-match failing elements by moving them back to matcherIn
			// 把未通过的元素放回matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {  // 如果那位有元素，说明它未通过postFilter校验
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem); // 未通过校验的索引位，matcherIn变成elem，matcherOut变成false
				}
			}
		}

		// 如果有'种子'元素
		if ( seed ) {
			// 如果有'后查询'或'前过滤'（有'前过滤'preMap中才有元素）
			if ( postFinder || preFilter ) {
				// 运行后查询（下一个连接符以及之后tokens生成的匹配函数）
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					// 通过运行'后查询'获取最终的matcherOut
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							// 如果还没有到最终匹配把elem放回matcherIn？
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );  // 以matcherOut中的每个元素作为context去查找下一个连接符以后的选择器字符串所匹配的元素
				}

				// Move matched elements from seed to results to keep them synchronized
				// 把匹配的元素从seed放入results来保持它们同步性
				i = matcherOut.length;
				while ( i-- ) {
					// 如果matcherOut的第i位有元素并且 当有postFinder的时候，如果'种子'元素中具有该元素 或者没有postFinder且preMap的i位存有matcherIn的索引
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);  // 说明该元素匹配，将其放入results结果（对应位），并把seed对应位置为false
					}
				}
			}

		// Add elements to results, through postFinder if defined
		// 没有'种子'数组。把元素加入results，如果有'后查询'运行它
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );  // 没有'种子'元素，直接把matcherOut每个元素作为context去查找下一个连接符以后的选择器字符串所匹配的元素作为最终结果
			} else {
				push.apply( results, matcherOut ); // 没有'后查询'，直接把matcherOut中的元素放入results
			}
		}
	});
}
/*
	根据tokens生成匹配函数
	@param {Array} tokens
*/
function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		/*
			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			}
		*/
		leadingRelative = Expr.relative[ tokens[0].type ], // 开头的关系符
		implicitRelative = leadingRelative || Expr.relative[" "],	// 如果开头不是关系符，就默认为空格（后代选择器）
		i = leadingRelative ? 1 : 0, // 如果开头是关系符已经确定，后面的循环跳过它

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		// 根据连接符匹配指定元素的函数，必须elem是所检测context才算匹配
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		// 根据连接符匹配任意元素的函数，只要elem在指定的contexts数组里面即可
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			// outermostContext代表最始祖元素
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		// 如果i位是连接符
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];  // matchers实际上是由逐个连接符进行包裹的复杂函数。addCombinator返回函数里面运行elementMatcher闭包函数再在里面运行addCombinator闭包函数...这样逐级运行
		} else {  // 否则是元素选择器
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );  // 根据tokens[i]的type获取相应的匹配函数

			// Return special upon seeing a positional matcher
			// 匹配函数有expando属性，说明是经过markFunction运行的位置伪类匹配函数
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				// 找到下一个连接符
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				// 返回一个筛选函数
				// preFilter, selector, matcher, postFilter, postFinder, postSelector
				return setMatcher(
					i > 1 && elementMatcher( matchers ),  // 前面循环已经生成匹配函数，需要运行preFilter筛选之
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						// 如果前面一个token类型是一个后代连接符，那么就给它后面补一个匹配任意元素的'*'
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),  // 位置伪类之前的选择器字符串
					matcher,  // 位置伪类过滤函数
					i < j && matcherFromTokens( tokens.slice( i, j ) ),  // 位置伪类之后截至到下一个连接符之前（不包含下一个连接符）的tokens生成的匹配函数
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),  // 下一个连接符以及之后tokens生成的匹配函数
					j < len && toSelector( tokens )  // 下一个连接符之后的选择器字符串
				);
			}
			matchers.push( matcher );  // 把匹配函数放入matchers数组。由于选择器最后一位上绝对不应该是一个连接符，所以循环结束matchers的长度应该至少为2
		}
	}

	return elementMatcher( matchers );  // 返回一个最终匹配函数
}

/**
	根据匹配函数数组和筛选函数数组生成最终的编译函数
	@param {Array} elementMatchers 根据各个查询条件生成的匹配函数的数组
	@param {Array} setMatchers 根据各个查询条件生成的筛选函数的数组
*/
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,  // 如果setMatchers的长度大于0则bySet（根据筛选）为真
		byElement = elementMatchers.length > 0,  // 如果elementMatchers的长度大于0则byElement（根据匹配）为真
		/*
			超级匹配（终极匹配）
			@param {Array} seed '种子'元素集合，所有的候选元素（如果选择器中有多个搜索条件则为undefined）
			@param {Element|Document} context 查询的始祖（根）元素 默认document
			@param {Boolean} xml 是否xml文档
			@param {Array} results 查询结果数组
			@param {Element|Document} outermost 最外边context，查询不应该超出这个范围
		*/
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],  // 尚未筛选成功的元素数组
				setMatched = [],  // 成功筛选的元素数组
				contextBackup = outermostContext, // 备份当前outermostContext
				// We must always have either seed elements or outermost context
				// elems为所有的候选元素
				// 如果没有'种子'元素那么就需要根据最顶级context查找所有元素来匹配
				// 筛选（setMatcher）方法可以不要候选元素，因为函数内会有相应逻辑
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),  // 用于查询缓存，每一轮查询更新一次dirruns
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;  // 如果当前context不是document设置outermostContext（最顶级）为当前context
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			// 直接把通过elementMatchers的元素加入到结果数组
			// 把i设成一个字符串，当没有元素的时候下面的matchedCount会变成'00'(matchedCount += i)
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {  // byElement的情况
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {  // 将被检测元素逐一传入elementMatchers里面匹配函数
							results.push( elem );  // 只要匹配上就有效
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;  // dirruns有可能被改变了，还原之
					}
				}

				// Track unmatched elements for set filters
				// 把没有对应elementMatcher的方法的元素放入setMatcher
				if ( bySet ) {
					// They will have gone through all possible matchers
					// 如果有elem并且没有elementMatcher方法，将matchedCount减1
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					// 如果elem来自seed说明是候选元素，放入unmatched以供筛选
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			// 应用setMatchers方法
			// 如果matchedCount为负，说明有待筛选的元素
			// 如果上面的for循环了0次，那么i为'0'，matchedCount将为'00'
			matchedCount += i; // elementMatcher运行的次数
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );  // 针对unmatched里头的元素执行setMatchers方法，并将结果放入setMatched对应索引位，unmatched对应位变成false
				}

				// 如果有'种子'元素
				// 有'种子'元素的情况下setMatched里面的元素会零散分布
				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					// 用意不明
					// matchedCount大于0说明前面循环elementMatchers里面有函数执行，这时results里面可能会有元素
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							// 如果unmatched或者setMatched数组第i位都没有元素
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );  // 则把results的头部第一位放入setMatched第i位
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					// 由于此时setMatched里面的元素零散地分布于某些索引位，通过condense方法把它处理为一个紧凑的纯粹的元素数组
					setMatched = condense( setMatched );
				}

				// Add matches to results
				// 把匹配的元素放入results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				// 没有'种子'数组的情况下，如果setMatchers里面的方法有筛选到元素并且matchedCount加上setMatchers的函数个数大于1（不止一个筛选函数），则可能出现元素重复的情况
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {
					// 对results数组去重
					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;  // dirruns有可能被改变了，还原之
				outermostContext = contextBackup; // 恢复全局outermostContext
			}

			return unmatched;  // 返回未筛选成功元素的数组
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

/**
	编译函数（根据tokens的每一个选择器单元对象生成过滤函数）
	@param {String} selector 选择器字符串
	@param {Array} match 分词结果数组（仅内部使用）
*/
compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];  // 尝试直接从缓存里面拿

	if ( !cached ) { // 没有获取到缓存
		// Generate a function of recursive functions that can be used to check each element
		// 生成一个由多个对每个元素进行检查的递归函数组成的函数
		if ( !match ) {
			match = tokenize( selector );  // 没有传分词结果才去分词
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );  // 根据tokens生成一个极其复杂的匹配函数
			if ( cached[ expando ] ) {  // 方法具有expando参数，说明是筛选函数
				setMatchers.push( cached ); // 把该匹配函数放入setMatchers数组
			} else {  // 否则是匹配函数
				elementMatchers.push( cached ); // 把该匹配函数放入elementMatchers数组
			}
		}

		// Cache the compiled function
		// 把这个编译函数放入缓存
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) /* 生成superMatcher函数 */ );

		// Save selector and tokenization
		// 记录cached的selector
		cached.selector = selector;
	}
	return cached; // 返回编译函数
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
 /**
	一个底层的选择器函数，工作于Sizzle的编译器函数
	@param {String|Function} selector 选择器字符串或一个由Sizzle.compile生成的预编译函数
	@param {Element} context 查找的上下文元素
	@param {Array} results 查询结果集
	@param {Array} seed '种子'数组。如果有，作为所有最终结果候选
	@returns {Array} results 查找到的元素的数组
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector, //selector如果是function则为已编译函数
		match = !seed && tokenize( (selector = compiled.selector || selector) );  // 分词

	results = results || []; // 查询结果集

	// Try to minimize operations if there is no seed and only one group
	// 尽量减少操作，如果没有'种子'（候选）数组，或者选择器中只有一个查询条件（没有逗号）
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		// 若selector是以一个id选择器开头，由于id具有唯一性，那么就可以以这个id选择的元素作为新的context
		/*
			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},
		*/
		tokens = match[0] = match[0].slice( 0 );
		// 如果tokens的长度大于2并且tokens开头是一个ID选择器并且浏览器支持直接的id选择并且context是document并且当前是HTML文档并且紧跟该id选择器的是一个关系表达式
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			// 没有查到该id对应的元素，说明整个选择器也选不到任何元素，直接返回空数组
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			// 预编译匹配需要仍然校验祖先，所以元素往父级递增一级
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );  // 由于第一个id选择器已经作为新context了，selector需要去掉这个id
		}

		// Fetch a seed set for right-to-left matching
		// sizzle引擎是从右往左选择，我们先尝试把最右边的那个'种子'（候选数组）确定
		/*
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		*/
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		// 从右往左循环
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			// 当我们撞倒一个连接符的时候退出循环
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {  // 根据token的type获取相应的find函数
				// Search, expanding context for leading sibling combinators
				// 找寻，如果选择器开头是一个兄弟连接符，我们把context提升一级，获得'种子'数组
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					// 如果'种子'数组为空，说明选择器选择不到元素或者tokens已完结说明查找结束。这时我们就可以返回了
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;  // 查到任何'种子'元素立即退出循环
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	// 编译生成终极匹配函数并运行
	// 提供match参数（分词结果）的目的是避免当我们前面已经修改过selector仍然再次分词的情况
	( compiled || compile( selector, match ) )(
		seed,  // '种子'元素数组，我们要查找的元素也包含在里面
		context,  // 查找的始祖元素，默认document
		!documentIsHTML,  // 是否不是HTML文档
		results,  // 查询结果数组
		// rsibling = /[+~]/
		rsibling.test( selector ) && testContext( context.parentNode ) || context // 如果选择器中有兄弟连接符（+、~），那么就尝试把context提升一级
	);
	return results;  // 返回终极结果
};

// One-time assignments
// 一次性测试
// Sort stability
// 数组排序是否可靠
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
// 支持：Chrome<14
// 总是假设有重复如果没有通过上面的排序函数
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
// 初始化默认的document设置
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
// 支持：Webkit<537.32 - Safari 6.0.3/Chrome 25 (修复于Chrome 27)
// 检查错误判断两个节点位置的情况
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	// 1：没有关系，这两个节点不属于同一个文档
	// 4：第一节点（P1）定位在第二节点（P2）前。
	// 应该返回1但却返回4
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
// 防止获取属性被插值（IE8以下）
/*
	0
	Default. Performs a property search that is not case-sensitive, and returns an interpolated value if the property is found.
	1
	Performs a case-sensitive property search. To find a match, the uppercase and lowercase letters in strAttributeName must exactly match those in the attribute name.
	2
	Returns attribute value as a String. This flag does not work for event properties.
	4
	Returns attribute value as a fully expanded URL. Only works for URL attributes.
*/
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 ); // type第二个参数传1，其它传2
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
// 支持：IE<9
// 用defaultValue代替getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
// 支持：IE<9
// 如果getAttribute取布尔值类型属性返回欺骗值就用getAttributeNode
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			// 如果直或取属性值返回'真'就直接返回该属性名的小写
			return elem[ name ] === true ? name.toLowerCase() :
					// 如果没有返回'真'就用getAttributeNode，取到了才返回它的value
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;  // 否则直接返回null
		}
	});
}

return Sizzle; // 返回Sizzle

})( window );



jQuery.find = Sizzle; // jQuery.find指向Sizzle，所以如果你这样用：$.find('div > span')，将返回一个匹配元素数组
jQuery.expr = Sizzle.selectors; // 这个我不知道该怎么描述，就是各种预处理函数和查找函数、过滤函数等等
jQuery.expr[":"] = jQuery.expr.pseudos;  // 伪类匹配
jQuery.unique = Sizzle.uniqueSort;  // 文档排序和去重
jQuery.text = Sizzle.getText;  // 获取dom或者dom数组的纯文本内容
jQuery.isXMLDoc = Sizzle.isXML;  // 是否是XML文档
jQuery.contains = Sizzle.contains;  // 检测两个对象是否具有包含关系的方法



var rneedsContext = jQuery.expr.match.needsContext;  // 是否需要一个上下文对象

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);  // 无属性的光秃秃的标签，例如<div></div>



var risSimple = /^.[^:#\[\.,]*$/;  // 单一的选择器条件，例如'#foo'，没有那种多个条件杂糅为一诸如'div#foo'之类的情况

// Implement the identical functionality for filter and not
/**
	$().filter和$().not的统一处理方法
	@param {ArrayLike} elements 当前jQuery实例中的匹配元素
	@param {Function|Element|String|Array|ArrayLike} qualifier 筛选函数或元素或选择器字符或元素（类）数组
	@param {Boolean} not 是否是not（取反）
	@returns {Array} 返回一个符合条件的元素集合
*/
function winnow( elements, qualifier, not ) {
	// 如果qualifier是一个function
	if ( jQuery.isFunction( qualifier ) ) {
		// 运行该function进行筛选，跟not相反则符合
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	// 如果qualifier是元素
	if ( qualifier.nodeType ) {
		// 如果当前实例中有该匹配元素符合
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	// 如果qualifier是字符串
	if ( typeof qualifier === "string" ) {
		// 如果qualifier是单一选择器条件，是否'not'由arguments决定
		if ( risSimple.test( qualifier ) ) {
			// 用jQuery.filter方法筛选elements
			return jQuery.filter( qualifier, elements, not );
		}
		// 如果qualifier是杂糅选择器条件，是否'not'由选择器字符串决定
		qualifier = jQuery.filter( qualifier, elements );
	}

	// 如果qualifier是（类）数组
	return jQuery.grep( elements, function( elem ) {
		// 是否在数组中与not相反
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

/**
	jQuery过滤器
	@param {String} expr 选择器表达式
	@param {ArrayLike} elements 当前jQuery实例中的匹配元素
	@param {Boolean} not 是否是not（取反）
	@returns {Array} 返回一个符合条件的元素集合
*/
jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ]; // elem是第0个元素

	if ( not ) {
		expr = ":not(" + expr + ")";  // 针对not情况的完善选择器字符串
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		// 一个对象直接用matchesSelector方法
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		// 多个对象用matches方法，先把里面的元素节点筛选出来
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};
// jQuery.fn.extend扩展jQuery实例的属性
jQuery.fn.extend({
	// $().find
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		// selector参数可以不是一个字符串
		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					// 如果当前实例中的某一元素包含selector对象，该对象将被放入新栈中生成新的jQuery实例并返回
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret ); // 用当前实例中的每一个元素去查找selector，找到了就把结果放入ret数组
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		// ret中可能有重复，这一步是去重操作，并入栈生成新的jQuery实例
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		// 设置新实例的selector属性，为当前实例的selector属性值加上selector参数值
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;  // 返回新实例
	},
	// $().filter
	filddter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	// $().not
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	// $().is
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			// 如果是一个跟位置有关的选择器，会在返回的集合里面检查全体成员
			// 所以如果文档中有两个p元素，$("p:first").is("p:last")不会返回true
			// 如果需要上下文，需要先用字符串selector生成jQuery实例（应该是不能直接用matchesSelector）
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object
// 初始化jQuery对象

// A central reference to the root jQuery(document)
// 一个指向$(document)的引用
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	// 用window获取正确的document
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// 一个简单的途径去校验HTML字符串
	// 优先考虑#id然后tag来防止通过location.hash的XSS攻击？
	// 严格的HTML校验必须开始于'<'
	// match[1] 单个或连续的HTML字符串
	// match[2] id的值
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	/** 
		jQuery实例实际的构造函数
		@param {String|Object|...} selector 选择器字符串或对象等几乎'万物'
		@param {Element} context 上下文对象
	*/
	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		// 处理$(""), $(null), $(undefined), $(false)的情况
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		// 处理HTML字符串
		if ( typeof selector === "string" ) {
			// 如果selector以'<'开头，并以'>'结尾，且长度大于等于3
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				// 假定这个字符串是一个HTML字符串而跳过正则验证
				// 模拟正则exec的结果数组
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			// 匹配HTML或者保证传入#id的时候没有context参数（因为document.getElementById有可能不属于该context）
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				// 处理$(html) -> $(array)的情况（把html字符串变成元素集合）
				// html字符串
				if ( match[1] ) {
					// 获取context对应的元素
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					// 生成一个根据html字符串生成的元素集合，并注入当前jQuery实例的匹配元素
					// scripts参数传入true是为向下兼容（若'真'将保留scripts）
					// 如果parseHTML方法还没有的情况下故意抛出一个错误
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					// 处理$(html, props)的情况（第一个参数是html字符串，第二个参数是一个纯粹对象）
					// var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
					// 如果match[1]是一个无属性的光秃秃的标签，并且context是一个纯粹对象
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						// 遍历context的属性
						for ( match in context ) {
							// Properties of context are called as methods if possible
							// 如果this对应属性是一个函数，运行这个函数，并把context对应属性的属性值当参数传入
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							// 其它情况，给当前jQuery实例设定对应属性
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				// 解决$(#id)的情况（id选择器）
				} else {
					// 根据id获取对应元素
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					// 检查父元素来排除黑莓4.6把不再属于本文档的节点返回的情况
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						// 处理IE跟Opera把name当id返回错误元素的情况
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );  // 用$(document).find
						}

						// Otherwise, we inject the element directly into the jQuery object
						// 其它情况，我们把元素直接注入给当前jQuery对象
						this.length = 1;  // 指定length属性
						this[0] = elem;  // 指定索引属性
					}

					this.context = document; // 指定context属性
					this.selector = selector;  // 指定selector属性
					return this;
				}

			// HANDLE: $(expr, $(...))
			// 处理$(expr, $(...))的情况（第一个参数是一个选择器字符串，第二个参数是一个jQuery实例或者没有第二个参数）
			// 如果没有传入context或者context是一个jQuery实例
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector ); // 用$(context|document).find

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			// 处理$(expr, context)的情况
			// 相当于$(context).find(expr)
			} else {
				// this.constructor === jQuery
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		// 解决$(DOMElement)的情况（参数是一个dom对象）
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		// 解决$(function)的情况（参数是一个函数）
		// 相当于document ready的简写形式
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				// 如果ready还没有的情况下，立即执行该函数
				selector( jQuery );
		}

		// 其余情况（如数组）
		// 如果selector参数是一个对象且有selector属性
		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;  // 指定当前jQuery实例的selector属性
			this.context = selector.context;  // 指定当前jQuery实例的context属性
		}

		return jQuery.makeArray( selector, this );  // 如果selector是一个数组或类数组，将selector每一个索引值注入当前jQuery实例；否则直接把selector本身注入当前selector
	};

// Give the init function the jQuery prototype for later instantiation
// 把jQuery prototype赋给init方法为稍后的实例化
init.prototype = jQuery.fn;

// Initialize central reference
// 初始化核心引用
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/, // :parentsUntil、:parentsAll :prevUntil :prevAll
	// methods guaranteed to produce a unique set when starting from a unique set
	// 这些方法返回的集合保证元素唯一性，不需要去重
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	/**
		$.dir
		根据节点关系（dir）查找元素
		@param {Element} elem 源节点
		@param {String} dir 节点关系，如parentNode
		@param {String|...} until 一个选择器字符串或者对象等，用于判断是否到达查询边缘
		@returns {Array} matched 一个满足条件的元素集合
	*/ 
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ]; // 先获取第一个

		// 循环，当cur存在，并且cur不是document，并且没有until或者cur不是元素节点或者cur不满足until
		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			// 如果是元素节点就放入数组
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];  // 获取下一个
		}
		return matched;
	},

	/**
		$.sibling
		获取elem的所有兄弟节点
		@param {Element} n 第一个子元素
		@param {Element} elem 源节点
		@returns {Array} r 一个满足条件的元素集合
	*/
	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	/**
		$().has
		当前jQuery实例中的元素是否包含传入的目标对象
		@param {Element|...} target 被检查的对象
		@returns {Object} 匹配符合条件元素的jQuery实例
	*/
	has: function( target ) {
		var i,
			targets = jQuery( target, this ), // 根据this获取targets
			len = targets.length;

		// 由于targets中的元素集合并非全部满足，所以过滤
		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				// this包含targets[i]才符合
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	/**
		$().closest
		根据实例中的每一个匹配元素查找离它最近且满足selectors的父元素，并以此生成jQuery实例返回
		@param {String|Element} selectors 选择器字符串或者元素节点
		@param {Element} context 上下文对象
		@returns {Object} 匹配符合条件元素的jQuery实例
	*/
	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],  // 放入匹配元素
			// 如果selectors包含位置伪类或者以连接符开头，或者selectors不是一个字符串，需要根据context生成jQuery实例（应该是不能直接用matchesSelector）
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		// 循环当前实例中的匹配元素
		for ( ; i < l; i++ ) {
			// 往上遍历当前元素i的父级，如果没有超过context，
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				// 始终跳过文档碎片节点
				if ( cur.nodeType < 11 && (pos ?
					// 如果pos是一个jQuery实例，就判定cur是否在该jQuery实例中
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					// 不要把非元素对象传给Sizzle
					cur.nodeType === 1 &&
						// 用matchesSelector进行验证，元素是否满足selectors
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );  // 把匹配元素放入matched
					break; // 由于是最近，找到了就跳出内循环
				}
			}
		}

		// 最终返回匹配符合条件的元素的jQuery实例，如果集合长度大于1需要进行去重操作
		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	/**
		$().index
		确定元素在匹配的元素集合中的位置
		@param {String|Element|Object} elem 用于查找位置或被查找位置的选择器字符串或者元素对象或者jQuery实例
		@returns {Number} 位置索引 如果没有找到返回-1
	*/
	index: function( elem ) {

		// No argument, return index in parent
		// 没有传入参数，返回其在父元素中的索引
		if ( !elem ) {
			// 
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		// 如果elem是一个选择器字符串
		if ( typeof elem === "string" ) {
			// 返回当前实例的第0个元素在以此选择器查找元素的索引
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		// 定位元素的位置
		// element是一个元素对象或者jQuery实例
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			// 如果elem是一个jQuery实例，实例中的第0个匹配元素被使用
			elem.jquery ? elem[0] : elem, this );
	},

	/**
		$().add
		返回一个由当前实例中的匹配元素集合与传入selector、context生成jQuery实例中的元素集合结合的新jQuery实例
		@param {String|Element|...} selectors 选择器字符串或者元素节点等
		@param {Element} context 上下文对象
		@returns {Object} 结合元素而成的新jQuery实例
	*/
	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	/**
		$().addBack
		返回当前实例中的元素集合与当前实例的前一个实例（prevObject）中的元素集合结合的新jQuery实例
		@param {String} selectors 用于筛选的选择器字符串
		@returns {Object} 结合元素而成的新jQuery实例
	*/
	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

// 根据dir获取cur的某一个兄弟元素
function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	// 父元素
	parent: function( elem ) {
		var parent = elem.parentNode;
		// 如果父元素是文档碎片节点，会返回null
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	// 所有祖先元素
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	// 直到满足until条件元素之前的所有祖先
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	// 后一个兄弟元素
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	// 前一个兄弟元素
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	// 后面所有的兄弟元素
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	// 前面所有的兄弟元素
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	// 直到满足until条件元素之前的后面所有的兄弟元素
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	// 直到满足until条件元素之前的前面所有的兄弟元素
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	// 所有兄弟元素
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	// 所有子节点
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	/* 如果是iframe返回iframe的document，否则返回元素的子元素集合 */
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );  // 获取满足条件的元素集合

		// 非'until'，第一个参数是selector
		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );  // 根据选择器字符串进行过滤
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			// 去重
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			// 为:parentsUntil、:parentsAll :prevUntil :prevAll几个方法反转数组顺序
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g); // 非空格



// String to Object options format cache
// 字符串转对象options的缓存
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
// 把字符串形式的options以空格拆分转成对象形式并缓存
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
	以下面的参数创建一个回调队列
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *  options 是以空格区分的可选项用以改变回调队列的行为或者一个更加传统的参数对象
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *  默认的callback是类似一个事件回调集合，并且可以触发多次
 * Possible options:
 // 可能的选项
 *	once:			will ensure the callback list can only be fired once (like a Deferred)  // 保证callback集合只能触发一次，例如Deferred
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)  // 跟踪以前的值，在此后的调用集合中剩余的函数会保留此前最新的一次触发的所带的参数和上下文，例如Deferred
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)  // 保证同一函数只能被添加一次，集合中无重复函数
 *	stopOnFalse:	interrupt callings when a callback returns false  // 当某一回调返回false则打断该集合
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	// 如果是options是字符串, 先从cache中取，若cache中没有创建cache并以空格拆分
	// 如果options是对象直接使用
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		// 标记该集合是否正在触发
		firing,
		// Last fire value (for non-forgettable lists)
		// 保持上一次触发的所带的参数和上下文（针对非遗忘队列）
		memory,
		// Flag to know if list was already fired
		// 标记该集合是否已触发
		fired,
		// End of the loop when firing
		// 在触发时结束循环
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		// 当前正在触发的回调的索引（若有移除动作值将变化）
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		// 第一个回调触发（只供内部add、fireWith方法使用）
		firingStart,
		// Actual callback list
		// 实际的回调集合
		list = [],
		// Stack of fire calls for repeatable lists
		// 供重复触发使用
		stack = !options.once && [],
		// Fire callbacks
		// 触发回调
		fire = function( data ) {
			memory = options.memory && data;  // 在memory的情况下保留上一次触发的所带的参数和上下文
			fired = true;  // list只能触发一次，stack可以触发n次;options.once无法重复触发
			firingIndex = firingStart || 0;  // 若有新添加回调并立即触发，则firingIndex可能不为0
			firingStart = 0;  // firingStart恢复为0
			firingLength = list.length; // 触发长度
			firing = true;  // 标记正在触发中
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				/*
					list[ firingIndex ].apply( data[ 0 ], data[ 1 ] )
					data[0]为运行上下文context，
					data[1]为其它参数
				*/
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add // 清除memory主要是避免新添加进来的回调会继续触发
					break; // 如果某一个回调返回了false并且option设置了‘stopOnFalse’就停止继续触发
				}
			}
			firing = false; // 将正在触发状态位置为false
			if ( list ) {  // list未被废弃
				if ( stack ) {  // options.once == false
					if ( stack.length ) {  // 在刚才firing过程中有新fireWith调用
						fire( stack.shift() );
					}
				} else if ( memory ) {  // options.memory == true && options.once == true
					list = [];  // memory的情况下，list还能添加新的回调触发。但由于once只能触发一次所以把前期的回调移除
				} else {    // options.memory == false && options.once == true
					self.disable(); // 废弃该list
				}
			}
		},
		// Actual Callbacks object
		// 实际的回调对象
		self = {
			// Add a callback or a collection of callbacks to the list
			// 添加一个回调或回调集合到回调list
			add: function() {
				// 只有当list未被废弃的时候才能添加
				if ( list ) {
					// First, we save the current length
					// 先保存当前的长度
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) { 
									list.push( arg ); // options.unique为‘假’直接添加；为‘真’并且没有重复则添加
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );  // 针对数组递归添加
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					// 如果该list正在被触发，则刷新list的长度使新添加的回调能在此轮被触发
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					// 如果存在memory，则将新添加回调触发一次并传入memory
					} else if ( memory ) {
						firingStart = start;  // firingStart从新添加的第一位开始
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			// 从list中移除回调
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {  // 由于list中可能有重复，所以必须完全遍历
							list.splice( index, 1 );
							// Handle firing indexes
							// 如果此list正在被触发
							if ( firing ) {
								// 如果被删除的索引小于/等于该触发的长度，则触发长度减1
								if ( index <= firingLength ) {
									firingLength--;
								}
								// 如果正在被触发函数的索引大于被删除的所以，被触发函数的索引减1
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			// 当fn存在，判断list中是否有fn；当参数为空，判断list是否存在
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			// 将回调list清空
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			// 将list废弃
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			// list是否被废弃
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			// 给list加锁
			lock: function() {
				stack = undefined;  // stack被清除，所以不能执行新触发
				// 非memory，废弃该list
				// memory的情况下，不废弃该list，还会继续里面的队列执行
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			// list是否被锁
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			/*
				用给定上下文和参数的触发list
				@param context 运行上下文
				@param args 其它参数
			*/
			fireWith: function( context, args ) {
				// 只有在该list未被废弃或者list未曾触发或允许重复触发
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];  // args第一个参数为运行上下文，第二个参数为运行参数
					if ( firing ) {
						stack.push( args );  //若该list正在触发，就放入stack中稍后触发
					} else {
						fire( args );  // 否则直接触发
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			/*
				用给定的参数运行回调队列
			*/
			fire: function() {
				// this == self
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			// 确定该list是否至少被触发过一次
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({
	// Deferred 链式回调
	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],  // 解决，每个回调只能执行一次但是可以添加新触发
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],  // 拒绝，每个回调只能执行一次但是可以添加新触发
				[ "notify", "progress", jQuery.Callbacks("memory") ]  // 唤醒  每个回调可以执行n次
			],
			state = "pending",  // 状态 => pending | resolved | rejected 
			/*
				promise = {
					state:
					always:
					then:
					promise:
					pipe:
					done:
					fail:
					progress:
				}
			*/
			promise = {
				// 返回当前状态
				state: function() {
					return state;
				},
				// 不管done或fire都会执行
				always: function() {
					// typeof arguments == function
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments; // fnDone, fnFail, fnProgress 成功、失败、唤醒
					/* 
						这里的‘function( newDefer ) {...’会立即执行
					*/
					return jQuery.Deferred(function( newDefer ) {
						/*
							var tuples = [
								[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
								[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
								[ "notify", "progress", jQuery.Callbacks("memory") ]
							],
						*/
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ]; // 对应fnDone, fnFail, fnProgress
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							// deferred[ tuple[1] ] = list.add  添加当前defer的相关回调规则
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								// 如果被触发的fnDone, fnFail或fnProgress有返回，并且返回的是一个promise,则根据promise的回复规则触发下一个newDefer的相应回调
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									// 否则直接连续调用同样规则的回调
									// 有传入上下文的情况下就fireWith该上下文，否则将newDefer.promise作为上下文
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;  // 防止内存溢出
					}).promise();  // 返回promise可连缀
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				// 把传入的对象赋予promise的属性或者说扩展当前promise，若传入对象为空则直接返回当前promise
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		// 保留pipe为向下兼容
		promise.pipe = promise.then;

		// Add list-specific methods
		// 添加一系列指定的方法
		/*
			var tuples = [
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
		*/
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ], // jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), jQuery.Callbacks("memory")
				stateString = tuple[ 3 ];  // resolved | rejected

			// 添加回调
			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			// 改变状态
			if ( stateString ) { // resolved | rejected
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				// i ^ 1 进行交换位置
				// 1 ^ 1 = 0, 0 ^ 1 = 1
				// lock不能再添加新回调，但会继续触发已有回调
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				// 有传入上下文的情况下就使用该上下文，否则将newDefer.promise作为上下文
				// list.fireWith( this === deferred ? promise : this, arguments )
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		// 令deferred化身为一个promise
		promise.promise( deferred );

		// Call given func if any
		// 如果传入了func就立刻运行
		// 比如promise.then中的新defer
		// 也可以把整个逻辑就写在这个function里面
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		// 返回deferred，因为具有promise属性所以可连缀
		return deferred;
	},

	// Deferred helper
	/*
		当所有函数运行完毕之后，触发回调
		@param subordinate, ..., subordinateN 函数运行的结果集
		@returns {Object} defer
	*/
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ), // 把传入的函数返回值集合参数转为函数数组
			length = resolveValues.length,

			// the count of uncompleted subordinates
			// remaining在数组长度不为1或者subordinate是一个defer的情况下为数组length，其它情况为0
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			// 如果返回值只有单个Deferred，就用它作为主Deferred，否则创建一个deferred
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			/*
				为返回值是defer的情况下，更新主defer的resolve和progress的执行上下文和参数
				@param {Number} i 当前defer的索引
				@param {Object} contexts 回调执行的上下文集合,
				@param {Array} values 回调执行的参数集合
			*/
			updateFunc = function( i, contexts, values ) {
				// 任意promise的done或者progress会调用
				return function( value ) {
					contexts[ i ] = this;  // 保存当前执行上下文
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;  // 保存当前参数
					if ( values === progressValues ) { // 如果当前是progress调用，则唤醒一次
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {  // 函数组执行完毕
						deferred.resolveWith( contexts, values ); // contexts对应索引保存每个defer的回调执行上下文，values对应索引保存每个defer的回调执行参数
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		// 只有当传入一个大于0的函数运行集合
		if ( length > 1 ) {
			progressValues = new Array( length );  // 唤醒值的集合
			progressContexts = new Array( length ); // 唤醒上下文
			resolveContexts = new Array( length );  // 解决上下文
			// 循环处理传入的函数运行结果集合
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					// 当传入的任何一个函数运行返回值是一个defer的情况下，只要fail了整个deferred就reject
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )  // 一个返回defer解决
						.fail( deferred.reject )  // 一个返回defer拒绝，整个主defer被拒绝
						.progress( updateFunc( i, progressContexts, progressValues ) ); // 一个返回defer唤醒
				} else {
					// 不是defer的情况下，直接把剩余值减一
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		// 如果所有函数执行都没有返回defer，立即调用主defer的resolve
		// 上下文(resolveContexts)是一个空数组，参数(resolveValues)是一个所有函数执行的返回值
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}
		
		return deferred.promise();
	}
});


// The deferred used on DOM ready
// DOM就绪使用的defer
var readyList;

/**
	$().ready
	添加dom就绪回调函数
	@param {Function} fn 就绪后的回调函数
*/
jQuery.fn.ready = function( fn ) {
	// Add the callback
	// 添加回调
	// jQuery.ready.promise() = readyList.promise( obj )
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	// DOM是否就绪，只会设置一次true
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	// 一个计数器去追踪还要等待多少项目才能触发ready事件
	readyWait: 1,

	// Hold (or release) the ready event
	// '挂起'（或释放）ready事件
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	/**
		$.ready
		DOM就绪的回调
		@param {Boolean} wait 是否等待'挂起'
	*/
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		// 如果有'挂起'或者已经ready，取消
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		// 保证body存在，至少针对IE有时候比较'冲动'
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		// 标记dom已经就绪
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		// 如果一个DOM Ready事件被触发，减少一次等待量；如果未完，继续等待
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		// 如果有函数绑定，执行，上下文为document
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		// 触发任意绑定'ready'事件
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );  // 只触发一次
		}
	}
});

/**
 * Clean-up method for dom ready events
 清除dom ready事件
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
dom ready事件处理函数和自行清除ready事件绑定
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	// 在老IE，readyState === "complete"已经足够我们去调用dom ready了
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		// 如果document.readyState已经是'complete'
		// 解决在浏览器事件发生后$(document).ready()被马上调用
		// 我们曾经试图用readyState交互，但是后来发生了一些问题例如其中一个被ChrisS发现的http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			// 异步处理让ready延迟
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		// 支持DOMContentLoaded的标准浏览器
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			// 使用方便的事件回调
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			// 回退到window.onload保证一定会执行
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		// 如果IE事件模型被使用
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			// 保证先于onload触发，也许迟但是对iframes同样安全
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			// 回退到window.onload保证一定会执行
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			// 针对IE并且不是框架，不断检测的方式来判断document是否就绪
			var top = false;

			try {
				// window.frameElement：返回嵌入当前window对象的元素(比如 <iframe> 或者 <object>),如果当前window对象已经是顶层窗口,则返回null
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}
			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						// ie有个特有的doScroll方法，当页面DOM未加载完成时，调用doScroll方法时，就会报错，反过来，只要一直间隔调用doScroll直到不报错，那就表示页面DOM加载完毕了
						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						// 解绑所有ready方法
						detach();

						// and execute any waiting functions
						// 执行ready方法
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// strundefined = 'undefined'
var strundefined = typeof undefined;

// Support: IE<9
// Iteration over object's inherited properties before its own
// 支持：IE<9
// 迭代对象的继承属性先于本身属性
var i;
for ( i in jQuery( support ) ) {
	break;  // 只迭代到第一个就跳出
}

// jQuery实例第一个属性名为第一个元素的索引值，所以如果第一个属性名不为'0'说明自己的属性在后头
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
// 注意：大部分兼容性测试定义在它们各自的模块
// 先把inlineBlockNeedsLayout设置为false直到测试以后
support.inlineBlockNeedsLayout = false;  // 是否block元素设置为inline需要layout

// Execute ASAP in case we need to set body.style.zoom
// 执行ASAP，因为我们可能需要设置body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		// 针对frameset文档没有body的情况，返回
		return;
	}

	// Setup
	// 部署
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );
	// 如果div.style.zoom不为undefined，即支持zoom
	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		// 支持：IE<8
		// 检查是否给一个块级元素设置display为'inline'后表现出inline-block的特性
		/*
			display:inline;
			margin:0;
			border:0;
			padding:1px;
			width:1px;
			zoom:1
		*/
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
		// offsetWidth = borderWidth + padding + width
		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		// 如果div宽度为3
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			// 防止IE6影响定位元素的布局
			// 防止IE7模式下的body收缩？
			// 支持 IE<8 给body设置zoom=1
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	// 只有当以下兼容性检测没有在其它模块执行过才测试
	if (support.deleteExpando == null) {
		// Support: IE<9
		// 假定支持删除扩展属性
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			// 不支持删除扩展属性
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	// IE中防止内存泄露
	div = null;
})();


/**
 * Determines whether an object can have data
 检查是否一个对象可以拥有data
 */
jQuery.acceptData = function( elem ) {
	/*
		noData: {
			"applet ": true,
			"embed ": true,
			// ...but Flash objects (which have this classid) *can* handle expandos
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		}
	*/
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	// 不要把data设置在非元素DOM节点上面因为不能被清除掉
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		// 对于元素节点，如果没有指定说明接受data；拒绝的情况也是分条件的
		// 如果没有指定不能接受data，或者制定了但元素的classid属性是noData的值（针对object）
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,  // 这样的形式：{...}或者[...]，JSON字符串
	rmultiDash = /([A-Z])/g;  // 任意大写字母

/**
	获取data-*上面的属性值，并把属性值为null的变成undefined
*/
function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	// 如果内部data什么都没有找到，试着用HTML5的data-*属性来获取
	if ( data === undefined && elem.nodeType === 1 ) {
		// 把驼峰key变成连接符key
		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					// 如果data是数字，把它转成number
					+data + "" === data ? +data :
					// JSON字符串
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			// 我们在data中设置这个数据以保证它后面不会改变
			jQuery.data( elem, key, data );

		} else {
			data = undefined;  // 针对IE11+ data有可能为null
		}
	}

	return data;
}

// checks a cache object for emptiness
// 检查一个缓存对象是否为空
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		// 如果公共的data对象是空的，私有的也一样是空的
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {  // toJSON是我们自己加的方法可以不算
			return false;  // 不为空
		}
	}

	return true;
}

/**
	设置或获取内部data
	@param {Element|Object} elem 要设置data的元素节点或对象
	@param {String|Object|Function} 要取或设置data的属性名，或者用于扩展data库的对象或方法（相当于批量操作）
	@param {Object|...} data 要设置的data
	@param {Boolean} pvt 是否获取或扩展cache本身而不是里面的data（仅仅内部使用）
*/
function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	// 如果元素不支持添加data，返回之
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando, // 内部键名

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		// 我们不得不区别对待dom节点跟JS对象，因为IE6-7不能正确回收在DOM-JS之间的对象
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		// 只有DOM节点需要全局jQuery缓存，JS对象数据直接添加给对象本身故而垃圾回收可以自动执行
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		// 针对JS对象和dom对象用不同的方式获取对象上面的data ID
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	// 当我们是获取data，如果对象上没有任何data的时候，避免做过多的事
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;  // 直接返回
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		// 只有DOM节点需要一个新的唯一性ID，所有data都放在global cache里面
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++; // 先从deletedIds里面取，没有才创建新的
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		// 避免在一个纯粹对象上面使用JSON.stringify序列化时暴露jQuery元数据
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };  // 覆盖toJSON方法
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	// 一个对象可以通过jQuery.data代替键值对；浅复制到现有的缓存？
	// 如果name是对象或方法，直接扩展到cache或data
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	// jQuery data()是存放在一个隔离开的对象上面而不是直接对象内部data缓存，目的是避免出现内部data跟用户自定义data键名冲突
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;  // 指定data
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	// 检查已经进行驼峰转换或未转换的data属性名
	// 如果name是字符串
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		// 首先尝试直接取
		ret = thisCache[ name ];

		// Test for null|undefined property data
		// 没取到
		if ( ret == null ) {

			// Try to find the camelCased property
			// 尝试用转驼峰后再取
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;  // 如果name不是字符串，返回整个缓存data
	}

	return ret;
}

/**
	移除内部data
	@param {Element|Object} elem 要移除data的元素节点或对象
	@param {String|Array} 要取或设置data的属性名字符串或数组
	@param {Boolean} pvt 是否删除cache本身而不是里面的data（仅仅内部使用）
*/
function internalRemoveData( elem, name, pvt ) {
	// 如果元素不支持添加data，返回之
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		// 看jQuery.data方法获取更多信息
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	// 如果已经没有这个对象的缓存条目，则没有继续的必要
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			// 支持数组或空格分开的字符串name作为data的键
			// 如果name不是数组
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				// 在开始任何操作之前先尝试把name字符串作为一个键名
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					// 除非一个键名存在空格，否则用空格分割转驼峰的name
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				// 如果name是键名数组
				// 当data是初始创建，通过("key", "val")标识？，
				// 键名会进行驼峰转换
				// 由于没有一个方法获悉究竟某个键名是不是由驼峰添加，故我们把两种形式的键名都纳入
				// 这只会对参数为数组形式不利？
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];  // 根据name删除data
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			// 如果已经没有data剩余在cache，我们希望继续销毁cache对象本身
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	// 看jQuery.data方法获取更对信息
	if ( !pvt ) {
		delete cache[ id ].data; // 删除整个data

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		// 不要销毁父cache直到内部data对象已经是唯一剩下的东西
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	// 摧毁cache
	// 如果是node节点
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );  // 清除elem上面的所有data

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	// 使用delete当支持expandos或者‘缓存’不是window？
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	// 当什么都没剩了，清除引用
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {}, // jQuery缓存

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	// 下面这些元素，带空格的后缀避免Object.prototype的属性冲突
	// 如果你试图给他们设置扩展属性将抛出uncatchable异常
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		// 针对Flash objects（拥有下面这个属性值的classid属性）‘可以’扩展属性
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	// 某元素是否拥有扩展属性
	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},
	// 根据name设置或获取elem的data
	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},
	// 根据name删除elem的data
	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	// 根据name设置或获取elem的cache
	// 仅仅内部使用
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	// 根据name删除elem的cache
	// 仅仅内部使用
	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	/*
		$().data
		添加或获取元素data
	*/ 
	data: function( key, value ) {
		var i, name, data,
			elem = this[0], // 第0个元素
			attrs = elem && elem.attributes;  // 第0个元素所有的属性

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves
		// 用jQuery.access方法处理遇到麻烦所以我们自己实现？

		// Gets all values
		// 获取全部values（第0个元素）
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				// 如果是元素节点并且未进行属性的整顿
				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						// 针对IE11+
						// 属性成员可能为null
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );  // 如果内部data什么都没有找到，尝试用html5的data-*来获取，并设置到内部data；以及把属性值为null的变成undefined
							}
						}
					}
					// 标记该元素已经进行属性的整顿
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		// 设置多value的情况
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			// 设置单value的情况
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			// 获取一个value
			// 先尝试从内部data获取，然后再用data-*
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	/*
		$().removeData
		根据key删除元素data
	*/ 
	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	/*
		$.queue
		入队和获取队列
		@param {Element} elem 元素节点
		@param {String} 队列名不包含后缀
		@param {Function|Array} 要入队的方法或方法集合
	*/
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";  // 默认type fxqueue
			queue = jQuery._data( elem, type );  // 获取元素的type队列

			// Speed up dequeue by getting out quickly if this is just a lookup
			// 入队
			if ( data ) {
				// 若尚无队列或者data是一个数组
				if ( !queue || jQuery.isArray(data) ) {
					// 新建type队列，并放入data入队
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					// 入队
					queue.push( data );
				}
			}
			// 返回队列
			return queue || [];
		}
	},

	/*
		$.dequeue
		出队
	*/
	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),  // 元素的type队列
			startLength = queue.length, // 当前队列长度
			fn = queue.shift(),  // 取出队列第一个方法
			hooks = jQuery._queueHooks( elem, type ), // 获取或设置当前type队列的清除钩子函数
			// 下一次出队的方法
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		// 如果fx已经被出队，总是移除状态位
		if ( fn === "inprogress" ) {
			fn = queue.shift();  // 取出下一个方法
			startLength--;  // 长度减一
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			// 添加一个进行中的状态位来阻止fx队列自动出队
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			// 清除上一次queue的stop方法（stop：用于清除延迟队列计时器的方法）
			delete hooks.stop;
			fn.call( elem, next, hooks );  // 运行队列方法，传入下一次出队方法和钩子
		}
		// 如果队列长度为0，用钩子对象清除该队列data
		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	// 创建一个不对外公开的队列钩子对象，或者返回当前钩子
	// 返回清除type队列data的defer
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" ); // 移除elem的type队列
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	/**
		$().queue
		入队方法
	*/
	queue: function( type, data ) {
		var setter = 2;

		// 只传入一个参数或没有传参数
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";  // 默认fx
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );  // 获取type的队列
		}

		return data === undefined ?
			// 没有传参，返回this
			this :
			// 入队
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				// 保证一个该队列的钩子对象
				jQuery._queueHooks( this, type );

				// 如果是fx队列且队列没有进行
				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );  // 立即出队下一个函数执行
				}
			});
	},
	/**
		$().dequeue
		出队方法
	*/
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	/**
		$().clearQueue
		清空队列方法
	*/
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	// 获取一个promise当type队列空了以后触发（fx是默认type）
	promise: function( type, obj ) {
		var tmp,
			count = 1,  // 所有元素的type队列钩子对象数量多一
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			// 触发解决函数
			resolve = function() {
				if ( !( --count ) ) {  // 当所有元素的type队列钩子对象都解决以后
					defer.resolveWith( elements, [ elements ] );  // 触发本defer回调
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			// 如果元素type队列存在钩子对象并且具有empty方法
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve ); // 添加解决函数
			}
		}
		resolve();  // 触发一次，如果不存在元素type队列钩子对象，将立即触发本defer回调
		return defer.promise( obj );
	}
});

//类似这种形式 '+-123.12E - 34'（并非每一部分都必须）
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];  // CSS扩展 例如marginLeft等

// 元素是否隐藏
var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		// isHidden有可能被从jQuery#filter方法调用，那时，element将是第二个参数
		elem = el || elem;
		// 如果元素本身是隐藏或者元素不在本文档
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
/*
	针对一个集合get和set的多功能方法，并且当value是一个function的时候可以自动执行
	@param {ArrayLike} elems 元素集合
	@param {Function} fn 赋值逻辑函数
	@param {String|Object} key 属性名或者赋值的键值对对象
	@param {String|Function} value 值或赋值函数
	@param {Boolean} chainable 是否可以连缀 当取值的时候不连缀 赋值的时候进行连缀
	@param {...} emptyGet 如果elems长度为0的返回值
	@param {Boolean} raw 标记value是否是一个执行函数
	@returns {ArrayLike|...} 如果是赋值，返回elems连缀；如果是获取，返回value
*/
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;  // 如果key为null，bulk为true

	// Sets many values
	// 设置多value
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;  // 可连缀
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	// 设置单value
	} else if ( value !== undefined ) {
		chainable = true;  // 可连缀

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		// 没有key
		if ( bulk ) {
			// Bulk operations run against the entire set
			// 如果value不是一个执行函数，批量运行整个集合
			if ( raw ) {
				fn.call( elems, value );
				fn = null;  // fn = null 后面不会再次执行

			// ...except when executing function values
			// value为函数的情况
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );  // 只用value未有key
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				// 赋值
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) /* 第三个参数：当前值 */ ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			// 如果length >= 0 则取的是elems[0]的样式
			// 否则返回emptyGet
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i); // :checkbox、:radio



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	// 部署
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	// 当使用.innerHTML时IE会自动去掉头部的空格
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	// 保证tbody元素不被自动插入
	// IE将在空表格中插入
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	// 保证使用innerHTML时link元素被正确序列化
	// 对于IE需要一个wrapper元素
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	// 保证克隆一个html5元素不会出问题
	// 当outerHTML未定义这仍然有效
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	// 检测是否一个离线checkbox在追加到DOM上以后它将保持它以前的选中状态(IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	// 保证textarea (以及checkbox)的默认值被正确克隆
	// 支持：IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	// 当name属性在checked属性之后，webkit丢失选中状态
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	// 支持：Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// 老WebKit在文档碎片中不正确克隆选中状态
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	// 支持：IE<9
	// opera不克隆事件（以及typeof div.attachEvent === undefined）
	// IE9-10克隆通过attachEvent绑定的事件，但不能通过.click()触发
	support.noCloneEvent = true; // 是否支持不克隆事件
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	// 运行以下测试仅仅在尚未在其它模块中测试过
	// 元素支持删除（delete）扩展属性
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	// 支持：IE<9（缺少submit/change冒泡），Firefox 23+（缺少focusin事件）
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window /* window中有相应事件的属性名 */) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			// 当心内容安全策略限制（https://developer.mozilla.org/zh-CN/docs/Web/Security/CSP）
			/*
				内容安全策略 (CSP, Content Security Policy) 是一个附加的安全层，用于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注入等攻击。 这些攻击可用于实现从数据窃取到网站破坏或作为恶意软件分发版本等用途。

				尽管内容安全策略在 Firefox 4 中已经包含，使用 X-Content-Security-Policy 头部来实现，但它使用的是过时的 CSP 标准。Firefox 23 包含了更新的 CSP 实现，使用的是 W3C CSP 1.0 标准中描述的没有前缀的 Content-Security-Policy 头部和指令。
			*/
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;  // 不懂
		}
	}

	// Null elements to avoid leaks in IE.
	// 解除引用，防止IE内存泄漏
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i, // form元素
	rkeyEvent = /^key/,  // 跟键盘有关的事件
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,  // 跟鼠标有关的事件
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, // :focusinfocus、:focusoutblur
	/*
		方法名以及命名空间，例如：click.foo，二者单独存在也可匹配
		捕获1：方法名
		捕获2：命名空间
	*/
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

// 返回true的函数
function returnTrue() {
	return true;
}

// 返回false的函数
function returnFalse() {
	return false;
}

// 安全地获取当前文档活动元素
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
 /*
	管理事件的辅助方法类--并非公共接口的一部分
	从Dean Edward的addEvent库获得大量灵感
 */
jQuery.event = {
	// 跟踪已经被监听的事件类型，用于优化
	global: {},
	/*
		添加事件监听
		@param {Element|Object} elem 要绑定事件的元素
		@param {String} types 空格隔开的事件名（和命名空间）
		@param {Function|Object} handler 监听事件或者自定义包含监听和selector的对象
		@param {Object} data 额外的事件数据
		@param {String} selector 事件委托者的选择器字符串
	*/
	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );  // 根据name设置或获取elem的cache

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		// 不要在不支持data或者文本/注释节点上面绑定事件（但允许纯粹对象）
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		// 调用者可以传一个自定义data的对象来代替handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;  // 获取实际的handler（监听函数）
			selector = handleObjIn.selector; // 获取实际的selector
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		// 确保handler拥有一个独一无二的ID，用于稍后的查找事件和删除事件
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		// 如果是第一次运行，初始化元素的事件模型和主handler
		if ( !(events = elemData.events) ) {
			events = elemData.events = {}; // 存放事件-监听键值对
		}
		if ( !(eventHandle = elemData.handle) ) {
			// 主handler（监听中枢）
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				// 丢弃jQuery.event.trigger()的二次触发以及当页面已经卸载后的触发调用
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			// 把当前元素当做一个handle函数属性添加来阻止IE的非原生事件的内存泄漏
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// 处理空格隔开的多事件情况
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1]; // 事件名
			namespaces = ( tmp[2] || "" ).split( "." ).sort(); // 命名空间集合

			// There *must* be a type, no attaching namespace-only handlers
			// 事件名必不可少，不要添加那种只有命名空间的handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			// 如果事件改变了其类型，用特别事件监听来应对改变的type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			// 若参数selector有定义，决定特别事件的接口类型，否则就是传入类型
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			// 基于新确定的type更新特别事件监听
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			// handleObj是传递给所有的事件处理程序
			handleObj = jQuery.extend({
				type: type,  // 事件类型（可能被special修改）
				origType: origType,  // 原始类型（用户传入）
				data: data,  // 额外data
				handler: handler,  // 监听函数
				guid: handler.guid,  // 监听函数唯一性ID
				selector: selector,  // 事件委托者的选择器字符串
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ), // 当前事件委托者的选择器字符串是否需要一个上下文元素
				namespace: namespaces.join(".")  // 以'.'相连的命名空间字符串
			}, handleObjIn /* 如果有，是调用者自定义handler和selector */);

			// Init the event handler queue if we're the first
			// 如果我们是第一次，初始化事件监听队列
			if ( !(handlers = events[ type ]) ) {  // events = elemData.events
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;  // 被委托次数

				// Only use addEventListener/attachEvent if the special events handler returns false
				// 仅仅在特别事件handler返回false才使用addEventListener/attachEvent
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					// 在元素上面绑定主handler（中枢）
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			// 添加元素的监听函数队列，事件委托在前面
			if ( selector ) {
				// 如果是事件委托，放在紧邻上一次最后一个委托的位置后面，并把委托数加1
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				// 直接放入数组末尾
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			// 跟踪已经被使用的事件，用于事件优化
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		// 解除引用，防止IE内存泄漏
		elem = null;
	},

	// Detach an event or set of events from an element
	/*
		移除事件监听或事件监听集合
		@param {Element|Object} elem 要移除事件的元素
		@param {String} types 空格隔开的事件名（和命名空间）
		@param {Function} handler 监听事件
		@param {String} selector 事件委托者的选择器字符串
		@param {Boolean} mappedTypes 解绑所有类型
	*/
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem ); // 根据name设置或获取elem的cache

		// 没有cache或者没有事件绑定，直接返回
		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		// 获取'类型.命名空间'的数组，类型可以省略
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];  // 事件名
			namespaces = ( tmp[2] || "" ).split( "." ).sort();  // 命名空间集合

			// Unbind all events (on this namespace, if provided) for the element
			// 如果没有type，解绑一个元素的所有事件（对应相应命名空间，如果有）
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {}; // 根据type获取特别事件对象
			type = ( selector ? special.delegateType : special.bindType ) || type; // 获取绑定的type
			handlers = events[ type ] || [];  // 监听函数队列
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ); // 生成namespace匹配正则

			// Remove matching events
			// 移除匹配的事件监听
			origCount = j = handlers.length;  // 监听函数队列的长度
			while ( j-- ) {
				handleObj = handlers[ j ];
				// 如果删除所有类型或者原始事件名匹配，并且没有handler或者handler的guid匹配，并且没有命名空间或者命名空间匹配，并且没有委托选择器字符串或者选择器字符串匹配或者选择器为通配符'**'且当前事件对象有被委托
				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );  // 将监听函数从队列里面移除

					if ( handleObj.selector ) {
						handlers.delegateCount--;  // 如果是事件委托，就把委托数减1
					}
					// 如果是特别事件并且有remove方法，调用
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			// 如果监听队列没有函数剩余，则移除整个监听中枢（在删除特别事件处理程序时避免无休止的递归调用）
			if ( origCount && !handlers.length ) {
				// 先调用特别函数处理的teardown（移除事件）方法，只有它返回了false
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle ); // 才使用传统事件解绑
				}

				delete events[ type ]; // 在事件扩展data中删除对应type的对象
			}
		}

		// Remove the expando if it's no longer used
		// 如果事件data中未有剩余，删除它
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			// removeData方法同样会移除空对象，所以用它替代delete
			jQuery._removeData( elem, "events" );
		}
	},

	/**
		手动触发事件
		@param {String|Event} event 要触发的事件
		@param {Object} data 额外的事件参数
		@param {Element|Object} elem 要触发事件的元素
		@param {Boolean} onlyHandlers 是否只触发绑定在本元素上的handler（不冒泡）
	*/
	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,  // 根据event是对象还是字符串获取触发type
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : []; // 触发的命名空间

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		// 不要在文本节点或注释节点上面触发事件
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		// focus/blur变成focusin/out；保证我们不马上触发它们？
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			// 命名空间触发；创建一个正则表达式在handle()匹配事件类型
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		// 如果type中没有":"就给type前头加上"on"赋值给ontype
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		// 封装jQuery的事件对象，使之符合W3C规范
		// 调用者可以传入一个jQuery.Event或者一个Object或者一个type字符串
		event = event[ jQuery.expando ] ?
			// jQuery.Event的情况
			event :
			// 根据event对象和type字符串创建jQuery.Event实例
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		// 触发掩码：& 1 为原生事件监听；& 2 为jQuery事件监听（总为真）
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");  // 将命名空间集合变成以'.'连接的字符串
		// 命名空间生成的匹配正则
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		// 清除event的result让它重复使用
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;  // 设置target
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		// 克隆任何传入data，生成数组，并将event追加其后来创建handler的参数集合
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		// 允许特别事件外线执行
		special = jQuery.event.special[ type ] || {};
		// 如果只触发handler并且特别事件的trigger返回了false
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return; // 让special.trigger来触发
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		// 提前确定事件的传播路径
		// 冒泡到document然后window
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type; // 冒泡类型
			// rfocusMorph = /^(?:focusinfocus|focusoutblur)$/
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur ); // 添加路径
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			// 只有在我们得到document的时候加入window（例如非纯粹对象或离线DOM）
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		// 基于事件路径触发监听
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() /* 没有阻止冒泡 */ ) {

			event.type = i > 1 ?
				bubbleType : // 冒泡类型
				special.bindType || type;  // 绑定类型

			// jQuery handler
			// 基于jQuery事件绑定的的handler函数
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );  // 执行handler方法
			}

			// Native handler
			// 非jQuery绑定的事件监听（原生JS）
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault(); // 阻止默认行为
				}
			}
		}
		// 还原event.type
		event.type = type;

		// If nobody prevented the default action, do it now
		// 如果没有阻止事件的默认行为，执行elem的默认行为
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {
			// 如果没有特别事件的_default或者特别事件的_default方法返回false，并且elem可以接受data
			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// 在target上面根据event的name调用原生DOM方法
				// 不能用.isFunction()方法来检查因为IE6/7不能成功测试
				// 不要在window上面实施默认行为，那里是全局变量？
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					// 不要重复触发ontype事件，我们调用type的方法
					// 把ontype保存起来先
					tmp = elem[ ontype ];

					// 去掉elem上面绑定的ontype事件
					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					// 防止重复触发相同的事件，前面我们已经冒泡过了
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
						// IE<9在将focus/blur作用域隐藏元素上面时会报错
						// 仅仅在WinXP上的原始IE8会，IE9上的IE8模式不会
					}

					// 还原各种变化
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}
		// 返回最终的result
		return event.result;
	},

	/**
		处理一个事件
		@param {Event} event 原始是事件对象
	*/
	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		// 由原生事件对象生成一个可写的jQuery.Event实例
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],  // 当前事件的监听队列
			special = jQuery.event.special[ event.type ] || {};  // 特别事件类型

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		// 用标准化的jQuery.Event实例来替代只读的原生事件对象
		args[0] = event;
		event.delegateTarget = this; // 代理目标

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		// 根据映射的type调用特别事件的preDispatch（预执行）钩子，如果需要的话让其代理
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		// 确定它的触发队列
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		// 循环运行事件队列
		// 首先运行代理事件，它们可能会阻止事件冒泡
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;  // 当前目标元素

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				// 触发事件必须满足以下条件之一
				// 1）没有命名空间
				// 2）有命名空间且匹配
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;  // event.data可以获取到额外传入的data

					// 调用监听函数
					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args ); // args第一个元素为jQuery.event对象

					if ( ret !== undefined ) {
						// 返回false 阻止冒泡和默认行为
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		// 对映射的type调用特别事件的后处理函数
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// 确定本次事件触发的监听队列
	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [], // 最终的触发队列
			delegateCount = handlers.delegateCount,  // 代理次数
			cur = event.target; // 触发事件的元素

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		// 确定代理handlers
		// 黑洞SVG实例树？
		// 避免在火狐中的非左键点击冒泡？
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) { // this代表绑定事件的元素
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				// 不要检查非元素节点
				// 不要处理disabled元素的点击事件
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						// 不要跟Object.prototype的属性名冲突
						// 在选择器字符串后面加一个空格，这不影响sizzle选择器的结果（它会自动帮你去掉）
						sel = handleObj.selector + " ";

						// 根据委托对象的选择器字符串匹配元素数量，把选择器字符串作为matches的属性，值为匹配结果
						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						// 如果匹配，就把此handleObj（事件监听对象）放入matches
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					// 将满足本次事件触发的监听对象集合以及事件元素放入触发队列
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		// 添加绑定元素本身的监听，如果存在
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	/*
		根据原始事件对象生成jQuery封装事件对象，并根据具体事件类型完善和标准化事件属性
		@param {Event} event 原生事件对象
		@returns {Event} jQuery.event实例
	*/
	fix: function( event ) {
		// 如果已经fix，直接返回
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		// 创建一个可写的event对象副本并标准化一些属性
		var i, prop, copy,
			type = event.type,
			originalEvent = event, // 原始事件
			fixHook = this.fixHooks[ type ];  // 根据type获得fix钩子对象

		// 如果不存在该type的fix钩子对象
		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				// rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/ 跟鼠标点击有关的事件
				rmouseEvent.test( type ) ? this.mouseHooks :
				// rkeyEvent = /^key/,  跟键盘有关的事件
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props; // 获取完整的当前事件需要的属性

		event = new jQuery.Event( originalEvent );  // 生成标准的jQuery事件对象

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ]; // 根据copy将原始事件里面的相关属性赋给jQuery事件对象
		}

		// Support: IE<9
		// Fix target property (#1925)
		// 支持：IE<9
		// 修复target属性
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document; // e.srcElement是IE专属
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		// 支持：Chrome 23+, Safari?
		// target不能是文本节点
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;  // 文本节点的父节点
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		// 支持：IE<9
		// 针对鼠标/键盘事件，如果metaKey是undefined，变成false
		event.metaKey = !!event.metaKey;

		// 运行事件过滤器（如果存在）并返回该event对象
		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// 包含一些键盘和鼠标共享的事件属性
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	// 键盘事件的fix钩子
	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			// 添加键盘事件的which
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;  // which = charCode || keyCode
			}

			return event;
		}
	},

	// 鼠标事件的fix钩子
	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement; // 来自哪个元素

			// Calculate pageX/Y if missing and clientX/Y available
			// 计算如果pageX/Y缺失，通过clientX/Y计算如图它们存在
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			// 如果需要，添加相关目标（relatedTarget）
			if ( !event.relatedTarget && fromElement ) {
				// 如果fromElement是event.target，那么相关目标就是toElement，否则是fromElement
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			// 为点击事件添加which，左键1，中键2，右键3
			// 注意e.button没有标准化，不要用它
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	// 特别事件
	special: {
		// 加载完成
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			// 阻止触发image的load事件冒泡到window的load
			noBubble: true
		},
		// 获取焦点
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			// 手动触发trigger方法
			// 如果可能，触发原始事件保证blur/focus序列正确
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;  // '我'已触发，返回false避免重复触发
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
						// 支持：IE<9
						// 如果我们在隐藏元素上面focus遇到错误，就直接运行监听函数
					}
				}
			},
			delegateType: "focusin" // 代理类型
		},
		// 失去焦点
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		// 点击
		click: {
			// For checkbox, fire native event so checked state will be right
			// 针对checkbox，触发本地事件保证选中状态正确
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			// 确保跨浏览器一致性，不要在a元素上触发原始click事件
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},
		// 页面离开前
		beforeunload: {
			// 后处理函数
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				// 支持：Firefox 20+
				// 如果returnValue不设置，火狐不弹出警告
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	/*
		事件模拟
		@param {String} type 模拟事件类型
		@param {Element} elem 事件元素
		@param {Event} event 原始事件对象
		@param {Boolean} bubble 是否冒泡
	*/
	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		// 用一个事件去模拟另一个事件。
		// 伪造原始事件避免stopPropagation，但如果模拟事件阻止默认行为，我们在原始事件上面做一样的事情
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		// 是否冒泡
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );  // 只触发elem上的监听
		}
		// 阻止默认行为
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// 跨浏览器移除事件
jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			// 在IE6-8防止内存泄漏，detachEvent需要对应事件属性在元素上，但给值设置null，暴露给垃圾回收
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};
/*
	对jQuery事件对象进行统一化封装，使之符合W3C的事件规范
	@param {String|Event} src 事件类型或者事件对象
	@param {Object} props 显式提供的额外属性
*/
jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	// 允许实例化的时候不加new关键字
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	// 事件对象
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;  // 事件类型

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		// 事件冒泡可能已经被事件树前面的触发给阻止了，修复正确的value
		// W3C：defaultPrevented；IE：returnValue
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	// 事件类型
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	// 将显式提供的属性设置到事件对象上
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	// 获取或生成时间戳
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	// 标记其已经封装
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
// jQuery.Event基于DOM3事件规范
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,  // 是否阻止默认行为
	isPropagationStopped: returnFalse,  // 是否阻止冒泡
	isImmediatePropagationStopped: returnFalse, // 是否阻止向上以及其他监听冒泡

	// 阻止事件的默认行为
	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		// 如果存在preventDefault，在原始事件对象上面执行它
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		// 支持：IE
		// 其他情况设置原始事件对象returnValue为false
		} else {
			e.returnValue = false;
		}
	},
	// 阻止事件冒泡
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		// 如果存在stopPropagation，在原始事件对象上面执行它
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		// 支持：IE
		// 其他情况设置原始事件对象cancelBubble为true
		e.cancelBubble = true;
	},
	// 防止冒泡及扩散
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// 用mouseover/out和事件次数检查创建mouseenter/leave
// 不在子元素上触发
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,  // 代理类型
		bindType: fix,  // 绑定类型
		// 监听中枢
		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,  // 相关元素
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			// 如果相关元素不在当前元素内，调用mousenter/leave的handler
			// 注：如果鼠标移入移出窗口将没有相关元素
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
// IE submit代理
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		// 部署
		setup: function() {
			// Only need this for delegated form submit events
			// 仅仅需要用在代理form提交事件上
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			// 添加一个懒提交handler当一个后代form可能潜在被提交
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				// 检查节点名避免IE的VML相关崩溃？
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
			// 返回undefined表示我们不需要一个事件监听
		},
		
		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			// 如果form被用户提交，避免事件冒泡
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {  // 有父元素且未被触发
					jQuery.event.simulate( "submit", this.parentNode, event, true ); // 向上冒泡
				}
			}
		},

		// 事件移除
		teardown: function() {
			// Only need this for delegated form submit events
			// 仅仅需要用在代理form提交事件上
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			// 移除代理对象，清除获得最终提交submit handlers附加的data？
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
// IE change代理和checkbox/radio修复
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {
		// 部署
		setup: function() {
			// rformElems = /^(?:input|select|textarea)$/
			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				// IE不触发check/radio的change事件直到失去焦点，我们在propertychange后的点击事件手动触发。在special.change.handle吞掉blur-change，因为失去焦点后仍二次触发onchange
				if ( this.type === "checkbox" || this.type === "radio" ) {
					// propertychange后标记_just_changed（然并卵？）
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						// 模拟change事件
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			// 代理事件；在后代inputs懒添加一个change监听
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );  // 往上冒泡
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},
		// 监听中枢
		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			// 吞掉checkbox/radio的change事件，我们在上面已经触发过
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},
		// 移除事件
		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
// 创建'冒泡'的focus和blur事件
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		// 只在document上面添加一个监听函数
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			// 部署
			setup: function() {
				var doc = this.ownerDocument || this,  // document
					attaches = jQuery._data( doc, fix ); // 绑定次数

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 ); // 记录增加一次绑定次数
			},
			teardown: function() {
				var doc = this.ownerDocument || this,  // document
					attaches = jQuery._data( doc, fix ) - 1;  // 减去一次绑定次数

				if ( !attaches ) {  // 解绑了所有绑定
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );  // 记录减去一次绑定次数
				}
			}
		};
	});
}

jQuery.fn.extend({
	/**
		$().on
		绑定事件
		@param {String|Object} types 以空格分隔的事件名或者types/handlers映射
		@param {String} selector 事件委托者的选择器字符串
		@param {Object} data 额外的事件data
		@param {Function} fn 事件监听函数
		@param {Number} one 只监听一次（仅内部使用参数）
	*/
	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		// types可以是types/handlers映射
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			// $().on(types-Object, selector, data)
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				// $().on(types-Object, data)
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			// $().on(types, fn)
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				// $().on(types, selector, fn)
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				// $().on(types, data, fn)
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;  // $().on(type, false) => $().on(type, function(){return false})
		} else if ( !fn ) {
			return this;  // 必须传入fn
		}

		// 只监听一次
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				// 可以用一个空jQuery实例，因为event里面包含了所有需要的信息
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			// 用相同的guid这样调用者可以用本身的监听来移除
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	/*
		$().one
		只监听一次
	*/
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	/*
		$().off
		移除事件监听
	*/
	off: function( types, selector, fn ) {
		var handleObj, type;
		// types是一个jQuery.Event对象
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget /* 代理对象 */ ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		// types是一个'事件名-监听函数'映射对象的情况
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		// $().off(types, fn)
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		// $().off(types, false)
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},
	// 手动触发事件
	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	// 手动调用事件监听函数
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});

/**
	创建安全的文档碎片（兼容支持html5标签）
*/
function createSafeFragment( document ) {
	// nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		// 创建h5 element，支持低版本浏览器
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", // html5标签
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),  // html5开头
	rleadingWhitespace = /^\s+/,  // 以空格开头
	/**
		把双标签元素写成单标签的形式且包含属性
		捕获1：整个单标签里面的内容
		捕获2：标签名
	*/
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/, // 捕获1 tagName
	rtbody = /<tbody/i,  // tbody开头
	rhtml = /<|&#?\w+;/,  // '<'，或者诸如 '&nbsp;'等以&开头后面跟#或不跟
	rnoInnerhtml = /<(?:script|style|link)/i, // 没有innerHTML的元素
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, // checked="checked" or checked
	rscriptType = /^$|\/(?:java|ecma)script/i, // 空字符串或者javascript或者ecmascript
	rscriptTypeMasked = /^true\/(.*)/,  // 被伪造的script type
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,  // '<![CDATA['或者'<!--'或者']]>'或者'-->'

	// We have to close these tags to support XHTML (#13200)
	// 我们必须闭合这些标签来支持XHTML
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		// IE6-8不能序列化link，script，style或者任何其它html5标签，除非放入一个前面有未分段字符的div内
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),  // 安全的文档碎片
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );  // 安全的文档碎片里面的一个div

// 扩充wrapMap
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

/**
	从context得到所有元素，匹配tag如果有
	@param {Element} context 查找上下文
	@param {String|Boolean} tag 标签字符串或者布尔值是否返回包含context
	@returns {Array} 获取的元素数组

*/
function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		// getElementsByTagName要快于querySelectorAll
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				// 递归获取
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}
	// 要把context包含在内
	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
// 用于$.buildFragment，修复默认选中状态
function fixDefaultChecked( elem ) {
	// var rcheckableType = (/^(?:checkbox|radio)$/i);
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
// 支持：IE<8
// table需要一个tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
// 替换script元素的type属性来保证安全的DOM操作
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
// 恢复script的type
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {  // script上面没写type
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
/**
	标记scripts已经被解析
	@param {Array<element>} elems 目标对象数组
	@param {Array<element>} refElements 源对象数组
*/
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

/**
	克隆src的jQuery事件和data到dest
	@param {Element} src 源对象
	@param {Element} dest 目标对象
*/
function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),  // 取出源对象的data
		curData = jQuery._data( dest, oldData ),  // 保存到目标对象上面
		events = oldData.events;  // 源头对象的jQuery事件

	if ( events ) {
		delete curData.handle; // 删掉目标对象事件data里面之前的监听（elem指向了源对象）
		curData.events = {};

		// 根据事件data里面的类型和监听绑定事件
		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	// 给原始对象的data一个克隆的副本给新对象
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

/**
	修复IE的克隆问题
	@param {Element} src 源节点
	@param {Element} dest 目标节点
*/
function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	// 我们不需要在非元素节点上面做任何事情
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	// IE6-8克隆节点时复制通过attachEvent绑定的事件
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		// 移除被克隆的事件
		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		// 如果expando被拷贝，Event data可能指向的是源节点的data
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	// IE拷贝scripts会把里面的内容置空，并且如果你给它放入新内容它会尝试解析
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text; // 伪造type防止放入内容时自动解析，并放入内容
		restoreScript( dest );  // 恢复type

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	// IE6-10当用classid时不正确地克隆object元素的子元素
	// 如果parent是null IE10抛出NoModificationAllowedError
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		// 这种方式在IE9上面会出问题。当在IE9上面克隆object元素，上面的outerHTML方式是不够的。
		// 如果src有innerHTML而dest没有，复制src的innerHTML到dest上面去
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		// IE6-8不能正确保存克隆的checkbox或radio的选中状态。更糟糕的是，IE6-7如果defaultChecked不设置的情况下不能给克隆对象一个选中的呈现
		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		// IE6-7给克隆的checkbox/radio赋值一个空字符串代替'on'
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	// IE6-8当克隆options不能正确还原选中option默认的选中状态
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	// IE6-8当克隆其它类型的input时不能正确设置defaultValue
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	/**
		$.clone
		克隆对象
		@param {Element} elem 源对象
		@param {Boolean} dataAndEvents 是否复制对象的jQuery事件和data
		@param {Boolean} deepDataAndEvents 是否也复制对象后代的jQuery事件和data
		@returns {Element} clone 克隆的对象
	*/
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );  // elem是否在文档内

		// 如果克隆h5元素没有bug，或者是XML文档，或者elem不是h5元素
		// rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i")
		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );  // 设置为 true，如果您需要克隆节点及其属性，以及后代；设置为 false，如果您只需要克隆节点及其后代

		// IE<=8 does not properly clone detached, unknown element nodes
		// IE<=8不能正确地克隆脱离的，未知的元素节点
		} else {
			// 将elem的outerHTML写入fragmentDiv再取出来
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		// 克隆事件有bug或者克隆后的表单元素默认值有问题，并且elem是元素节点或者elem是文档碎片，并且elem不在XML文档
		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			// 这里我们避开Sizzle是因为性能原因：http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );  // 获取clone上的所有元素，包括它自己
			srcElements = getAll( elem );  // 获取elem上的所有元素，包括它自己

			// Fix all IE cloning issues
			// 修复所有IE克隆问题
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				// 保证目标节点不是null
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		// 把源对象的jQuery事件和data拷贝到克隆对象
		if ( dataAndEvents ) {
			// 深入复制源对象后代的jQuery事件和data
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		// 保存script的解析历史
		destElements = getAll( clone, "script" );  // 获取所有克隆的script元素
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;  // 清除引用

		// Return the cloned set
		// 返回克隆
		return clone;
	},
	/**
		创建一个文档碎片
		@param {Array} elems 源对象数组
		@param {Element|Document} context 上下文元素
		@param {Array} scripts 把碎片中的脚本对象放入这个数组
		@param {ArrayLike} selection 类数组的目标对象
		@returns {DocumentFragment} safe context创建的文档碎片
	*/
	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			// 确保一个安全的碎片
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		// 根据elems里面的元素解析不同的对象，放入nodes
		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				// 直接添加node节点
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				// 把非html转成文本节点
				// rhtml = /<|&#?\w+;/,
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				// 把html字符串转成DOM
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") ); // 在safe上面追加一个div

					// Deserialize a standard representation
					// 反序列化为一个标准html表示法
					// rtagName = /<([\w:]+)/,
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();  // 获取tagName
					/*
						wrapMap = {
							option: [ 1, "<select multiple='multiple'>", "</select>" ],
							legend: [ 1, "<fieldset>", "</fieldset>" ],
							area: [ 1, "<map>", "</map>" ],
							param: [ 1, "<object>", "</object>" ],
							thead: [ 1, "<table>", "</table>" ],
							tr: [ 2, "<table><tbody>", "</tbody></table>" ],
							col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
							td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

							// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
							// unless wrapped in a div with non-breaking characters in front of it.
							_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
					*/
					wrap = wrapMap[ tag ] || wrapMap._default;
					// rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
					// 单标签转双标签，包裹wrap再写入tmp
					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2]; // 先把wrap放入

					// Descend through wrappers to the right content
					// 触碰到正确的内容位置
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild; // 获取被加入的node的父元素
					}

					// Manually add leading whitespace removed by IE
					// 自动添加被IE移除的头部空格
					// rleadingWhitespace = /^\s+/,
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's auto inserted <tbody> from table fragments
					// 从table碎片中移除IE自动插入的<tbody>
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						// rtbody = /<tbody/i,
						// 先获得table
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild : 

							// String was a bare <thead> or <tfoot>
							// 字符串是一个光秃秃的<thead>或者<tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp : 
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							// 如果table里面的tbody没有后代就移除
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					// 修复WebKit和IE > 9的#12392 bug
					tmp.textContent = "";

					// Fix #12392 for oldIE
					// 修复旧IE的#12392 bug
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					// 重获容器的最顶级（div）
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		// 修复#11356：从碎片上删除tmp
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		// 在IE6/7中对上面添加的任何radios和checkboxes复位defaultChecked
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		// 遍历nodes，把里面的对象追加到碎片，并标记script
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			// 如果源对象数组和目标对象数组的elem是一样并且这就是那个对象，就不做任何事情
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );  // elem是否在文档中

			// Append to fragment
			// 追加到fragment，并获取里面全部的script
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			// 如果elem在文档中，保存script的解析历史
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			// 获取可执行文件（script）
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					// rscriptType = /^$|\/(?:java|ecma)script/i,
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );  // 把script放入scripts
					}
				}
			}
		}

		tmp = null;

		return safe;
	},
	/**
		清除elems的data
		@param {Array} elems elem数组
		@param {Boolean} acceptData 是否可以直接在elem上删除data而无需检查（仅内部使用）
	*/
	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando, // 存放cache id的elem上的属性
			cache = jQuery.cache,  // elem cache对象
			deleteExpando = support.deleteExpando, // 是否支持删除扩展属性
			special = jQuery.event.special; // 特别jQuery事件

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];  // 获取elem cache对应的id
				data = id && cache[ id ]; // 获取elem的data

				if ( data ) {
					// data里面的事件
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );  // 移除特别事件

							// This is a shortcut to avoid jQuery.event.remove's overhead
							// 这是一个避免jQuery.event.remove开销的捷径
							} else {
								jQuery.removeEvent( elem, type, data.handle );  // 移除传统事件
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					// 删除cache只有当它未被jQuery.event.remove移除
					if ( cache[ id ] ) {

						delete cache[ id ]; // 删除对应id的cache

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						// 删除绑定在元素上的id标识
						// IE既不支持从node上面删除扩展属性也不能用removeAttribute作用于document节点
						// 我们必须处理所有情形
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );  // 将删除的id回收，循环利用
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	/**
		$().text
		设置textContent
		@param {String|Function} value 要设置的内容或者赋值函数
	*/
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	/**
		$().append
		往elem的后面追加dom
	*/
	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem ); // 获取target 追加tr需要在tbody中进行
				target.appendChild( elem );
			}
		});
	},

	/**
		$().prepend
		往elem的前面添加dom
	*/
	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	/**
		$().before
		将dom添加到elem前
	*/
	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	/**
		$().after
		将dom添加到elem后
	*/
	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	/*
		$().remove
		移除elem
		@param {String} selector 用于筛选的选择器字符串
		@param {Boolean} keepData 是否保留jQuery data（仅内部使用参数）
	*/
	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,  // 要删除的元素集合
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );  // 清除data
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );  // 标记script已解析
				}
				elem.parentNode.removeChild( elem );  // 移除elem
			}
		}

		return this;
	},

	/**
		$().empty
		清空elem的所有后代元素
	*/
	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			// 移除元素节点并阻止内存泄露
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );  // 获取elem的所有后代元素，并清除data
			}

			// Remove any remaining nodes
			// 移除任何残存的节点
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			// 如果这是一个select，把options清空
			// 支持：IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	/**
		$().clone
		克隆elem
		@param {Boolean} dataAndEvents 是否复制对象的jQuery事件和data
		@param {Boolean} deepDataAndEvents 是否也复制对象后代的jQuery事件和data
	*/
	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	/**
		$().html
		获取或设置元素的html
		@param {String|Function} value 要设置的html字符串或执行函数
	*/
	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},  // 实例中第0个匹配元素
				i = 0,
				l = this.length;

			// 取值，只获取第0个元素
			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			// 看看我们是否可以简单地使用innerHTML赋值
			// 如果value是字符串，并且value不包含'script'、'style'或'link'，并且使用innerHTML时h5元素可以被正确序列化或者value没有html5元素，并且使用.innerHTML时不会自动去掉头部的空格或者value不是以空格开头，并且value没有必须依附其它元素包裹存在的元素如'option'
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );  // 把本来是双标签写成单标签的元素替换成双标签写法

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						// 移除元素节点并防止内存泄露
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;  // 用innerHTML赋值
						}
					}

					elem = 0;  // 标记已经赋值成功

				// If using innerHTML throws an exception, use the fallback method
				// 如果用innnerHTML抛出异常，用回退的方法
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );  // 用$().append来添加，首先清空原来的内容
			}
		}, null, value, arguments.length );
	},

	/**
		$().replaceWith
		替换元素
	*/
	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		// 进行更改，用新的内容替换每个上下文元素
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		// 如果没有传入新元素，强制清除老元素（例如没有传入参数）
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	/**
		将元素从父元素上面移除，但保留元素以及jQuery数据
		@param {String} selector 筛选字符串
	*/
	detach: function( selector ) {
		return this.remove( selector, true );
	},

	/**
		用传入的args生成dom，调用callback进行插入
		@param {String|Function} args 用于生成dom的函数或字符串
		@param {Function} callback  dom插入逻辑
	*/
	domManip: function( args, callback ) {

		// Flatten any nested arrays
		// 把args转成数组
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,  // 当前实例中的匹配元素个数
			set = this,
			iNoClone = l - 1,  // 克隆的个数
			value = args[0], 
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		// 我们不能在WebKit中克隆包含'checked'属性元素的文档碎片
		// 如果value是函数，或者需要克隆并且value是字符串并且当前环境有checkClone bug并且value里面包含'checked'属性
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			// 放弃克隆方式，而是循环逐一设置value
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() ); // 传入三个参数，当前元素、当前元素索引、当前元素的html
				}
				self.domManip( args, callback );
			});
		}

		// 如果需要克隆
		if ( l ) {
			// 根据args创建文档碎片，并且不捕获script
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;  // fragment是否有内容

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;  // 如果fragment只有一个子元素，把fragment向下递减一级
			}

			// 若fragment有内容
			if ( first ) {
				// 获取fragment上所有的script，并禁用
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;  // 记录script的长度

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// 用原始的fragment来作用于最后一个元素而不是第一个来避免在某些情况下被错误地清空
				for ( ; i < l; i++ ) {
					node = fragment;

					// 克隆iNoClone次
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						// 保存script引用，为后面的恢复
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );  // 执行dom插入逻辑
				}

				// 如果有script
				if ( hasScripts ) {
					// 最后一个script所在的document
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					// 重新启用script
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					// 编译处在第一个document上面的可执行script
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) /* 需要在第一个document上面 */ ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								// 动态加载外部script，如果没有提供就不执行
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								// 编译页内script
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				// 避免内存泄漏
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1; // 之所以减一，是因为后面的循环判断是'<='，是为了里面判断'i === last'

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			// 把elems添加到ret中
			// 现代浏览器可以用apply把jQuery集合当作数组，但老IE需要.get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );  // 返回匹配当前实例中的匹配元素与克隆的元素的新jQuery实例
	};
});


var iframe,  // 用于获取元素默认display的iframe
	elemdisplay = {};  // 用于保存元素默认display的对象

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
// 
/**
	获取元素在文档中的实际的display
	@param {String} name 元素的nodeName
	@param {Object} doc document对象

*/
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),  // 根据nodeName创建元素并追加到body上

		// getDefaultComputedStyle might be reliably used only on attached element
		// getDefaultComputedStyle方法只能可靠地运用于处在文档里面的元素
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			// 用这个方法（getDefaultComputedStyle）是一个临时解决（更像一个优化方案）直到有更好的处理方式
			// 因为它被从规范中移除只有火狐支持
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	// 我们未在该元素上面存储任何data
	// 所以我们用detach方法快速移除元素
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
/**
	尝试去确定元素在文档中的默认display
	@param {String} nodeName 元素的nodeName
*/
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];  // 从elemdisplay中获得，如果有

	if ( !display ) {
		display = actualDisplay( nodeName, doc );  // 获取元素在文档中的实际display

		// If the simple way fails, read from inside an iframe
		// 若上面这种简单方式失败，则从一个iframe中获取
		// 如果display是隐藏，或者没有display
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			// 如果有，用已经创建的iframe
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			// 总是写一个新的HTML骨架让Webkit和Firefox不阻塞重用
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			// 支持：IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );  // 获取
			iframe.detach(); // 移除iframe
		}

		// Store the correct default display
		// 将默认display保存到elemdisplay
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	// 是否布局元素被尺寸大于其的后代撑开
	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		// 如果需要，后面会改变结果
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			// 过早或在不支持的环境中进行测试，退出
			return;
		}

		// Setup
		// 部署
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		// 支持：IE6
		// 检测是否布局元素收缩包裹它的后代
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			// 复位CSS：box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				// 支持：Firefox<29, Android 2.3
				// box-sizing的专属前缀
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";  // 指定新加div宽度为5px，而父div的offsetWidth为1(width) + 1(padding-left) + 1(padding-right) = 3
			shrinkWrapBlocksVal = div.offsetWidth !== 3; // 不收缩包裹
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/); // margin开头

// var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );  // 以非px为单位的值



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/; // 定位属性

// W3C支持getComputedStyle
if ( window.getComputedStyle ) {
	// 获取所有计算后样式
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	/**
		获取元素的当前name属性的计算后样式
		@param {Element} elem 元素
		@param {String} name 属性名
		@param {Object} computed 所有计算后样式
	*/
	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;  // 行内样式

		computed = computed || getStyles( elem );  // 所有计算后样式

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		// 在IE9中getPropertyValue方法只能用于.css('filter')
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined; // 通过计算后样式获取

		if ( computed ) {
			// 如果ret是空字符串并且，elem不在文档中
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name ); // 用jQuery.style获取
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			// 向非常棒的黑客Dean Edwards致敬
			// Chrome < 17和Safari 5.0在获取margin-right时使用计算后的值代替使用值
			// Safari 5.1.7（至少）对绝大多数值返回百分比，但貌似width返回可靠的像素值
			// 这是跟CSSOM草案规定相悖的：http://dev.w3.org/csswg/cssom/#resolved-values
			// 如果是非px单位并且name以margin开头
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				// 记住width、minWidth、maxWidth的默认值
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				// 给width赋入ret来获取一个像素值
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width; // 获取计算后的像素值

				// Revert the changed values
				// 还原各种更改
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		// 支持：IE
		// IE返回integer的zIndex
		return ret === undefined ?
			ret :
			ret + "";
	};
// 老IE支持currentStyle
} else if ( document.documentElement.currentStyle ) {
	// 获取所有计算后样式
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	/**
		获取元素的当前name属性的计算后样式
		@param {Element} elem 元素
		@param {String} name 属性名
		@param {Object} computed 所有计算后样式
	*/
	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		// 避免在此设置ret为空字符串
		// 所以我们不默认为自动
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		// 若我们在处理一个非像素单位的值
		// 如果值有一个怪异的结尾，我们需要把它转成像素
		// 但对于那些跟父元素成比例的非定位的CSS属性，我们不能通过测量父元素来替代因为它可能会引发一个'stacking dolls'问题？
		// new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" )
		// rposition = /^(top|right|bottom|left)$/
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {
			// 用给left赋值来计算出对应像素单位的值
			// Remember the original values
			// 记住原始的值
			left = style.left;
			/*
				runtimeStyle也是Style对象的实例，所有的runtimeStyle的属性在默认状态下都是为空的(就是没有指定值)。那么它是用来干什么的呢？这个属性和style基本没有什么关系，顾名思义，它是在运行时刻控制元素的CSS属性的，设置了runtimeStyle后会影响currentStyle的对应属性值，同时也会在HTML元素的显示上表现出来。它的最大特点是，当我们把修改过的CSS属性的值再次清掉(赋'')的时候，其HTML元素的CSS属性会变为赋值前的值，同时currentStyle也还原了。runtimeStyle设置的属性具有最高的优先级，但是它不是永久的
			*/
			rs = elem.runtimeStyle;  // IE专属
			rsLeft = rs && rs.left;  // 记住当前runtimeStyle的left

			// Put in the new values to get a computed value out
			// 赋入新值来获得计算后的值
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left; // ？
			}
			style.left = name === "fontSize" ? "1em" : ret;  // 1em代表父元素fontSize大小
			/*
				pixelLeft(数值类型,将left的值(如果是空串则赋为0)转化为像素值(不带单位))
			*/
			ret = style.pixelLeft + "px";

			// Revert the changed values
			// 还原更改
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		// 支持：IE
		// IE返回integer的zIndex
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




/* 
	根据需要添加get钩子（计算margin-right）
	@param {Function} conditionFn 条件函数
	@param {Function} 不满足条件添加的方法
*/
function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	// 定义钩子，我们将检查并根据需要第一次运行
	return {
		get: function() {
			var condition = conditionFn();  // 运行条件函数

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				// 此刻测试还未就绪，保留这个钩子并返回，根据需要下次再检测
				return;
			}
			
			// 如果条件满足
			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				// 钩子是不需要的（或者丢失了依赖而不能使用？），移除它
				// 由于没有针对marginRight的其它钩子了，移除整个object
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			// 条件不满足，则需要钩子hookFn。重新定义新的钩子函数使support测试不再重复执行
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	// 部署
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	// 没有浏览器环境及早结束测试
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	// 支持：IE<9
	// 保证元素的opacity属性存在（而不是filter）
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	// 验证float样式的存在形式
	// （IE用styleFloat替代cssFloat）
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	// 是否支持清除克隆的样式
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	// 支持：Firefox<29, Android 2.3
	// 是否支持box-sizing属性
	// box-sizing的专属前缀
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		// 可靠的隐藏元素offset值
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},
		// boxsizing的尺寸是否可靠
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		// 是否返回像素为单位的定位值
		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		// 支持：Android 2.3
		// 可靠的margin-right值
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			// 对于测试太早或不支持的环境，及早退出
			return;
		}

		// Setup
		// 部署
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		// 支持：IE<9
		// 在没有getComputedStyle时假定合理的值
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		// 检查getComputedStyle以便让代码不会在IE<9下运行
		if ( window.getComputedStyle ) {
			// 是否返回像素为单位的定位值
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			// boxsizing的尺寸是否可靠
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// 支持：Android 2.3
			// div有明确的width没有margin-right，错误地基于容器的width获取计算后的margin-right
			// WebKit Bug 13343 - getComputedStyle返回错误的margin-right值
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			// 复位CSS：box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			// 可靠的margin-right值
			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// 支持：IE8
		// 检查是否table cells设置了display:none但行中仍然有其它显示的table cells时仍然具有offsetWidth/Height；若如此，则offsetWidth/Height不能作为判断元素是否直接用display:none设置了隐藏的可靠方式（若父元素是隐藏，这种判断仍然安全）
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";  // 把第0个td隐藏
		// 可靠的隐藏元素offset值
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			// 把第1个td隐藏，第0个显示
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			// 第0个td没有内容，而有内容的第1个td已经隐藏，所以第0个td的offset应该为0
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
/**
	一种快速置换CSS属性来获得正确的计算值得方法（例如把隐藏元素显示来计算尺寸等）
	@param {Element} elem 测试元素
	@param {Object} options 需要替换的CSS属性
	@param {Function} callback 用于计算的回调
	@param {Array} args callback需要传递的参数
*/
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	// 记住旧值，插入新值
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	// 通过回调获得结果
	ret = callback.apply( elem, args || [] );

	// Revert the old values
	// 还原更改
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,  // 设置IE的透明度
	ropacity = /opacity\s*=\s*([^)]*)/,  // 设置W3C的透明度

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	// display可替换，如果是'none'或者以table开头并且不是"table", "table-cell", 或者"table-caption"等
	// 从这里看display的值：https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	// var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),  // 值和单位
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),  // 相对值

	// 让元素显示且不可见
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	// 当css值为'normal'时的替换值
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];  // 潜在的样式属性名前缀


// return a css property mapped to a potentially vendor prefixed property
/**
	返回一个可能有专属前缀的属性名的映射属性，例如-webkit-
	@param {Object} style 元素的行内样式
	@param {String} name 原始的属性名
*/
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	// 属性名没有专属前缀情况下的快速返回
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	// 检查可能的前缀
	var capName = name.charAt(0).toUpperCase() + name.slice(1),  // 把属性名第一个字母大写，因为需要驼峰式的写法
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName; // 用潜在的前缀去拼
		if ( name in style ) {
			return name;  // 匹配了前缀
		}
	}

	return origName;  // 没有匹配到前缀，且styles里面也没有
}

/*
	让元素显示或隐藏（若非行内样式相关属性使用了!important将不适用于此）
	@param {Array<element>} elements 待设置的元素集合
	@param {Boolean} show true为显示，hide为隐藏
*/
function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],  // values放置元素显示时状态，只是在设置显示时才需要
		index = 0,
		length = elements.length;

	// 第一轮循环，设置少数元素的显示，并记录、标记绝大多数元素的display状态
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {  // 没有样式的元素，比如input[type=hidden]
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" ); // 获取保存的元素此前的显示状态
		display = elem.style.display;  // 设置在元素行内的display
		if ( show ) {  // 设置显示
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			// 复位元素的行内display来了解是否被级联样式设置了隐藏
			if ( !values[ index ] && display === "none" ) { // 没有经过jQuery在行内样式设置了display: none
				elem.style.display = "";  // 尝试操作行内样式把元素显示
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			// 如果stylesheet里面设置了display:none，就设置元素的display为浏览器默认的显示状态而不管默认显示状态是什么
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );  // 如果层叠样式表里面设置了display: none，那么就设置元素的默认显示状态。但此时只是记录data并标记，于二轮循环中设置
			}
		} else {  // !show 设置隐藏
			hidden = isHidden( elem );
			// 如果行内display不为'none'或者元素不是隐藏状态
			// 对于行内display不为'none'而元素是隐藏状态，我觉得有两种情况：第一，祖先元素设置了隐藏；第二，层叠样式表里面设置了display: none !important;
			if ( display && display !== "none" || !hidden ) {
				// 此处只记录olddisplay不进行设置（不设置的原因是怕其会影响后代元素的显示隐藏状态的判断）
				// 如果元素是隐藏的，说明行内display不为'none'，取行内display；如果元素不是隐藏的状态，就取当前显示状态
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	// 对大部分元素，设置其显示状态于二轮循环来避免一种无休止的纠缠
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {  // 没有样式的元素，比如input[type=hidden]
			continue;
		}
		// 设置隐藏 | 设置显示且value[index]不为空 | 设置显示且value[index]为空
		// 此条件语句并没有处理当行内设置了元素显示，例如'elem.style.display === "block"'，而元素却是隐藏的的情况，说明，不理会是否层叠样式表中设置了'display: none !important'，不在此列
		// 只要行内设置了元素的显示，都默认元素是显示的
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) { 
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}
/**
	在设置宽高的时候对value进行处理，按情况增减额外的值
	@param {Element} elem 元素
	@param {String|number} value 值
	@param {Number} subtract 需要增减的额外值
*/
function setPositiveNumber( elem, value, subtract ) {
	// rnumsplit = new RegExp("^([+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|))(.*)$", "i" )
	// match[1] = ([+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)) 值
	// match[2] = (.*)  单位
	var matches = rnumsplit.exec( value );
	return matches ?  // 如果value是数值或数值+单位
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		// 减去额外的值
		// 谨防subtract为undefined，例如，当在cssHooks使用的时候
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) /* 此处是减去额外，而不是加上，与获取正好相反 */ ) + ( matches[ 2 ] || "px" ) :
		value;
}
/**
	根据extra的限定，获取width或height需要增减的额外尺寸值
	@param {Element} elem 元素
	@param {String} name 属性名：width或height
	@param {String} extra 限定尺寸范围， margin、content、padding、border
	@param {Boolean} isBorderBox 元素是否是border-box
	@param {Object} styles 元素所有的计算后样式
*/
function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	// 如果元素是border-box的时候，那么当extra为'border'的时候，不需要增减额外样式；
	// 如果元素不是border-box的时候，当extra为'content'的时候，不需要增减额外样式
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		// 若我们已经有了正确的尺寸结果，不需要增减任何尺寸
		4 :  // 当为4，直接跳过后面的循环
		// Otherwise initialize for horizontal or vertical properties
		// 其它情形，初始化水平（Right, Left）或垂直（Top, bottom）方向的额外属性位
		name === "width" ? 1 : 0,  // 0：Top 1：Right 2：Bottom 3：Left

		val = 0;  // 额外的值
	// cssExpand = [ "Top", "Right", "Bottom", "Left" ]
	// 每次加2，这样可以区别垂直和水平属性位
	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		// 不管是何种box，margin都是可以有的，所以根据需要加上
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		// 如果是border-box
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			// border-box包含了padding,所以如果我们需要的是content就减去它
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			// 如果extra不是margin也不是border（border不会进入循环），就移除border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		// 如果不是border-box
		} else {
			// at this point, extra isn't content, so add padding
			// 进入此，说明extra不是content（content不会进入循环），就加上padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			// 到此，extra既不是content也不是padding，只会是'margin'或'border'，所以加上border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;  // 返回额外的值（小于0、大于0或等于0）
}

/**
	获取元素的宽或高
	@param {Element} elem 元素
	@param {String} name 属性名：width或height
	@param {String} extra 限定尺寸范围， margin、content、padding、border
*/
function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	// 开始于offset属性，相当于border-box的值
	var valueIsBorderBox = true, // offsetWidth/offsetHeight会包括元素的padding跟border 所以默认假定值是border-box值
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),  // 获取elem的所有计算后样式
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";  // 元素是否是border-box

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	// 一些非html元素对于offsetWidth返回undefined，所以检查null/undefined
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		// 回退到计算后样式然后未计算样式如果需要
		val = curCSS( elem, name, styles );  // 获取属性为name的计算后样式
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];  // 获取name的行内样式
		}

		// Computed unit is not pixels. Stop here and return.
		// 计算后的单位不是像素，止于此并返回
		// rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" )
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		// 我们需要检查浏览器返回的getcomputedstyle值是否可靠，如果不可靠，默默地回退到可靠的elem.style
		// 如果elem是border-box但是当前浏览器的border-box计算尺寸不可靠，用elem.style[ name ]
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		// 统一化空字符串、'auto'的情况，并为extra作准备
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	// 用当前的box-sizing模型加上/减去额外的尺寸（extra）
	return ( val +
		// 根据限定增减额外尺寸
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";  // 返回像素单位
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	// 添加一个覆盖默认行为的设置和获取样式属性的钩子
	cssHooks: {
		// 透明度
		opacity: {
			get: function( elem, computed ) {
				// 如果是获取计算后的
				if ( computed ) {
					// We should always get a number back from opacity
					// 我们必须始终获取返回一个数值透明度
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;  // 如果是空字符串就返回1
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	// 这些number类属性值不需要单位
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	// 把需要修复的属性名添加在设置或获取值之前
	cssProps: {
		// normalize float css property
		// 规范化float的CSS属性
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	/**
		获取或设置DOM节点的style（行内）样式
		@param {Element} elem 元素
		@param {String} name 属性名
		@param {String|number} value 要设置的值
		@param {String} extra 额外限定
	*/
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		// 不要在文本节点或注释节点上面设置样式
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		// 保证我们在正确的属性名上面操作
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),  // 获得驼峰写法
			style = elem.style;

		// 对name进行映射 例如 box-sizing: WebkitBoxSizing、float: cssFloat等
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		// 用带专属属性名去获取钩子函数，如果没有获取到再用原始属性名去获取
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		// 看看我们是否赋值
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			// 把相对值转成绝对值
			// new RegExp( "^([+-])=(" + pnum + ")", "i" )
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				// ret[1] 符号
				// ret[2] 相对值
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				// 把type变成number
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			// 保证value为null跟NaN时不设置
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			// 如果传入的是一个数值，在它后面加上'px'（除非该属性值不需要单位）
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			// 它可以在指定了setting的钩子函数做的更正确
			// 但也意为着定义8（针对每个有问题的属性）相同的结果？
			// 如果不支持清除克隆属性，并且属性值是空字符串并且属性名以background开头
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";  // 设置属性值为继承
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			// 如果提供了set的钩子函数就用它，否则直接指定值
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				// 支持：IE
				// 吞掉非法属性值的错误
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			// 如果提供了get来获取元素的非计算后样式的钩子函数
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			// 其它情况，直接从style对象中获取
			return style[ name ];
		}
	},
	/** 
		获取元素的css（计算后）样式
		@param {Element} elem 元素
		@param {String} name 属性名
		@param {String|boolean} extra 是否把结果转成number
		@param {Object} styles 行内样式
	*/
	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );  // 把连接符的属性名变成驼峰式写法

		// Make sure that we're working with the right name
		// 保证属性名的正确性
		// 对name进行映射，获取当前环境下专属的属性名。 例如 box-sizing: WebkitBoxSizing、float: cssFloat
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		// 用带专属属性名去获取钩子函数，如果没有获取到再用原始属性名去获取
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		// 如果钩子函数提供了'get'方法
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );  // 通过钩子函数来获取
		}

		// Otherwise, if a way to get the computed value exists, use that
		// 如果钩子函数没有获取到或其它情况，如果存在有获取计算后样式的方式，就用那种方式获取
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );  // 通过curCSS即计算后样式来获取
		}

		//convert "normal" to computed value
		// 把像'letterSpacing'或'fontWeight'得到'normal'的结果转成数值
		/*
			cssNormalTransform = {
				letterSpacing: "0",
				fontWeight: "400"
			}
		*/
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		// 返回，如果强制要求或者提供了一个限定符，把结果转成数值如果能转成功的话
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val; // 如果转值失败就返回原字符串
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	// 宽/高
	jQuery.cssHooks[ name ] = {
		/**
			@param {Element} elem 元素
			@param {Boolean} computed 是否获取计算后的
			@param {String} extra 限定尺寸范围， margin、content、padding、border
		*/
		get: function( elem, computed, extra ) {
			// 获取计算后的
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				// 某些元素会拥有尺寸信息若我们让它们显示且不可见，但是它们必须有一个可以进行尺寸测试的显示状态
				// rdisplayswap = /^(none|table(?!-c[ea]).+)/
				// cssShow = { position: "absolute", visibility: "hidden", display: "block" }
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					// 如果元素是不可见或者table-row之类，并且元素的offsetWidth等于0，就先把元素变成不可见的块级元素再获取
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		/*
			对需要设置的值进行预处理
			@param {Element} elem 元素
			@param {String|number} value 绝对或相对的值
			@param {String} extra 限定尺寸范围， margin、content、padding、border
		*/
		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );  // 如果有限定尺寸范围，获取元素计算后样式
			return setPositiveNumber( elem, value, extra ?
				// 根据限定增减额外尺寸
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0  // 若无限定则额外尺寸为0
			);
		}
	};
});

if ( !support.opacity ) {
	// IE的opacity解决
	jQuery.cssHooks.opacity = {
		/**
			@param {Element} elem 元素
			@param {Boolean} computed 是否获取计算后的
		*/
		get: function( elem, computed ) {
			// IE uses filters for opacity
			// IE使用filters设置透明度
			// ropacity = /opacity\s*=\s*([^)]*)/  filter: .*alpha(opacity=100).*;
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 /* 乘以0.01为了和W3C标准统一 */ * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" /* 如果是获取计算后样式，如果没有设置透明度，返回1 */ : "" /* 如果不是获取计算后样式，如果没有设置透明度，返回空字符串 */;
		},

		/**
			@param {Element} elem 元素
			@param {Number|String} value 需要设置的值
		*/
		set: function( elem, value ) {
			var style = elem.style,  // 内联样式
				currentStyle = elem.currentStyle,  // 计算后样式
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";  // 当前的filter样式

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			// IE在元素没有布局的时候获取opacity会遇到麻烦
			// 通过设置zoom级别强制布局
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			// 如果是设置opacity为1并且没有其它filter存在，尝试移除filter属性
			// 如果value === ""，移除行内opacity
			// ralpha = /alpha\([^)]*\)/i
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				// 如果之前设置了"filter:"，不论是设置style.filter为null、""、" "还是在cssText中去掉"filter:"，都不能清除它。我们要避免这样
				// style.removeAttribute是IE专属，但显然只有这条路可选
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				// 如果没有了CSS规则中的filter样式应用或者撤销了内联opacity，我们就搞定了
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			// 否则，设置新的filter值
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) /* 如果已经有了filter，追加之 */:
				filter + " " + opacity;
		}
	};
}

/**
	如果系统计算marginRight不正确则添加钩子函数
*/
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	/**
		@param {Element} elem 元素
		@param {Boolean} computed 是否获取计算后的
	*/
	function( elem, computed ) {
		// 如果是获取计算后
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			// WebKit Bug 13343 - getComputedStyle返回错误的margin-right
			// 通过暂时将元素display设置为inline-block来获取
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
// 这些钩子用于animate来扩展属性
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		/**
			扩展属性名，例如把margin扩展成marginTop、marginRight、marginBottom和marginLeft
			@param {String|Number} value 以空格分隔的上、下、左、右或上下、左右的值或上下左右的一个值
			@returns {Object} expanded 扩展后的属性
		*/
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				// 若value不是string，假定它是一个单独number
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				// 对属性进行扩展
				// var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
				// marginTop paddingTop borderTopWidth...
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ]; // 上、下、左、右或上下、左右的值或上下左右的一个值
			}

			return expanded;
		}
	};

	// 如果前缀不是margin
	// var rmargin = (/^margin/);
	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;  // 需要根据需要减去或加上额外尺寸
	}
});

jQuery.fn.extend({
	/**
		$().css
		@param {String|Array|Object} name 属性名或者属性名数组或者设置的键值对对象
		@param {String|Number|Function} value 要设置的值
	*/
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;
			// 如果name是数组就返回一个对应‘属性-值’的map
			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}
			return value !== undefined ?
				jQuery.style( elem, name, value ) /* 设 */ :
				jQuery.css( elem, name ) /* 取 */;
		}, name, value, arguments.length > 1 );
	},
	/*
		$().show
		显示 
	*/
	show: function() {
		return showHide( this, true );
	},
	/* 
		$().hide
		隐藏 
	*/
	hide: function() {
		return showHide( this );
	},
	/*
		$().toggle
		显示/隐藏
		@param {Boolean} state 是否显示
	*/
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			// 显示的元素隐藏，隐藏的元素显示
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

/*====== 动画部分  ======*/
/*
	基于单个属性的动画执行过程对象	
	@param {Element} elem 动画元素
	@param {Object} options 运动对象（运动时间、运动函数、队列以及回调等）
	@param {String} prop 属性名
	@param {String|Number} end 目标值
	@param {String} easing 运动曲线
*/
function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";  // 默认曲线运动
		this.options = options;
		this.start = this.now = this.cur();  // 初始位置、当前位置
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" ); // 单位，默认px
	},
	/* 获取当前的位置 */
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ]; // 获取prop专属的钩子

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );  // 如果没有专属钩子，就用默认的钩子
	},
	/**
		动画帧 
		@param {Number} percent 0~1 已运行时间的百分比
	*/
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];  // 属性钩子

		// 如果options中设置了动画的持续时间
		if ( this.options.duration ) {
			// this.pos：已运行距离的百分比
			// 调用运动曲线函数
			this.pos = eased = jQuery.easing[ this.easing ](
				// 已运行时间的百分比、已消耗的时间、0、1、动画总时间
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent; // 如果没有设置动画的持续时间，直接指定已运行距离的百分比为percent
		}
		this.now = ( this.end - this.start ) * eased + this.start; // 计算出当前需要到达的位置

		// 如果在options存在step
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );  // 在运动之前触发
		}

		// 运动。用对应属性的钩子或默认钩子的get方法设置elem的位置
		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

// 获取、设置属性钩子
Tween.propHooks = {
	// 默认
	_default: {
		/**
			获取位置
		*/
		get: function( tween ) {
			var result;

			// 如果是非css属性
			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			// 获取css属性
			// 传入第三个空字符串参数的目的是.css方法会自动尝试把结果转成浮点数若失败还原成字符串。因而，简单的值如'10px'会被转成浮点型，复杂的值如'rotate(1rad)'会返回它自己
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			// 把空字符串、null、undefined以及'auto'转成0
			return !result || result === "auto" ? 0 : result;
		},
		/**
			设置位置
		*/
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			// 用step钩子是为向下兼容 -  用css钩子若存在 - 用.style如果可以 - 直接用普通属性
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );  // CSS属性
			} else {
				tween.elem[ tween.prop ] = tween.now;  // 普通属性
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes
// scrollTop、scrollLeft的钩子
// 支持：IE<=9
// 避免给脱离文档的nodes设置
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	// 匀速运动
	linear: function( p ) {
		return p;
	},
	// 曲线运动
	swing: function( p ) {
		// p:0~1，cos(0) = 1、cos(90) = 0、cos(180) = -1
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;  // jQuery.fx的本质

// Back Compat <1.8 extension point
// 兼容小于1.8版本
jQuery.fx.step = {};




var
	fxNow /* 记录动画的开始时间 */, timerId /* 动画定时器id */,
	rfxtypes = /^(?:toggle|show|hide)$/,  // toggle、show、hide
	// var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	/*
		捕获1. +=/-=
		捕获2. +/- 123.45E - 123
		捕获3. 单位或%
	*/
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ], // 动画预处理函数数组
	// 基于属性和默认的tween生成器
	tweeners = {
		// 默认（通用）
		"*": [ 
		/**
			生成tween，把elem的对应样式单位统一为目标单位，把相对值目标转成绝对值目标，并且更新tween的相关属性
			@param {String} prop 属性名
			@param {String|Number} value 属性值（目标位置）
			@returns {Tween} tween 
		*/
		function( prop, value ) {
			// 创建动画执行对象
			var tween = this.createTween( prop, value ),  // this指动画回调对象animation
				target = tween.cur(), // 矫正时的参照位置
				parts = rfxnum.exec( value ),  // 符号、值、目标单位
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),  // 目标单位

				// Starting value computation is required for potential unit mismatches
				// 如果起止单位不匹配，开始位置的计算是必须的
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20; // 循环次数的上限

			// 如果单位不匹配
			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				// 信任jQuery.css获取的单位
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				// 确保我们稍后更新tween的属性
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;  // 获取开始的值 从1开始

				// 用目标单位修改和矫正初始位置
				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					// 如果上一轮迭代scale变成了0，把start翻倍直到我们得到一些东西
					// 用一个字符串来作为倍增因子是以为我们不想意外地出现下面scale被判断为未改变
					scale = scale || ".5";

					// Adjust and apply
					// 调整及应用
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				// 更新scale，容忍从tween.cur()得到0或者NaN
				// 并且在scale未改变或已最佳或循环轮次已经达到上限跳出循环
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			// 更新tween的属性
			if ( parts ) {
				start = tween.start = +start || +target || 0;  // 更新tween的起点
				tween.unit = unit;  // 更新tween的单位
				// If a +=/-= token was provided, we're doing a relative animation
				// 如果终点位置以'+=/-='开头，说明我们在处理一个相对位置的动画
				// 更新tween的终点
				// 把相对终点变成绝对终点
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
// 创建动画的开始时间
// 同步创建的动画将同步执行
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;  // fxNow由于是全局变量，用后清除。并且用setTimeout，使此周期内新加入进来的任何动画都可以同步开始
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
/**
	根据参数生成一个标准的动画属性对象
	@param {String} type 动画类型，如"toggle"、"show"、"hide"等
	@param {Boolean} includeWidth 是否包含横向属性
	@returns {Object} attrs 标准的动画属性对象
*/
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type }, // 所有情况都有height的变化
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	// 如果includeWidth为true，级数是1将包含所有css扩展值
	// 如果includeWidth为false，级数为2跳过Left和Right
	includeWidth = includeWidth ? 1 : 0;
	// '-'的优先级高于'+='
	// 如果includeWidth为1，每次i+1，包含所有扩展
	// 如果includeWidth为0，每次i+2，跳过Left和Right
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		// var cssExpand = [ "Top", "Right", "Bottom", "Left" ]
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type; // 当includeWidth为真，将包含opacity和width的变化
	}

	/*
		attrs = {
			height: 'show|hide|...',
			width: 'show|hide|...',
			marginRight: 'show|hide|...',
			marginTop: 'show|hide|...',
			marginLeft: 'show|hide|...',
			marginBottom: 'show|hide|...',
			padding...
			opacity: 'show|hide|...'

		}
	*/

	return attrs;
}
/**
	创建tween实例
	@param {String|Number} value 属性值
	@param {String} prop 属性名
	@param {Object} animation 动画回调对象
	@param {Tween} tween 
*/
function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ), // 得到prop对应的和默认的tween生成器函数数组
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		// 逐一执行生成函数，只要得到tween就返回
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			// 成功生成一个该属性的tween
			return tween;
		}
	}
}
/**
	默认的预处理，对元素的一些样式进行调整使之能正常进行动画
	@param {Element} elem 动画元素
	@param {Object} props 动画属性（'属性名:终点'键值对）
	@param {Object} opts 运动对象（运动时间、运动函数、队列以及回调等）
*/
function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this, // 动画回调animation
		orig = {},  // 保存用于生成tween的动画属性（属性名:终点）
		style = elem.style,  // 元素的行内样式
		hidden = elem.nodeType && isHidden( elem ),  // 元素是否隐藏
		dataShow = jQuery._data( elem, "fxshow" ); // 上一回fx动画未成功完成保存着各种终点值

	// handle queue: false promises
	// 处理opts.queue等于false，即动画没有指定队列的情况（用意暂时不明）
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );  // 获取fxqueueHooks对象
		// hooks.unqueued 动画未入队数
		// 不存在hooks.unqueued就初始化
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			// 重写hooks.empty.fire
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				// 只有当未入队的动画都执行，才执行原本的hooks.empty.fire，即清除元素的fx队列
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++; // 动画未入队数加一

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			// 这样做（套用一层anim.always）的目的是保证complete回调会优先执行，因为complete回调中有出队操作
			anim.always(function() {
				hooks.unqueued--;  // 出队一次就将动画未入队数减一
				// 当fx队列中的成员数为0
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();  // 触发重写的hooks.empty.fire
				}
			});
		});
	}

	// height/width overflow pass
	// 高度宽度动画
	// 把inline类型的元素变成inline-block为width和height
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		// 保证没有'漏网之鱼'
		// 记录所有3个overflow属性是因为IE当overflowX和overflowY设置了相同的值不改变overflow属性
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		// 为height/width把inline元素的display属性设置为inline-block
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		// 如果当前元素是隐藏的，获取其默认显示状态
		// olddisplay里面保存了元素默认显示状态或CSS设置的显示状态
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		// 如果display是inline并且元素不是浮动的
		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			// 如果元素本身是inline级别的可以设置为inline-block
			// 如果元素本身是块级元素并且support.inlineBlockNeedsLayout需要layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;  // 块级元素且support.inlineBlockNeedsLayout
			}
		}
	}

	// 如果opts中有保存行内overflow
	if ( opts.overflow ) {
		style.overflow = "hidden"; // 设置元素的overflow为'hidden'
		// 如果布局元素不被尺寸大于其的后代撑开
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				// 动画完毕恢复行内overflow
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	// 显示和隐藏动画
	for ( prop in props ) {
		value = props[ prop ];
		// 如果value是'toggle'、'show'或'hide'，即fx动画，如.show()、.hide()、.toggle()、.slideDown()等
		// rfxtypes = /^(?:toggle|show|hide)$/,
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ]; // 删除prop属性，避免后面animation里面重复创建tween
			toggle = toggle || value === "toggle"; // value是否是'toggle'
			// 如果元素是隐藏的并且目标是'hide'或者元素是显示的，目标是'show'
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				// 如果之前有个stop（未成功）的hide或show的动画，并且我们要继续执行show，我们需要假设它是隐藏的
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					// 目标与当前状态一致，不动作
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop ); // 如果存在dataShow，则dataShow[ prop ]保存着动画的终点

		// Any non-fx value stops us from restoring the original display value
		// 只要存在任何的非fx动画，都阻止后面恢复原来的display
		} else {
			display = undefined;
		}
	}

	// 若orig不是空对象，亦即目标存在'toggle'、'show'或'hide'
	if ( !jQuery.isEmptyObject( orig ) ) {
		// 如果存在dataShow，即上一回动画未成功完成
		if ( dataShow ) {
			// 如果dataShow中存在"hidden"字段，保存的是上一轮动画如果成功后元素的状态，toggle需要反转
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );  // 不存在dataShow就创建一个
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		// 如果是toggle就保存如果成功元素应该的显示状态，好让.stop().toggle()可反转
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		  // 如果元素是隐藏的
		if ( hidden ) {
			jQuery( elem ).show();  // 将元素显示为了得到动画的终点位置
		} else {
			anim.done(function() {
				jQuery( elem ).hide();  // 如果元素的目标是隐藏 动画成功后则将其隐藏
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );  // 如果动画成功要移除dataShow
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );  // 动画完毕要恢复因为动画而改变的其它css属性，因为动画目的只是'隐藏/显示'
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] /* 如果元素的hidden的并且dataShow中存在prop属性，则dataShow[ prop ]存放的是终点（上一次动画未成功） */ : 0 /* 如果元素是显示的，终点为0 */, prop, anim );  // 创建tween，并放入anim.tweens数组

			// 如果dataShow没有该属性
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start; // 在dataShow中存入tween.start，在元素是hidden时是动画的终点
				// 如果元素是隐藏的
				if ( hidden ) {
					tween.end = tween.start;  // tween.start其实是终点的位置
					tween.start = prop === "width" || prop === "height" ? 1 : 0; // 设置开始位置，如果是width和height，就从1开始（宽高不能为0？）；其余为0
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	// 如果orig是空的，也就是一个空fx动画，这样的情况下动画不会执行。恢复之前篡改的display
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

/**
	把动画属性名统一为驼峰式并展开缩写的属性（例如margin等）、确定运动曲线
	@param {Object} props 动画属性（'属性名:终点'键值对）
	@param {Object} specialEasing 特殊的运动曲线（'属性名:曲线名'键值对）
*/
function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	// 把每个动画属性名转成驼峰写法并根据cssHook的expand方法来扩展属性
	for ( index in props ) {
		name = jQuery.camelCase( index ); // 驼峰式属性名
		easing = specialEasing[ name ]; // 运动曲线
		value = props[ index ];  // 运动的终点
		// 如果终点是数组
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];  // 第1个值是运动曲线
			value = props[ index ] = value[ 0 ];  // 第0个值是运动终点
		}

		if ( index !== name ) {  // 属性名统一为驼峰
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];  // 根据name获取CSS钩子
		// 如果存在钩子对象，并且里面有expand
		// var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value ); // 根据expand获取属性名
			delete props[ name ];  // 删除此前的属性，例如'margin'被扩展为'marginTop'、'marginRight'、'marginBottom'、'marginLeft'

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			// 不用$.extend，因为这样不会覆盖已经存在的键
			// 同时，由于我们上面已经统一了驼峰命名，所以可以直接复用'index'
			for ( index in value ) {
				// 如果props中已经有了同名index，不覆盖
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];  // 加入扩展的属性
					specialEasing[ index ] = easing;  // 扩展属性的曲线
				}
			}
		} else {
			specialEasing[ name ] = easing;  // 如果属性不存在expand，直接指定运动曲线
		}
	}
}

/**
	基于元素的所有动画属性和运动对象的动画枢纽
	@param {Element} elem 动画对象
	@param {Object} properties 动画属性
	@param {Object} options 运动对象
*/
function Animation( elem, properties, options ) {
	var result, // 执行动画预处理函数返回的结果
		stopped, // 动画是否停止
		index = 0,
		// 动画预处理函数
		// animationPrefilters = [ defaultPrefilter ],
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			// 不要用':animated'匹配元素
			// 删除tick.elem，防止内存泄露？
			delete tick.elem;
		}),
		// 动画脉搏（钟摆）
		tick = function() {
			// 如果动画已停止
			if ( stopped ) {
				return false;
			}
			// 以系统时间来决定每一时刻动画的位置
			var currentTime = fxNow || createFxNow(),  // 如果fxNow存在，即jQuery动画定时器正被触发，为了保持动画的同步性，所以优先使用定时器回调里面的设定的fxNow
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ), // 动画剩余持续时间
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				// 古老的崩溃bug不允许我们用'1 - ( 0.5 || 0 )'
				temp = remaining / animation.duration || 0,  // 剩余时间占比
				percent = 1 - temp,  // 已运行时间占比
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );  // 运动到对应的位置
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]); // 每运动一下子就唤醒一次，与step属性不同的是在运动完成后触发。context为elem

			// 如果动画未完成并且animation.tweens有长度
			if ( percent < 1 && length ) {
				return remaining;  // 返回剩余持续时间
			} else {
				deferred.resolveWith( elem, [ animation ] );  // 触发动画完毕
				return false;  // 返回false
			}
		},
		// 动画回调
		animation = deferred.promise({
			elem: elem,  // 动画元素
			props: jQuery.extend( {}, properties ),  // 动画属性
			opts: jQuery.extend( true, { specialEasing: {} }, options ),  // 运动对象
			originalProperties: properties,  // 原始的动画属性
			originalOptions: options,  // 原始的运动对象
			startTime: fxNow || createFxNow(),  // 动画开始的时间
			duration: options.duration, // 动画的持续时间
			tweens: [],  // 存放各个属性创建的动画执行对象
			/**
				创建基于单个属性的动画执行对象tween，并放入tweens
				@param {String} prop 属性名
				@param {String|Number} end 目标值
			*/
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );  // 一个运行属性就是一个tween,tween里面的run就是动画的运行核心
				animation.tweens.push( tween );
				return tween;
			},
			/**
				停止动画
				@param {Boolean} gotoEnd 是否需要到终点位置
			*/
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					// 如果需要到终点位置，我们需要跑所有的tween，否则跳过这一步
					length = gotoEnd ? animation.tweens.length : 0;
				// 如果动画已停止
				if ( stopped ) {
					return this; 
				}
				stopped = true; // 标记动画已停止
				// 让所有动画一步达到终点位置
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				// 如果动画到达终点位置，我们触发resolve，否则触发reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] ); // 触发动画成功
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] ); // 触发动画失败
				}
				return this;
			}
		}),
		props = animation.props;  // 动画属性

	// 纠正和扩展动画属性和运动曲线
	propFilter( props, animation.opts.specialEasing );

	// 执行动画前的预处理
	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result; // 如果某一预处理函数返回了结果，就立刻返回该结果？
		}
	}

	jQuery.map( props, createTween, animation ); // 对props里的每个属性执行createTween方法，以生成tween，并放在了animation.tweens数组

	// 如果运动对象里面有start属性，并且对应的值是一个函数
	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );  // 动画开始前执行
	}

	// 指定脉搏的elem、anim和queue，并触发动画开始
	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,  // tick.elem = elem 脉搏动画元素
			anim: animation,  // tick.anim = animation 脉搏动画回调
			queue: animation.opts.queue  // tick.queue = animation.opts.queue  // 脉搏动画队列
		})
	);

	// attach callbacks from options
	// 绑定各种回调（用户传入）
	return animation.progress( animation.opts.progress )  // 每运动一下就唤醒一次
		.done( animation.opts.done, animation.opts.complete ) // 动画完成以后触发，添加了两个方法
		.fail( animation.opts.fail )  // 动画失败后触发
		.always( animation.opts.always );  // 动画结束后，不论成功失败都触发
}

/**
	$.Animation
*/
jQuery.Animation = jQuery.extend( Animation, {
	/**
		添加指定属性的tween生成函数
		@param {String} 以空格分隔的属性名
		@param {Function} callback 对应属性的tween生成函数
	*/
	tweener: function( props, callback ) {
		// 如果只传入了一个参数且是函数
		if ( jQuery.isFunction( props ) ) {
			callback = props;  // 该参数是tween生成函数
			props = [ "*" ];  // 放入通用tween生成器键名
		} else {
			props = props.split(" ");  // 以空格分隔的属性名
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];  // 获取或生成prop属性的tween生成函数数组
			tweeners[ prop ].unshift( callback );  // 将tween生成函数压入数组前部
		}
	},

	/**
		添加动画预处理函数
		@param {Function} callback 预处理函数
		@param {Boolean} prepend 是否优先其它已存在预处理函数执行
	*/
	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

/**
	设置动画的运动时间、运动函数、队列以及回调等
	@param {Number|Object} speed 动画时间或运动对象
	@param {String} easing 动画效果
	@param {Function} callback 回调函数
	@returns {Object} opt 运动对象
*/
jQuery.speed = function( speed, easing, fn ) {
	// 确定各种参数
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};
	/*
		opt = {
			duration: speed,  // 运动时长
			easing: easing,  // 运动曲线
			specialEasing: {  // 特殊的运动 例如margin-right等
			
			}
			queue: true/undefined/null -> "fx"  // 动画队列 默认'fx' 可以自己指定队列
			start: function,  // 动画开始执行的方法
			step: function,  // 动画每步运行前执行的方法
			old: fn,  // 动画完的回调函数
			complete: function() {  // 动画成功完成后执行的方法
				if ( jQuery.isFunction( opt.old ) ) {
					opt.old.call( this );
				}

				if ( opt.queue ) {
					jQuery.dequeue( this, opt.queue );
				}
			},

			progress: function,  // 动画每步运行后执行的方法
			done: function,
			fail: function,
			always: function,
		}
	*/
	/*
		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,
			// Default speed
			_default: 400
		};
	*/

	// 持续时间
	/*
		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,
			// Default speed
			_default: 400
		};
	*/
	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	// 统一opt.queue - true/undefined/null -> "fx"
	// 除非指定了opt.queue === false
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	// 重写opt.complete方法
	opt.old = opt.complete;
	// 动画成功完成后触发
	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );  // 先执行用户传入的complete
		}
		// 如果存在队列，需要执行下一个出队操作
		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	/*
		显示到指定透明度
		$().fadeTo
		@param {Number|String} speed 动画时长
		@param {Number} to 最终透明度
		@param {String} easing 运动曲线
		@param {Function} callback 回调函数
	*/
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		// 设置隐藏元素透明度为0然后显示
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			// 动画到指定的值
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	/**
		jQuery动画
		$().animate
		@param {Object} prop 动画属性
		@param {Number|Object} speed 动画时间或运动对象
		@param {String} easing 动画效果
		@param {Function} callback 回调函数
	*/
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),  // 动画属性是否是空对象
			optall = jQuery.speed( speed, easing, callback ),  // 设置运动对象 #7542
			// 进行动画
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				// 操作一个prop副本，使原本的动画属性不会丢失
				// 动画控制中枢
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				// 动画属性为空或触发了finish方法
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :  // 如果动画属性为空或者指定queue为false，动画立刻执行
			this.queue( optall.queue, doAnimation ); // 如果指定了队列，需要排队执行
	},
	/**
		停止动画
		$().stop
		@param {String|Boolean} type 要清空队列的名称或者指定不清空队列
		@param {Boolean} clearQueue 是否清除队列
		@param {Boolean} gotoEnd 是否需要到终点位置
	*/
	stop: function( type, clearQueue, gotoEnd ) {
		/**
			清除hooks对应的队列的延迟计时器
			@param {object} hooks queueHooks对象
		*/
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;  // hooks.stop用于清除延迟队列的计时器
			delete hooks.stop;
			stop( gotoEnd ); // 清除延迟队列的计时器（为什么传gotoEnd？）
		};

		// 如果没有传入type
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		// 清空相应队列
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,  // 是否出队下一个
				index = type != null && type + "queueHooks",  // 私有queueHooks的key
				timers = jQuery.timers, // 存放动画脉搏的数组
				data = jQuery._data( this );

			// type != null
			// 如果指定了type，停止指定队列的延迟计时器
			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			// type == null
			// 没有指定type，停止所有队列的延迟计时器
			} else {
				for ( index in data ) {
					// rrun = /queueHooks$/,
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			// 遍历动画脉搏数组
			for ( index = timers.length; index--; ) {
				// 如果脉搏的对象是当前对象，并且未指定队列或队列对应
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );  // 停止动画
					dequeue = false; // 指定dequeue为false，当gotoEnd为true，让complete回调去执行出队
					timers.splice( index, 1 ); // 把脉搏从数组中移除
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			// 如果上一个步骤没有将dequeue置位false执行下一个出队
			// 如果gotoEnd为true，将会触发动画的complete回调，里面有出队操作所以就不在这里执行
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );  // 出队下一个
			}
		});
	},
	/**
		立即结束当前元素在指定队列中的正在进行以及排队的所有动画，并到达最终位置
		$().finish
		@param {String|Boolean} type 队列名称或者不指定队列
	*/
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],  // 队列
				hooks = data[ type + "queueHooks" ], // 队列清除钩子
				timers = jQuery.timers,  // 动画脉搏数组
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			// 在data中标记finish，好让doAnimation立即结束动画
			data.finish = true;

			// empty the queue first
			// 首先把队列清空
			jQuery.queue( this, type, [] );

			// 执行hooks.stop方法，清除延时计时器
			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			// 寻找任何进行中的动画，完成它们
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			// 寻找队列中所有正在排队的动画，并结束它
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			// 删除finish标记
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];  // 已存在的同名方法，直接设置CSS而不动画
	/* 
		切换显示、显示、隐藏
		$().toggle
		$().show
		$().hide

		@param {Number|String|Boolean} speed 动画时长（number|string）或者原toggle方法的参数（boolean）
		@param {String} easing 运动曲线
		@param {Function} callback 回调函数
	*/
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :  // 如果speed为null或者speed为boolean就设置CSS而不动画
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
// 生成快捷的自定义动画
jQuery.each({
	slideDown: genFx("show"),  // 向上向下就不包含横向的运动，第二个参数为空
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];  // 用于存放动画脉搏
// jQuery.fx脉搏
// jQuery.fx = Tween.prototype.init
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now(); // 此处创建fxNow是为了动画的同步性，新添加的动画可以使用该fxNow与前面的动画步调一致

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		// 运行脉搏函数，如果返回了false则说明时间到
		// 检查确认该脉搏还未被移除
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );  // 时间到了就移除之
		}
	}

	// 如果所有动画都已经结束，就停掉计时器
	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;  // 清除fxNow直到下一次脉搏，这样在此期间添加的动画开始可以获取实时时间
};

/**
	添加一个动画脉搏函数
	@param {Function} timer 控制动画进行以及判断动画时间结束的脉搏函数
*/ 
jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer ); // 将脉搏放入jQuery.timers统一管理，亦可判断元素是否是':animated'
	if ( timer() ) {
		// 执行脉搏，如果判断动画时间未到，就启动jQuery动画定时器
		jQuery.fx.start();
	} else {
		// 如果动画虽未开始，但时间已经到了，就不执行该动画，直接把该脉搏移除
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;  // 1000 / 13 = 76.9帧

// 启动jQuery动画定时器
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval ); // 用setInterval性能优于setTimeout
	}
};

// 停止jQuery动画定时器
jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

// 预设的动画时长
jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	// 默认时长
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
/**
	队列延迟
	基于Clint Helfers的插件和许可
	http://blindsignals.com/index.php/2009/07/jquery-delay/
	$().delay
	@param {Number|String} time 延迟时间
	@param {String} type 队列名称 默认'fx'
*/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, 
	/**
		@param {Function} next 下一个执行函数
		@param {Object} hooks 清除队列的钩子对象
	*/
	function( next, hooks ) {
		var timeout = setTimeout( next, time );  // 延迟time毫秒
		// 清除延迟定时器
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};

/*====== 获取/设置attr、val、prop部分  ======*/
(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	// 部署
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	// 首先批量测试
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	// 测试用setAttribute设置className。如果可以，我们需要修复get/setAttribute（ie6/7）
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	// 从getAttribute获取style信息（IE用.cssText替代）
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	// 保证获取的URL不会被更改（IE会默认将其规范化，例如给链接地址加上协议头）
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	// 检查checkbox/radio默认值（WebKit为""，其它为"on"）
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	// 保证默认被选中的option有一个起作用的selected属性（WebKit默认用false替代true，IE也是如果在optgroup中的时候）
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	// 测试对form上的enctype的支持
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	// 保证在一个disabled的select中的options不会被变成disabled（webKit会把它们变成disabled）
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	// 仅支持IE8
	// 验证是否能信任getAttribute("value")的结果
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	// 验证是否一个input的type变成radio以后仍能保持其value
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g; // 回车符

jQuery.fn.extend({
	/**
		$().val
		获取或设置表单元素的值
		@param {String|Boolean|Number|Array|Function} value 要设置的值或者设值函数
	*/
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];  // 取值只取第0个元素的

		/* 获取部分 */
		if ( !arguments.length ) {
			if ( elem ) {
				// 根据type或者nodeName的小写获取钩子对象
				hooks = jQuery.valHooks[ elem.type /* 如checkbox、radio */ ] || jQuery.valHooks[ elem.nodeName.toLowerCase() /* 如select、option */];

				// 通过钩子对象的get获取了value
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined) {
					return ret;
				}

				ret = elem.value; // 原始的取值方式

				return typeof ret === "string" ?
					// handle most common string cases
					// 处理最常见的字符串情况
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					// 处理null/undefined或数字的情况
					ret == null ? "" : ret;
			}

			return; // 如果实例中没有元素，返回null
		}

		/* 设置部分 */
		isFunction = jQuery.isFunction( value ); // 是否是设值函数

		return this.each(function( i ) {
			var val;

			// 只能给元素节点赋值
			if ( this.nodeType !== 1 ) {
				return;
			}

			// value是设值函数，需要首先执行获取要设置的值
			if ( isFunction ) {
				// 运行function会传入的3个参数分别是elem index以及当前value
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			// 把null/undefined当作""；把numbers转成string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			// 如果val是数组，例如给input[type=checkbox]赋值
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			// 根据type或者nodeName的小写获取钩子对象
			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			// 如果钩子对象的set返回了undefined，回退到原始的赋值方式
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;  // 原始的赋值方式
			}
		});
	}
});

jQuery.extend({
	/**
		$.valHooks
		针对某些元素或type的getter/setter的钩子对象
	*/
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// 支持：IE10-11+
					// 用option.text会抛出一个异常
					jQuery.trim( jQuery.text( elem ) );  // option如果value为null，则文本内容默认为其value
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options, // 得到其所有的option
					index = elem.selectedIndex,  // 获取select被选中的索引
					one = elem.type === "select-one" || index < 0, // 单选或没有被选中的索引
					values = one ? null : [], // 单值/多值
					max = one ? index + 1 : options.length, // 循环的终点：如果是单选止于selectedIndex；如果是多选到最后一个option
					// 循环的起点
					// 当selectedIndex < 0: max = i = 0
					// 当是单选: max = selectedIndex + 1, i = selectedIndex
					// 当是多选: max = options.length, i = 0
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				// 循环通过所有被选中的options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					// 老IE在form被reset后不刷新option的selected
					// option必须是selected或索引为select的selectedIndex，同时option必须不是disabled，同时optgroup必须不是disabled或者option的父元素不是optgroup
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							// 不要返回disabled的或者在disabled的optgroup中的options的值
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						// 获取该option的值
						value = jQuery( option ).val();

						// We don't need an array for one selects
						// 单选select，我们不需要把值放入数组，立刻返回
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						// 多选select返回一个值的数组
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),  // 为了照顾对选的情况，将value转成数组的形式
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					// 如果options中存在该value的option
					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						// 支持：IE6
						// 当新的option被添加到选择框，需要强制reflow？？新增节点以解决初始化属性的延迟
						try {
							option.selected = optionSet = true;  // 该option的value在values中

						} catch ( _ ) {

							// Will be executed only in IE6
							// 只会在IE6中被执行
							option.scrollHeight;
						}

					} else {
						option.selected = false;  // 该option的value不在values中
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				// 如果没有option被选中，强制把select的selectedIndex设为-1
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
// Radios和checkboxes的getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				// 如果value是数组，只有值在value数组中才被选中
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
			// 如果value不是数组或类数组，返回null
		}
	};
	// 如果checkbox/radio的默认值不是"on"
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			// 支持：Webkit
			// 如果value没有指定，返回'on'替代''
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,  // 获取属性的方法
	ruseDefault = /^(?:checked|selected)$/i,  // 选中状态
	// getSetAttribute是否正常
	getSetAttribute = support.getSetAttribute,
	// 是否能信任getAttribute("value")的结果
	getSetInput = support.input;

jQuery.fn.extend({
	/**
		$().attr
		获取或设置元素的属性
		@param {String} name 属性名
		@param {String|Boolean|Number|Function} value 要设置的值或设值函数
	*/
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 /* 如果是set可以连缀 */);
	},

	/**
		$().removeAttr
		移除指定属性
		@param {String} name 属性名
	*/
	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	/**
		$.attr
		设置或获取属性
		@param {Element} elem 元素
		@param {String} name 属性名
		@param {String|Boolean|Number} value 要设置的值
	*/
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		// 不要在文本、注释或属性节点上操作
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		// 如果不支持attributes就降级到prop
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		// 所有attributes都是小写
		// 获取必需的钩子如果有定义
		// 如果elem不是元素节点,或者elem不是XML文档
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			// "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		// 赋值
		if ( value !== undefined ) {

			if ( value === null ) {
				// 值为null就移除该attr
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				// set钩子
				return ret; 

			} else {
				// 传统设置
				elem.setAttribute( name, value + "" );
				return value;
			}
		// 取值
		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			// get钩子
			return ret;

		} else {
			// Sizzle.attr
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			// 不存在的attributes返回null，我们统一处理为undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	/**
		$.removeAttr
		移除属性
		@param {Element} elem 元素
		@param {String} value 空格分隔的属性名字符串
	*/
	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			// var rnotwhite = (/\S+/g);
			attrNames = value && value.match( rnotwhite ); // value以空格进行拆分获取要移除的属性名

		// 如果存在属性名且elem是元素节点
		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				/*
					propFix: {
						"for": "htmlFor",
						"class": "className"
					}
				*/
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				// “真/假”的属性区别对待
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					// 把相应的属性设为false
					// 如果信任getAttribute获取value的结果并且getSetAttribute正常，或者属性名不是checked或selected
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					// 支持：IE<9
					// checked或selected要清理掉defaultChecked/defaultSelected
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				// 看#9699对这一做法的解释（先设置再移除）
				} else {
					jQuery.attr( elem, name, "" );
				}

				// 移除属性
				elem.removeAttribute( getSetAttribute ? name : propName );  // 针对移除class，IE6/7的属性名是className，其它为class
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// 如果input的type变成radio以后仍能保持其value，并且类型是'radio'，并且元素是'input'
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					// IE6-9上在一个radio设置type会重置value
					var val = elem.value; // 保留之前的值
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;  // 恢复之前的值
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
// 布尔值属性的钩子
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			// 当在布尔值属性上面设置false值得时候就移除该属性
			jQuery.removeAttr( elem, name );
		// 如果信任getAttribute获取value的结果并且getSetAttribute正常，或者属性名不是checked或selected
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			// IE<8需要专有属性名
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		// 对老IE需要设置defaultChecked或defaultSelected
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
// 特别的布尔值属性获取
// checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	// jQuery.find = Sizzle
	// jQuery.expr = Sizzle.selectors
	// attrHandle = jQuery.expr.attrHandle = Sizzle.selectors.attrHandle
	var getter = attrHandle[ name ] || jQuery.find.attr;  // 保存先前相应的attrHandle如果有，并得到getter

	// 添加或重写相应的attrHandle
	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		/**
			如果信任getAttribute获取value的结果并且getSetAttribute正常，或者属性名不是checked或selected的情况
			@param {Element} elem 元素
			@param {String} name 属性名
			@param {Boolean} isXML 是否是XML文档
		*/
		function( elem, name, isXML ) {
			var ret, handle;
			// 若不是XML文档
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				// 通过暂时从getter中移除本函数来避免一种无限循环
				handle = attrHandle[ name ];  // 保存本函数
				attrHandle[ name ] = ret;  // 把attrHandle[ name ]设为undefined
				// 如果能够通过getter获取到相应属性，返回属性值就是它的属性名（例如'readonly="readonly"'），否则null
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;  // 恢复本函数
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			// 若不是XML文档
			if ( !isXML ) {
				// 通过诸如'defaultReadOnly'的形式去获取，如果有就返回属性名小写
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
// 修复低版本IE属性
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			// 如果元素是input
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				// 不返回任何东西，使调用者仍会用setAttribute设置
				elem.defaultValue = value; // 设置elem的defaultValue为value
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				// 用nodeHook如果有定义，其余情况用setAttribute就可以
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
// 某些属性，IE6/7不支持用get/setAttribute获取或设置
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	// 用这个针对任意IE6/7属性
	// 这个几乎修复所有IE6/7的问题
	nodeHook = {
		/**
			@param {Element} elem 元素
			@param {String|Number|Boolean} value 属性值
			@param {String} name 属性名
			@returns {String} value 如果设置成功 返回value
		*/
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			// 设置存在的或者创建一个新的属性节点
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}
			// 把value转成字符串，然后赋值给属性
			// value = value + "", ret.value = value
			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			// 如果属性名是'value'，或者要设置的属性值和已设置的属性值相等
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;	// 说明操作成功
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	// 一些属性当值未定义的时候将用空字符串构造
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	// 修复在按钮上检索值得时候需要有定义此属性
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			// 如果有定义此属性才去获取
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	// 通过把contenteditable设为false来移除该属性
	// 如果给其值设置为空字符串会抛出一个非法值的错误
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	// 当value是空字符串，设置width和height为'auto'替代0
	// 这是用来移除
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

// 如果不支持用getAttribute获取style
if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			// 如果获取的是空字符串就返回undefined
			// 注：IE把css属性名大写，但是如果我们用.toLowerCase()小写.cssText，将会破坏URL中的大小写敏感性，例如在'background'？
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,  // 可获取焦点的元素
	rclickable = /^(?:a|area)$/i; // 有点击功能的元素

jQuery.fn.extend({
	/**
		$().prop
		获取或设置属性（property）
		@param {String} name 属性名
		@param {String|Number|Boolean|Function} value 属性值或求值函数
	*/
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	/**
		$().removeProp
		移除属性（property）
		@param {String} name 属性名
	*/
	removeProp: function( name ) {
		/*
			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		*/
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			// try/catch防止IE拒绝报错（例如删除window上面的属性）
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	/**
		$.prop
		添加或删除属性
		@param {Element} elem 元素 
		@param {String} name 属性名
		@param {String|Number|Boolean} value 属性值
	*/
	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		// 不要在文本节点、注释节点和属性节点上面获取/设置属性
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// elem不在XML文档中或者elem不是元素节点
		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			// 修复属性名并得到钩子
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		// 设置
		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				// 以钩子设置成功
				ret :
				// 传统设置方式
				( elem[ name ] = value );

		// 获取
		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				// 以钩子获取成功
				ret :
				// 传统获取方式
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				// elem.tabIndex不总是返回正确的值当未明确设定的情况下
				// 用适当的属性值
				var tabindex = jQuery.find.attr( elem, "tabindex" );
				// var rfocusable = /^(?:input|select|textarea|button|object)$/i,
				// rclickable = /^(?:a|area)$/i;
				return tabindex ?
					// 如果成功获取到tabindex且不为0，把它转成十进制整形返回
					parseInt( tabindex, 10 ) :
					// 如果没有成功获得tabindex或tabindex为0，如果是链接或者可获得焦点的元素，返回0，其余返回-1
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
// 获取一些属性在IE上面需要特殊调用
// 如果获取链接会被浏览器默认‘标准化’
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	// href/src需要得到规范的URL
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				/*
					0
					Default. Performs a property search that is not case-sensitive, and returns an interpolated value if the property is found.
					1
					Performs a case-sensitive property search. To find a match, the uppercase and lowercase letters in strAttributeName must exactly match those in the attribute name.
					2
					Returns attribute value as a String. This flag does not work for event properties.
					4
					Returns attribute value as a fully expanded URL. Only works for URL attributes.
				*/
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
// 支持：Safari, IE9+
// 默认被选中的option丢失选中状态
// 访问父元素的selectedIndex来修复
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				// 保证在optgroups的情况下仍然有效
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;  // 此处并不返回结果，只是修复
		}
	};
}
 // 确保这些属性大写小写方式皆可使用
jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
// IE6/7把enctype称为encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;  // 制表符、回车符、换行符、换页符

jQuery.fn.extend({
	/**
		$().addClass
		添加class
		@param {String|Function} value 要添加的class或者获取要添加class的函数
	*/
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		// value是函数的情况
		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) ); // index, elem.className
			});
		}

		// 如果value是字符串
		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			// 这里的分离是为了更好的压缩性（看removeClass）
			// var rnotwhite = (/\S+/g);
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// elem当前的className
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);
				// 如果elem存在class
				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// 只加入elem当前没有的class
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					// 只有当前className与新的className不同才加来避免不必要的渲染
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	/**
		$().removeClass
		移除class
		@param {String|Function} value 要移除的class或者获取要移除class的函数；当该参数为空移除所有class
	*/
	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		// value是函数的情况
		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		// 如果参数为空或者value为字符串
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				// 这种表达式（在首尾加空格）是为了更好的可压缩性（看addClass）
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						// 移除所有符合
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					// 只有当前className与新的className不同才加来避免不必要的渲染
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	/**
		$().toggleClass
		切换class的添加/删除状态
		@param {String|Function} value 要切换的class或者获取要切换class的函数；当不传该参数，切换所有class
		@param {Boolean} stateVal 当为'真'添加class，为'假'移除class
	*/
	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		// 如果stateVal是布尔值，且value是字符串
		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		// value是函数的情况
		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			// 当value是字符串
			if ( type === "string" ) {
				// toggle individual class names
				// 切换个别class
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					// 检查以空格分隔的每一个className
					if ( self.hasClass( className ) ) {
						self.removeClass( className );  // elem有该class就删除
					} else {
						self.addClass( className );  // elem有该class就添加
					}
				}

			// Toggle whole class name
			// 切换整个class
			// 如果value是布尔值或是undefined
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					// 先保存它的className，以便下次设置
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				// 如果元素有class或者我们传入了'false'，
				// 移除整个classname（如果有class，上面会保存下来）；
				// 否则恢复之前保存的所有class（如果有），
				// 如果之前没有任何保存我们指定空字符串。
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	/**
		$().hasClass
		是否存在某class
		@param {String} selector className
	*/
	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;  // 只要实例中的任一匹配元素具有该class就返回真
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion
// 返回只包含属性的jQuery

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	// 处理事件绑定
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?  // 是否传入参数
			this.on( name, null, data, fn ) :  // 事件绑定
			this.trigger( name );  // 触发事件
	};
});

jQuery.fn.extend({
	/** 
		$().hover
		添加鼠标移入/移出事件
		@param {Function} fnOver 鼠标移入监听；当不传fnOut时同时监听鼠标移出
		@param {Function} fnOut 鼠标移出监听
	*/
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},
	/* 
		$().bind
		同$().on(types, data, fn)
		@param {String} types 空格分隔的事件类型
		@param {Object} data 额外数据
		@param {Function} fn 监听函数
	*/
	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	/**
		$().unbind
		同$().off(types, fn)
		@param {String} types 空格分隔的事件类型
		@param {Function} fn 要移除的监听函数
	*/
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	/**
		$().delegate
		同$().on(selector, types, data, fn)
	*/
	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	/**
		$().undelegate
		同$().undelegate(selector, types, fn)
	*/
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();  // 当前系统时间

var rquery = (/\?/);  // url中的'?'


/*
	// JSON中合法的成分
	// 逗号、中括号左、大括号左、大括号右、中括号右、带引号的键名或值、布尔值、null、数字
	捕获1：逗号
	捕获2：中括号左或大括号左
	捕获3：中括号右或大括号右
*/
var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

/**
	$.parseJSON
	解析JSON
	@param {String} data 待解析的JSON字符串
	@returns {Object} 解析成功的对象
*/
jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	// 首先尝试用原生的JSON解析方法
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		// 支持：Android 2.3
		// 解决data为null的情况
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	// 通过检查移除所有合法的tokens后有无剩余来校验JSON字符串的合法性（以及防止可能的危险）
	/*
		ECMAScript v3 规定，replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身
	*/
	/*
		@param comma (,)
		@param open (\[|{)
		@param close (}|])
	*/
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		// 遇到一个意外的逗号就强行终止
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		// 当最外层深度为0表明没有更多替换
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		// 逗号不能跟在'['、'{'、','之后
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		// 检查新depth
		// 数组/对象开始（"["或"{"）：depth += true(1) - false(0)（增）
		// 数组/对象结束（"]"或"}"）：depth += false(0) - true(1)（减）
		// 其余情况（","或基本类型）：depth += true(1) - true(1)（不增不减）
		depth += !close - !open;

		// Remove this token
		// 移除该token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :  // 合法就解析（str变成空字符串）
		jQuery.error( "Invalid JSON: " + data );  // 不合法就抛出错误
};


// Cross-browser xml parsing
/**
	$.parseXML
	跨浏览器解析XML
	@param {String} data 待解析的字符串
	@returns {Document|Null} xml 解析成功的xml文档或解析失败返回null
*/
jQuery.parseXML = function( data ) {
	var xml, tmp;
	// data必须是字符串
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard W3C标准
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE  老不死的IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	// 处理解析不成功
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	// ajax默认location（主机名+端口）
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,  // hash
	rts = /([?&])_=[^&]*/, // 防止ajax缓存的额外参数
	/**
		回复头键值对
		捕获1：键
		捕获2：值
	*/
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL IE结尾少一个\r
	// #7653, #8125, #8152: local protocol detection
	 // 离线协议，如file:等
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/, // 无content的method（get或head）
	rprotocol = /^\/\//, // 以注释符号'//'开头
	/**
		协议+主机名+端口号 例如'http://localhost:8080'
		捕获1：协议
		捕获2：主机名
		捕获3：端口号
	*/
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* 
		Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType 
	 * 4) the catchall symbol "*" can be used  
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed

		预处理器
	 * 1) 对引入自定义数据类型很有用（参见ajax/jsonp.js的案例）
	 * 2) 在以下情况下被调用：
		 *    - 在调用传输之前
		 *    - 在参数被序列化之后（如果s.processData为true则s.data被转成字符串）
	 * 3) 键就是它的dataType 
	 * 4) 可以用通配符*
	 * 5) 先处理transport的dataType然后根据需要处理通配符
	 */
	prefilters = {},

	/* 
		Transports bindings
		
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed

		各种Transport
	* 1) key就是它的dataType 
	* 2) 可以用通配符*
	* 3) 先根据dataType选择合适的transport没有再用通用transport
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	// 之所以写成这样是防止跟注释标识冲突
	allTypes = "*/".concat("*"); // */*

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
// 如果document.domain被设置，IE在访问window.location某一字段的时候会抛出一个错误
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	// 使用a元素的href属性获取因为IE会根据document.location修改href
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
// rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, // 协议+主机名+端口号
// 根据location.href设置ajax默认地址
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
/**
	jQuery.ajaxPrefilter和jQuery.ajaxTransport的基本'构造函数'
	@param {Object} structure prefilters或transports
	@returns {Function} 返回一个添加相应dataType处理函数的函数
*/
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	// dataType表达式可自定义且默认为"*"
	/**
		给structure添加相应dataType的处理函数
		@param {String} dataTypeExpression 以空格分开的dataType表达式（可选的并且默认为"*"）
		@param {Function} func 对相应dataType进行处理的函数
	*/
	return function( dataTypeExpression, func ) {
		// 只传入func的情况
		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			// 以空格拆分dataTypeExpression获取dataTypes数组
			// 如：* html text json xml jsonp...
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			// 遍历dataTypeExpression中的每一个dataType
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				// 如果dataType字符串以一个'+'开始，则截掉这个'+'然后将处理函数塞入datatype数组前部，先执行
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				// 处理函数放入datatype数组后部，后执行
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
/**
	根据dataType找对应的prefilter或transport
	@param {Object} structure prefilters或transports
	@param {Object} options 基于用户传入的ajax-options后经过jQuery处理后的options
	@param {Object} originalOptions 用户传入的ajax-options
	@param {Object} jqXHR jQuery封装xhr对象
	@returns {Object} 如果是寻找相应的transports，返回找到的transports
*/
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {}, // 标记已经检查过的dataType
		seekingTransport = ( structure === transports );  // 是否在寻找transports

	/**
		根据dataType依次运行structure[ dataType ]数组里面的函数对数据进行预处理或得到transport
		@param {String} dataType 
		@returns {Object} selected 如果当structure是transports，返回得到的transport
	*/
	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR ); // 运行处理函数
			// 如果运行结果返回dataType字符串，并且不是找transports，并且没有运行过该dataType的预处理
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );  // 根据预处理函数返回的datatype在dataTypes链前部塞入一个新的dataType
				inspect( dataTypeOrTransport );  // 重新执行预处理
				return false;  // 本次循环不再继续
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport ); // 找到了transport就跳出循环
			}
		});
		return selected;
	}

	// 如果seekingTransport为真，返回找到的transport
	// 如果seekingTransport为假，除了执行options.dataTypes[ 0 ]的预处理，还要执行dataType为'*'的预处理
	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
/**
	一个为ajax options的特殊扩展方法，flatOptions指定的属性不能深度扩展
	@param {Object} target 目标对象
	@param {Object] src 源对象
	@returns {Object} target 
*/
function ajaxExtend( target, src ) {
	var deep, key,
		/*
			flatOptions: {
				url: true,
				context: true
			}
		*/
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			// flatOptions指定的属性在target不能深度扩展
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		// deep extend
		// 深度扩展
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
/**
	处理ajax请求的responses
	- 找到正确的dataType（介于content-type和预期的dataType）
	- 返回相应的response
	@param {Object} s ajax-options
	@param {Object} jqXHR jQuery封装xhr对象
	@param {Object} responses 全部回复
	@returns {Object} response 相应的response
*/
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes; // [*, json, script, html, ...]

	// Remove auto dataType and get content-type in the process
	// 移除通配符的dataType，并且在此过程得到content-type
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		// 若ct未设置
		if ( ct === undefined ) {
			// 若dataType为'*'，就取s.mimeType或者header的Content-Type为默认的dataType
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	// 检查是否我们在处理一个已知的content-type
	// text/javascript, application/javascript, application/ecmascript, application/x-ecmascript
	/*
		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/

			script: /(?:java|ecma)script/
		}
	*/
	// 如果dataTypes中存在*
	if ( ct ) {
		for ( type in contents ) {
			// 如果是已知的content-type
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				// 把type塞入dataTypes数组前部
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	// 看看是否我们有一个预期dataType的response
	// 如果responses中存在这个dataType的回复
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];  // 最终的dataType
	} else {
		// Try convertible dataTypes
		// 尝试可转换的dataTypes
		/*
			converters: {
				// Convert anything to text
				"* text": String,  // new String(XX)

				// Text to html (true = no transformation)
				"text html": true,  // true就是不转型

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			}
		*/
		for ( type in responses ) {
			// 如果dataTypes中没有明确的dataType并且无已知的content-type或mimeType，或者converters中有可转换为预期dataType的方式
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;  // 最终的dataType
				break;
			}
			// 如果还未设置firstDataType（备用dataType）
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		// 如果仍没有获取到finalDataType就取responses中的第一个type
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	// 如果我们找到了一个dataType
	// 我们把dataType放到数组中如果需要，并且返回相应的response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			// 塞入数组前部
			dataTypes.unshift( finalDataType );
		}
		// 返回合适的response
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 /**
	根据request中的datatypes对原始回复数据进行链式转换
	并且在jqXHR实例设置responseXXX字段
	@param {Object} s ajax-options
	@param {Object} response 未经转换的回复数据
	@param {Object} jqXHR jQuery封装xhr对象
	@param {Boolean} isSuccess 请求是否成功
	@returns {Object} { state: "success", data: response } 经过转换后的数据
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
	    // 用复制的dataTypes目的是我们需要为转换而修改它
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	// 创建一个以小写字母为键名的map
	/*
		converters: {
			// Convert anything to text
			"* text": String,  // new String(XX)

			// Text to html (true = no transformation)
			"text html": true,  // true就是不转型

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		}
	*/
	// 如果dataTypes的长度大于1
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift(); // 取出dataTypes的第一个type

	// Convert to each sequential dataType
	// 依dataType的次序转换
	while ( current ) {
		/*
		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		}
		*/
		// 如果responseFields存在current dataType字段
		if ( s.responseFields[ current ] ) {
			// 设置jqXHR中的字段
			// 例如jqXHR["responseXML"] = response
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		// 如果传入了dataFilter，应用之（只会应用一次）
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current; // 当前dataTypes
		current = dataTypes.shift();  // 下一个dataTypes

		if ( current ) { // 如果存在下一个dataTypes

			// There's only work to do if current dataType is non-auto
			// 这里只针对当前dataType是非通配符的处理
			if ( current === "*" ) {

				current = prev;  // 这样做的目的是下一轮循环prev仍然是等于它 #9315

			// Convert response if prev dataType is non-auto and differs from current
			// 转换response如果前一个dataType不是通配符并且不同于当前的
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				// 直接就找到了最适合的converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				// 什么？居然没找到？！那就再找一遍
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						// 如果conv2输出current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							// 如果prev可以被转成接受的输入
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								// 如果该converters的输入可以直接替代prev的情况
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								// 增加这么一个转换节点
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];  // 下一轮循环prev指向current
									dataTypes.unshift( tmp[ 1 ] ); // tmp[1]就是下一轮的current
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				// 应用转换（如果前后不等价）
				// true就是不转换（等价），非true就是要转换
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					// 除非允许错误冒泡(s.throws)，否则捕获并返回它
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							// 捕获转换错误
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}
	
	// 转换完成
	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	// 控制活动数
	active: 0,

	// Last-Modified header cache for next request
	// 为下一次请求的Last-Modified header缓存
	lastModified: {},
	// etag
	etag: {},

	ajaxSettings: {
		url: ajaxLocation, // 默认请求url就是当前域名
		type: "GET", // 默认GET请求
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ), // 是不是离线协议，如file：
		global: true,  // 默认应用ajax全局方法和事件
		processData: true, // 默认processData为true 表示data会被转成string
		async: true, // 默认异步
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",  // 默认的contentType
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
		// 接受
		accepts: {
			"*": allTypes,  // */*
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},
		// 内容格式
		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},
		// 回复字段
		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		// 数据转换
		// 源格式（或通配符*）和目标格式以一个单空格隔开
		converters: {

			// Convert anything to text
			// 把所有东西转换成文本
			"* text": String,  // new String(XX)

			// Text to html (true = no transformation)
			// 文本转成html（true代表不转换）
			"text html": true,

			// Evaluate text as a json expression
			// 把文本转换成一个json表达式
			"text json": jQuery.parseJSON,

			// Parse text as xml
			// 把文本转换成xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		// 这些参数不能深度扩展，你还可以在此添加你自己的自定义选项如果你创建一个不能被深度扩展（参见ajaxExtend）
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	// 把ajaxSettings和settings的所有设置项整合到target
	// 如果target参数缺省，就扩展ajaxSettings
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			// 创建一个setting对象
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			// 直接扩展ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),  // 添加ajax预处理
	ajaxTransport: addToPrefiltersOrTransports( transports ),  // 添加ajax传输

	// Main method
	/**
		$.ajax
		主方法
		@param {String} url 请求地址
		@param {Object} options ajax配置参数对象
	*/
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		// 如果url是一个对象，模拟pre-1.5签名
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		// 强制option为一个对象
		options = options || {};

		var // Cross-domain detection vars
			// 跨域检测
			parts,
			// Loop variable
			// 循环变量
			i,
			// URL without anti-cache param
			// 可以被缓存的URL
			cacheURL,
			// Response headers as string
			// Response headers作为字符串
			responseHeadersString,
			// timeout handle
			// 超时控制
			timeoutTimer,

			// To know if global events are to be dispatched
			// 是否触发全局事件
			fireGlobals,
			// 请求传输对象
			transport,
			// Response headers
			// 回复头
			responseHeaders,
			// Create the final options object
			// 创建终极options对象
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			// 回调函数的上下文，默认终极options对象
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			// 若callbackContext是一个DOM或jQuery实例则全局事件上下文为jQuery(callbackContext)，否则是jQuery.event
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			// 链式回调defer
			deferred = jQuery.Deferred(),
			// complete的回调只能触发一次，但可以添加新触发，并且每次回调会保留上一次的上下文和参数
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			// 基于状态的回调的状态码
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			// Headers（它们被一次性发送）
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			// jqXHR状态 0 请求未开始 1 请求进行中 2 请求已完成
			state = 0,
			// Default abort message
			// 默认放弃请求信息
			strAbort = "canceled",
			// Fake xhr
			// 伪造xhr
			jqXHR = {
				// 当前的请求状态
				readyState: 0,

				// Builds headers hashtable if needed
				// 根据key获取getResponseHeader
				getResponseHeader: function( key ) {
					var match;
					// 只有请求已完成才能获取
					if ( state === 2 ) {
						// 懒创建headers的哈希表
						if ( !responseHeaders ) {
							responseHeaders = {};
							// rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								// key为小写
								// responseHeaders[key] = value
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					// 没有结果返回null
					return match == null ? null : match;
				},

				// Raw string
				// 返回responseHeadersString
				getAllResponseHeaders: function() {
					// 请求结束后才能返回，否则null
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				/**
					设置请求头
					@param {String} name 键
					@param {String} value 值
				*/
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					// 只有请求未开始才添加
					if ( !state ) {
						// 缓存name的全小写形式，每次用小写来获取
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				// 覆盖回复头的content-type
				overrideMimeType: function( type ) {
					// 只有请求未开始才能覆盖
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				/**
					添加或执行基于status的回调
					@param {Object} map 存放状态码对应回调集合的哈希表
					@returns {Object} jqXHR
				*/
				statusCode: function( map ) {
					var code;
					if ( map ) {
						// 如果请求未完成
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								// 懒添加新的回调，并保留已存在的
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
							// 如果请求已结束
						} else {
							// Execute the appropriate callbacks
							// 执行对应jqXHR.status的回调
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				/**
					取消一次请求
					@param {String} statusText 放弃状态文本
					@returns {Object} jqXHR
				*/
				abort: function( statusText ) {
					// strAbort = "canceled"
					var finalText = statusText || strAbort;
					// 如果请求已经开始
					if ( transport ) {
						transport.abort( finalText ); // 放弃本次传输
					}
					done( 0, finalText );  // 第一个参数影响jqXHR的readyState
					return this;
				}
			};

		// Attach deferreds
		// 把jqXHR变成一个promise
		deferred.promise( jqXHR ).complete = completeDeferred.add;  // complete
		jqXHR.success = jqXHR.done; // success方法就是触发defer.done
		jqXHR.error = jqXHR.fail;  // error方法就是触发defer.fail

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		// 移除hash部分
		// 添加协议如果没有的情况下（IE7在缺少协议的url上有问题）
		// 处理url在settings中的情况（与旧版本保持一致）
		// 我们也会用url参数如果存在的话
		// rhash = /#.*$/,
		// rprotocol = /^\/\//, // '//'
		// rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, // 协议 主机名 端口号
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			// url没有带协议，加入当前网址的协议
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		// 给'method'别名'type'
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		// 获得dataType列表
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		// 若'协议:主机名:端口号'不匹配则我们在进行一个跨域请求
		if ( s.crossDomain == null ) {
			// rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, // 协议 主机名 端口号
			parts = rurl.exec( s.url.toLowerCase() );
			// 判断是否跨域
			s.crossDomain = !!( parts &&
				// parts[ 1 ] 协议
				// parts[ 2 ] 主机名
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					// parts[ 3 ] 端口号
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		// 如果processData为真，转换data如果它还不是一个字符串
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		// 应用预处理
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		// 如果request被预处理取消了，止于此
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// 如果需要触发全局事件，我们在此开始
		fireGlobals = s.global;

		// Watch for a new set of requests
		// 开始一批新的请求
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");  // 如果没有其余正在进行的请求，就触发'ajaxStart'事件
		}

		// Uppercase the type
		// type需要大写
		s.type = s.type.toUpperCase();

		// Determine if request has content
		// 检查是否request有content
		// rnoContent = /^(?:GET|HEAD)$/,
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// 保存URL以便过后我们解决If-Modified-Since和/或If-None-Match请求头
		cacheURL = s.url;

		// More options handling for requests with no content
		// 当requests没有content的更多options处理
		if ( !s.hasContent ) {
			// If data is available, append data to url
			// 如果存在data，将data追加到url
			if ( s.data ) {
				// var rquery = (/\?/);
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				// 移除data因为它不会再使用
				delete s.data;
			}

			// Add anti-cache in url if needed
			// 如果需要，在url添加防缓存参数
			if ( s.cache === false ) {
				// rts = /([?&])_=[^&]*/,
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					// 如果已经有一个'_'请求参数，设置其值
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					// 否则在url尾部加入一个
					// var rquery = (/\?/);
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		// 在ifModified mode下设置If-Modified-Since和/或If-None-Match请求头
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				// 自从被上次时间修改
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				// 有没有该URL的etag匹配
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		// 如果data会被发送即存在content，设置Content-Type
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		// 基于dataType设置Accepts
		/*
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"

				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			}

			allTypes = "*\/".concat("*"); // *\/*
		*/
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				// 例如'text/html,*/*;q=0.01'或者'*/*'等
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		// 设置其它headers
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		// 允许自定义的headers/mimetypes以及提前放弃请求
		// 如果ajax.beforeSend返回了false，或者state变为2
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			// 如果还没有done就放弃本次请求并返回
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		// 放弃请求不再是'取消'
		// strAbort = "canceled" 
		strAbort = "abort";

		// Install callbacks on deferreds
		// 给deferreds添加回调
		/*
			添加请求成功、失败、完成的回调
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
		*/
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );  // 成功 失败 完成
		}

		// Get transport
		// 得到请求transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		// 没有找到transport，放弃本次请求
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			/*
				0 － （未初始化）还没有调用send()方法 
				1 － （载入）已调用send()方法，正在发送请求 
				2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
				3 － （交互）正在解析响应内容 
				4 － （完成）响应内容解析完成，可以在客户端调用了
			*/
			jqXHR.readyState = 1;

			// Send global event
			 // 触发global的ajaxSend事件
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			// 异步模式设置超时
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;  // state = 1 请求发送中
				transport.send( requestHeaders, done ); // 发送请求
			} catch ( e ) {
				// Propagate exception as error if not done
				// 如果请求未完成，把异常当错误处理
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				// 其它情况，直接抛出
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		/**
			所有都完成的回调
			@param {Number} status response状态码
			@param {String} nativeStatusText response状态文本
			@param {Object} responses response体
			@param {String} headers response头
			@returns {Object} jqXHR 
		*/
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			// 只能调用一次
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			// 状态现在是'done'了
			state = 2;

			// Clear timeout if it exists
			// 清除超时计时器如果存在
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			// 这个transport已经没用了，等待垃圾回收（不管jqXHR对象好久被使用）
			transport = undefined;

			// Cache response headers
			// 缓存response headers
			responseHeadersString = headers || "";

			// Set readyState
			// 设置readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			// 判断请求是否成功
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			// 获得response数据
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			// 转换不管什么（responseXXX字段总会被设置）
			/*
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			}
			*/
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			// 如果请求成功，处理类型链
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				// 如果在ifModified模式，设置If-Modified-Since和/或If-None-Match
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;  // 设置相应url的lastModified缓存
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;  // 设置相应url的etag缓存
					}
				}

				// if no content
				// 如果回复没有content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				// 如果没有改变
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				// 如果有data，转换它
				} else {
					/*
						{ state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current }
						{ state: "success", data: response }
					*/
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			// 如果请求不成功
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				// 我们从statusText中提取错误然后规范化非终止请求的statusText和status
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			// 设置jqXHR对象的data
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			// 先执行成功/失败回调
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );  // data statusText jqXHR
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );  // jqXHR, statusText, error
			}

			// Status-dependent callbacks
			// 基于status的回调
			jqXHR.statusCode( statusCode );
			statusCode = undefined;  // statusCode已经没用了，等待垃圾回收

			// 如果需要触发全局事件
			if ( fireGlobals ) {
				// 再触发ajaxSuccess、ajaxError事件
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			// 再执行完成事件
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			// 如果需要触发全局事件
			if ( fireGlobals ) {
				// 最后触发ajaxComplete事件
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				// 操作全局ajax计数器
				if ( !( --jQuery.active ) ) {
					 // 所有ajax请求都完成，触发ajaxStop事件
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	/**
		$.getJSON
		ajax获取JSON
		@param {String} url 请求地址
		@param {Object} data请求数据
		@param {Function} callback 请求成功的回调
	*/
	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	/**
		$.getScript
		ajax获取script
		@param {String} url 请求地址
		@param {Function} callback 请求成功的回调
	*/
	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	/**
		$.get
		$.post

		@param {String} url 请求地址
		@param {Object} data 请求数据
		@param {Function} callback 成功回调
		@param {String} type 回复数据dataType
	*/
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		// 如果没有传入data参数的情况
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
// 绑定通用ajax事件的一系列监听
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	/**
		$().ajaxStart
		$().ajaxStop
		$().ajaxComplete
		$().ajaxError
		$().ajaxSuccess
		$().ajaxSend

		@param {Function} fn 监听函数
	*/
	// jquery.fn = jquery.prototype
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});

// 动态加载一段script
jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false, // 同步方式
		global: false, // 不触发全局
		"throws": true // 转换错误不抛异常
	});
};


jQuery.fn.extend({
	/**
		$().wrapAll
		在所有DOM外面包裹一层html
		@param {String|Function} html 要包裹的html或者获取要包裹的html的函数
	*/
	wrapAll: function( html ) {
		// 可以传入一个function
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		// 找到实例中的第0个匹配元素
		if ( this[0] ) {
			// The elements to wrap the target around
			// 生成用于包裹的元素
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				// 将wrap放于实例中的第0个匹配元素之前
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				// 找到wrap最内层的dom，并把目标放入内
				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );  // append相当于移动，原来的位置就不存在了
		}

		return this;
	},
	/**
		$().wrapInner
		在DOM内部包裹一层
		@param {String|Function} html 要包裹的html或者获取要包裹的html的函数
	*/
	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();  // self的子元素集合

			// self有子元素
			if ( contents.length ) {
				contents.wrapAll( html );
			// 没子元素
			} else {
				self.append( html );
			}
		});
	},
	/**
		$().wrap
		对所有DOM外面各包裹一层html
		@param {String|Function} html 要包裹的html或者获取要包裹的html的函数
	*/
	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},
	/**
		$().unwrap
		把DOM的外包（父元素）剥离	
	*/
	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});

// 筛选隐藏元素
jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// 支持：Opera <= 12.12
	// Opera在一些（隐藏）元素上返回offsetWidths跟offsetHeights小于零
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

// 筛选可见元素
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g, // 空格转义
	rbracket = /\[\]$/, // 避免注释
	rCRLF = /\r?\n/g,  // 回车符和换行符
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, // 满足rsubmittable但不应被提交表单元素的type
	rsubmittable = /^(?:input|select|textarea|keygen)/i;  // 能被提交的表单元素

/**
	根据值的类型不同创建url查询字符串中不同方式的参数表达式
	@param {String} prefix 键名
	@param {Array|Object|...} obj 值
	@param {Boolean} traditional 是否保持低版本特性
	@param {Function} add 生成"encode(key)"="encode(value)"的键值对并放入s集合的函数
*/
function buildParams( prefix, obj, traditional, add ) {
	var name;

	// 若obj是一个数组
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		// 序列化数组成员
		jQuery.each( obj, function( i, v ) {
			// 如果是保持低版本特性，或是键名中带有'[]'
			// rbracket = /\[\]$/
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				// 把数组中的成员当成一个标量
				// 每个成员具有同样的键名
				add( prefix, v );
			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				// 数组中的成员不是标量（数组或对象），encode它的索引
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});
	// 如果不保持低版本特性，并且obj是一个对象
	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		// 序列化对象成员
		for ( name in obj ) {
			//键名[name] = 值
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		// 序列化标量
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
/**
	把一个表单元素集合或键值对对象序列化为url的查询字符串
	@param {Object|Array} a form元素集合或者请求参数对象
	@param {Boolean} traditional 是否保持低版本特性
	@returns {String} 不带'?'的查询字符串
*/
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		// 生成"encode(key)"="encode(value)"的键值对并放入s集合
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			// 若value是一个function，求其值获得value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	// 针对jQuery <= 1.3.2版本特性设置traditional为true
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	// 如果参数a是一个数组，假定它是一个表单元素集合
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		// 序列化表单元素集合
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		// 如果保持低版本特性，用'老'方法encode（1.3.2版本或更老版本），否则递归encode参数
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	// 返回序列化的结果
	// r20 = /%20/g
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	/**
		$().serialize
		根据可提交表单元素自动生成不带'?'的查询字符串
	*/
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	/**
		$().serializeArray
		生成可提交表单元素的名值对
		@returns {Array} 所有可提交表单元素的名值对集合
	*/
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			// 可以增加"elements"属性的钩子来筛选或添加form元素
			var elements = jQuery.prop( this, "elements" );
			// 如果存在elements，则elements为form的所有表单元素
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			// 使用.is(":disabled")让fieldset[disabled]也起作用
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				// rsubmittable = /^(?:input|select|textarea|keygen)/i;
				// rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i
				// rcheckableType = (/^(?:checkbox|radio)$/i)
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				// 值为null
				null :
				jQuery.isArray( val ) ?
					// 值为数组
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					// 普通值
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
// 创建request对象（它仍然隶属于ajaxSettings是为往后兼容）
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	// 支持：IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		// XHR不能访问本地文件，所以那种情况总是用ActiveX
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			// 支持：IE7-8
			// 老IE的XHR不支持非-RFC2616方法
			// 参见http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx和http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// 这里只检测六种方法而不是八种是因为IE同样不支持"trace"和"connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	// 对于其它浏览器，使用标准的XMLHttpRequest对象
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();  // createStandardXHR : createActiveXHR

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// 支持：IE<10
// 开启requests必须在页面unload手动取消
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
// 确定支持性
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;  // 把xhrSupported转成boolean

// Create transport if the browser can provide an xhr
// 若浏览器可提供一个xhr则创建一个transport
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		// 跨域只有在支持XMLHttpRequest时被允许
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				/**
					发送
					@param {Object} headers 请求头
					@param {Function} complete 请求成功的回调
				*/
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					// 打开套接字
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					// 如果提供，应用xhr自定义字段
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					// 如果需要，覆盖mime-type
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					// X-Requested-With请求头
					// 针对跨域请求，鉴于一个预检条件类似于拼图，我们不能确定所以不设置它（它可以在每个请求的基础上或者使用ajaxsetup被设置）？
					// 对于同域请求，如果已经提供了header将不会改变
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					// 设置请求头
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						// 支持：IE<9
						// 当设置request header一个null值的时候IE的ActiveXObject抛出一个'Type Mismatch'异常
						// 保持其它XHR实现的一致性，把值统统转成string类型并忽略`undefined`
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					// 发送请求
					// 这可能会出现一个异常但是我们已经在jQuery.ajax中处理过（所以不必在此使用try/catch）
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					/**
						监听
						@param {Boolean} isAbort  是否是提前终止了请求
					*/
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						// 此前未调用过，且请求被终止或完成
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							// 清除该回调（不会重复触发）
							delete xhrCallbacks[ id ];
							callback = undefined;
							// 指向一个空方法
							// noop: function() {},
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							// 如果需要，手动终止请求
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								// 支持：IE<10 
								// 访问二进制数据回复文本抛出一个异常
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;  // 回复类型：text
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								// 火狐在访问一个有错的跨域requests的statusText会抛出一个异常
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									// 跟Webkit一样给一个空statusText
									statusText = "";
								}

								// Filter status for non standard behaviors
								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								// 统一非标准的status
								// 如果是离线请求并且存在回复数据：假定success（没有回复数据的success不会被唤起，这是我们目前能够实现的最好结果）
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								// IE - 有时本该返回204会返回1223
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						// 根据需要调用complete
						// 如果存在responses（没有abort）
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						// 同步模式手动触发回调
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						// （IE6与IE7）如果在缓存中直接取回我们手动触发回调
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						// 加入xhr回调活动列表
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},
				// 终止请求
				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
// 创建xhr的方法
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
// 添加script的dataType
jQuery.ajaxSetup({
	// 接受
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	// 内容格式
	contents: {
		script: /(?:java|ecma)script/
	},
	// 数据转换
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
// 处理缓存的特殊情况和全局属性
jQuery.ajaxPrefilter( "script", function( s ) {
	// script默认不缓存
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	// 跨域用'get'且全局为false
	if ( s.crossDomain ) {
		s.type = "GET";  // 跨域用get请求
		s.global = false;
	}
});

// Bind script tag hack transport
// 绑定script标签的hack传输
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	// 该transport只解决跨域请求
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");  // 创建script元素

				script.async = true;  // 异步模式 不阻塞页面解析

				// 设置编码方式
				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				// 设置src
				script.src = s.url;

				// Attach handlers for all browsers
				// 绑定兼容所有浏览器的处理函数
				script.onload = script.onreadystatechange = function( _, isAbort ) {
					// 取消或者加载成功
					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						// 防止IE内存泄露
						script.onload = script.onreadystatechange = null;

						// Remove the script
						// 移除该script元素
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						// 移除引用
						script = null;

						// Callback if not abort
						// 如果请求未终止，执行回调
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				// 避免IE6的由base元素引起bug故放在最前面
				// 用原生的DOM操作而不用jQuery方法是避免domManip方法对AJAX'耍花招'
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],  // 存放jsonp数据回调函数名的数组
	rjsonp = /(=)\?(?=&|$)|\?\?/; // '=?&' 或 '=?' 或 '??'

// Default jsonp settings
// 默认jsonp设置
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		// 缺省状态下jsonp数据回调函数名
		// 默认取oldCallbacks中已有的
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
/**
	针对jsonp请求进行检查、标准化选项并添加回调函数
	@param {Object} s 终极options对象
	@param {Object} originalSettings 用户传入的ajax-options
	@param {Object} jqXHR 
	@returns {String} 'script' dataType为script
*/
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		// rjsonp = /(=)\?(?=&|$)|\?\?/
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			// 'application/x-www-form-urlencoded' => 普通的表单提交，或者js发包，默认都是通过这种方式
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	// 处理当前仅当dataType是'jsonp'或者有相应的参数设置
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		// 得到获取jsonp数据的回调，保存与之同名的ajax成功回调
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		// 将jsonp回调函数名加入到url或form参数中
		// jsonProp为'url'或'data'
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			// 在链接中指定jsonp的回调
			// var rquery = (/\?/)
			// s.jsonp = 'callback'
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		// converter在返回数据后以script运行后转成json
		s.converters["script json"] = function() {
			// 如果没有数据返回
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		// 强制dataType为json
		s.dataTypes[ 0 ] = "json";

		// Install callback
		// 添加获取jsonp返回数据的方法
		overwritten = window[ callbackName ];  // 保存本来的回调函数
		window[ callbackName ] = function() {
			responseContainer = arguments; // arguments就是返回数据的集合
		};

		// Clean-up function (fires after converters)
		// 清理掉获取jsonp数据方法（在converters之后触发）
		jqXHR.always(function() {
			// Restore preexisting value
			// 恢复同名的回调函数
			window[ callbackName ] = overwritten;

			// Save back as free
			// 还原更改
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				// 确保不破坏周围的东西，可重复使用此项
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				// 把callbackName放入oldCallbacks数组，供将来用之
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			// 如果存在回调且它是一个function便执行
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}
			// 清理引用
			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		// 返回script，将塞入datatypes链最前端
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
/**
	$.parseHTML
	解析一段HTML字符串
	@param {String} data 源字符串
	@param {Element} context 若指定，文档碎片会建立在这个context里面，默认是document
	@param {Boolean} keepScripts 若‘真’将保留scripts
	@returns {Array} 解析的元素集合
*/
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	// var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	// 光秃秃的标签
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	// 移除解析后的所有scripts
	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
// 创建已存在的load方法副本
var _load = jQuery.fn.load;

/**
 * Load a url into a page

	$().load
	加载一段html到实例中的匹配元素
	@param {String} url 请求地址
	@param {Object} params 请求参数
	@param {Function} callback 完成回调
 */
jQuery.fn.load = function( url, params, callback ) {
	// 如果url不是字符串，调用之前的load方法
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	// url带有空格 空格后面是选择器
	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	// 如果第二个参数是function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		// 我们假定它是回调函数
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	// 否自创建param字符串
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	// 如果实例内有匹配元素才发请求
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			// 如果'type'变量未定义，将使用'GET'请求
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			// 为complete回调保存response
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				// 若指定了selector，将所有筛选之后的元素附于一div上
				// 排除scripts避免IE'无权限'错误
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				// 否则用完整的结果
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			// 执行回调
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};


// 元素是否在动画
jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {  // 处于动画的元素都在jQuery.timers数组里
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
	 从一个元素上获取window
	 @param {Window|Document|Element}
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?  // nodeType === 9 => document
			elem.defaultView || elem.parentWindow :
			false;  // 如果elem不是window或document则返回false
}

jQuery.offset = {
	/*
		设置元素的offset
		@param {Element} elem dom对象
		@param {Object|Function} options 包含要设置的具体属性的对象或获取包含要设置的具体属性的对象的方法
		@param {Number} i 元素在当前实例中的索引
	*/
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		// 首先设置position，以使static定位元素上也被设置top/left
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();  // 元素当前的offset
		curCSSTop = jQuery.css( elem, "top" ); // 元素当前的top
		curCSSLeft = jQuery.css( elem, "left" );  // 元素当前的left
		// 元素的position为absolute或fixed，且top或left值有'auto'，则calculatePosition为真
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		// 如果top或left其中有一个为'auto'并且position为absolute或fixed，需要计算position
		if ( calculatePosition ) {
			curPosition = curElem.position(); // 用JS获取元素的相对位置
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;  // relative时，假若curCSSTop为'auto'，parseFloat( curCSSTop )为NaN，curTop则为0，合理
			curLeft = parseFloat( curCSSLeft ) || 0;  // 同上
		}

		// 如果options是function
		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );  // 传入三个参数：当前元素、元素在实例中的索引、元素当前的offset
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop; // （新offsetTop - 当前offsetTop = 偏移量） + 当前position的top
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;  // 同上
		}

		if ( "using" in options ) {
			// options有'using'方法，应用该方法
			options.using.call( elem, props );
		} else {
			// 通过CSS来设置
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	/*
		$().offset
		设置或获取元素的offset
		@param {Object|Function} options 包含要设置的具体属性的对象或获取包含要设置的具体属性的对象的方法
	*/
	offset: function( options ) {
		if ( arguments.length ) {
			// 设置offset
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },  // 获取不到的缺省值
			elem = this[ 0 ],  // 将取当前实例中第0个匹配元素的值
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		// 确保不是一个脱离文档的DOM节点
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		// 在黑莓5、ios3等早期手机中，不支持getBoundingClientRect方法，则用缺省值来取代报错
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();  // 获取元素各边与页面上边和左边的距离
		}
		win = getWindow( doc );  // 得到window
		// pageXOffset设置或返回当前页面相对于窗口显示区左上角的 X 位置。
		// pageYOffset设置或返回当前页面相对于窗口显示区左上角的 Y 位置
		// IE8及更早IE版本不支持该属性,但可以使用 "document.body.scrollLeft" 和 "document.body.scrollTop" 属性 
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ), // 元素距离页面上边的距离 + 文档滚动条的高度 - 文档垂直坐标
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )  // 同上
		};
	},
	/*
		$().position
		获取元素相对父元素的位置
	*/ 
	position: function() {
		// 实例内必须有元素
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 }, // 缺省值
			elem = this[ 0 ];  // 只获取第0个元素的

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		// fixed元素是相对于window来偏移的，故直接通过getBoundingClientRect
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			// 假定getBoundingClientRect对计算fixed元素是可靠的
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			// 得到*真实*的offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			// 得到正确的offsets
			offset = this.offset();
			// 如果的offsetParent不是html
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();  // 得到的offsetParent的offset
			}

			// Add offsetParent borders
			// 给parentOffset加上的offsetParent的边框宽高
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );  // true表示只获取其数值大小
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		// 减去offsetParent的offsets跟元素的margin
		// 注意：在Safari中当一个元素设有margin: auto，offsetLeft和marginLeft是一样的，造成offset.left返回不正确的0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ), // 当前元素的offsetTop - offsetParent的offsetTop - 当前元素的marginTop
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)  // 同上
		};
	},
	/*
		$().offsetParent
		返回元素真实的定位父元素
	*/
	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			// 循环，当存在offsetParent，且offsetParent不是html，且offsetParent的position是'static'
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				// 取offsetParent的offsetParent
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;  // 如果没有获取到offsetParent就返回documentElement
		});
	}
});

// Create scrollLeft and scrollTop methods
// 创建scrollLeft跟scrollTop方法
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );  // 如果elem是window或document，获取与之关联的window对象

			// 获取
			if ( val === undefined ) {
				// 如果elem是window或document，则获取window的相关属性（pageXOffset/pageYOffset），如果window中不存在此属性，则获取document.documentElement上的相关属性（scrollLeft/scrollTop）
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			// 设置
			// 如果elem是window或document
			if ( win ) {
				// 设置window
				// 滚动条滚动到相应位置
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
// 用jQuery.fn.position添加top/left的css钩子
// 在webkit，如果css用百分比指定top/left/bottom/right，用getComputedStyle将返回百分比，在此我们用offset模块替代css模块来代替计算
jQuery.each( [ "top", "left" ], function( i, prop ) {
	// 如果条件不满足将添加此钩子
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );  // 元素对应属性的计算后样式
				// if curCSS returns percentage, fallback to offset
				// 如果curCSS返回百分比，回退到offset
				// var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
				// var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );  // 非px单位大小
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
// 创建innerHeight, innerWidth, height, width, outerHeight跟outerWidth方法
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		// margin只针对于outerHeight, outerWidth
		// funcName: innerHeight innerWidth height width outerHeight outerWidth
		/*
			@param {Boolean} margin 是否包含外边距
			@param {Number|Function} value 设置宽高的值（其实这也对应的是第一个参数）
		*/
		jQuery.fn[ funcName ] = function( margin, value ) {
			// 是否可连缀，如果是获取值就不能连缀，设置可以
			// defaultExtra：'padding', 'content', ''
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				// 需要计算的额外的尺寸。
				// 如果是innerHeight将包括padding；如果是outerHeight将包括border,如果（margin === true || value === true）将包含margin
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					// 截至5/8/2012会在Safari手机上产生错误结果，但我们无能为力
					// 参看此URL的pull request讨论：https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ]; // 如果是window，返回clientWidth或clientHeight
				}

				// Get document width or height
				// 获取document的宽高
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					// 在IE6/8中有bug，但目前没有很好的解决方案
					// 如果是document，返回document.documentElement.scroll[Width/Height] document.body.scroll[Width/Height] 或document.documentElement.client[Width/Height]的最大值
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					// 获取元素节点的宽高，需要但不强制parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					// 设置元素节点的宽高
					jQuery.style( elem, type, value, extra );
					// chainable ? margin : undefined => 当设置值得时候，第一个参数（margin）对应的其实是value
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
// 匹配元素set集合中包含的元素个数
jQuery.fn.size = function() {
	return this.length;
};

// 返回当前实例中的元素集合与当前实例的前一个实例（prevObject）中的元素集合结合的新jQuery对象
// $().andSelf
jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

// 注册一个名为AMD的模块，jQuery可以级联其它使用define的文件，但不是通过认识匿名AMD模块的适当的连接。名为AMD是最安全和最可靠的注册方式。用小写jquery是因为AMD模块的name是来自文件名，通常情况下jQuery被使用小写文件名。在创建global再做这个以使如果AMD模块想调用noConflict来隐藏jQuery版本，它将有效

// 注意最大可移植性，不应该声明jQuery为匿名模块，并且如果AMDloader被提供避免设置global。jQuery是一个特例。更多信息参见https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	// 为被覆盖的情况保存window.jQuery（注：此处window.jQuery不是jQuery对象）
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	// 为被覆盖的情况保存window.$（注：此处window.$不是jQuery对象）
	_$ = window.$;

/*
	$.noConflict
	非冲突模式
	@param {Boolean} deep 是否还原window.jQuery
	@returns {jQuery} jQuery对象
*/
jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;  // 还原之前的window.$
	}

	// 如果深入，且window.jQuery没有被覆盖
	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;  // 还原之前的window.jQuery
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
// 暴露jQuery和$标识符，即便在AMD或者浏览器模拟CommonJS
// 如果全局对象global存在document则noGlobal为true
if ( typeof noGlobal === strundefined ) {
	// 将window.jQuery和window.$指向jQuery
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
