# Crowdin 翻译指南

仓库地址：https://github.com/kaiyuanshe/open\-source\-articles/pulls

# 流程

- 所有的翻译/校对工作都在 Crowdin 上进行

- 官方的发布翻译任务/审核都在 Github 上进行（方便统计贡献者积分、直接发布到官网）

# 具体操作流程

参与翻译的角色有三个：

- 翻译任务发布者：目前是我们媒体组，自己编写或收集社区里面比较好的开源相关英文文章，经翻译后造福中国社区。

- 翻译贡献者：目前是 anyone，认领任务并翻译内容

- 开发者：负责维护工作流以及将翻译好的内容构建到官网（一般是自动化的），所以日常不参与流程。

## 账号注册

用 Github 账号注册 Crowdin，访问：https://crowdin.com/project/open\-source\-articles

## 不同的角色有不同的流程

### 翻译贡献者

打开 [Open Source Articles — Translation Project on Crowdin](https://crowdin.com/project/open-source-articles)

选中要翻译的内容

翻译实时生效，翻译结束后即可关闭应用。每 12 小时 Crowding 会同步已翻译部分到 Pull Request

等待官方审核后合并即可。

### 官方

#### 添加翻译任务

在 resources en 目录下加入原文

Github Action 会自动同步英文原文到 Crowding，贡献者可以直接在 Crowding 上翻译

#### 审核/合并翻译

如果有人翻译了内容，Crowdin 每 1 小时会自动提交 PR 到 Github，我们通过 PR 审核翻译内容，最终合并到 main 分支。

#### 同步翻译文件

一般 1 个小时会自动同步一次，如果需要手动同步可以访问：https://crowdin.com/project/open\-source\-articles/apps/system/github

点击 Sync Now，就会根据最新的翻译内容向 Github 拉起一条 PR，继续走审核流程即可。

### 开发人员

#### 维护指南

流程原理很简单，就是推和拉两个流程

- 如果 Github 源内容有更新，使用 Github Action 将【待翻译内容】同步到 Crowdin：https://github.com/marketplace/actions/crowdin\-action

- 如果 Crowdin 翻译内容有更新，使用 Crowdin 插件将【翻译好的内容】同步到 Github：https://support.crowdin.com/github\-integration/

# 参考资料

- https://www.electronjs.org/zh/blog/new\-website\#\-%E7%BF%BB%E8%AF%91

- https://github.com/KDE\-China/crowdin

- https://github.com/electron/website

- https://support.crowdin.com/github\-integration/



