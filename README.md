#Brief
</br>
I am a 90, a front-end engineer. I always want to have a unique blog, to record some articles. So I chose the ghsot blog, and customized a personalized theme. Currently, dno is still in beta version. The next stage is to repair the existing bug, and make differentiated treatment for mobile devices. The goal is to create a generous and practical ghost theme. If you have any questions or suggestions, please contact me.

#Useage
</br>
* Use `git clone https://github.com/CareyToboo/dno.git`  to clone the project to the local.</br>
* Move the dno folder to `pathto/ghsot/content/thems/`</br>
* Go to the ghost administrator console page.</br>
  * Global Settings > Theme Settings >  dno ( select dno ).</br>
  * Insert Code > copy `congfig/dno_congfig.md's code` to {{ghost_head}}, modify the information into yourself.</br>
  * Insert Code > copy `congfig/dno_footer.md's code` to {{ghost_foot}}, modify the information into yourself.</br>
  * Modify the browser tab page icon. Replace the `dno/assets/images/favicon.png` with your favorite Icon.</br> (please keep the image name consistent .)
* Go to enter the home page and refresh, view the results.</br>
</br>
GOOD LUCKY !

#About Comments
</br>
You need to know your short name of [Disqus](https://disqus.com/,'Disqus'). Registering a Disqus account is very simple ,then apply for a short name.   Add it to disqus_shortname in `comments.hbs` and then replace the {{!-- {{> comments}} --}} with {{> comments}} in post.hbs to enable Disqus for your blog.
</br>
`var disqus_shortname = '';` // required: replace example with your forum shortname
</br>
<hr>
</br>

#简介 
</br>
我是一个90后，一位前端工程师，我一直想拥有一个别致的博客，能够记录一些文章。所以我选择了ghsot博客，并定制了一个个性化主题。目前，dno还在beta版。下一阶段是修复现存的bug，并对移动设备做出差异化处理。目标是建立一个大方又实用的ghost 主题。如果你有任何问题或者建议请联系我。

#使用
</br>
* 使用 `git clone https://github.com/CareyToboo/dno.git` 命令，将项目克隆到本地
* 将dno文件夹移动到`pathto/ghsot/content/thems/`文件夹下
* 进入ghost 管理员控制台页面 . 
  * 全局设置 > 设置主题 > 选中dno 主题。
  * 插入代码 > 复制 `congfig/dno_congfig.md`文件中代码到{{ghost_head}}，修改成自己的信息。
  * 插入代码 > 复制 `congfig/dno_footer.md` 文件中代码到{{ghost_foot}} ，修改成自己的信息 。
  * 修改浏览器标签页图标，用你喜欢的图标替换 `dno/assets/images/favicon.png` （请保持图片名称一致）。
* 进入首页并且刷新，查看结果</br>

#关于评论
</br>
dno使用的是国外的[Disqus](https://disqus.com/,'Disqus'),第三方评论插件。注册和使用都非常简单。你需要到官网注册一个账号，并申请一个短名。然后将自己的短名添加到`dno/partials/commtents.hbs` 中 `var disqus_shortname = '你的短名';` ,将`dno/partials/post.hbs`中的 {{!-- {{> comments}} --}} 的注释标签去掉。然后回到主页刷新，你就能够可以使用评论功能了。



