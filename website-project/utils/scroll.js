export const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1

export const listenToScroll = function(el,callBack) {
    if (el && el.addEventListener) {
        el.addEventListener(!isFirefox?'mousewheel':'scroll', function(event) {
            callBack&&callBack.apply(this, [event,el])
        })
    }
}

export default {
    bind(el, binding,name) {
        listenToScroll(el, binding.value)
    }
};