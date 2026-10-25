# 家常菜谱小站（实验三）

使用 Vue 3 + Vite + vue-router 制作的纯前端小网站，共 4 个页面、18 个单文件组件。

## 运行方式

```bash
cd recipe-site
npm install     # 第一次运行前安装依赖
npm run dev     # 启动开发服务器，默认地址 http://localhost:5173
```

打包验证：

```bash
npm run build   # 打包到 dist 目录
npm run preview # 预览打包后的生产版本
```

## 页面

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | 横幅、今日推荐（评分 Top3）、站点统计 |
| `/recipes` | 全部菜谱 | 关键词搜索 + 标签筛选（计算属性过滤） |
| `/recipes/:id` | 菜谱详情 | 食材勾选清单、分步做菜、收藏、留言 |
| `/favorites` | 我的收藏 | 收藏列表（localStorage 持久化）、清空确认弹窗 |

## 在线访问（GitHub Pages）

推送后由 GitHub Actions 自动构建并部署，访问地址：

https://shirazunagisa.github.io/Web-Full-Stack-Development-Lab-3/

首次部署需在仓库 Settings → Pages 中把 Source 设为 “GitHub Actions”。

## 目录结构

```
recipe-site/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js                  # 应用入口
    ├── style.css                # 全局样式
    ├── App.vue                  # 根组件（布局）
    ├── router/index.js          # 路由配置（4 条规则）
    ├── data/recipes.js          # 8 道菜谱的静态数据
    ├── composables/
    │   └── useFavorites.js      # 组合式函数：收藏状态 + watch 持久化
    ├── components/              # 13 个通用组件
    │   ├── NavBar.vue           # 导航栏（router-link 高亮、收藏计数）
    │   ├── SiteFooter.vue       # 页脚
    │   ├── HeroBanner.vue       # 横幅（props + 默认插槽）
    │   ├── SearchBar.vue        # 搜索框（组件级 v-model、模板引用聚焦）
    │   ├── TagFilter.vue        # 标签筛选（组件级 v-model 数组）
    │   ├── RecipeCard.vue       # 菜谱卡片（props + computed）
    │   ├── RatingStars.vue      # 评分星星（computed）
    │   ├── IngredientList.vue   # 食材清单（checkbox v-model）
    │   ├── StepList.vue         # 分步做菜（v-if/v-else/v-show）
    │   ├── CommentBox.vue       # 留言输入（v-model + emit + 校验）
    │   ├── CommentItem.vue      # 单条留言（props + computed）
    │   ├── EmptyState.vue       # 空状态（默认插槽）
    │   └── ConfirmModal.vue     # 确认弹窗（具名插槽）
    └── views/                   # 4 个页面组件
        ├── HomePage.vue
        ├── RecipesPage.vue
        ├── RecipeDetailPage.vue
        └── FavoritesPage.vue
```
