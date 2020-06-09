import Main from '../components/main/main.vue'
import Content from '../components/content'
import textDemo from '../testFile'
import textTwo from '../testFile/text-two'
export default [
    {
        path: '/',
        name: 'home',
        component: textDemo,
    },
    {
        path: '/text',
        name: 'text',
        component: textTwo,
    }
]
// export default [
//     {
//         path: '/',
//         name: 'home',
//         component: Main,
//         meta: {
//             notCache: true
//         },
//         children: []
//     },
//
//     {
//         path: '/components',
//         name: 'components',
//         component: Content,
//         redirect:'/components/install',
//         children: [
//             {
//                 path: '/components/install',
//                 name: 'install',
//                 meta: {
//                     name: '安装',
//                     type: 'compass'
//                 },
//                 component: (resolve) => require(['../view/components/install/index.md'], resolve)
//             },
//             {
//                 path: '/components/start',
//                 name: 'start',
//                 meta: {
//                     name: '快速开始',
//                     type: 'compass'
//                 },
//                 component: (resolve) => require(['../view/components/start'], resolve)
//             },
//             {
//                 path: '/components/virtual',
//                 name: 'button',
//                 meta: {
//                     name: '虚拟滚动',
//                     type: 'component'
//                 },
//                 component: (resolve) => require(['../view/components/virtual/index.md'], resolve)
//             },
//         ]
//     },
//     // {
//     //     path: '/500',
//     //     name: 'error_500',
//     //     meta: {
//     //         hideInMenu: true
//     //     },
//     //     component: () => import('../view/error-page/500.vue')
//     // },
//     // {
//     //     path: '*',
//     //     name: 'error_404',
//     //     meta: {
//     //         hideInMenu: true
//     //     },
//     //     component: () => import('../view/error-page/404.vue')
//     // }
// ]
