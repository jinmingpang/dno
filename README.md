Brief

I am a 90, a front-end engineer. I always want to have a unique blog, to record some articles. So I chose the ghsot blog, and customized a personalized theme. Currently, dno is still in beta version. The next stage is to repair the existing bug, and make differentiated treatment for mobile devices. The goal is to create a generous and practical ghost theme. If you have any questions or suggestions, please contact me.

Useage

1. Use git clone https://github.com/CareyToboo/dno.git  to clone the project to the local.
2. Move the dno folder to pathto/ghsot/content/thems/
3. Go to the ghost administrator console page.
	1) Global Settings > Theme Settings >  dno ( select dno ).
	2) Insert Code > copy congfig/dno_congfig.md code to {{ghost_head}}, modify the information into yourself.
	3) Insert Code > copy congfig/dno_footer.md code to {{ghost_foot}}, modify the information into yourself.
	4) Modify the browser tab page icon. Replace the dno/assets/images/favicon.png with your favorite Icon. (please keep the image name consistent .)
4. Go to enter the home page and refresh, view the results.
GOOD LUCKY !

About Comments

You need to know your short name of Disqus. Registering a Disqus account is very simple ,then apply for a short name.   Add it to disqus_shortname in comments.hbs and then replace the {{!-- {{> comments}} --}} with {{> comments}} in post.hbs to enable Disqus for your blog.

var disqus_shortname = ''; // required: replace example with your forum shortname

----------------------------------------------------------------------------------------------------------------
简介 

我是一个90后，一位前端工程师，我一直想拥有一个别致的博客，能够记录一些文章。所以我选择了ghsot博客，并定制了一个个性化主题。目前，dno还在beta版。下一阶段是修复现存的bug，并对移动设备做出差异化处理。目标是建立一个大方又实用的ghost 主题。如果你有任何问题或者建议请联系我。

使用

 1.  使用 git clone https://github.com/CareyToboo/dno.git 命令，将项目克隆到本地
 2. 将dno文件夹移动到pathto/ghsot/content/thems/ 文件夹下
 3. 进入ghost 管理员控制台页面 . 
	 1)  全局设置 > 设置主题 > 选中dno 主题
	 2)  插入代码 > 复制congfig/dno_congfig.md代码 到 {{ghost_head}}，修改成自己的信息
	 3)  插入代码 > 复制congfig/dno_footer.md代码 到 {{ghost_foot}} ，修改成自己的信息  
 	 4)  修改浏览器标签页图标，用你喜欢的图标替换 dno/assets/images/favicon.png （请保持图片名称一致）
 4.  进入首页并且刷新，查看结果

 关于评论

dno使用的国外的Disqus,第三方评论插件。注册和使用都非常简单。你需要到官网注册一个账号，并申请一个短名。然后将自己的短名添加到dno/partials/commtents.hbs 中 var disqus_shortname = '你的短名'; 。然后刷新，你就能够可以使用评论功能了。



