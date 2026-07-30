"use client";

import { useMemo, useState } from "react";

const prompts = {
  "1-3天": `使用 $build-exam-knowledge-system。

我将在 1—3 天后参加【课程名称】期末考试。
请读取我上传的老师 PPT、考试重点、作业与往年题。

先完成：
1. 建立能直接上考场的课程知识框架
2. 按分值收益安排复习优先级
3. 完整解析往年题并提炼母题
4. 针对薄弱题型生成变式训练
5. 最后生成考前 30 分钟速记

材料不足的地方明确说明，不要编造老师口径。`,
  "今晚速成": `使用 $build-exam-knowledge-system。

【今晚速成模式】明天考试，不要泛泛讲解。
课程：【课程名称】
题型：【填写题型】

根据上传资料直接输出：
1. 必须拿下的 A 级考点
2. 高频题型的公式、步骤和采分点
3. 两道母题与条件变化题
4. 我的易错点检查
5. 一页考前速记。`,
  "30分钟": `使用 $build-exam-knowledge-system。

【考前 30 分钟模式】不要向我提问。
综合本次对话里的全部复习记录，给我最后查漏补缺：
- 建议答题顺序与时间分配
- 必背公式和模型使用条件
- 主观题开头、采分点与结尾
- 我反复出错或混淆的内容
- 开卷关键词定位
- 最后自检清单

不要重新生成一份泛泛课程总结。`,
};

const stages = [
  ["01", "建体系", "把本学期 PPT 变成能识题、能定位、能作答的课程地图。"],
  ["02", "抢稳定分", "按老师重点、分值和可训练性，先拿 A 级考点。"],
  ["03", "做往年题", "不只给答案：写思路、易错点、命题意图和变式。"],
  ["04", "补薄弱点", "只练不会的计算题和主观题，直到能独立复现。"],
  ["05", "考前收口", "根据整段对话，生成个人错点和最后 30 分钟提醒。"],
];

const outputs = [
  ["课程知识地图", "章节关系、模型链、关键词定位"],
  ["二轮抢分顺序", "A/B/C 考点与预计分值"],
  ["往年题详解", "公式、步骤、采分点与变式"],
  ["专项模拟题", "计算题、主观题、画图题"],
  ["开卷定位表", "题干关键词 → PPT/章节 → 答法"],
  ["考前 30 分钟", "个人错点、必背句与自检清单"],
];

const subjects = [
  "经济学", "管理学", "会计学", "法学", "思政理论",
  "历史学", "文学", "社会学", "统计与计算类",
];

export default function Home() {
  const [mode, setMode] = useState<keyof typeof prompts>("1-3天");
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => prompts[mode], [mode]);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span className="brand-mark">90+</span>
          <span>大学生期末周 AI 速通</span>
        </a>
        <div className="nav-links">
          <a href="#workflow">五步工作流</a>
          <a href="#start">立即使用</a>
          <a
            className="github-link"
            href="https://github.com/Nancy-517/college-final-exam-ai-skill"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> 两周期末冲刺真实验证</div>
          <h1>
            别再从 PPT
            <br />
            <em>第一页</em>开始复习
          </h1>
          <p className="hero-lead">
            把老师重点、课程 PPT、作业和往年题，转化为
            <strong>能直接上考场</strong>的知识框架、答题模板和考前速记。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#start">选模式，复制启动词</a>
            <a className="button secondary" href="#workflow">先看怎么运作</a>
          </div>
          <p className="microcopy">不保证押中原题 · 不替代学习 · 不编造老师口径</p>
        </div>

        <div className="exam-card" aria-label="期末复习任务卡示意">
          <div className="paper-hole one" />
          <div className="paper-hole two" />
          <div className="card-topline">
            <span>FINAL WEEK / 期末作战单</span>
            <span>NO. 090+</span>
          </div>
          <div className="score-stamp">目标<br /><b>90+</b></div>
          <h2>先回答五个问题</h2>
          <ol>
            <li><span>01</span>考什么题型？</li>
            <li><span>02</span>老师真正重视什么？</li>
            <li><span>03</span>往年题暴露什么规律？</li>
            <li><span>04</span>怎样写才能覆盖采分点？</li>
            <li><span>05</span>最后半小时应该看什么？</li>
          </ol>
          <div className="card-footer">
            约束识别 → 命题反推 → 模板训练 → 考场调用
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <span>适合文科与经管</span>
        <i />
        <span>开卷 / 闭卷</span>
        <i />
        <span>主观题 / 计算题</span>
        <i />
        <span>1–3 天 / 今晚 / 30 分钟</span>
      </section>

      <section className="section workflow" id="workflow">
        <div className="section-heading">
          <p className="kicker">THE FIVE-STAGE LOOP</p>
          <h2>不是“帮我总结重点”<br />而是一套完整复习闭环</h2>
        </div>
        <div className="stage-list">
          {stages.map(([number, title, description]) => (
            <article className="stage" key={number}>
              <span className="stage-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="stage-arrow">↘</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section prompt-section" id="start">
        <div className="prompt-intro">
          <p className="kicker">START IN 60 SECONDS</p>
          <h2>不会 Skill？<br />复制一句话就能开始</h2>
          <p>
            先把老师 PPT、考试重点、作业和往年题上传到同一段对话，
            再选择你的剩余时间。第一次不用研究 GitHub，也不用理解任何技术名词。
          </p>
          <div className="upload-list">
            <span>01 老师重点</span>
            <span>02 往年题</span>
            <span>03 课堂 PPT</span>
            <span>04 作业 / 例题</span>
          </div>
        </div>

        <div className="prompt-console">
          <div className="mode-tabs" role="tablist" aria-label="选择复习模式">
            {(Object.keys(prompts) as Array<keyof typeof prompts>).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                className={mode === key ? "active" : ""}
                onClick={() => setMode(key)}
              >
                {key}
              </button>
            ))}
          </div>
          <pre>{prompt}</pre>
          <button className="copy-button" type="button" onClick={copyPrompt}>
            {copied ? "已复制，去粘贴吧 ✓" : "复制这段启动词"}
          </button>
        </div>
      </section>

      <section className="section outputs-section">
        <div className="section-heading split">
          <div>
            <p className="kicker">WHAT YOU GET</p>
            <h2>最终拿到的不是摘要<br />而是一套考试输出系统</h2>
          </div>
          <p>每个结果都对应一个考场动作：识题、定位、计算、组织答案、检查漏点。</p>
        </div>
        <div className="output-grid">
          {outputs.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section audience-section">
        <div>
          <p className="kicker">SUBJECT PROFILES</p>
          <h2>先服务最容易<br />被“资料淹没”的同学</h2>
          <p className="audience-copy">
            文科和经管考试往往不是“完全不会”，而是资料太多、题型不明、
            会理解却不会写满采分点。Skill 会根据学科自动切换组织方式。
          </p>
        </div>
        <div className="subject-cloud">
          {subjects.map((subject, index) => (
            <span key={subject} className={index < 5 ? "accent" : ""}>{subject}</span>
          ))}
        </div>
      </section>

      <section className="section structure-section">
        <div className="section-heading">
          <p className="kicker">OPEN SOURCE STRUCTURE</p>
          <h2>通用能力放主干<br />个性经验留在分支</h2>
        </div>
        <div className="branch-map">
          <article className="main-branch">
            <div className="branch-label">MAIN</div>
            <h3>通用期末考试 Skill</h3>
            <p>核心流程、材料优先级、题型模板、科目 Profile、紧急模式和网站入口。</p>
          </article>
          <div className="branch-line"><span /><span /></div>
          <article>
            <div className="branch-label">BRANCH 01</div>
            <h3>five-stage-workflow</h3>
            <p>针对某一学科、领域或个人习惯定制的五步复习工作流。</p>
          </article>
          <article>
            <div className="branch-label">BRANCH 02</div>
            <h3>real-exam-sprint-case-study</h3>
            <p>真实复习案例、聊天摘录、人机协作策略评价与视觉复盘。</p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <p>还有 1 天，也别只会焦虑。</p>
        <h2>先把资料变成<br />一张能打的牌。</h2>
        <div className="hero-actions">
          <a className="button primary" href="#start">复制启动词</a>
          <a
            className="button secondary light"
            href="https://github.com/Nancy-517/college-final-exam-ai-skill"
            target="_blank"
            rel="noreferrer"
          >
            查看开源项目 ↗
          </a>
        </div>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">90+</span>
          <span>大学生期末周 AI 速通</span>
        </div>
        <p>从 PPT 到采分点，从往年题到考场输出。</p>
        <p>MIT License · Made for Chinese college students.</p>
      </footer>
    </main>
  );
}
