# 瑶光阁 · Yaoguang Pavilion

> 传递心意，珍藏美好  
> Convey emotion. Preserve meaning.

---

## 📖 项目介绍｜Overview

**瑶光阁（Yaoguang Pavilion）** 是一个将传统珠宝工艺与现代 NFC 技术相结合的数字体验项目，致力于让情感不止停留在赠予的瞬间，而是被长期保存、反复开启。

每一件瑶光阁珠宝中都嵌入了一枚 **唯一的 NFC 芯片**。  
当用户使用手机轻触珠宝时，芯片会自动打开一个专属的 H5 页面，在这里：

- 可以了解品牌故事与文化内容  
- 可以观看与大漆文化相关的影像  
- 可以创建或查看一段只属于这件珠宝的祝福语  

珠宝不再只是被佩戴的物件，而成为**情感的载体与记忆的入口**。

本项目以轻量级 **MVP** 为目标，验证「珠宝 × NFC × 情感留存」这一完整体验闭环，为未来更丰富的数字化表达与仪式感设计奠定基础。

---

## 🌌 About the Project (English)

**Yaoguang Pavilion** is a digital experience project that combines traditional jewelry craftsmanship with modern NFC technology.

Each piece of jewelry contains a **unique embedded NFC chip**.  
With a simple tap of a smartphone, users are guided to a dedicated H5 web page where they can:

- Explore the brand story and cultural background  
- Watch curated lacquer-art–inspired visual content  
- Create or read a personalized blessing message linked to the jewelry  

Rather than being a static object, the jewelry becomes a **gateway to emotion, memory, and meaning**.

This project is developed as a **Minimum Viable Product (MVP)** to validate the complete experience loop of  
**Jewelry × NFC × Emotional Expression**, serving as a foundation for future expansion and refinement.

---

## 🧠 实现说明｜Implementation Notes (MVP)

当前版本采用 **轻量级、无数据库依赖** 的实现方式，以降低部署成本并加快验证周期。

- 后端通过 `api.php` 处理祝福内容的创建与更新逻辑  
- 祝福文本与随机生成的查看密码由接口统一管理  
- 所有数据以结构化 JSON 的形式，写入并持久化至本地文件 `remote_db.json`  
- 每条记录均以唯一的 **NFC_ID** 作为索引，与对应珠宝一一绑定  

该方式适用于早期验证 NFC 触发流程、情感交互体验以及整体用户路径设计。  
在后续阶段，可无缝迁移至正式数据库系统（如 PostgreSQL / MySQL / Cloud DB）。

---

## 🧠 Implementation Notes (English)

The current version intentionally avoids a traditional database in order to keep the MVP lightweight and easy to deploy.

- A simple `api.php` endpoint handles the creation and update of blessing messages  
- Viewing passwords are generated and managed by the API when enabled  
- All data is persisted in a structured local JSON file: `remote_db.json`  
- Each record is indexed by a unique **NFC_ID**, ensuring a one-to-one mapping between jewelry and its digital content  

This approach is designed for early-stage validation of NFC-triggered flows and emotional interaction design, and can be smoothly migrated to a full database-backed architecture in future iterations.

---

## ✨ 核心理念｜Core Concept

- 每一件珠宝，都是独一无二的情感载体  
- 每一次触碰，都是一次重新开启的心意  
- 技术不是主角，而是让情感得以被珍藏的方式  

Technology stays invisible — emotion stays present.

---

## 🧩 技术栈｜Tech Stack

- **Vite** — 轻量、快速的前端构建工具  
- **React** — 构建沉浸式交互体验  
- **TypeScript** — 提供可靠的类型安全  
- **Tailwind CSS** — 用于精细控制视觉与层次  
- **shadcn/ui** — 简洁克制的 UI 组件体系  
- **PHP** — 轻量级后端接口，用于数据写入与读取  

---

## 🙏 致谢｜Acknowledgements

本项目的初始结构由 **[Lovable](https://lovable.dev/)** 协助生成。

Lovable 在项目早期阶段提供了高效的 AI 辅助开发支持，使整体架构与基础界面得以快速成型。  
在此对其工具与体验表示感谢。

---

## 🚀 本地运行｜Getting Started

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
