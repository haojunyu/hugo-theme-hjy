# hugo-theme-hjy
hugo主题


基于bootstrap4.3.1
使用katex（mathjax渲染比较慢）作数学公式渲染

## layouts
* _default
  * baseof.html 框架
  * list.hmtl 列表页
  * single.hmtl 详情页
  * terms.html 类别页
* partials
  * head.html 通用样式设置
  * head_custom.html 个性样式设置
  * footer.html 通用js脚本设置
  * footer_custom.html 个性js脚本设置
  * header.html 头部页面，包含导航部分
  * nav.html 导航部分
  * page_meta.html
  * post_meta.html
  * post_preview.html 列表页的文章显示
  * share-links.html
  * site_info.html
* 404.html 找不到的页面显示
* index.html 首页


## Scratch存储的值
* Title               head.html
* Description         head.html
* most_used （分类页）

* 20200519
    * 完成head.html 并且添加bootstrap4.3.1样式
* 20200521
  * 完成nav.html
* 20200607
  * 完成归档页面post/list.html(react jsx技术)
* 20200615
  * 完成归档页面post/list.html，单纯的使用jquery技术


todo:
* nav.html页面的站内搜索  （可以尝试gcse）
* comments目前使用的是utterances(借助github)，但是有自建的服务remark和commentto，以此来打开静态页面站点统计信息。 
* 各个文章的数据统计，post_meta.html中设置
* 文章页的图文或视频显示



## 参考文献
1. [katex][official_katex]

[official_katex]: https://katex.org/