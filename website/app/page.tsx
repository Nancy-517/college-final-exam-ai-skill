"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";

type Material = {
  id: string;
  name: string;
  kind: string;
  size: string;
  text: string;
  status: "已解析" | "待识别" | "解析失败";
};

type ResultKey = "地图" | "顺序" | "往年题" | "模拟题" | "半小时";

const resultTabs: ResultKey[] = ["地图", "顺序", "往年题", "模拟题", "半小时"];

const mockMaterials: Material[] = [
  { id: "m1", name: "发展经济学_老师重点.pdf", kind: "PDF", size: "2.4 MB", status: "已解析", text: "贫困陷阱、Lewis 二元经济、Dasgupta-Ray、大推进、赫绪曼不平衡增长、进口替代、中心外围。" },
  { id: "m2", name: "发展经济学_往年题.pdf", kind: "PDF", size: "1.1 MB", status: "已解析", text: "名词解释、简答题、画图题、计算题、开放题；重点考察模型机制、政策含义和图形。" },
  { id: "m3", name: "课堂作业与错题.md", kind: "MD", size: "38 KB", status: "已解析", text: "薄弱点：大推进最低投资条件、赫绪曼关联效应、Dasgupta-Ray 图形解释。" },
];

const mockResults: Record<ResultKey, { label: string; title: string; body: string[] }> = {
  地图: {
    label: "第一轮 · 直接上考场",
    title: "发展经济学知识地图",
    body: [
      "核心问题：发展中国家为什么长期处于低水平均衡，以及如何通过制度、产业与投资突破约束。",
      "主线一：贫困形成——收入低 → 营养与人力资本不足 → 劳动能力下降 → 继续贫困。",
      "主线二：结构转型——传统农业剩余劳动力 → 现代工业吸收 → 工资、利润与再投资。",
      "主线三：协调与产业政策——大推进强调同时投资；赫绪曼强调关联效应和不平衡增长。",
      "考场触发词：营养/劳动能力 → Dasgupta-Ray；剩余劳动力 → Lewis；协调失败 → 大推进。",
    ],
  },
  顺序: {
    label: "第二轮 · 先拿稳定分",
    title: "按收益排序的复习路线",
    body: [
      "A 级：贫困陷阱、Lewis、大推进、赫绪曼。覆盖简答、画图和计算，优先完成。",
      "A 级：老师明确强调的模型假设、图形坐标、变量方向和政策结论。",
      "B 级：进口替代、中心—外围、结构主义与新古典主义比较，用于论述题区分度。",
      "C 级：低频人物与细节，只保留一句定义和对应章节，避免投入过量时间。",
      "执行顺序：母题复现 → 遮答案完整写 → 改条件变式 → 错因修复。",
    ],
  },
  往年题: {
    label: "第三轮 · 逐题拆命题",
    title: "往年题解析任务单",
    body: [
      "题型定位：先标章节、模型、分值和老师真正想检查的能力。",
      "计算题：写条件 → 写通式 → 逐步代入 → 检查阈值/方向 → 解释经济含义。",
      "画图题：标横纵轴、关键曲线、低水平均衡与跨越阈值后的新均衡。",
      "主观题：概念 → 前提 → 机制链 → 模型支持 → 政策含义 → 局限。",
      "每题完成后提炼：母题、可改变条件、常见错误和一题一检。",
    ],
  },
  模拟题: {
    label: "第四轮 · 只补不会的",
    title: "针对性变式训练",
    body: [
      "基础识别：给出一段营养—劳动能力材料，判断对应模型并解释恶性循环。",
      "标准母题：在给定工资、固定成本和市场规模下，判断大推进能否发生。",
      "条件变化：若外部市场扩大或基础设施成本下降，最低协调投资如何变化？",
      "综合迁移：比较大推进与赫绪曼对“资源有限地区产业升级”的政策建议。",
      "评分标准：模型定位 20% + 机制 35% + 图形/公式 25% + 政策与局限 20%。",
    ],
  },
  半小时: {
    label: "第五轮 · 考前收口",
    title: "最后 30 分钟提醒",
    body: [
      "先拿名词解释和标准模型题；复杂计算卡住 4 分钟立即跳过。",
      "画图必须写坐标、曲线名称、均衡点与移动方向，不能只画形状。",
      "大推进强调协调失败；赫绪曼强调前向/后向关联，二者不要混写。",
      "主观题每段首句先写结论，再展开机制；最后补政策边界和现实条件。",
      "交卷前检查：公式条件、正负号、单位、题号、采分点是否分层。",
    ],
  },
};

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function kindOf(name: string) {
  return name.split(".").pop()?.toUpperCase() || "FILE";
}

async function parseFile(file: File): Promise<Material> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  let text = "";
  try {
    if (["txt", "md", "csv", "json"].includes(extension)) {
      text = await file.text();
    } else if (extension === "docx") {
      const mammoth = await import("mammoth/mammoth.browser");
      const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
      text = result.value;
    } else if (extension === "pptx") {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const slides = Object.keys(zip.files)
        .filter((path) => /^ppt\/slides\/slide\d+\.xml$/.test(path))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      const chunks = await Promise.all(slides.map(async (path) => {
        const xml = await zip.file(path)?.async("text");
        return (xml?.match(/<a:t>(.*?)<\/a:t>/g) || [])
          .map((item) => item.replace(/<\/?a:t>/g, ""))
          .join(" ");
      }));
      text = chunks.join("\n");
    } else if (extension === "pdf") {
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.mjs",
        import.meta.url,
      ).toString();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const pages: string[] = [];
      for (let pageNo = 1; pageNo <= Math.min(pdf.numPages, 80); pageNo += 1) {
        const page = await pdf.getPage(pageNo);
        const content = await page.getTextContent();
        pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
      }
      text = pages.join("\n");
    }
    return {
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      kind: kindOf(file.name),
      size: humanSize(file.size),
      text: text.slice(0, 180000),
      status: text.trim() ? "已解析" : "待识别",
    };
  } catch {
    return {
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      kind: kindOf(file.name),
      size: humanSize(file.size),
      text: "",
      status: "解析失败",
    };
  }
}

function buildResults(course: string, materials: Material[], examType: string, weak: string) {
  const corpus = materials.map((m) => m.text).join("\n");
  const terms = corpus
    .replace(/[^\u4e00-\u9fa5A-Za-z0-9\-—·]/g, " ")
    .split(/\s+/)
    .filter((item) => item.length >= 2 && item.length <= 18);
  const frequent = [...new Set(terms)].slice(0, 10);
  const sourceNames = materials.map((m) => m.name).join("、") || "尚未上传资料";
  const focus = frequent.length ? frequent.join("、") : "请补充老师重点和往年题以提高准确度";
  return {
    地图: {
      label: "本地解析 · 第一轮",
      title: `${course || "本课程"}考试知识地图`,
      body: [
        `已读取 ${materials.length} 份资料：${sourceNames}。`,
        `材料中优先识别到：${focus}。`,
        "建议按“核心问题 → 概念/理论 → 模型/公式 → 题型 → 答题落点”重建章节，而不是照搬 PPT 目录。",
        `考试形式：${examType}。先建立题干关键词与章节的映射，再补公式、图形和采分点。`,
        "当前为浏览器本地初步分析；点击“复制 AI 深度任务”可把资料摘要交给 Skill 继续推理。",
      ],
    },
    顺序: {
      label: "收益排序 · 第二轮",
      title: "先拿下最稳定的分数",
      body: [
        "A 级：老师明确强调 + 往年重复 + 分值高 + 可短期训练的交集。",
        `个人薄弱点：${weak || "尚未填写；建议补充最怕的三类题"}。`,
        "先做标准母题并完整复现，再改数字、改条件、改问法；避免平均用力。",
        "主观题先固定结构和采分点；计算题先固定模型识别、公式和检查流程。",
        "最后只保留低频知识的一句话定义与定位，不在冷门细节上过量投入。",
      ],
    },
    往年题: mockResults.往年题,
    模拟题: {
      ...mockResults.模拟题,
      body: [
        `围绕材料高频词生成识别题：${frequent.slice(0, 4).join("、") || "待补充资料"}。`,
        "标准母题：保持老师原问法，只替换数字、案例或政策背景。",
        "条件变化题：改变一个关键假设，要求判断结论是否仍然成立。",
        `重点补强：${weak || "先完成一次限时自测，再按错因生成题目"}。`,
        "每轮只练 3—5 题；覆盖采分点后停止机械刷题。",
      ],
    },
    半小时: {
      ...mockResults.半小时,
      body: [
        `资料检查：共 ${materials.length} 份，${materials.filter((m) => m.status === "已解析").length} 份已提取文本。`,
        `个人警报：${weak || "未填写薄弱点，请在进考场前列出三个易错点"}。`,
        "只看：必背公式的使用条件、主观题骨架、图形方向、个人错题和开卷页码。",
        "不再大规模学习新章节；用主动回忆检查能否脱离答案写出完整步骤。",
        "最后检查：题号、单位、正负号、曲线移动、材料结合和结论句。",
      ],
    },
  } satisfies Record<ResultKey, { label: string; title: string; body: string[] }>;
}

export default function Home() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [course, setCourse] = useState("");
  const [examType, setExamType] = useState("开卷 · 主观题为主");
  const [deadline, setDeadline] = useState("1—3 天");
  const [weak, setWeak] = useState("");
  const [activeTab, setActiveTab] = useState<ResultKey>("地图");
  const [results, setResults] = useState(mockResults);
  const [isMock, setIsMock] = useState(true);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const parsedCount = materials.filter((m) => m.status === "已解析").length;
  const current = results[activeTab];
  const deepPrompt = useMemo(() => {
    const excerpts = materials
      .filter((m) => m.text)
      .map((m) => `【${m.name}】\n${m.text.slice(0, 3500)}`)
      .join("\n\n");
    return `使用 $build-exam-knowledge-system。\n\n课程：${course || "请根据资料判断"}\n考试：${examType}\n剩余时间：${deadline}\n个人薄弱点：${weak || "请先诊断"}\n\n请基于以下已提取资料，依次完成：\n1. 可直接上考场的知识框架\n2. 按分值收益排序的二轮计划\n3. 往年题逐题解析与母题提炼\n4. 薄弱点模拟题及采分点\n5. 考前 30 分钟清单\n\n资料没有支持的内容明确说明，不要编造老师口径。\n\n${excerpts || "我会在对话中继续上传原始文件。"}\n`;
  }, [course, deadline, examType, materials, weak]);

  async function receiveFiles(files: File[]) {
    if (!files.length) return;
    setBusy(true);
    const parsed = await Promise.all(files.slice(0, 12).map(parseFile));
    setMaterials((old) => [...old, ...parsed].slice(0, 12));
    setIsMock(false);
    setBusy(false);
  }

  async function onFiles(event: ChangeEvent<HTMLInputElement>) {
    await receiveFiles(Array.from(event.target.files || []));
    event.target.value = "";
  }

  async function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    await receiveFiles(Array.from(event.dataTransfer.files || []));
  }

  function analyze() {
    setResults(buildResults(course, materials, examType, weak));
    setActiveTab("地图");
    setIsMock(false);
    document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
  }

  function loadMock() {
    setCourse("发展经济学");
    setExamType("开卷 · 名词解释、简答、画图、计算、开放题");
    setDeadline("今晚速成");
    setWeak("大推进计算、赫绪曼关联效应、图形表达");
    setMaterials(mockMaterials);
    setResults(mockResults);
    setIsMock(true);
    setActiveTab("地图");
  }

  async function copyDeepPrompt() {
    await navigator.clipboard.writeText(deepPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top"><span className="brand-mark">90+</span><span>期末周 AI 工作台</span></a>
        <div className="nav-links">
          <a href="#workspace">开始复习</a>
          <a href="#results">分析结果</a>
          <a className="github-link" href="https://github.com/Nancy-517/college-final-exam-ai-skill" target="_blank" rel="noreferrer">开源项目 ↗</a>
        </div>
      </nav>

      <section className="hero workbench-hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> 从资料堆到考场答案</div>
          <h1>上传资料，<br /><em>直接开工。</em></h1>
          <p className="hero-lead">把老师 PPT、重点、作业和往年题放进同一个工作台，生成知识地图、抢分顺序、题解任务和考前提醒。</p>
          <div className="hero-actions">
            <a className="button primary" href="#workspace">创建我的复习项目</a>
            <button className="button secondary" type="button" onClick={loadMock}>查看真实冲刺 Mock</button>
          </div>
          <p className="microcopy">资料仅在当前浏览器读取 · 不自动保存 · 结果不替代老师口径</p>
        </div>
        <div className="dashboard-preview">
          <div className="preview-head"><span>发展经济学 / 今晚速成</span><b>90+</b></div>
          <div className="preview-files">
            <span>老师重点.pdf <i>已解析</i></span>
            <span>往年题.pdf <i>已解析</i></span>
            <span>错题笔记.md <i>已解析</i></span>
          </div>
          <div className="preview-score"><strong>A 级考点</strong><em>4</em><strong>待补薄弱点</strong><em>3</em></div>
          <div className="preview-route">建体系 → 抢稳定分 → 母题 → 变式 → 半小时</div>
        </div>
      </section>

      <section className="workspace-shell" id="workspace">
        <aside className="setup-panel">
          <p className="kicker">01 / EXAM SETUP</p>
          <h2>先告诉工作台<br />你要考什么</h2>
          <label>课程名称<input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="例如：国际经济学" /></label>
          <label>考试形式
            <select value={examType} onChange={(e) => setExamType(e.target.value)}>
              <option>开卷 · 主观题为主</option><option>闭卷 · 主观题为主</option>
              <option>闭卷 · 计算题为主</option><option>混合题型</option>
            </select>
          </label>
          <label>剩余时间
            <div className="deadline-row">
              {["1—3 天", "今晚速成", "30 分钟"].map((item) => <button type="button" className={deadline === item ? "active" : ""} onClick={() => setDeadline(item)} key={item}>{item}</button>)}
            </div>
          </label>
          <label>最怕或最不会的题<textarea value={weak} onChange={(e) => setWeak(e.target.value)} placeholder="例如：有效保护率计算、25 分论述题不会展开" /></label>
        </aside>

        <div className="upload-panel">
          <div className="panel-title"><div><p className="kicker">02 / MATERIALS</p><h2>放入本学期真实资料</h2></div><span>{parsedCount}/{materials.length} 已解析</span></div>
          <input ref={fileInput} hidden type="file" multiple accept=".pdf,.docx,.pptx,.txt,.md,.csv,.json,.png,.jpg,.jpeg" onChange={onFiles} />
          <div className="drop-zone" role="button" tabIndex={0} onDragOver={(e) => e.preventDefault()} onDrop={onDrop} onClick={() => fileInput.current?.click()} onKeyDown={(e) => e.key === "Enter" && fileInput.current?.click()}>
            <b>{busy ? "正在读取资料…" : "拖入文件，或点击选择"}</b>
            <span>PDF · Word · PPTX · TXT · Markdown · 图片</span>
            <small>最多 12 份；扫描版 PDF 和图片需要在 AI 对话中继续识别</small>
          </div>
          <div className="material-list">
            {materials.length === 0 ? <div className="empty-state">还没有资料。推荐顺序：老师重点 → 往年题 → PPT → 作业。</div> :
              materials.map((item) => <article key={item.id}><span className="file-kind">{item.kind}</span><div><b>{item.name}</b><small>{item.size}</small></div><i className={`status ${item.status}`}>{item.status}</i><button type="button" aria-label={`移除${item.name}`} onClick={() => setMaterials(materials.filter((m) => m.id !== item.id))}>×</button></article>)}
          </div>
          <div className="workbench-actions">
            <button className="button primary" type="button" onClick={analyze} disabled={busy}>生成本地复习方案</button>
            <button className="text-button" type="button" onClick={loadMock}>没有资料？加载真实案例</button>
          </div>
        </div>
      </section>

      <section className="results-section" id="results">
        <div className="result-header">
          <div><p className="kicker">03 / REVIEW OUTPUT</p><h2>{isMock ? "真实冲刺案例 Mock" : `${course || "你的课程"}复习工作台`}</h2></div>
          <div className="result-summary"><span>{materials.length} 份资料</span><span>{deadline}</span><span>{examType.split("·")[0]}</span></div>
        </div>
        <div className="result-workspace">
          <div className="result-tabs" role="tablist">
            {resultTabs.map((tab, index) => <button type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab}><span>0{index + 1}</span>{tab}</button>)}
          </div>
          <article className="result-card">
            <div className="result-label">{current.label}</div>
            <h3>{current.title}</h3>
            <ol>{current.body.map((line, index) => <li key={line}><span>{String(index + 1).padStart(2, "0")}</span><p>{line}</p></li>)}</ol>
          </article>
          <aside className="ai-handoff">
            <span className="ai-badge">AI 深度处理</span>
            <h3>把本地摘要交给 Skill</h3>
            <p>复制任务包到 ChatGPT 或 Codex，继续完成逐页引用、完整题解、个性化判分与追问。</p>
            <button type="button" onClick={copyDeepPrompt}>{copied ? "任务包已复制 ✓" : "复制 AI 深度任务"}</button>
            <small>扫描图片、公式密集 PDF 与复杂表格建议连同原文件一起上传。</small>
          </aside>
        </div>
      </section>

      <section className="case-section">
        <div><p className="kicker">REAL CASE / 真实验证</p><h2>Mock 不是凭空编的</h2><p>它来自一次约两周的期末冲刺：从“帮我整理重点”，迭代到学科框架、二轮抢分、往年题详解、专项变式和最后半小时提醒。用户反馈多门课程取得满意的 90+。</p></div>
        <div className="case-chain"><span>考试约束识别</span><span>材料优先级</span><span>往年题反推</span><span>答题模板化</span><span>考场快速调用</span></div>
      </section>

      <footer><div className="brand"><span className="brand-mark">90+</span><span>期末周 AI 工作台</span></div><p>先拿稳定分，再补高分题。</p><p>MIT License · Open source.</p></footer>
    </main>
  );
}
