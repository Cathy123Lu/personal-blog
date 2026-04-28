# Changelog

## v1.0.0 — 2026-04-28

首次完整上线版本。

### 部署信息
- 生产地址：https://personal-blog-liart-beta.vercel.app
- GitHub 仓库：https://github.com/Cathy123Lu/personal-blog
- Vercel 项目：https://vercel.com/cathy123lus-projects/personal-blog
- 中文首页：https://personal-blog-liart-beta.vercel.app/zh
- 英文首页：https://personal-blog-liart-beta.vercel.app/en

### 技术栈
- Next.js 16 (App Router, SSG)
- TypeScript
- Tailwind CSS v4
- gray-matter + react-markdown（MDX 内容读取）
- 部署：Vercel

### 功能清单
- [x] 深色主题 + 蓝色品牌色全局样式
- [x] 中英文路由切换（/zh、/en），切换保持当前路径
- [x] 导航栏 active 高亮 + 语言切换按钮
- [x] 首页：Hero、技术标签、精选文章、精选项目
- [x] 文章列表页（/posts）
- [x] 文章详情页（/posts/[slug]），Markdown 渲染
- [x] 项目列表页（/projects），含成果指标卡片
- [x] 项目详情页（/projects/[slug]），含 Key Results 区块
- [x] About 页：工作经历时间线 + 技能矩阵 + 联系方式
- [x] 示例内容：2 篇文章 × 中英文，2 个项目 × 中英文

### 执行的关键命令
```bash
# 创建项目
npx create-next-app@latest personal-blog --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 安装内容依赖
npm install gray-matter next-mdx-remote react-markdown remark-gfm

# 本地开发
npm run dev        # http://localhost:3000

# 构建验证
npm run build

# 推送到 GitHub
gh repo create personal-blog --public --source=. --remote=origin --push

# 部署到 Vercel
npm install -g vercel
vercel login
vercel --yes
```

---

## 回滚方式

### 方式一：Vercel 控制台（推荐，最快）
1. 打开 https://vercel.com/cathy123lus-projects/personal-blog
2. 点击 Deployments
3. 找到目标版本，点 ··· → Promote to Production

### 方式二：git revert（撤销某次提交）
```bash
git log --oneline          # 找到要撤销的 commit hash
git revert <hash>          # 生成一个反向 commit，不破坏历史
git push                   # 推送后 Vercel 自动重新部署
```

### 方式三：git tag 回滚到指定版本
```bash
git checkout v1.0.0        # 切到某个 tag 查看
git checkout main          # 回到主分支
```

---

## 版本规范

- `v主版本.次版本.补丁`
- 新增页面或功能 → 次版本 +1（如 v1.1.0）
- 修复 bug 或文案调整 → 补丁 +1（如 v1.0.1）
- 重大重构或技术栈升级 → 主版本 +1（如 v2.0.0）
