# 大学生期末周 AI 速通 90+

> Universal College Final Exam AI Skill · 把混乱课程资料，转化成能识题、能定位、能作答、能拿分的期末考试知识系统。

`college-final-exam-ai-skill` 是一个面向中国大学生期末考试的通用开源 Skill。它读取用户有权使用的课程大纲、老师 PPT、复习重点、作业与往年题，生成与本学期教学口径一致的知识框架、复习优先级、详细题解、专项练习和考前速记。

它不是公共题库，也不承诺“押中原题”。它解决的是材料混乱、时间有限、不会把知识转化为考场输出的问题。

**不熟悉 Skill？** 直接打开中文使用网站：[大学生期末周 AI 速通 90+](https://college-final-ai-90plus.wangyiqing517517.chatgpt.site)

## 适用场景

- 文科、经管、理工等大学课程期末复习
- 主观题、计算题、证明题、画图题、案例题、分录题
- 开卷考试的关键词与页码定位
- 往年题逐题解析与母题/变式提炼
- 考前 1–3 天冲刺或最后 30 分钟查漏补缺

## 核心流程

```text
课程材料
  ↓
考试约束与来源分级
  ↓
可直接上考场的知识体系
  ↓
按分值收益安排二轮顺序
  ↓
完整解决往年题并提炼母题
  ↓
针对薄弱点生成变式训练
  ↓
考前半小时个性化提醒
```

## 关键原则

1. **老师材料优先**：考试重点与课堂口径优先于通用教材知识。
2. **先建体系，再做题**：知识框架必须包含题目触发词、公式/模型和答题落点。
3. **先拿稳定分**：按出题概率、分值、可训练性和个人掌握度排序。
4. **往年题完整做**：不只给答案，还解释命题意图、步骤、易错点和变式。
5. **不编造**：材料没有支持的内容明确标注，不冒充老师讲法。
6. **尊重版权与隐私**：不收录学校内部原始资料、未授权试卷或教师课件。

## 快速使用

安装或加载 Skill 后，可以直接说：

```text
使用 $build-exam-knowledge-system。

请根据我上传的课程 PPT、老师重点、作业和往年题，建立一份能直接上考场的知识体系。
考试时间：明天下午
考试形式：开卷
题型：名词解释、简答、计算、材料分析
目标：90+

先做课程框架和复习优先级，再逐题完成往年题。
材料不足的地方请明确说明，不要把通用知识写成老师口径。
```

紧急模式：

```text
使用 $build-exam-knowledge-system。
还有 30 分钟考试，不要向我提问。
根据本次对话中的全部复习记录，给我最后查漏补缺：
答题顺序、必背公式、主观题骨架、个人易错点、开卷定位和最后自检。
```

## 项目结构

```text
.
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── core-workflow.md
│   ├── source-policy.md
│   ├── emergency-mode.md
│   └── customization.md
├── templates/
│   ├── exam-ready-framework.md
│   ├── priority-review-plan.md
│   ├── past-paper-solution.md
│   ├── subjective-answer.md
│   ├── calculation-answer.md
│   ├── open-book-locator.md
│   └── final-30-minutes.md
├── subject_profiles/
├── examples/
├── docs/
└── website/                  # 不懂 Skill 也能直接使用的中文引导网站
```

## 分支

- `main`：项目主干。包含通用期末考试 Skill、学科 profiles、答题模板、紧急模式和使用网站。
- `five-stage-workflow`：把复习拆成“建体系—抢稳定分—做往年题—补薄弱点—考前收口”的定制工作流。
- `real-exam-sprint-case-study`：真实复习案例、人机协作记录摘编、复习策略评价与可视化总结。

分支不是三个互相竞争的版本：普通用户从 `main` 开始；需要深度定制时再查看后两个分支。

## 安装

将本仓库放入 Codex Skills 目录，或使用支持 GitHub Skill 安装的工具安装。Skill 入口为根目录的 `SKILL.md`。

## 内容边界

本项目只提供通用流程、模板与匿名示例，不包含任何学校内部 PPT、往年题原文、教师资料或未授权答案。使用者应确保上传材料的使用与处理符合版权、校规和隐私要求。

## 贡献

欢迎提交：

- 新学科 profile
- 更可靠的答案评分 rubric
- 匿名化的工作流示例
- 对错误诊断和长期记忆机制的改进

请勿提交受版权限制的原始课程文件或可识别个人/学校内部信息。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

[MIT License](LICENSE)
