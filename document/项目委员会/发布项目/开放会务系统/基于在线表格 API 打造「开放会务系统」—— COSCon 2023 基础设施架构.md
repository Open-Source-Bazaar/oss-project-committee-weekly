# 基于在线表格 API 打造「开放会务系统」—— COSCon 2023 基础设施架构

## 演讲人简介：水歌

开源社任职

- 2018 年：COSCon\&\#39;18 外场志愿者组长

- 2019 \~ 2023 年：[开源社官网](https://kaiyuanshe.feishu.cn/wiki/wikcn6FQGVV8q9FZk9F3rTPKaFe)项目组长、[开放会务系统](https://kaiyuanshe.feishu.cn/wiki/wikcnuUsRHqJF0qhShySwECmWlx)项目组长

- 2020 \~ 2023 年：[基础设施组](https://kaiyuanshe.feishu.cn/wiki/wikcnGc0voivl8ZREUy7Yrhdcif)组长

- 2021 \~ 2023 年：理事

- 2022 \~ 2023 年：[项目委员会](https://kaiyuanshe.feishu.cn/wiki/wikcn2YXGJyIrCDtJH4weML5D2e)主席

## fCC 成都社区的尝试

### 2017 \~ 2019：Web conf —— 静态数据 \+ PWA

#### 成品和代码

<table><tbody><tr>
<td>

[https://web-conf.dev/]()

</td>
<td>

[https://github.com/FreeCodeCamp-Chengdu/Web-Conf]()

</td>
</tr></tbody></table>

#### PWA 和讲师邀请函

<table><tbody><tr>
<td>

</td>
<td>

</td>
</tr></tbody></table>

#### Email as a Web hook

[https://web-cell.dev/iterable-observer/]()

### 2021：COSCon\&\#39;21 —— 多维表格梳理议程、物资

## 开源社的探索

### 2018：《开放会务指南》

[https://github.com/kaiyuanshe/open-conference-guide]()

### 2019：COSCUP OPass —— 东天取经

开源社组织中国大陆讲师团赴台北参加「开源人年会」，大家对 COSCUP 参会 App 使用体验赞不绝口，有意复制成功经验。

<table><tbody><tr>
<td>

#### 桌面端

[https://coscup.org/2019/]()

</td>
<td>

#### 手机端

[https://opass.app/]()

</td>
</tr></tbody></table>



### 2019：COSCon\&\#39;19 —— 通用系统的第一行代码

@庄表伟老师对忙乱的会务工作比较烦心，其“做个开源社自己的‘会务筹办系统’”之创意与@石垚不谋而合，会后就在官网项目组孵化了一个基于 Node\.js 和 LeanCloud 的后端雏形 ——

[https://github.com/kaiyuanshe/ActivityHub]()

### 2020：COSCon\&\#39;20 —— 开源低代码重构

由于当年开源社开发志愿者正值青黄不接，同时开发系统前后端工作量很大，@石垚便基于 Headless CMS 龙头 Strapi 3 快速实现了一个「组织管理系统」后台脚手架 ——

[https://github.com/kaiyuanshe/OrgServer]()

因此只需开发基本的提交、展示用的前端页面，基于其自研的 Web 标准组件引擎 WebCell 2，与一位前端新人共同快速实现了初版 COSCon 官网，并上线使用 ——

[https://github.com/kaiyuanshe/PWA]()

但在填充大会讲师、议程、合作方数据时发现，原有“问卷星 \- 石墨文档 \- 百格活动”工作流存在大量冗余数据与重复劳动，信息的同步不及时给组委会的运作效率产生很大影响。

### 2021：COSCon\&\#39;21 —— 讲师邀请函手工生成器

@许银fork 羡澈开发的大会邀请函生成器

[https://kaiyuanshe.github.io/coscon-poster/]()

[https://github.com/kaiyuanshe/coscon-poster]()

### 2022：COSCon\&\#39;22 —— 多维表格理顺上百议程

## 友商的不足

1. 须事先专门收集出品人、助力出品人、论坛志愿者个人信息，并批量生成账号，且需记忆密码

2. 大型会议管理功能收费价格高

3. 议题征集、志愿者报名须另找平台做表单，且欠缺通知、提醒机制

4. 数据后台依赖桌面电脑端，出品人、志愿者难以利用碎片时间审核信息

5. 欠缺开放 API，问卷系统、协作表格、活动平台、组织官网、邮件群发等多端数据同步困难，且严重依赖人工

## 零代码后台

### 商业先锋：飞书多维表格

[https://www.feishu.cn/product/base]()

[https://www.feishu.cn/hc/zh-CN/academy/learn_the_basics_of_Bitable]()

### 开源新秀：APITable

[https://github.com/apitable/apitable]()

## 低代码前台

### 成品与代码

[https://kaiyuanshe.cn/activity/coscon-2023]()

[https://github.com/kaiyuanshe/kaiyuanshe.github.io]()

### 开源基础库

[https://github.com/idea2app/MobX-RESTful]()

[https://github.com/idea2app/MobX-Lark]()

### 数据封装层

[https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/3e1d60cd4305923dd9b9e9761ab54611445187d7/models/Activity/Forum.ts#L12-L54]()

---

## 补充的内容

飞书官方提供了一系列的多维表格 OpenAPI，借助这些 OpenAPI，实现了一套数据的存储层，但实际上大家在整个会务系统当中，也会有不同类型和层次的需求。对于一些比较重大的、持久性的需求，就可以根据整合进入开放会务系统当中。而一些相对非产品主线链路的功能，全局可以考虑通过一些更加轻量的方式开放。

最终，在实现给开放会务系统的邮件推送时，我们选择了借助多维表格的前后端一体插件来实现，这样更加轻量简单，也可以被不同的飞书企业内使用，不用担心受限于企业自建应用的限制。

在实现上，选择使用了[多维表格插件](https://bytedance.feishu.cn/docx/HazFdSHH9ofRGKx8424cwzLlnZc)提供的 [JSSDK](https://lark-base-team.github.io/js-sdk-docs/zh/start/core) 直接前端获取多维表格数据，从而实现从多维表格中读取值，构建诸如下拉框这样的列选择能力，并调用基于 Vercel 的 Serverless 云函数，来实现了整套流程。

<table><tbody><tr>
<td>

**原理**



</td>
<td>

**效果图**

</td>
</tr></tbody></table>





