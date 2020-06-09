let userAgentInfo = navigator.userAgent
let Agents = ['Android', 'iPhone', 'SymbianOS',
    'iPad', 'iPod','Phone']
function isPC() {
    return !Agents.find(item =>userAgentInfo.indexOf(item) > -1)
}
function isFireFox() {
    return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
function findRoot(self,_data,_attr) {
    if(self.bs&&self.name==='App'){
        self[_attr] = _data
    }else{
        findRoot(self.$parent,_data,_attr)
    }
}

export  {
    isPC,
    isFireFox,
    findRoot
}
