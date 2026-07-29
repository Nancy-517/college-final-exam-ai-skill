---
name: build-exam-knowledge-system
description: 根据学生有权使用的课程资料，构建能直接服务大学期末考试的知识系统。适用于期末复习、老师PPT与划重点整理、考试范围分析、题型识别、采分点答案、往年题详解、模拟题与变式训练、开卷考试定位、紧急冲刺和考前半小时速记。Build an exam-ready knowledge system from authorized course materials. 始终以用户材料为依据、标注来源，不编造老师观点或课程内容。
---

# 构建期末考试知识系统

把用户有权使用的课程资料，转化成一套能帮助学生识别题型、定位知识、组织答案和稳定拿分的考试系统。

## 启动流程

1. 从用户消息或材料中识别考试时间、开闭卷、题型分值、剩余时间和目标分数。
2. 盘点已有资料，不假设材料完整。
3. 按以下优先级使用材料：

   `老师明确重点 > 同课程往年题 > 课堂PPT/讲义 > 作业与例题 > 指定教材 > 明确标注的通用知识`

4. 按 [references/core-workflow.md](references/core-workflow.md) 执行主流程。
5. 按 [references/source-policy.md](references/source-policy.md) 标注来源和不确定性。
6. 从 `templates/` 选择与当前阶段对应的模板。

不要询问能够从上下文合理判断的问题；必要假设要明确标注。用户表示临近考试、要求直接讲重点或拒绝澄清时，立即进入紧急模式。

## 五类核心产出

按当前阶段输出必要内容，并保持以下递进关系：

1. **一轮：可直接上考场的知识体系**，必须结合本学期真实材料。
2. **二轮：抢分优先级**，根据概率、分值、迁移价值和个人薄弱点排序。
3. **往年题：完整详解**，包含思路、采分点、易错点和变式。
4. **专项训练：举一反三**，只针对不会、高频或高价值题型。
5. **考前半小时：个性化收口**，根据整段复习对话和错误记录生成。

需要针对某一领域、课程或个人习惯深度定制时，读取 [references/customization.md](references/customization.md)。完整的强制五阶段版本位于 `five-stage-workflow` 分支。

## 输出规则

- 每个重要知识点都要对应可能的题目问法和考场动作。
- 主观题给出：触发词、章节/原理、答题结构、采分点、材料结合和常见漏点。
- 计算题给出：模型识别、使用条件、公式、符号、逐步代入、结果解释和检查。
- 画图题给出：坐标、初始状态、曲线移动、新均衡、变量方向和机制。
- 开卷考试必须生成“关键词—资料位置—立即调用内容”索引。
- 明确区分材料事实、合理推断和通用补充。
- 材料无法支持课程特定结论时，写明 `材料未体现`。
- 不复制或公开未授权的教师PPT、内部试卷、答案、个人信息和受限教学资料。

## 紧急模式（Emergency Mode）

触发词包括：`马上考试`、`半小时后考试`、`今晚速成`、`不要问我`、`直接给重点`，以及含义相同的表达。

按以下顺序输出：

1. 拿分策略、答题顺序和时间分配。
2. 必须拿下的知识点和题型。
3. 公式、模型与答题骨架。
4. 个人易错警报和易混概念。
5. 开卷定位表（如适用）。
6. 最后自检。

高度压缩，但不能删掉用户反复出错的关键内容。

## 学科 profiles

只加载与当前课程匹配的 profile：

- [subject_profiles/quantitative.md](subject_profiles/quantitative.md)
- [subject_profiles/economics-social-science.md](subject_profiles/economics-social-science.md)
- [subject_profiles/open-book-subjective.md](subject_profiles/open-book-subjective.md)

Profile 只决定组织方式，用户提供的实际课程资料始终优先。
