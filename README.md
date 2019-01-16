# webpack_html
author by 857874412@qq.com or ay12580233@163.com
csdn:https://blog.csdn.net/qq_21423689
来个关注可好？
> A webpack project

## Build Setup

``` bash
# install dependencies
npm install
# 打包
npm run build  
# 开发模式
npm run dev

# 模板文件:
index.ejs:由于该模板是html模板，所以以免html-loader与HtmlWebpackPlugin某些功能冲突改为.ejs模板
# 入口文件:
src/main.js
# 静态资源:
publick
# 配置文件
postcss.config.js:
css插件系统配置
#  webpack官网
https://webpack.js.org

## 注意：
由于我自己本地装了less编译插件，所以引入的是css，以防引起不必要的麻烦
该版本以.html为模板

## 待更新：
未解决各类dom事件问题、未解决路由问题、组件通讯