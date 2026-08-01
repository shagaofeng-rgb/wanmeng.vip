# 挽梦家纺官网

面向中国大学宿舍生活的品牌展示型官网，使用 Next.js App Router 与 TypeScript 构建。

## 本地运行

```bash
pnpm install
pnpm dev
```

浏览器访问开发服务器输出的本地地址。生产构建使用 `pnpm build`。

## 内容与素材

- 产品图片来自企业提供的百度网盘公开素材。
- 公司名称、联系方式与地址来自企业建站资料文档。
- 表单在首版中为前端交互演示，不会向服务器提交数据。
- 所有品牌资料可在 `lib/site-config.ts` 与 `data/products.ts` 中统一维护。
