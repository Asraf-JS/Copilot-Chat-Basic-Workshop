// Trainer deck for the Copilot Chat Basic Workshop.
// Usage: NODE_PATH=<node_modules with pptxgenjs, react-icons, react, react-dom, sharp> PPTX_SKILL=<pptx skill dir, for apply_theme.js> \
//   node _design/deck/build-deck.cjs . Copilot-Chat-Basic-Workshop-Deck.pptx
// Design follows Microsoft's own course decks (Fluent): white space, Segoe UI,
// one blue accent, outline icons, flat panels, blue section dividers.
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const lu = require("react-icons/lu");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const REPO = process.argv[2];
const OUT = process.argv[3];

const THEME = {
  name: "Copilot Chat Basic",
  headFontFace: "Segoe UI Semibold",
  bodyFontFace: "Segoe UI",
  colors: {
    dk1: "1A1A2E", lt1: "FFFFFF", dk2: "1E2761", lt2: "F5F5F5",
    accent1: "6B5DD3", accent2: "028090", accent3: "D83B01",
    accent4: "616161", accent5: "107C10", accent6: "D13438",
    hlink: "6B5DD3", folHlink: "1E2761",
  },
};
const HEX = THEME.colors;
const RULE = "E0E0E0";
const CYAN = "00EEFC"; // the accent in Asraf's logo, used on dark slides only

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Asraf Jaafar Sidik";
pres.title = "Copilot Chat Basic Workshop";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const HEAD = THEME.headFontFace;

// ---------- icons (outline, single colour, no containers) ----------
async function icon(name, color) {
  const svg = RDS.renderToStaticMarkup(React.createElement(lu[name], { color: "#" + color, size: "256", strokeWidth: 1.6 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- layouts ----------
// Backgrounds are soft mesh gradients from _design/deck/make-backgrounds.py.
const BG = (n) => ({ path: path.join(REPO, "_design/deck/bg", n + ".jpg") });
const LOGO = (v, x, y, d) => ({ image: { path: path.join(REPO, "_design/deck/bg", `logo-${v}.png`), x, y, w: d, h: d, altText: "Asraf JS logo" } });
pres.defineSlideMaster({
  title: "Title",
  background: BG("title"),
  objects: [
    LOGO("light", 0.72, 0.5, 0.85),
    { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.6, w: 11, h: 0.4, fontSize: 16, color: CYAN, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.1, w: 11.5, h: 1.5, fontSize: 48, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.7, w: 10, h: 1.0, fontSize: 22, color: C.background2, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.8, y: 6.2, w: 10.5, h: 0.4, fontSize: 14, color: C.background2, margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "Divider",
  background: BG("divider"),
  objects: [
    LOGO("light", 0.75, 6.55, 0.55),
    { placeholder: { options: { name: "num", type: "body", x: 0.8, y: 1.0, w: 4, h: 1.6, fontSize: 88, fontFace: "Segoe UI Light", color: CYAN, valign: "bottom", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.85, w: 11.5, h: 1.2, fontSize: 40, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.3, w: 7.6, h: 1.6, fontSize: 18, color: C.background1, valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 12.1, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: C.background1, align: "right" },
});
// Four content layouts, identical except for the background, so the art varies
// from slide to slide while each image is stored once.
const CONTENT_BG = ["content", "content-b", "content-c", "content-d"];
CONTENT_BG.forEach((bg, i) => pres.defineSlideMaster({
  title: i ? `Content ${i + 1}` : "Content",
  background: BG(bg),
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 0.4, w: 12, h: 0.35, fontSize: 14, color: C.accent4, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.75, w: 12.1, h: 0.85, fontSize: 32, color: C.text1, valign: "top", align: "left", margin: 0 }, text: "" } },
    LOGO("dark", 0.55, 6.83, 0.42),
    { text: { text: "Copilot Chat Basic Workshop", options: { x: 1.05, y: 6.95, w: 6, h: 0.3, fontSize: 10, color: C.accent4, margin: 0 } } },
  ],
  slideNumber: { x: 12.1, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: C.accent4, align: "right" },
}));
pres.defineSlideMaster({
  title: "Statement",
  background: BG("statement"),
  objects: [
    LOGO("dark", 0.75, 0.55, 0.6),
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.2, w: 11.2, h: 2.0, fontSize: 40, color: C.accent1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.45, w: 10.5, h: 1.0, fontSize: 20, color: C.accent4, valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 12.1, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: C.accent4, align: "right" },
});

// ---------- helpers ----------
let section = null;
function slide(master) { return pres.addSlide({ masterName: master, sectionTitle: section }); }
function sec(title) { section = title; pres.addSection({ title }); }

// Content slides rotate through the four content layouts.
let contentCount = 0;
function content(kicker, title, notes) {
  const i = contentCount++ % CONTENT_BG.length;
  const s = slide(i ? `Content ${i + 1}` : "Content");
  s.addText(kicker, { placeholder: "kicker" });
  s.addText(title, { placeholder: "title" });
  if (notes) s.addNotes(notes);
  return s;
}

// Fluent-style card: white, small radius, soft shadow. Dark fills stay flat.
function panel(s, x, y, w, h, fill = C.background1, name = "Panel") {
  const light = fill === C.background1 || fill === C.background2;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.1, fill: { color: light ? C.background1 : fill }, line: { type: "none" }, objectName: name,
    shadow: light ? { type: "outer", color: "1B2A4A", opacity: 0.12, blur: 14, offset: 3, angle: 90 } : undefined,
  });
}
function rule(s, x, y, w) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: RULE, width: 1 }, objectName: "Divider line" });
}
function ico(s, data, x, y, d = 0.5) { s.addImage({ data, x, y, w: d, h: d, altText: "" }); }

function txt(s, text, o) { s.addText(text, Object.assign({ margin: 0, isTextBox: true, valign: "top" }, o)); }
function head(s, text, x, y, w, size = 20, color = C.text1) { txt(s, text, { x, y, w, h: 0.5, fontSize: size, fontFace: HEAD, color }); }

// Product UI floating on a gradient panel, as in Microsoft's marketing pages.
function shot(s, rel, x, y, w, alt) {
  const h = (w * 9) / 16, pad = 0.28;
  s.addImage({ path: path.join(REPO, "_design/deck/bg/panel.jpg"), x, y, w, h, altText: "", sizing: { type: "cover", w, h } });
  const iw = w - 2 * pad, ih = (iw * 9) / 16, iy = y + (h - ih) / 2;
  s.addShape(pres.shapes.RECTANGLE, { x: x + pad, y: iy, w: iw, h: ih, fill: { color: C.background1 }, line: { color: RULE, width: 0.75 }, objectName: "Screenshot frame", shadow: { type: "outer", color: "1B2A4A", opacity: 0.25, blur: 16, offset: 4, angle: 90 } });
  s.addImage({ path: path.join(REPO, rel), x: x + pad, y: iy, w: iw, h: ih, altText: alt });
}

// numbered list in the Microsoft style: blue numerals, no circles
function steps(s, items, x, y, w, rowH, size = 16) {
  items.forEach((it, i) => {
    const [h, d] = Array.isArray(it) ? it : [it, null];
    const yy = y + i * rowH;
    txt(s, String(i + 1), { x, y: yy, w: 0.45, h: rowH, fontSize: size + 4, fontFace: HEAD, color: C.accent1 });
    txt(s, d ? [
      { text: h, options: { fontFace: HEAD, color: C.text1, breakLine: true } },
      { text: d, options: { color: C.accent4 } },
    ] : h, { x: x + 0.5, y: yy + 0.04, w: w - 0.5, h: rowH, fontSize: size, color: C.text1 });
  });
}

function divider(num, title, stage, time, result, notes) {
  const s = slide("Divider");
  s.addText(num, { placeholder: "num" });
  s.addText(title, { placeholder: "title" });
  s.addText([
    { text: `${stage}  |  ${time}`, options: { fontFace: HEAD, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Your result: " + result },
  ], { placeholder: "body" });
  if (notes) s.addNotes(notes);
}

function statement(title, sub, notes) {
  const s = slide("Statement");
  s.addText(title, { placeholder: "title" });
  if (sub) s.addText(sub, { placeholder: "body" });
  if (notes) s.addNotes(notes);
}

// columns of icon + heading + text, no boxes
function columns(s, items, y, opts = {}) {
  const n = items.length, gap = 0.4, w = (12.1 - gap * (n - 1)) / n;
  items.forEach(([ic, h, d, extra], i) => {
    const x = 0.6 + i * (w + gap);
    ico(s, ic, x, y, 0.55);
    txt(s, h, { x, y: y + 0.8, w, h: 0.85, fontSize: opts.size || 20, fontFace: HEAD, color: C.text1 });
    txt(s, d, { x, y: y + 1.7, w: w - 0.1, h: opts.textH || 1.6, fontSize: 16, color: C.text1 });
    if (extra) txt(s, extra, { x, y: y + 1.7 + (opts.textH || 1.6), w: w - 0.1, h: 0.6, fontSize: 14, fontFace: HEAD, color: C.accent1 });
  });
}

function yourTurn(ch, title, items, checkpoint, notes, I) {
  const s = content(`Your turn  |  Chapter ${ch}`, title, notes);
  const rowH = Math.min(0.62, 4.6 / items.length);
  items.forEach(([ref, t], i) => {
    const y = 1.95 + i * rowH;
    txt(s, ref, { x: 0.6, y, w: 0.8, h: rowH, fontSize: 16, fontFace: HEAD, color: C.accent1 });
    txt(s, t, { x: 1.45, y, w: 6.4, h: rowH, fontSize: 16, color: C.text1 });
  });
  panel(s, 8.3, 1.95, 4.43, 4.55, C.background2, "Checkpoint panel");
  ico(s, I.clip, 8.65, 2.3, 0.5);
  head(s, "Checkpoint", 8.65, 2.95, 3.8, 20);
  txt(s, checkpoint, { x: 8.65, y: 3.5, w: 3.75, h: 1.9, fontSize: 16, color: C.text1 });
  rule(s, 8.65, 5.45, 3.75);
  txt(s, [
    { text: "Prompts: ", options: { fontFace: HEAD, color: C.text1 } },
    { text: `copy them from the Chapter ${ch} prompts page`, options: { color: C.accent4 } },
  ], { x: 8.65, y: 5.6, w: 3.75, h: 0.75, fontSize: 14 });
  return s;
}

(async () => {
  const B = HEX.accent1;
  const I = {
    shield: await icon("LuShieldCheck", B), file: await icon("LuFileText", B), mail: await icon("LuMail", B),
    calc: await icon("LuCalculator", B), globe: await icon("LuGlobe", B), book: await icon("LuBookOpen", B),
    pdf: await icon("LuFileDown", B), zip: await icon("LuFolderArchive", B), list: await icon("LuListChecks", B),
    window: await icon("LuAppWindow", B), users: await icon("LuUsers", B), inbox: await icon("LuInbox", B),
    bot: await icon("LuBot", B), pen: await icon("LuPenLine", B), lock: await icon("LuLock", HEX.accent3),
    bulb: await icon("LuLightbulb", B), save: await icon("LuBookmark", B), cog: await icon("LuSettings", B),
    image: await icon("LuImage", B), search: await icon("LuSearch", B), cal: await icon("LuCalendar", B),
    building: await icon("LuBuilding2", "FFFFFF"), building2: await icon("LuBuilding2", B), award: await icon("LuAward", B),
    copy: await icon("LuCopy", B), clip: await icon("LuClipboardCheck", B), info: await icon("LuTriangleAlert", HEX.accent3),
    yes: await icon("LuCircleCheck", HEX.accent5), no: await icon("LuCircleX", HEX.accent4),
    laptop: await icon("LuLaptop", B), note: await icon("LuNotebook", B), msg: await icon("LuMessageSquare", B),
  };

  // =================== WELCOME ===================
  sec("Welcome");
  {
    const s = slide("Title");
    s.addText("One-day workshop", { placeholder: "kicker" });
    s.addText("Copilot Chat Basic Workshop", { placeholder: "title" });
    s.addText("Getting real work done with Microsoft Copilot, without the paid license", { placeholder: "body" });
    s.addText("Asraf Jaafar Sidik  |  Microsoft Certified Trainer  |  October 2026", { placeholder: "meta" });
    s.addNotes("Welcome everyone. Introduce yourself. Today is hands-on: you will spend most of the day in Copilot, not watching slides.\n\nAsk the room: who has used Copilot at work before? Who has been told they don't have Copilot because they have no license? Today shows what you can do with what you already have.");
  }
  {
    const s = content("Today's task", "Today you run one real purchase, start to finish",
      "Read the scenario out. Everything today serves this one purchase, so participants always know why they are doing a step.\n\nTeratai Holdings, the vendors and every person in the sample files are fictional. The policy threshold is RM20,000: above it you need three written quotations, a comparison and a justification memo before the HOD signs off.");
    panel(s, 0.6, 1.95, 6.6, 4.55, C.text2, "Scenario panel");
    ico(s, I.building, 1.0, 2.35, 0.6);
    txt(s, [
      { text: "You're an executive in the Admin and Facilities department at Teratai Holdings Berhad.", options: { fontFace: HEAD, breakLine: true } },
      { text: " ", options: { fontSize: 10, breakLine: true } },
      { text: "The department needs 25 new laptops for next quarter's hires. Company policy says any purchase above RM20,000 needs three written quotations, a comparison and a justification memo before the HOD signs off." },
    ], { x: 1.0, y: 3.2, w: 5.8, h: 3.0, fontSize: 18, color: C.background1 });
    const stats = [["25", "laptops for new hires"], ["RM20,000", "the policy threshold"], ["3 + 1 + 1", "quotations, comparison and memo"]];
    stats.forEach(([big, small], i) => {
      const y = 1.95 + i * 1.55;
      txt(s, big, { x: 7.8, y, w: 4.9, h: 0.8, fontSize: 40, fontFace: "Segoe UI Light", color: C.accent1 });
      txt(s, small, { x: 7.8, y: y + 0.8, w: 4.9, h: 0.4, fontSize: 16, color: C.accent4 });
      if (i < 2) rule(s, 7.8, y + 1.38, 4.9);
    });
  }
  {
    const s = content("The day at a glance", "Ten stages, one chapter each",
      "Each chapter moves the purchase one stage on. Chapter 9 is optional: only people whose label is M365 Copilot (Basic) have Copilot inside Word and Excel.\n\nChapter 10 is the capstone: a second purchase (a training course) that they run on their own.");
    const stages = [
      ["Check", "Your label and the green shield"], ["Explore", "Find your way around Copilot"],
      ["Ask", "Write the vendor requirements"], ["Compare", "Check the three quotations"],
      ["Chase", "Email vendors with Outlook"], ["Draft", "Comparison and memo on a Page"],
      ["Organise", "Everything in one Notebook"], ["Reuse", "Build a Quotation Checker agent"],
      ["Extend", "Optional: Word and Excel"], ["Repeat", "Capstone: a second purchase"],
    ];
    stages.forEach(([name, desc], i) => {
      const col = i % 5, row = Math.floor(i / 5);
      const x = 0.6 + col * 2.46, y = 1.95 + row * 2.35;
      rule(s, x, y, 2.2);
      txt(s, String(i + 1).padStart(2, "0"), { x, y: y + 0.15, w: 2.2, h: 0.6, fontSize: 28, fontFace: "Segoe UI Light", color: i === 8 ? C.accent4 : C.accent1 });
      head(s, name, x, y + 0.8, 2.2, 18);
      txt(s, desc, { x, y: y + 1.25, w: 2.1, h: 0.8, fontSize: 14, color: C.accent4 });
    });
  }
  {
    const s = content("Today's plan", "Morning and afternoon",
      "Times are the chapter estimates from the notes. Add breaks and lunch to suit the venue. Chapter 4 is the longest and the most important: protect its hour.\n\nChapter 11 has four short exercises for anyone who finishes early, and for practice after the course.");
    const am = [["01", "Which Copilot do I have?", "20 min"], ["02", "Find your way around", "30 min"], ["03", "Write better prompts", "45 min"], ["04", "Compare the quotations", "60 min"], ["05", "Chase vendors in Outlook", "45 min"]];
    const pm = [["06", "From chat to Pages", "40 min"], ["07", "Keep it together in a Notebook", "30 min"], ["08", "Build a Quotation Checker agent", "45 min"], ["09", "Optional: Word and Excel", "30 min"], ["10", "Capstone: the training purchase", "45 min"]];
    [[am, "Morning", 0.6], [pm, "Afternoon", 6.85]].forEach(([rows, label, x]) => {
      head(s, label, x, 1.9, 5.9, 20);
      rows.forEach(([n, t, m], i) => {
        const y = 2.55 + i * 0.75;
        rule(s, x, y, 5.88);
        txt(s, n, { x, y: y + 0.12, w: 0.6, h: 0.5, fontSize: 16, fontFace: HEAD, color: C.accent1 });
        txt(s, t, { x: x + 0.65, y: y + 0.12, w: 4.0, h: 0.5, fontSize: 16, color: C.text1 });
        txt(s, m, { x: x + 4.6, y: y + 0.12, w: 1.28, h: 0.5, fontSize: 14, color: C.accent4, align: "right" });
      });
      rule(s, x, 2.55 + 5 * 0.75, 5.88);
    });
    txt(s, "Finished early? Chapter 11 has four short extra exercises.", { x: 0.6, y: 6.4, w: 12, h: 0.4, fontSize: 14, color: C.accent4 });
  }
  {
    const s = content("Course site", "Everything is on one site",
      "Put the address on the whiteboard as well. No GitHub account is needed.\n\nStress copying prompts from the Prompts page, using the copy icon on each grey box. Copying from the PDF can add line breaks in the middle of a prompt.");
    txt(s, "asraf-js.github.io/Copilot-Chat-Basic-Workshop", { x: 0.6, y: 1.9, w: 12.1, h: 0.7, fontSize: 26, fontFace: HEAD, color: C.accent1 });
    columns(s, [
      [I.book, "Notes", "Point-and-click steps and screenshots for every chapter"],
      [I.copy, "Prompts", "Every prompt you type, with a copy button on each box"],
      [I.pdf, "Course book", "All notes and prompts in one PDF to keep"],
      [I.zip, "Sample files", "The fictional quotations and policy, in Chapters 4 and 10"],
    ], 3.1);
  }
  {
    const s = content("Ground rules", "Four rules for today",
      "These protect the participants and their company. Repeat rule 2 whenever someone is about to upload a file.\n\nTraining emails always start with [CCB TRAINING] in the subject and go only to yourself.");
    columns(s, [
      [I.file, "Fictional files only", "Use the sample files. Don't upload real company documents to practise."],
      [I.shield, "No shield, no upload", "Check for the green shield before you upload anything."],
      [I.mail, "Email only yourself", "Every training subject starts with [CCB TRAINING]."],
      [I.calc, "Check every number", "Copilot can be wrong. Treat it like a colleague's draft."],
    ], 2.2, { textH: 2.0 });
  }

  // =================== 01 ===================
  sec("01 Which Copilot do I have?");
  divider("01", "Which Copilot do I have?", "Stage: Check", "20 minutes",
    "you know your Copilot label, you've seen the green shield, and you've run one safe prompt.",
    "Before anyone touches a company document, they need to know which Copilot they are in and whether enterprise data protection applies.");
  {
    const s = content("Chapter 01", "Three work labels, and one consumer app",
      "The label sits under your name at the bottom left of the Copilot app.\n\nCopilot Chat (Basic): organisations with more than 2,000 users and no paid license. Since 15 April 2026 they have no Copilot inside Word, Excel, PowerPoint or OneNote.\nM365 Copilot (Basic): smaller organisations, in-app Copilot with standard access.\n\nMicrosoft Copilot at copilot.microsoft.com with a personal account is the consumer product: consumer terms, no shield. Not for company documents.");
    const hdr = (t) => ({ text: t, options: { fontFace: HEAD, color: C.text1, border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 2, color: HEX.dk1 }, { type: "none" }] } });
    const cell = (t, o = {}) => ({ text: t, options: Object.assign({ border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 1, color: RULE }, { type: "none" }] }, o) });
    const rows = [
      [hdr("Label"), hdr("Who usually has it"), hdr("Copilot in Word, Excel, PowerPoint"), hdr("Busy times")],
      [cell("Copilot Chat (Basic)", { fontFace: HEAD }), cell("Organisations over 2,000 users, no paid license"), cell("No"), cell("Standard access, can slow down")],
      [cell("M365 Copilot (Basic)", { fontFace: HEAD }), cell("Smaller organisations, no paid license"), cell("Yes, standard access"), cell("Standard access, can slow down")],
      [cell("M365 Copilot (Premium)", { fontFace: HEAD, color: C.accent4 }), cell("The paid Microsoft 365 Copilot license", { color: C.accent4 }), cell("Yes, full features", { color: C.accent4 }), cell("Priority access", { color: C.accent4 })],
    ];
    s.addTable(rows, { x: 0.6, y: 1.9, w: 12.1, colW: [2.9, 3.9, 2.9, 2.4], fontSize: 15, color: C.text1, rowH: 0.62, valign: "middle", margin: [0.06, 0.1, 0.06, 0] });
    panel(s, 0.6, 5.05, 12.1, 1.45, C.background2, "Consumer note");
    ico(s, I.lock, 0.95, 5.45, 0.6);
    txt(s, [
      { text: "Microsoft Copilot is the consumer product.", options: { fontFace: HEAD, breakLine: true } },
      { text: "Signed in with a personal account, it has no green shield. Don't use it for company documents. This course is built for the two Basic labels." },
    ], { x: 1.85, y: 5.25, w: 10.6, h: 1.1, fontSize: 16, color: C.text1, valign: "middle" });
  }
  {
    const s = content("Chapter 01", "No shield, no upload",
      "Show the shield live. Point at it, don't click, to show the tooltip.\n\nEnterprise data protection means prompts and uploaded files stay inside the organisation's Microsoft 365 boundary, like email and OneDrive, and aren't used to train the AI models.\n\nIf someone has no shield, they are almost always signed in with a personal account.");
    shot(s, "01-which-copilot-do-i-have/images/01-03-edp-shield.png", 0.6, 1.95, 7.6, "The Copilot app with the green shield at the top right and its tooltip");
    steps(s, ["Open m365.cloud.microsoft/chat with your work account", "Look for the small green shield at the top right", "Point at it: \"Enterprise data protection applies to this chat\"", "No shield? Sign out and sign back in with your work account"], 8.65, 1.95, 4.1, 1.05);
  }
  {
    const s = content("Chapter 01", "What Basic can't do, so you can stop looking for it",
      "These features appear in Microsoft videos and articles. They need the paid license or a preview.\n\nResearcher and Analyst may still be listed under Pinned in the left pane. Tell people to leave them alone: they are not part of this course.\n\nIf an admin has turned something off (file upload, images, agents), the button can be missing for one person and not the next. Tell the trainer.");
    [[I.yes, "In this course", ["Copilot Chat with the web and files you upload", "Copilot in Outlook, for the open email", "Pages, Notebooks and the Prompt Gallery", "Agent Builder with instructions and websites", "Custom instructions and memory"], 0.6],
     [I.no, "Needs the paid license", ["Researcher and Analyst", "Cowork", "Searching work files, Teams chats and meetings", "Agents with SharePoint or file knowledge", "Custom skills, voice, priority access"], 6.85]].forEach(([ic, h, list, x]) => {
      ico(s, ic, x, 1.95, 0.5);
      head(s, h, x + 0.7, 1.95, 5, 22);
      rule(s, x, 2.7, 5.85);
      list.forEach((t, i) => {
        txt(s, t, { x, y: 2.85 + i * 0.68, w: 5.85, h: 0.6, fontSize: 18, color: C.text1 });
        rule(s, x, 3.48 + i * 0.68, 5.85);
      });
    });
  }
  yourTurn("01", "Find your label and check the shield", [
    ["1.1", "Find your Copilot label under your name, bottom left"],
    ["1.3", "Point at the green shield and read the tooltip"],
    ["1.5", "Run your first safe prompt, about enterprise data protection"],
    ["1.5", "Find the small grey source labels and the Sources button"],
  ], "You know your label, you can see the green shield, and Copilot has answered your first prompt with sources.",
  "About 10 minutes. Walk the room and check each person's label. Note anyone without a shield and fix their sign-in before Chapter 2.\n\nAsk two or three people to read out their label: in a large organisation it will be Copilot Chat (Basic), in a smaller one M365 Copilot (Basic). That tells you who can do Chapter 9 later.", I);

  // =================== 02 ===================
  sec("02 Find your way around");
  divider("02", "Find your way around", "Stage: Explore", "30 minutes",
    "a named chat about laptop quotations that you can find again, and a copied answer you can share.",
    "The purchase so far: labels and shields checked. Nothing bought yet. The first job is knowing what a good laptop quotation looks like.");
  {
    const s = content("Chapter 02", "Four ways in, one Copilot Chat",
      "The Copilot app in the browser is the main path today. The others are the same Copilot Chat in different places.\n\nEdge sidebar: can read the web page you have open, useful for a supplier's website.\nTeams: Copilot is in the left app rail. Basic can't search Teams messages or meetings from there.\nOutlook: Chapter 5.");
    columns(s, [
      [I.window, "Copilot app", "m365.cloud.microsoft/chat. The main path for today."],
      [I.globe, "Edge sidebar", "Reads the web page you have open."],
      [I.users, "Teams", "Copilot in the left app rail. Same chat, same shield."],
      [I.inbox, "Outlook", "Summarise and draft about the open email. Chapter 5."],
    ], 2.2, { textH: 2.0 });
  }
  {
    const s = content("Chapter 02", "The message box and your chats",
      "Walk through the controls live. Add (the plus) uploads files; the Prompt Gallery button disappears once you start typing; Auto in the top bar picks the response mode.\n\nChats: hover a chat in the left pane, open its menu: Rename, Move to notebook, Delete.\n\nShare response is a Frontier feature, so on Basic, Copy is the main way to pass an answer on.");
    shot(s, "02-find-your-way-around/images/02-04-message-box.png", 0.6, 1.95, 7.6, "The message box with the add button and Send highlighted, and Auto in the top bar");
    [["Add (+)", "Upload files and images"], ["Prompt Gallery", "Ready-made and saved prompts"], ["Auto", "Response mode, in the top bar"], ["Chat menu", "Rename, Move to notebook, Delete"], ["Copy", "The main way to share an answer"]].forEach(([h, d], i) => {
      const y = 1.95 + i * 0.86;
      txt(s, [{ text: h, options: { fontFace: HEAD, breakLine: true } }, { text: d, options: { color: C.accent4 } }], { x: 8.65, y, w: 4.1, h: 0.8, fontSize: 16, color: C.text1 });
    });
  }
  yourTurn("02", "Run your first prompt and keep the chat", [
    ["2.1", "Open the Copilot app and find New chat, Library and Agents"],
    ["2.4", "Ask for a checklist to review a laptop quotation"],
    ["2.5", "Rename the chat: Laptop purchase - quotation checklist"],
    ["2.6", "Copy one of Copilot's answers to share it"],
    ["2.7", "Windows app only: try the screenshot tool"],
  ], "You can find the Laptop purchase - quotation checklist chat again from the left pane.",
  "About 20 minutes. The first prompt is on the Prompts page for Chapter 2.\n\nThe screenshot tool is only in the Windows desktop app, not in the browser. Skip 2.7 for anyone working in the browser.", I);

  // =================== 03 ===================
  sec("03 Write better prompts");
  divider("03", "Write better prompts", "Stage: Ask", "45 minutes",
    "laptop requirements ready to send to vendors, a saved prompt, and your own custom instructions.",
    "The purchase so far: they know what a complete laptop quotation should include. Now they write the requirements they'll send to three vendors.");
  {
    const s = content("Chapter 03", "GCSE: the four parts of a good prompt",
      "You don't need all four every time. The more you include, the less Copilot has to guess.\n\nWith Basic, the sources are the public web, files you upload and anything you paste in. Naming the source tells Copilot which to rely on.\n\nIn 3.2 they build the prompt one part at a time and watch the answer improve.");
    const parts = [
      ["G", "Goal", "What do you want Copilot to do?", "Draft the requirements for a laptop quotation request"],
      ["C", "Context", "Who are you, and what's the situation?", "For 25 new hires in Admin and Facilities, at a Malaysian company"],
      ["S", "Source", "What should Copilot use?", "Current business laptop guidance from reputable sources"],
      ["E", "Expectations", "What should the result look like?", "A numbered list under 200 words, in plain English"],
    ];
    parts.forEach(([l, h, q, ex], i) => {
      const x = 0.6 + i * 3.1;
      txt(s, l, { x, y: 1.85, w: 1, h: 1.0, fontSize: 60, fontFace: "Segoe UI Light", color: C.accent1 });
      head(s, h, x, 2.95, 2.8, 22);
      txt(s, q, { x, y: 3.5, w: 2.75, h: 0.9, fontSize: 16, color: C.text1 });
      rule(s, x, 4.5, 2.8);
      txt(s, `"${ex}"`, { x, y: 4.65, w: 2.75, h: 1.5, fontSize: 15, italic: true, color: C.accent4 });
    });
  }
  statement("A source makes an answer easier to check. It doesn't make it correct.",
    "You're responsible for anything you send to a supplier or your HOD.",
    "Sources open in a Sources pane (References). In 3.4 they open at least one source and check that it says what Copilot claims.");
  {
    const s = content("Chapter 03", "Make Copilot work your way",
      "Prompt Gallery opens as Prompt Lab. Hover a prompt and choose Save prompt; it appears under Your saved prompts.\n\nCustom instructions: Settings and more (gear, bottom left) > Settings > Personalization > Edit instructions, then Save instructions.\n\nMemory: Saved memories has a switch, a delete for each memory, and Delete all memories. Preferences and role only, never data.");
    columns(s, [
      [I.save, "Prompt Gallery", "Save a prompt that worked, so you never write it twice.", "Hover a prompt > Save prompt"],
      [I.cog, "Custom instructions", "Tell Copilot your role and how you like answers written.", "Settings > Personalization"],
      [I.bulb, "Memory", "Copilot remembers preferences across chats. You can delete them.", "Never budgets, names or passwords"],
    ], 2.2, { textH: 1.5 });
  }
  yourTurn("03", "Write the vendor requirements with GCSE", [
    ["3.2", "Build the requirements in four prompts, one part at a time"],
    ["3.3", "Improve the answer with a follow-up"],
    ["3.4", "Open the sources and check one claim"],
    ["3.5", "Save your best prompt in Prompt Gallery"],
    ["3.6", "Add custom instructions and look at your memories"],
  ], "Your requirements are a numbered list you'd be happy to send to a vendor, and your prompt is saved.",
  "About 35 minutes. The fourth prompt in 3.2 is long, and that's fine: a long, clear prompt gets a usable answer first time.\n\nRemind people not to ask Copilot to remember anything confidential.", I);

  // =================== 04 ===================
  sec("04 Compare the quotations");
  divider("04", "Compare the quotations", "Stage: Compare", "60 minutes",
    "a checked comparison table of the three quotations, a list of problems to chase, and a recommendation you can defend.",
    "The purchase so far: requirements went out to three vendors, and their quotations are back.\n\nThis is the core chapter of the day. Don't give away the problems: participants should find them.");
  {
    const s = content("Chapter 04", "Four files, one chat",
      "Sample files are in sample-files.zip in the Chapter 4 folder. Extract the zip first.\n\nCopilot takes at most three files per message, and a second upload doesn't add a fourth. So: send the policy first, in its own message, then the three quotations together. Everything must be in the same chat, or Copilot can't compare them.\n\nThe policy's Sections 5 to 7 matter later.");
    columns(s, [
      [I.file, "Pinnacle Komputer", "Quotation A"],
      [I.file, "Seri Mutiara Technology", "Quotation B"],
      [I.file, "Cyberjaya Digital Supplies", "Quotation C"],
      [I.list, "procurement-policy.pdf", "The company's rules"],
    ], 1.95, { size: 18, textH: 0.6 });
    panel(s, 0.6, 4.6, 12.1, 1.9, C.background2, "Upload order note");
    ico(s, I.info, 0.95, 5.25, 0.6);
    txt(s, [
      { text: "Copilot takes at most three files per message.", options: { fontFace: HEAD, breakLine: true } },
      { text: "Send the policy first, in its own message. Then send the three quotations together, in the same chat." },
    ], { x: 1.85, y: 4.75, w: 10.6, h: 1.6, fontSize: 18, color: C.text1, valign: "middle" });
  }
  {
    const s = content("Chapter 04", "Six checks, in order",
      "Each step is a section of the notes with its own prompt.\n\n4.4: the table must show every figure exactly as printed. If Copilot quietly fixes a figure, the evidence is gone.\n4.5: participants recalculate with their own calculator too.\n4.6 and 4.7: check against the policy and ask whether the three are quoting for the same thing.\n4.8: Copilot recommends, the participant decides.");
    const st = [["4.3", "Summarise", "each quotation"], ["4.4", "Compare", "figures exactly as printed"], ["4.5", "Recalculate", "every total, yourself too"], ["4.6", "Policy", "check each clause"], ["4.7", "Like-for-like", "same thing quoted?"], ["4.8", "Recommend", "then you decide"]];
    s.addShape(pres.shapes.LINE, { x: 0.6, y: 2.55, w: 12.1, h: 0, line: { color: HEX.accent1, width: 2 }, objectName: "Process line" });
    st.forEach(([ref, h, d], i) => {
      const x = 0.6 + i * 2.05;
      s.addShape(pres.shapes.OVAL, { x, y: 2.43, w: 0.24, h: 0.24, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Process point" });
      txt(s, ref, { x, y: 1.9, w: 1.9, h: 0.4, fontSize: 14, fontFace: HEAD, color: C.accent1 });
      head(s, h, x, 3.0, 1.9, 20);
      txt(s, d, { x, y: 3.55, w: 1.85, h: 1.0, fontSize: 15, color: C.accent4 });
    });
    txt(s, "Copilot does the reading and the layout. You check every number.", { x: 0.6, y: 5.4, w: 12.1, h: 0.6, fontSize: 22, fontFace: HEAD, color: C.text1 });
  }
  statement("Copilot recommends. You decide.",
    "Your name goes on the memo. You need to explain every number in it without Copilot.",
    "Say this before they start, and again at the debrief.");
  yourTurn("04", "Compare the three quotations", [
    ["4.1", "Download sample-files.zip and extract it"],
    ["4.2", "New chat: policy first, then the three quotations"],
    ["4.3", "Summarise each quotation"],
    ["4.4", "Build the comparison table, figures as printed"],
    ["4.5", "Check the arithmetic, with your own calculator too"],
    ["4.6", "Check each quotation against the policy"],
    ["4.7", "Ask whether the comparison is like-for-like"],
    ["4.8", "Ask for a recommendation, then decide"],
  ], "You've found three problems, one per vendor, and can name the policy section for each.",
  "About 45 minutes. Name the chat Laptop purchase - comparison: Chapters 6 and 8 come back to it.\n\nDon't reveal the problems. If someone is stuck, point them to the matching section of the notes or ask: is every total right? Is every quotation still valid today? Is each one quoting for the same thing?\n\nScreenshots for 4.5 to 4.8 in the notes are blurred on purpose.", I);
  {
    const s = content("Debrief  |  Chapter 04", "Check your findings",
      "Take answers from the room before you confirm anything. The answers are in the trainer answer key, which is kept out of the public repository. This deck is public, so the answers aren't on the slides.\n\nFor each vendor, ask: what is the problem, which section of the policy applies, and what must the vendor do? The point to land: it's the vendor's job to fix its quotation, not ours.");
    columns(s, [
      [I.calc, "The numbers", "Which quotation has a problem with its figures?"],
      [I.cal, "The dates", "Which quotation has a problem with its dates?"],
      [I.search, "What's included", "Which quotation doesn't quote for the same thing?"],
    ], 1.95, { textH: 1.0 });
    panel(s, 0.6, 5.0, 12.1, 1.5, C.text2, "Follow-up question");
    txt(s, "For each problem: which policy section applies, and what must the vendor do to fix it?", { x: 1.0, y: 5.0, w: 11.4, h: 1.5, fontSize: 22, fontFace: HEAD, color: C.background1, valign: "middle" });
  }

  // =================== 05 ===================
  sec("05 Chase vendors in Outlook");
  divider("05", "Chase vendors with Copilot in Outlook", "Stage: Chase", "45 minutes",
    "three vendor emails in your inbox, a summary of one thread, and two reply drafts.",
    "The purchase so far: the comparison found a problem in each quotation. Before the HOD sees a memo, each vendor has to fix theirs.");
  {
    const s = content("Chapter 05", "What Copilot in Outlook does with Basic",
      "Summarize this email sits above the open message and opens the Copilot pane.\n\nQuestions in the pane are answered from the open email only. In testing, an inbox-wide question about all three vendors found just the open thread.\n\nThere's no Draft with Copilot in compose on Basic. Draft in the pane, then copy the text into your reply.");
    shot(s, "05-copilot-in-outlook/images/05-03-thread-summary.png", 0.6, 1.95, 7.6, "Outlook on the web with Summarize this email and the Copilot pane showing a thread summary");
    [["Summarize this email", "Opens the Copilot pane with key points", C.text1], ["Ask about it", "Answers come from the open email only", C.text1], ["Draft in the pane", "Copy the text into your reply", C.text1], ["Not on Basic", "Draft with Copilot in compose", C.accent4]].forEach(([h, d, c], i) => {
      const y = 1.95 + i * 1.07;
      txt(s, [{ text: h, options: { fontFace: HEAD, color: c, breakLine: true } }, { text: d, options: { color: C.accent4 } }], { x: 8.65, y, w: 4.1, h: 0.95, fontSize: 16 });
    });
  }
  statement("Always ask what Copilot was looking at.",
    "An answer that looks complete may only cover the email you had open.",
    "The 5.4 exercise shows this: a question about all three vendors comes back with one. To ask about another vendor, open that email first.");
  yourTurn("05", "Summarise, ask and draft", [
    ["5.1", "Send the three vendor emails to yourself"],
    ["5.3", "Summarise the Seri Mutiara thread"],
    ["5.4", "Ask Copilot a question about the open email"],
    ["5.5", "Draft a request for a revalidated quotation"],
    ["5.6", "Draft a request to correct a total"],
  ], "Two drafts you've read line by line. Check names, numbers and any promise made on your behalf.",
  "About 35 minutes. Emails go only to the participant's own address. Never to a real vendor or a colleague.\n\nSummaries can give equal weight to an early message and a later one that replaced it: check the summary against the latest email.", I);

  // =================== 06 ===================
  sec("06 From chat to Pages");
  divider("06", "From chat to Pages", "Stage: Draft", "40 minutes",
    "a Copilot Page with the checked comparison and the justification memo, exported as Word and PDF.",
    "The purchase so far: quotations compared, vendors chased. Now the HOD needs a memo.");
  {
    const s = content("Chapter 06", "Long chats drift",
      "Copilot reads the whole chat each time, but doesn't treat every earlier message equally. After several rounds of changes, a settled point can quietly disappear.\n\nIn 6.1 they send three changes in the comparison chat and check whether their Chapter 4 findings survived. In most classes at least one doesn't.");
    const rounds = [["Your checked table", [1, 1, 1]], ["\"Shorten it to 8 rows\"", [1, 1, 1]], ["\"Make it more formal\"", [1, 1, 0]], ["\"Give me the final table\"", [0, 1, 0]]];
    const items = ["Corrected total", "Validity", "Warranty adjustment"];
    rounds.forEach(([h, ok], i) => {
      const x = 0.6 + i * 3.1;
      txt(s, `Round ${i + 1}`, { x, y: 1.95, w: 2.8, h: 0.35, fontSize: 14, fontFace: HEAD, color: C.accent1 });
      txt(s, h, { x, y: 2.3, w: 2.8, h: 0.75, fontSize: 18, fontFace: HEAD, color: C.text1 });
      rule(s, x, 3.15, 2.8);
      items.forEach((t, j) => {
        const y = 3.3 + j * 0.6;
        ico(s, ok[j] ? I.yes : I.no, x, y + 0.05, 0.32);
        txt(s, t, { x: x + 0.45, y, w: 2.3, h: 0.45, fontSize: 15, color: ok[j] ? C.text1 : C.accent6, strike: ok[j] ? undefined : "sngStrike", valign: "middle" });
      });
    });
    txt(s, "When an answer matters, stop changing it in the chat. Ask for one complete version, then move it to a Page.", { x: 0.6, y: 5.5, w: 12.1, h: 0.9, fontSize: 22, fontFace: HEAD, color: C.text1 });
  }
  {
    const s = content("Chapter 06", "From chat to a Page you can share",
      "6.2: ask for one complete comparison that lists everything it must include, then More options > Edit in Pages. Name the Page Laptop purchase - comparison and memo.\n\n6.3: Copilot on the Page suggests changes in chat rather than editing the Page directly. Add to page appends a response.\n\n6.4: write the memo in the same chat, where the policy is uploaded, following Section 7.\n\n6.5: Share offers Copy link. 6.6: More actions > Export gives Document or PDF.");
    shot(s, "06-from-chat-to-pages/images/06-02-edit-in-pages.png", 0.6, 1.95, 7.6, "A Copilot Page with the laptop comparison table, next to the chat");
    steps(s, [["One complete version", "List everything it must include"], ["Edit in Pages", "More options under the answer"], ["Write the memo", "Same chat, then Add to page"], ["Share and export", "Copy link, then Word or PDF"]], 8.65, 1.95, 4.1, 1.07);
  }
  yourTurn("06", "Build the Page and write the memo", [
    ["6.1", "Watch a chat drift, then check your findings"],
    ["6.2", "Ask for one complete comparison, then Edit in Pages"],
    ["6.3", "Add a Status row with Copilot on the Page"],
    ["6.4", "Write the justification memo against Section 7"],
    ["6.5", "Copy a link to the Page"],
    ["6.6", "Export the Page to Word and PDF"],
  ], "The memo covers every item in Section 7, the recommendation is conditional, and every figure matches your checks.",
  "About 30 minutes. Read every sentence of the memo as if you'd written it: you're the one signing it. Delete anything you can't back up from the quotations or the policy.\n\nPlaceholders: budget code ADM-IT-2026-07, HOD Encik Faizal Rahman (both fictional).", I);

  // =================== 07 ===================
  sec("07 Keep it together in a Notebook");
  divider("07", "Keep it together in a Notebook", "Stage: Organise", "30 minutes",
    "a Notebook called Laptop purchase 2026 with the quotations, the policy and the memo, and a status update written from all of them.",
    "The purchase so far: comparison and memo on a Page and exported to Word. The vendors' revised quotations are still on their way.");
  {
    const s = content("Chapter 07", "A Notebook answers from its references",
      "Creating a Notebook: name, Next, Create.\nAdd references offers Upload files and OneDrive files.\n\nThere are no notes in a Notebook, so a fact that lives only in your inbox (such as Seri Mutiara's 7-day stock hold) goes in a New Page under Creations, or in your prompt.\n\nRemove superseded documents: if both the expired and the revalidated quotation are in, Copilot may quote the wrong one.");
    shot(s, "07-copilot-notebooks/images/07-03-notebook-question.png", 0.6, 1.95, 7.6, "A Notebook answering what's outstanding, with the references listed on the right");
    [["Create", "Name, Next, Create"], ["Add references", "Upload files or OneDrive files"], ["Inbox facts", "Add a New Page under Creations"], ["Keep it current", "Remove superseded documents"]].forEach(([h, d], i) => {
      const y = 1.95 + i * 1.07;
      txt(s, [{ text: h, options: { fontFace: HEAD, breakLine: true } }, { text: d, options: { color: C.accent4 } }], { x: 8.65, y, w: 4.1, h: 0.95, fontSize: 16, color: C.text1 });
    });
  }
  yourTurn("07", "File the purchase in one Notebook", [
    ["7.1", "Create a Notebook called Laptop purchase 2026"],
    ["7.2", "Add the quotations, the policy and your memo"],
    ["7.3", "Ask questions across everything, with citations"],
    ["7.4", "Add the stock-hold fact on a New Page"],
  ], "Copilot answers \"what's still outstanding?\" correctly, and cites the references it used.",
  "About 20 minutes. Copilot answers only from the references added. If an answer is missing a fact, ask where that fact lives.", I);

  // =================== 08 ===================
  sec("08 Build a Quotation Checker agent");
  divider("08", "Build a Quotation Checker agent", "Stage: Reuse", "45 minutes",
    "a Quotation Checker agent that checks validity, arithmetic, tax, warranty and delivery on any quotation, shared with a colleague.",
    "The purchase so far: everything sits in one Notebook. Before the next purchase comes along, make the Chapter 4 checks reusable.");
  {
    const s = content("Chapter 08", "What goes into an agent",
      "Agents > New agent > Skip opens the form.\n\nThe instructions are the Chapter 4 checks, written once. Rule 1 (ask for today's date) and the never-correct-silently line fix the two mistakes Copilot made most often in Chapter 4.\n\nUnder Knowledge, turn Web search off so the agent sticks to the uploaded quotations. Basic can't add files or SharePoint as knowledge.\n\nWriting Coach (8.1) can be blocked by an admin. If it is, skip to 8.2.");
    columns(s, [
      [I.pen, "Name and description", "Quotation Checker, and what it's for"],
      [I.list, "Instructions", "The Chapter 4 checks, written once as numbered steps"],
      [I.copy, "Suggested prompts", "Buttons people see when they open it"],
      [I.globe, "Web search off", "It sticks to the quotations you upload"],
    ], 1.95, { size: 19, textH: 1.6 });
    txt(s, "An agent is only as good as its instructions.", { x: 0.6, y: 5.55, w: 12.1, h: 0.7, fontSize: 24, fontFace: HEAD, color: C.text1 });
  }
  {
    const s = content("Chapter 08", "Create it, test it, then fix the instructions",
      "There's no test pane in Agent Builder on Basic: create the agent, then test it in its own chat.\n\nIn testing, the agent missed the Pinnacle total until this line was added to the instructions. That's the lesson: when an agent misses something, don't just re-ask, change the instructions so it can't miss it again.\n\nThe screenshot shows the agent catching the RM270 difference after the fix.");
    shot(s, "08-build-a-quotation-checker/images/08-05-test-agent.png", 0.6, 1.95, 7.6, "The Quotation Checker showing the printed and recalculated grand totals side by side");
    head(s, "The fix line", 8.65, 1.95, 4.1, 20);
    panel(s, 8.65, 2.55, 4.08, 2.1, C.background2, "Fix line panel");
    txt(s, "Before comparing, write out subtotal + tax = your total as a sum. Never assume the printed grand total is correct.", { x: 8.9, y: 2.55, w: 3.6, h: 2.1, fontSize: 14, fontFace: "Consolas", color: C.text1, valign: "middle" });
    txt(s, "If the agent misses something, change the instructions, not just the prompt.", { x: 8.65, y: 4.9, w: 4.1, h: 1.2, fontSize: 16, color: C.text1 });
  }
  statement("Sharing an agent shares its instructions, not your files.",
    "Anyone who opens it can read the instructions. Keep budgets and preferred suppliers out.",
    "Share has a name field, Org-wide sharing and Copy chat link. For today, copy the link only.");
  yourTurn("08", "Build and share the Quotation Checker", [
    ["8.1", "Try a prebuilt agent: Writing Coach"],
    ["8.2", "Agents > New agent > Skip"],
    ["8.3", "Name and describe the agent"],
    ["8.4", "Paste the instructions, turn Web search off"],
    ["8.5", "Add three suggested prompts"],
    ["8.6", "Create, test with a quotation, add the fix line"],
    ["8.7", "Copy the sharing link"],
  ], "Your agent flags the arithmetic difference, asks for today's date, and lists questions for the supplier.",
  "About 35 minutes. The instructions are on the Prompts page for Chapter 8.\n\nWhen testing, give the agent today's class date: 14 October 2026.", I);

  // =================== 09 ===================
  sec("09 Optional: Word and Excel");
  divider("09", "Optional: Copilot in Word and Excel", "Stage: Extend", "30 minutes",
    "a tightened memo in Word and an Excel comparison with a checked total column.",
    "Only for people whose label is M365 Copilot (Basic). Everyone else moves on to the capstone or Chapter 11.");
  {
    const s = content("Chapter 09", "Only if Copilot is inside your apps",
      "Use the labels you collected in Chapter 1. Copilot Chat (Basic) users have had no Copilot inside Word, Excel, PowerPoint or OneNote since 15 April 2026.\n\nFor those who can: 9.2 tightens the memo in Word (check every figure against the old version before keeping a rewrite). 9.3 adds a TRUE or FALSE check row in Excel that catches the same arithmetic error.");
    [[I.yes, "M365 Copilot (Basic)", ["9.1  Check the Copilot button in Word", "9.2  Tighten the memo's recommendation", "9.3  Add a check row in Excel"], "Read any rewrite against the original before you keep it.", 0.6],
     [I.no, "Copilot Chat (Basic)", ["No Copilot inside Word or Excel", "Start the capstone (Chapter 10) early", "Or try an exercise from Chapter 11"], null, 6.85]].forEach(([ic, h, list, foot, x]) => {
      ico(s, ic, x, 1.95, 0.5);
      head(s, h, x + 0.7, 1.95, 5, 22);
      rule(s, x, 2.7, 5.85);
      list.forEach((t, i) => {
        txt(s, t, { x, y: 2.85 + i * 0.68, w: 5.85, h: 0.6, fontSize: 18, color: C.text1 });
        rule(s, x, 3.48 + i * 0.68, 5.85);
      });
      if (foot) txt(s, foot, { x, y: 5.1, w: 5.85, h: 0.8, fontSize: 16, color: C.accent4 });
    });
  }

  // =================== 10 ===================
  sec("10 Capstone");
  divider("10", "Capstone: the training vendor purchase", "Stage: Repeat", "45 minutes",
    "a checked comparison of three training quotations, chasing emails, a memo on a Page, and everything in a Notebook.",
    "A second purchase lands on their desk, and this time they run it themselves. Each stage gives a goal, a hint and how to know they're done.\n\nDon't reveal the problems in the three training quotations. They're in the trainer answer key, not in this public deck.");
  {
    const s = content("Chapter 10", "The brief from your HOD",
      "Read the brief aloud. Ask the room to name the four things every quotation must match before anyone opens the files.\n\nSample files: sample-files.zip in the Chapter 10 folder. Three fictional training providers plus the same policy.");
    txt(s, "\"The department needs a two-day in-house Effective Business Writing course for 30 executives, at Menara Teratai, in November 2026. HR says it must be HRD Corp claimable. Please check the quotations, compare them, and send me a recommendation with a memo.\"",
      { x: 0.6, y: 1.95, w: 11.5, h: 1.8, fontSize: 20, fontFace: "Segoe UI Light", color: C.text1 });
    head(s, "Every quotation must match all four", 0.6, 4.05, 12, 18, C.accent4);
    [[I.cal, "Two days"], [I.users, "30 participants"], [I.building2, "In-house"], [I.award, "HRD Corp claimable"]].forEach(([ic, h], i) => {
      const x = 0.6 + i * 3.1;
      rule(s, x, 4.65, 2.8);
      ico(s, ic, x, 4.9, 0.55);
      head(s, h, x, 5.6, 2.8, 20);
    });
  }
  yourTurn("10", "Run the second purchase on your own", [
    ["10.3", "Draft the requirements with GCSE"],
    ["10.4", "Check with your agent, then compare in Copilot Chat"],
    ["10.5", "Draft one chasing email per provider"],
    ["10.6", "Write the memo on a Page"],
    ["10.7", "File it all in a Training purchase 2026 Notebook"],
    ["10.8", "Run your Quotation Checker as a final check"],
  ], "One problem found in each quotation, the policy section named for each, and every number in the memo explained without Copilot.",
  "About 40 minutes. Step back: let them use the notes from earlier chapters. Hints only if someone is stuck, such as: read the pricing lines carefully, and check each quotation quotes for the same course as the brief.\n\nThe capstone checklist is at the end of Chapter 10 in the notes.", I);

  // =================== 11 ===================
  sec("11 Extra practice");
  {
    const s = content("Chapter 11  |  Self-paced", "Finished early? Four short exercises",
      "Each takes 10 to 15 minutes and uses skills from Chapters 2 to 8. Good for fast finishers, and for practice after the course.\n\nB: AI images often get text wrong. Ask for an image without words and put the date and place in the notice text yourself. No logos or real brand names.");
    columns(s, [
      [I.pen, "A. Polish an announcement", "Laptop collection day, under 120 words, in your voice"],
      [I.image, "B. Make a notice image", "An image with no text in it, for the notice board"],
      [I.bulb, "C. Improve a weak prompt", "Fix a colleague's four-word memo prompt"],
      [I.search, "D. Research with sources", "Disposing of old laptops properly in Malaysia"],
    ], 2.2, { size: 19, textH: 2.0 });
  }

  // =================== CLOSE ===================
  sec("Close");
  {
    const s = content("Wrap-up", "Five habits to take back to your desk",
      "Ask each person which habit they'll use first, and on what task.\n\nRecap the purchase: requirements, comparison, chasing, memo, Notebook, and an agent for next time, all without the paid license.");
    const habits = [
      [I.shield, "Check the label and the shield", "before you paste or upload anything"],
      [I.list, "Use GCSE", "Goal, Context, Source, Expectations"],
      [I.calc, "Check every number yourself", "Copilot recommends, you decide"],
      [I.file, "Move answers that matter to a Page", "so they can't drift"],
      [I.mail, "Read every draft before you send it", "names, numbers and promises"],
    ];
    habits.forEach(([ic, h, d], i) => {
      const y = 1.95 + i * 0.9;
      ico(s, ic, 0.6, y + 0.12, 0.45);
      txt(s, h, { x: 1.35, y, w: 5.6, h: 0.7, fontSize: 20, fontFace: HEAD, color: C.text1, valign: "middle" });
      txt(s, d, { x: 7.0, y, w: 5.7, h: 0.7, fontSize: 18, color: C.accent4, valign: "middle" });
      rule(s, 0.6, y + 0.8, 12.1);
    });
  }
  {
    const s = slide("Title");
    s.addText("Thank you", { placeholder: "kicker" });
    s.addText("Keep practising", { placeholder: "title" });
    s.addText("Notes, prompts, the course book and the sample files stay online after today.", { placeholder: "body" });
    s.addText("asraf-js.github.io/Copilot-Chat-Basic-Workshop", { placeholder: "meta" });
    s.addNotes("Point them to Chapter 11 for practice and to What to Learn Next on the home page for free Microsoft resources.\n\nAfter the course, questions go to the training coordinator who arranged the class.");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
