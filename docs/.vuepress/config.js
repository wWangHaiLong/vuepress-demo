module.exports = {
    title: '974 的博客',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/wxtouxiang.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    themeConfig: {
      logo: '/wxtouxiang.jpg',  // 左上角logo
      nav:[ // 导航栏配置
        {text: '首页', link: '/' },
        {text: '技术文档', link: '/tech/' },
        {text: '简书主页', link: 'https://www.jianshu.com/u/627904fdac31'}      
      ],
      sidebar: 'auto', // 侧边栏配置
    }
  };