# 合住日常 · 合租生活管家

## 当前进度

已完成手机和电脑适配的五页展示版，可切换导航、浏览四位室友的模拟数据。当前优先完成公网发布，记账、值日打卡、库存更新、本地保存与多人同步尚未接入。下列页面结构包含后续计划功能。

## 页面结构

1. 首页：问候、个人待办、家庭支出、值日、补货提醒、家庭动态。
2. 账本：支出明细、分类筛选、记一笔、个人分摊与结清。
3. 值日：一周任务、按成员筛选、完成打卡、添加任务。
4. 公共物品：库存、低库存提醒、消耗、补货与采购记账。
5. 我的小家：四位室友、切换体验身份、室友公约与确认、导出备份。

## 数据结构

金额以整数分存储，日期以 YYYY-MM-DD 存储。

| 对象 | 字段 |
| --- | --- |
| household | id、name、subtitle、createdAt |
| member | id、name、avatar、color、room |
| bill | id、title、amountCents、category、payerId、participantIds、settledIds、date |
| chore | id、title、area、assigneeId、date、done |
| item | id、name、category、quantity、unit、threshold、icon |
| agreement | id、title、content、confirmedIds、version |
| activity | id、text、time、icon |
| app state | schemaVersion、currentMemberId、household、members、bills、chores、items、agreements、activities |

## 使用

需要 Node.js 18 或更高版本，无需安装依赖。

```sh
npm start
```

浏览器访问 http://127.0.0.1:4173 。运行 `npm test` 验证费用分摊。

## 分享与部署

### GitHub Pages（推荐）

1. 在 GitHub 创建一个名为 `hezhu-helper` 的公共仓库，默认分支使用 `main`。
2. 上传本项目文件，保留 `public` 和 `.github/workflows` 的目录结构。
3. 打开仓库 **Settings → Pages → Build and deployment**，将 **Source** 选择为 **GitHub Actions**。
4. 在 **Actions → 发布合住日常 → Run workflow** 启动发布；推送到 `main` 也会自动发布。
5. 等发布成功，Settings → Pages 会显示网站的实际网址。通常格式为 `https://用户名.github.io/hezhu-helper/`，该示例不是已经发布的链接。

网站文件在 GitHub 上托管，不需要本机运行。只要仓库及 Pages 保持启用，并符合平台条款，就可持续访问。免费个人账号请使用公共仓库；源码会公开。本项目只含模拟数据。

### 其他静态托管

`public` 文件夹是可独立发布的静态网站，可上传至 Netlify Drop，或导入 Vercel / Cloudflare Pages。发布目录填写 `public`，无需构建命令。长期访问不依赖本机运行。

目前是展示版，不包含真实支付、自动通知或真正的多人邀请。后续本地保存版本的数据只属于当前浏览器，不会自动在设备间同步。

若使用临时转发链接，必须保持本机服务及转发进程运行。链接过期或进程重启后可能改变。
