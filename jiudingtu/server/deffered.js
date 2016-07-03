var inArray = function (elem, array, i) {
    return [].indexOf.call(array, elem, i)
}
var class2type = {};
function type(obj) {
    return null == obj ? String(obj) : class2type[toString.call(obj)] || "object"
}
function isFunction(value) {
    return "function" == typeof value;
}
function isWindow(obj) {
    return null != obj && obj == obj.window
}
function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
function extend(target, source, deep) {
    for (var key in source)deep && (isPlainObject(source[key]) || isArray(source[key])) ? (isPlainObject(source[key]) && !isPlainObject(target[key]) && (target[key] = {}), isArray(source[key]) && !isArray(target[key]) && (target[key] = []), extend(target[key], source[key], deep)) : source[key] !== undefined && (target[key] = source[key])
}
var Callbacks = function (options) {
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [];
    var fire = function (data) {
        memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0;
        for (; list && firingLength > firingIndex; ++firingIndex) {
            if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break
            }
        }
        firing = !1;
        if(list){
            if(stack && stack.length){
                fire(stack.shift());
            }else if(memory){
                list.length = 0;
            }else{
                Callbacks.disable();
            }
        }
    },
    Callbacks = {
        add: function () {
            if (list) {
                var start = list.length, add = function (args) {
                    for(var i in args){
                        var arg = args[i];
                        "function" == typeof arg ? options.unique && Callbacks.has(arg) || list.push(arg) : arg && arg.length && "string" != typeof arg && add(arg)
                    }
                };
                add(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
            }
            return this
        },
        remove: function () {
            return list && arguments.forEach(function (arg, _) {
                for (var index; (index = inArray(arg, list, index)) > -1;)list.splice(index, 1), firing && (firingLength >= index && --firingLength, firingIndex >= index && --firingIndex)
            }), this
        },
        has: function (fn) {
            return!(!list || !(fn ? inArray(fn, list) > -1 : list.length))
        },
        empty: function () {
            return firingLength = list.length = 0, this
        },
        disable: function () {
            return list = stack = memory = void 0, this
        },
        disabled: function () {
            return!list
        },
        lock: function () {
            return stack = void 0, memory || Callbacks.disable(), this
        },
        locked: function () {
            return!stack
        },
        fireWith: function (context, args) {
//            if(!(!list || fired && !stack))
            if(list && (!fired || stack)){
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                firing ? stack.push(args) : fire(args)
            }
            return this
        },
        fire: function () {
            return Callbacks.fireWith(this, arguments)
        },
        fired: function () {
            return!!fired
        }
    };
    return Callbacks
}

function Deferred(func){
    var tuples = [
        ["resolve", "done", Callbacks({once: 1, memory: 1}), "resolved"],
        ["reject", "fail", Callbacks({once: 1, memory: 1}), "rejected"],
        ["notify", "progress", Callbacks({memory: 1})]
    ],
    state = "pending",
    promise = {
        state: function () {
            return state
        },
        always: function () {
            return deferred.done(arguments).fail(arguments), this
        },
        then: function () {
            var fns = arguments;
            return Deferred(function (defer) {
                tuples.forEach(function (tuple, i) {
                    var fn = isFunction(fns[i]) && fns[i];
                    deferred[tuple[1]](function () {
                        var returned = fn && fn.apply(this, arguments);
                        if (returned && isFunction(returned.promise))returned.promise().done(defer.resolve).fail(defer.reject).progress(defer.notify); else {
                            var context = this === promise ? defer.promise() : this, values = fn ? [returned] : arguments;
                            defer[tuple[0] + "With"](context, values)
                        }
                    })
                }), fns = null
            }).promise()
        },
        promise: function (obj) {
            return null != obj ? extend(obj, promise) : promise
        }
    },
    deferred = {};
    tuples.forEach(function (tuple,i) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add, stateString && list.add(function () {
            state = stateString
        }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function () {
            return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
        }, deferred[tuple[0] + "With"] = list.fireWith
    });
    promise.promise(deferred);
    func && func.call(deferred, deferred);
    return deferred
}

function when(sub) {
    var progressValues, progressContexts, resolveContexts, resolveValues = arguments, len = resolveValues.length, i = 0, remain = 1 !== len || sub && isFunction(sub.promise) ? len : 0, deferred = 1 === remain ? sub : Deferred();
    updateFn = function (i, ctx, val) {
        return function (value) {
            ctx[i] = this, val[i] = arguments.length > 1 ? arguments : value, val === progressValues ? deferred.notifyWith(ctx, val) : --remain || deferred.resolveWith(ctx, val)
        }
    };
    if (len > 1)for (progressValues = new Array(len), progressContexts = new Array(len), resolveContexts = new Array(len); len > i; ++i)resolveValues[i] && isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFn(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFn(i, progressContexts, progressValues)) : --remain;
    return remain || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
}
module.exports = {
    Deferred: Deferred,
    when: when
};

//!function ($) {
//    function Deferred(func) {
//
//    }
//
//    var slice = Array.prototype.slice;
//    $.when = function (sub) {
//        var progressValues, progressContexts, resolveContexts, resolveValues = slice.call(arguments), len = resolveValues.length, i = 0, remain = 1 !== len || sub && $.isFunction(sub.promise) ? len : 0, deferred = 1 === remain ? sub : Deferred(), updateFn = function (i, ctx, val) {
//            return function (value) {
//                ctx[i] = this, val[i] = arguments.length > 1 ? slice.call(arguments) : value, val === progressValues ? deferred.notifyWith(ctx, val) : --remain || deferred.resolveWith(ctx, val)
//            }
//        };
//        if (len > 1)for (progressValues = new Array(len), progressContexts = new Array(len), resolveContexts = new Array(len); len > i; ++i)resolveValues[i] && $.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFn(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFn(i, progressContexts, progressValues)) : --remain;
//        return remain || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
//    }, $.Deferred = Deferred
//}(Zepto);