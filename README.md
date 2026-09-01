# 烂梗侦测器 · CN Brainrot Detector

纯前端小工具，粘贴你的小红书文案，一键检测里面藏了多少"互联网黑话"。

---

## 项目简介

把那些张口就来的「家人们谁懂啊」「绝绝子」「yyds」「泰裤辣」扫一遍，告诉你文案的「网感浓度」有多高。

- **词库**：100+ 条，覆盖绝绝子、yyds、栓Q 这些老熟人，也收进了央媒点名过的「鸡你太美」「红温」「唐」等较新梗
- **替代建议**：每条烂梗配两套改法 —— 日常版 + 文雅版，想好好说话时直接抄
- **报告分享**：一键生成竖版分享图，存图发朋友圈/小红书
- **隐私安全**：全部本地计算，文案不上传任何服务器

---

## 使用方法

1. 打开 `index.html`（双击即可在浏览器运行）
2. 把文案粘贴到输入框（支持多篇，自动分段识别）
3. 点击「开始检测」
4. 查看浓度分数、段位、命中清单
5. 可复制文字报告或生成分享图

---

## 技术栈

- **纯 HTML/CSS/JS**，零依赖，单文件部署
- **Canvas** 生成分享图
- **正则匹配** + 词库检索，无 API 调用
- **响应式布局**，移动端友好

---

## 本地运行

```bash
# 方式一：直接打开
双击 index.html 即可

# 方式二：本地服务器（推荐）
python -m http.server 8080
# 访问 http://localhost:8080
```

---

## 关联作品

- 📱 [小红书作品链接](https://www.xiaohongshu.com/discovery/item/6a88a84b000000002800af13?source=webshare&xhsshare=pc_web&xsec_token=ABO8OLlRGJhIs9DEvh9wXBU0XHqSbgP5vq6WwOAYioYhA=&xsec_source=pc_share)
- 🎮 [参与小红书 Vibe Coding 国风活动](https://www.xiaohongshu.com/explore)

---

## License

MIT License —— 欢迎 fork、修改、二次创作

---

> 纯关键词娱乐统计，不解析语义。语境词（本义 ≠ 网络义）会尽量识别，但结果仅供参考，图一乐即可 😄
