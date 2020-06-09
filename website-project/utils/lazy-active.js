import {isPC} from './assets'

let scrollTops, $children, $root, offsetTopArr, $target

const deviationVal = isPC() ? -140 : 20
const _reduce = arr => arr.reduce((total, current, index) => {
    arr[index] = total
    return total + current
})

const distanceToTop = (screenHeight, elHeightArr) => elHeightArr.map(el => el - screenHeight)
const confirmRoot = () => $root = isPC() ? document.documentElement : document.body
const letElementShow = ($children, scrollTop) =>
    $children.some((child, index) =>
        child.isActive === false
        && scrollTop > scrollTops[index] + deviationVal ?
            child.isActive = true : '')

const pcScroll = () => {
    let {scrollTop} = document.querySelector('#app')
    letElementShow($children, scrollTop)
}

function scrollTopsArr($els) {
    let scrollTops = componentsOffsetTop($els)
    let obj = {}
    scrollTops.forEach(item => {
        obj[item.name] = item.offsetTop
    })
    return obj
}

function componentsOffsetTop($els) {
    let [collectArr, deviation] = [[], 35]
    $els.map(child => child.name ? collectArr.push({offsetTop: child.$el.offsetTop - deviation, name: child.name}) : '')
    return collectArr
}

function collectElementArr($el) {
    let childrenScrollHeight = []
    $children = $el.$children
    $children.map(child => childrenScrollHeight.push(child.$el.scrollHeight))
    _reduce(childrenScrollHeight)
    return childrenScrollHeight
}


function elementShowAddActive(self) {
    $target = self
    confirmRoot()
    const screenHeight = window.innerHeight
    let ElementsHeight = collectElementArr(self)
    scrollTops = distanceToTop(screenHeight, ElementsHeight)
    offsetTopArr = componentsOffsetTop(self.$children)
    if (isPC()) return document.querySelector('#app').addEventListener('scroll', pcScroll)
}


function destroyEventListener() {
    if (isPC()) return document.querySelector('#app').removeEventListener('scroll', pcScroll)
}

export {
    elementShowAddActive,
    collectElementArr,
    scrollTopsArr,
    destroyEventListener
}
