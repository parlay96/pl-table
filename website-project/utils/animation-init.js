import anime from 'animejs/lib/anime.es'

export default function animationInit(name,self,isAuto) {
    if(!isAuto)isAuto = false
    let logoAnimationEl = self.$refs[name]
    anime.set(logoAnimationEl, {scale: 1})
    return anime.timeline({
        autoplay: isAuto,
        easing: 'easeOutSine'
    })
}
