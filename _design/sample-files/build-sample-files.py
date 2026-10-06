"""Builds the fictional sample files and the trainer answer keys.

    python3 _design/sample-files/build-sample-files.py

Writes:
  04-compare-the-quotations/sample-files/*.pdf and sample-files.zip
  10-capstone/sample-files/*.pdf and sample-files.zip
  _trainer/*.md (git ignores this folder)

Every figure lives in this file, so the PDFs and the answer keys always agree.
The seeded problems are deliberate. Read the answer keys before changing a number.
"""

import math
import zipfile
from datetime import date
from pathlib import Path

from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (Flowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate,
                                Spacer, Table, TableStyle)

ROOT = Path(__file__).resolve().parents[2]
rl_config.invariant = 1  # no build timestamps, so a rebuild only changes files whose content changed
TAX_RATE = 0.08
FOOTER = ("FICTIONAL TRAINING MATERIAL for the Copilot Chat Basic Workshop. All companies, people, addresses,",
          "phone numbers and registration numbers are made up. The tax rate is for training only.")

CLIENT = [
    "Teratai Holdings Berhad",
    "Registration No. 199801004321 (456789-T)",
    "Level 15, Menara Teratai, Jalan Tun Razak",
    "50400 Kuala Lumpur",
    "Attn: Admin and Facilities Department",
]


def rm(x):
    return f"{x:,.2f}"


def d(dt):
    return f"{dt.day} {dt:%B %Y}"


# ---------------------------------------------------------------------------
# Number to words, for the "Ringgit Malaysia" line
ONES = "Zero One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split()
TENS = "_ _ Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split()


def words_below_1000(n):
    out = []
    if n >= 100:
        out.append(f"{ONES[n // 100]} Hundred")
        n %= 100
        if n:
            out.append("and")
    if n >= 20:
        out.append(TENS[n // 10] + (f"-{ONES[n % 10]}" if n % 10 else ""))
    elif n or not out:
        out.append(ONES[n])
    return " ".join(out)


def ringgit_words(x):
    whole = int(x)
    sen = round((x - whole) * 100)
    parts = []
    if whole >= 1000:
        parts.append(f"{words_below_1000(whole // 1000)} Thousand")
        whole %= 1000
    if whole:
        parts.append(words_below_1000(whole))
    text = "Ringgit Malaysia " + " ".join(parts)
    if sen:
        text += f" and Sen {words_below_1000(sen)}"
    return text + " Only"


# ---------------------------------------------------------------------------
# Drawing helpers

class Signature(Flowable):
    """A signature scribble, the signer's details and a round company stamp."""

    def __init__(self, company, name, title, accent):
        super().__init__()
        self.company, self.name, self.title, self.accent = company, name, title, accent
        self.width, self.height = 170 * mm, 38 * mm

    def draw(self):
        c = self.canv
        c.setFont("Helvetica", 9)
        c.drawString(0, 34 * mm, "Yours faithfully,")
        c.setFont("Helvetica-Bold", 9)
        c.drawString(0, 29 * mm, f"For {self.company}")
        # scribble
        c.setStrokeColor(colors.HexColor("#1f3a93"))
        c.setLineWidth(1.1)
        p = c.beginPath()
        p.moveTo(4 * mm, 17 * mm)
        for i in range(1, 40):
            t = i / 39
            x = 4 * mm + t * 42 * mm
            y = 17 * mm + math.sin(t * 11) * 3.2 * mm * (1 - t * 0.5) + t * 2 * mm
            p.lineTo(x, y)
        c.drawPath(p)
        c.setStrokeColor(colors.black)
        c.setLineWidth(0.5)
        c.line(0, 12 * mm, 60 * mm, 12 * mm)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(0, 8 * mm, self.name)
        c.setFont("Helvetica", 8.5)
        c.drawString(0, 4 * mm, self.title)
        # stamp
        cx, cy, r = 92 * mm, 20 * mm, 14 * mm
        c.setStrokeColor(self.accent)
        c.setFillColor(self.accent)
        c.setLineWidth(1.4)
        c.circle(cx, cy, r)
        c.setLineWidth(0.6)
        c.circle(cx, cy, r - 2.2 * mm)
        c.setFont("Helvetica-Bold", 6.2)
        words = self.company.upper().replace(" SDN BHD", "").split()
        lines = [" ".join(words[: (len(words) + 1) // 2]), " ".join(words[(len(words) + 1) // 2:]), "SDN BHD"]
        for i, line in enumerate(l for l in lines if l):
            size = 6.2
            while c.stringWidth(line, "Helvetica-Bold", size) > 2 * (r - 4 * mm) and size > 4:
                size -= 0.2
            c.setFont("Helvetica-Bold", size)
            c.drawCentredString(cx, cy + (3 - i * 3.2) * mm, line)
        c.setFont("Helvetica", 5)
        c.drawCentredString(cx, cy - 7.5 * mm, "AUTHORISED")


def styles(accent):
    base = dict(fontName="Helvetica", fontSize=9, leading=12)
    return {
        "body": ParagraphStyle("body", **base),
        "small": ParagraphStyle("small", fontName="Helvetica", fontSize=8, leading=10.5),
        "bold": ParagraphStyle("bold", fontName="Helvetica-Bold", fontSize=9, leading=12),
        "right": ParagraphStyle("right", alignment=TA_RIGHT, **base),
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=accent),
        "h": ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=accent, spaceBefore=6, spaceAfter=3),
        "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=8.5, leading=11),
        "cellb": ParagraphStyle("cellb", fontName="Helvetica-Bold", fontSize=8.5, leading=11),
        "bullet": ParagraphStyle("bullet", leftIndent=12, bulletIndent=3, **base),
    }


def page_frame(vendor):
    accent = colors.HexColor(vendor["accent"])

    def draw(c, doc):
        w, h = A4
        c.saveState()
        style = vendor["letterhead"]
        if style == "band":
            c.setFillColor(accent)
            c.rect(0, h - 34 * mm, w, 34 * mm, stroke=0, fill=1)
            text_col = colors.white
        else:
            text_col = colors.black
        # logo mark
        lx, ly = 18 * mm, h - 27 * mm
        if style == "band":
            c.setFillColor(colors.white)
            c.roundRect(lx, ly, 18 * mm, 18 * mm, 3 * mm, stroke=0, fill=1)
            c.setFillColor(accent)
        else:
            c.setFillColor(accent)
            if style == "round":
                c.circle(lx + 9 * mm, ly + 9 * mm, 9 * mm, stroke=0, fill=1)
            else:
                c.roundRect(lx, ly, 18 * mm, 18 * mm, 3 * mm, stroke=0, fill=1)
            c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 13)
        c.drawCentredString(lx + 9 * mm, ly + 6.6 * mm, vendor["initials"])
        # name and details
        c.setFillColor(text_col if style == "band" else accent)
        c.setFont("Helvetica-Bold", 15)
        c.drawString(42 * mm, h - 15 * mm, vendor["name"])
        c.setFillColor(text_col)
        c.setFont("Helvetica", 7.8)
        c.drawString(42 * mm, h - 20 * mm, f"Registration No. {vendor['reg']}")
        c.drawString(42 * mm, h - 24 * mm, vendor["address"])
        c.drawString(42 * mm, h - 28 * mm, f"Tel: {vendor['tel']}   Email: {vendor['email']}")
        if style != "band":
            c.setStrokeColor(accent)
            c.setLineWidth(1.6)
            c.line(18 * mm, h - 33 * mm, w - 18 * mm, h - 33 * mm)
        # footer
        c.setFillColor(colors.HexColor("#666666"))
        c.setFont("Helvetica-Oblique", 6.8)
        c.drawCentredString(w / 2, 11 * mm, FOOTER[0])
        c.drawCentredString(w / 2, 8 * mm, FOOTER[1])
        c.setFont("Helvetica", 7)
        c.drawRightString(w - 18 * mm, 15 * mm, f"Page {doc.page}")
        c.restoreState()

    return draw


def totals(items):
    subtotal = round(sum(q * p for _, q, _, p in items), 2)
    tax = round(subtotal * TAX_RATE, 2)
    return subtotal, tax, round(subtotal + tax, 2)


def build_quotation(v, out_dir):
    accent = colors.HexColor(v["accent"])
    s = styles(accent)
    path = out_dir / v["file"]
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=40 * mm, bottomMargin=22 * mm,
                            title=f"Quotation {v['quote_no']}", author=v["name"],
                            subject="Fictional training material")
    subtotal, tax, grand = totals(v["items"])
    shown_grand = v.get("printed_grand", grand)
    story = [Paragraph("QUOTATION", s["title"]), Spacer(1, 4 * mm)]

    to_block = Paragraph("<b>To:</b><br/>" + "<br/>".join(CLIENT), s["body"])
    meta_rows = [
        ["Quotation No.", v["quote_no"]],
        ["Date", d(v["date"])],
        ["Valid until", d(v["valid_until"])],
        ["Your reference", v["your_ref"]],
        ["Contact", v["contact"]],
    ]
    meta = Table([[Paragraph(f"<b>{a}</b>", s["cell"]), Paragraph(b, s["cell"])] for a, b in meta_rows],
                 colWidths=[28 * mm, 52 * mm])
    meta.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, accent),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#cccccc")),
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f3f3f3")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    head = Table([[to_block, meta]], colWidths=[94 * mm, 80 * mm])
    head.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (0, 0), 0)]))
    story += [head, Spacer(1, 5 * mm)]
    story += [Paragraph(f"<b>Subject: {v['subject']}</b>", s["body"]), Spacer(1, 2 * mm),
              Paragraph(v["opening"], s["body"]), Spacer(1, 4 * mm)]

    rows = [[Paragraph(f"<b>{h}</b>", s["cell"]) for h in ["No.", "Description", "Qty", "Unit", "Unit price (RM)", "Amount (RM)"]]]
    for i, (desc, qty, unit, price) in enumerate(v["items"], 1):
        rows.append([str(i), Paragraph(desc, s["cell"]), str(qty), unit, rm(price), rm(qty * price)])
    n = len(rows)
    rows += [
        ["", "", "", "", "Subtotal", rm(subtotal)],
        ["", "", "", "", f"Tax @ {int(TAX_RATE * 100)}%", rm(tax)],
        ["", "", "", "", "Grand total", rm(shown_grand)],
    ]
    t = Table(rows, colWidths=[11 * mm, 79 * mm, 12 * mm, 14 * mm, 27 * mm, 31 * mm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), accent),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONT", (0, 1), (-1, -1), "Helvetica", 8.5),
        ("ALIGN", (2, 1), (-1, -1), "RIGHT"),
        ("ALIGN", (0, 1), (0, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, n - 1), 0.4, colors.HexColor("#bbbbbb")),
        ("LINEABOVE", (4, n), (-1, n), 0.6, colors.black),
        ("FONT", (4, n), (4, -1), "Helvetica-Bold", 8.5),
        ("FONT", (4, -1), (-1, -1), "Helvetica-Bold", 9),
        ("LINEABOVE", (4, -1), (-1, -1), 0.8, colors.black),
        ("LINEBELOW", (4, -1), (-1, -1), 1.2, colors.black),
        ("BACKGROUND", (4, -1), (-1, -1), colors.HexColor("#f3f3f3")),
    ]))
    story += [t, Spacer(1, 2 * mm), Paragraph(f"<i>{ringgit_words(shown_grand)}</i>", s["small"]), Spacer(1, 4 * mm)]

    story.append(Paragraph("Terms and conditions", s["h"]))
    terms = [[Paragraph(f"<b>{a}</b>", s["cell"]), Paragraph(b, s["cell"])] for a, b in v["terms"]]
    tt = Table(terms, colWidths=[34 * mm, 140 * mm])
    tt.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (0, -1), 0),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 2), ("TOPPADDING", (0, 0), (-1, -1), 2)]))
    story += [tt, Spacer(1, 3 * mm)]
    if v.get("closing"):
        story += [Paragraph(v["closing"], s["body"]), Spacer(1, 4 * mm)]
    story.append(KeepTogether([Spacer(1, 2 * mm), Signature(v["name"], v["signer"], v["signer_title"], accent)]))
    doc.build(story, onFirstPage=page_frame(v), onLaterPages=page_frame(v))
    return path, subtotal, tax, grand, shown_grand


# ---------------------------------------------------------------------------
# Laptop purchase (Chapters 4 to 9)

LAPTOP_TERMS_COMMON = "Prices are in Ringgit Malaysia. Tax is shown separately above."

LAPTOP_VENDORS = [
    dict(
        key="A", file="quotation-pinnacle-komputer.pdf", name="Pinnacle Komputer Sdn Bhd", initials="PK",
        reg="201901023456 (1334521-K)", accent="#0b5394", letterhead="rule",
        address="No. 23, Jalan SS 21/39, Damansara Utama, 47400 Petaling Jaya, Selangor",
        tel="03-7726 4180", email="sales@pinnaclekomputer.example",
        quote_no="PKS/Q/2026/0917", date=date(2026, 9, 22), valid_until=date(2026, 11, 21),
        your_ref="Email enquiry, 18 September 2026", contact="Kelvin Tan Wei Ming, 012-338 4071",
        subject="Supply of 25 units of business laptops",
        opening="Thank you for your enquiry. We are pleased to quote as follows for your consideration.",
        items=[
            ("Kestrel Business 14 (Model KB14-U5) laptop. Intel Core Ultra 5 125U, 16 GB DDR5 RAM, "
             "512 GB NVMe SSD, 14-inch FHD (1920 x 1080) IPS anti-glare display, Wi-Fi 6E, "
             "Windows 11 Pro", 25, "unit", 3480.00),
            ("Kestrel 15.6-inch business backpack", 25, "unit", 85.00),
            ("Operating system imaging, asset tagging and setup (at our premises)", 25, "unit", 60.00),
            ("Delivery to Menara Teratai, Kuala Lumpur", 1, "lot", 350.00),
        ],
        printed_grand=98523.00,  # correct total is 98,253.00 (digits transposed)
        terms=[
            ("Validity", "60 days from the date of this quotation."),
            ("Payment", "30 days from date of invoice."),
            ("Delivery", "3 to 4 weeks from receipt of purchase order."),
            ("Warranty", "3 years onsite, next business day, parts and labour (manufacturer warranty)."),
            ("Prices", LAPTOP_TERMS_COMMON),
        ],
        closing="We look forward to your favourable reply. Please contact the undersigned for any clarification.",
        signer="Kelvin Tan Wei Ming", signer_title="Sales Manager",
    ),
    dict(
        key="B", file="quotation-seri-mutiara.pdf", name="Seri Mutiara Technology Sdn Bhd", initials="SM",
        reg="201201017734 (1001287-P)", accent="#7a1f5c", letterhead="band",
        address="Lot 7, Jalan Pelabur 23/1, Seksyen 23, 40300 Shah Alam, Selangor",
        tel="03-5548 2290", email="enquiry@serimutiaratech.example",
        quote_no="SMT-QT-26-0388", date=date(2026, 8, 4), valid_until=date(2026, 9, 3),
        your_ref="Telephone enquiry, 31 July 2026", contact="Nur Aisyah binti Kamal, 019-277 5103",
        subject="Quotation for business laptops (25 units)",
        opening="We refer to your enquiry and are pleased to submit our best price for the items below.",
        items=[
            ("Halcyon WorkBook 14 laptop. Intel Core Ultra 5 125U, 16 GB DDR5 RAM, 512 GB NVMe SSD, "
             "14-inch WUXGA (1920 x 1200) anti-glare display, Wi-Fi 6E, Windows 11 Pro", 25, "unit", 3390.00),
            ("Halcyon 14-inch laptop backpack", 25, "unit", 70.00),
            ("OS imaging and asset tagging", 25, "unit", 55.00),
            ("Delivery and installation within Klang Valley (complimentary)", 1, "lot", 0.00),
        ],
        terms=[
            ("Validity", "This quotation is valid for 30 days from the date above."),
            ("Payment", "30 days from date of invoice."),
            ("Delivery", "2 to 3 weeks from receipt of purchase order, subject to stock availability."),
            ("Warranty", "3 years onsite, next business day (manufacturer warranty)."),
            ("Prices", LAPTOP_TERMS_COMMON),
        ],
        closing="Thank you for considering Seri Mutiara Technology.",
        signer="Nur Aisyah binti Kamal", signer_title="Account Executive",
    ),
    dict(
        key="C", file="quotation-cyberjaya-digital.pdf", name="Cyberjaya Digital Supplies Sdn Bhd", initials="CD",
        reg="201601039902 (1208815-W)", accent="#1b7f4b", letterhead="round",
        address="Unit 3-05, Block B, Jalan Teknokrat 5, 63000 Cyberjaya, Selangor",
        tel="03-8322 6714", email="quotes@cyberjayadigital.example",
        quote_no="CDS/2026/Q-1142", date=date(2026, 9, 25), valid_until=date(2026, 11, 9),
        your_ref="Email enquiry, 18 September 2026", contact="Arvind Selvaraj, 017-640 2289",
        subject="Supply of laptops for new hires",
        opening="Further to your enquiry, please find our quotation below.",
        items=[
            ("Meranti Pro 14 laptop. Intel Core Ultra 5 135U, 16 GB LPDDR5 RAM, 512 GB NVMe SSD, "
             "14-inch FHD+ (1920 x 1200) display, Wi-Fi 6E, Windows 11 Pro", 25, "unit", 3150.00),
            ("Meranti 14-inch padded laptop sleeve", 25, "unit", 45.00),
            ("OS imaging and setup", 25, "unit", 50.00),
            ("Delivery to Kuala Lumpur", 1, "lot", 250.00),
        ],
        terms=[
            ("Validity", "45 days from the date of this quotation."),
            ("Payment", "30 days from date of invoice."),
            ("Delivery", "3 weeks from receipt of purchase order."),
            ("Warranty", "1 year carry-in (return to service centre), parts and labour. An upgrade to a "
                         "3-year onsite warranty is available at RM280.00 per unit. The upgrade is not "
                         "included in the prices above."),
            ("Prices", LAPTOP_TERMS_COMMON),
        ],
        closing="Please let us know if you would like a revised quotation that includes the warranty upgrade.",
        signer="Arvind Selvaraj", signer_title="Business Development Manager",
    ),
]

# ---------------------------------------------------------------------------
# Capstone purchase (Chapter 10)

TRAINING_VENDORS = [
    dict(
        key="1", file="quotation-ilmu-cemerlang.pdf", name="Ilmu Cemerlang Training Sdn Bhd", initials="IC",
        reg="201401028815 (1103426-A)", accent="#b45309", letterhead="rule",
        address="No. 8, Jalan Molek 1/29, Taman Molek, 81100 Johor Bahru, Johor",
        tel="07-351 8842", email="programmes@ilmucemerlang.example",
        quote_no="ICT/QUO/2026/211", date=date(2026, 10, 1), valid_until=date(2026, 10, 31),
        your_ref="Request for quotation, 28 September 2026", contact="Zainab Hamid, 013-772 9015",
        subject="In-house programme: Effective Business Writing (2 days, 30 participants)",
        opening=("We are pleased to propose our two-day in-house programme Effective Business Writing for "
                 "30 of your executives, delivered at your premises."),
        items=[
            ("Programme fee: Effective Business Writing, 2 days (9.00 am to 5.00 pm), in-house, "
             "including course materials and certificates of attendance", 30, "pax", 1150.00),
        ],
        terms=[
            ("Validity", "30 days from the date of this quotation."),
            ("Dates", "Any two consecutive working days in November or December 2026, subject to trainer availability."),
            ("Trainer", "Senior trainer with 15 years of corporate writing and communication experience."),
            ("Venue", "Client premises. Client to provide the training room, projector and refreshments."),
            ("Payment", "50% on confirmation, balance within 30 days after the programme."),
            ("Prices", "Prices are in Ringgit Malaysia. Tax is shown separately above."),
        ],
        closing="We look forward to working with Teratai Holdings Berhad.",
        signer="Zainab Hamid", signer_title="Programme Director",
    ),
    dict(
        key="2", file="quotation-pena-mahir.pdf", name="Pena Mahir Learning Sdn Bhd", initials="PM",
        reg="201801011246 (1274409-D)", accent="#0e7490", letterhead="band",
        address="Level 5, No. 21, Lebuh Pantai, 10300 George Town, Pulau Pinang",
        tel="04-262 3318", email="hello@penamahir.example",
        quote_no="PML-26-Q0479", date=date(2026, 9, 29), valid_until=date(2026, 11, 28),
        your_ref="Request for quotation, 28 September 2026", contact="Lim Siew Ling, 016-418 2736",
        subject="Quotation: Effective Business Writing, 2-day in-house programme",
        opening=("Thank you for the opportunity. Our programme fee is RM980 per participant, and the "
                 "programme is HRD Corp claimable (training provider registration TP-PML-0412)."),
        items=[
            ("In-house programme fee: Effective Business Writing, 2 days, 30 participants", 1, "group", 980.00),
            ("Course workbook and certificate of completion", 30, "pax", 35.00),
        ],
        terms=[
            ("Validity", "60 days from the date of this quotation."),
            ("HRD Corp", "HRD Corp claimable. Training provider registration TP-PML-0412."),
            ("Dates", "Two consecutive days to be agreed, November 2026 onwards."),
            ("Trainer", "Certified trainer with a background in corporate communications."),
            ("Venue", "Client premises. Trainer travel from Penang is included in the fee."),
            ("Payment", "Full payment within 30 days after the programme."),
            ("Prices", "Prices are in Ringgit Malaysia. Tax is shown separately above."),
        ],
        signer="Lim Siew Ling", signer_title="Training Consultant",
    ),
    dict(
        key="3", file="quotation-bestari-skills.pdf", name="Bestari Skills Academy Sdn Bhd", initials="BS",
        reg="201001020517 (904361-H)", accent="#4338ca", letterhead="round",
        address="No. 15-1, Jalan Kuchai Maju 8, Off Jalan Kuchai Lama, 58200 Kuala Lumpur",
        tel="03-7981 5520", email="corporate@bestariskills.example",
        quote_no="BSA/Q/1026/058", date=date(2026, 10, 2), valid_until=date(2026, 11, 1),
        your_ref="Request for quotation, 28 September 2026", contact="Hafiz Azman, 011-2694 7731",
        subject="Effective Business Writing, in-house programme for 30 participants",
        opening="We are pleased to submit our quotation for an intensive in-house business writing programme.",
        items=[
            ("Programme fee: Business Writing Intensive, 1 day (9.00 am to 5.00 pm, 7 training hours), "
             "in-house, up to 30 participants", 1, "group", 16500.00),
            ("Participant handbook and certificate", 30, "pax", 40.00),
        ],
        terms=[
            ("Validity", "30 days from the date of this quotation."),
            ("HRD Corp", "HRD Corp claimable. Training provider registration TP-BSA-0187."),
            ("Dates", "Any working day in November 2026."),
            ("Trainer", "Lead trainer and one assistant facilitator."),
            ("Venue", "Client premises."),
            ("Payment", "30 days from date of invoice."),
            ("Prices", "Prices are in Ringgit Malaysia. Tax is shown separately above."),
        ],
        signer="Hafiz Azman", signer_title="Head of Corporate Programmes",
    ),
]

# ---------------------------------------------------------------------------
# Procurement policy extract

POLICY_ACCENT = colors.HexColor("#14532d")


def build_policy(out_dir):
    s = styles(POLICY_ACCENT)
    path = out_dir / "procurement-policy.pdf"

    def frame(c, doc):
        w, h = A4
        c.saveState()
        c.setFillColor(POLICY_ACCENT)
        c.circle(24 * mm, h - 20 * mm, 7 * mm, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(24 * mm, h - 21.8 * mm, "TH")
        c.setFillColor(POLICY_ACCENT)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(35 * mm, h - 18 * mm, "Teratai Holdings Berhad")
        c.setFillColor(colors.black)
        c.setFont("Helvetica", 8)
        c.drawString(35 * mm, h - 23 * mm, "Group Procurement Policy (extract)")
        c.drawRightString(w - 18 * mm, h - 18 * mm, "Document TH-PRO-003, Revision 4")
        c.drawRightString(w - 18 * mm, h - 23 * mm, "Effective 1 January 2026")
        c.setStrokeColor(POLICY_ACCENT)
        c.setLineWidth(1.2)
        c.line(18 * mm, h - 28 * mm, w - 18 * mm, h - 28 * mm)
        c.setFillColor(colors.HexColor("#666666"))
        c.setFont("Helvetica-Oblique", 6.8)
        c.drawCentredString(w / 2, 11 * mm, FOOTER[0])
        c.drawCentredString(w / 2, 8 * mm, FOOTER[1])
        c.setFont("Helvetica", 7)
        c.drawRightString(w - 18 * mm, 15 * mm, f"Page {doc.page} of 2")
        c.drawString(18 * mm, 15 * mm, "Internal. Extract issued for staff guidance.")
        c.restoreState()

    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=34 * mm, bottomMargin=22 * mm, title="Procurement Policy (extract)",
                            author="Teratai Holdings Berhad", subject="Fictional training material")
    P = lambda t, st="body": Paragraph(t, s[st])
    story = [P("Procurement Policy: Purchases of Goods and Services", "title"), Spacer(1, 2 * mm),
             P("This extract covers Sections 4 to 8 of the Group Procurement Policy. It applies to every "
               "department buying goods or services with company funds. Where this extract and the full "
               "policy differ, the full policy applies."), Spacer(1, 3 * mm)]

    story.append(P("4. Approval thresholds", "h"))
    story.append(P("The value of a purchase is the total amount payable, including tax, for the whole "
                   "requirement. Do not split one requirement into smaller purchases to fall under a lower threshold."))
    story.append(Spacer(1, 2 * mm))
    rows = [["Purchase value (including tax)", "Quotations required", "Approval"],
            ["Below RM5,000", "One written quotation", "Head of Department (HOD)"],
            ["RM5,000 to RM20,000", "Two written quotations", "HOD"],
            ["Above RM20,000 up to RM100,000", "Three written quotations, a comparison and a justification memo", "HOD"],
            ["Above RM100,000", "Three written quotations, a comparison and a justification memo", "HOD and General Manager (GM)"]]
    t = Table([[Paragraph(c, s["cellb" if i == 0 else "cell"]) for c in r] for i, r in enumerate(rows)],
              colWidths=[50 * mm, 80 * mm, 44 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#dcfce7")),
                           ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#999999")),
                           ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    story += [t, Spacer(1, 2 * mm),
              P("4.1 If fewer than the required number of quotations can be obtained, the memo must explain "
                "why and list the suppliers approached."),
              Spacer(1, 2 * mm)]

    story.append(P("5. What a valid quotation must show", "h"))
    story.append(P("A quotation is valid for evaluation only if it is in writing, on the supplier's letterhead, "
                   "and shows all of the following:"))
    for item in [
        "the supplier's registered name and company registration number (SSM)",
        "a quotation number and the date of issue",
        "a validity period or expiry date. The quotation must still be valid on the date the justification memo is submitted",
        "a description of each item or service, with quantity, unit price and line amount",
        "the subtotal, any tax shown as a separate line, and the grand total",
        "payment terms",
        "delivery or completion lead time",
        "warranty terms for goods, or the scope and duration of the service",
        "the name and signature of an authorised person",
    ]:
        story.append(Paragraph(item, s["bullet"], bulletText="\u2022"))
    story += [Spacer(1, 2 * mm),
              P("5.1 For training services, the quotation must also state whether the programme is HRD Corp "
                "claimable and, if it is, the provider's registration number."),
              P("5.2 A quotation that has expired must be revalidated in writing by the supplier before it "
                "can be used. A verbal or telephone confirmation is not enough.")]

    story.append(PageBreak())
    story.append(P("6. Comparing quotations", "h"))
    for t_ in [
        "6.1 Quotations must be compared like-for-like: the same quantity, an equivalent specification, the "
        "same warranty or service scope, and comparable delivery terms.",
        "6.2 Where quotations are not like-for-like, either ask the supplier for a revised quotation or adjust "
        "the comparison using a price the supplier has stated in writing. Show the adjustment in the comparison.",
        "6.3 IT equipment must carry a warranty of at least three years. Where a supplier quotes a shorter "
        "warranty, include the cost of extending it to three years in the comparison.",
        "6.4 Check every total. An arithmetic error must be corrected by the supplier in a revised quotation. "
        "Do not correct a supplier's figures yourself.",
        "6.5 The lowest price is not automatically selected. Delivery, warranty, after-sales support and "
        "previous performance may justify a higher price, provided the memo explains why.",
    ]:
        story.append(P(t_))
        story.append(Spacer(1, 1.2 * mm))

    story.append(P("7. Justification memo", "h"))
    story.append(P("Purchases above RM20,000 need a justification memo addressed to the approver. Keep it to "
                   "one or two pages. The memo must include:"))
    for item in [
        "the purpose of the purchase and the business need",
        "the budget code and confirmation that budget is available",
        "the suppliers approached and the quotations received, with quotation numbers and dates",
        "a comparison summary, with any like-for-like adjustments shown",
        "the recommended supplier, the total amount (including tax) and the reasons for the recommendation",
        "any exceptions, risks or issues found (for example an expired quotation or a corrected total) and how they were resolved",
        "the approval required under Section 4",
    ]:
        story.append(Paragraph(item, s["bullet"], bulletText="\u2022"))

    story.append(P("8. Records", "h"))
    story.append(P("Keep the quotations, the comparison, the memo and the approval together in the department's "
                   "procurement folder for seven years. Do not store supplier documents in personal folders."))
    story.append(Spacer(1, 8 * mm))
    ctl = [["Document control", ""],
           ["Policy owner", "Group Procurement, Finance Division"],
           ["Approved by", "Board Audit and Risk Committee, 14 November 2025"],
           ["Next review", "December 2026"],
           ["Questions", "procurement@terataiholdings.example, ext. 2214"]]
    ct = Table([[Paragraph(a, s["cellb"]), Paragraph(b, s["cell"])] for a, b in ctl], colWidths=[40 * mm, 134 * mm])
    ct.setStyle(TableStyle([("SPAN", (0, 0), (-1, 0)), ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#dcfce7")),
                            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#999999"))]))
    story.append(ct)
    doc.build(story, onFirstPage=frame, onLaterPages=frame)
    return path


# ---------------------------------------------------------------------------
# Answer keys

def laptop_key(results):
    by = {v["key"]: (v, r) for v, r in results}
    a, b, c = by["A"], by["B"], by["C"]
    c_sub, c_tax, c_grand = c[1][1], c[1][2], c[1][3]
    upgrade = 25 * 280.00
    c_adj_sub = c_sub + upgrade
    c_adj_tax = round(c_adj_sub * TAX_RATE, 2)
    c_adj = round(c_adj_sub + c_adj_tax, 2)
    lines = [
        "# Answer key: laptop purchase (Chapters 4 to 9)",
        "",
        "Trainer only. This folder is git-ignored. Generated by `_design/sample-files/build-sample-files.py`.",
        "",
        "Class date assumed: October 2026. Tax rate in all documents: 8% (training only).",
        "",
        "## The three quotations",
        "",
        "| | Vendor A | Vendor B | Vendor C |",
        "|---|---|---|---|",
        f"| Company | {a[0]['name']} | {b[0]['name']} | {c[0]['name']} |",
        f"| File | `{a[0]['file']}` | `{b[0]['file']}` | `{c[0]['file']}` |",
        f"| Quotation No. | {a[0]['quote_no']} | {b[0]['quote_no']} | {c[0]['quote_no']} |",
        f"| Date | {d(a[0]['date'])} | {d(b[0]['date'])} | {d(c[0]['date'])} |",
        f"| Valid until | {d(a[0]['valid_until'])} | **{d(b[0]['valid_until'])} (expired)** | {d(c[0]['valid_until'])} |",
        "| Laptop | Kestrel KB14-U5, Core Ultra 5 125U, 16 GB, 512 GB, 14\" FHD 1920x1080 | Halcyon WorkBook 14, Core Ultra 5 125U, 16 GB, 512 GB, 14\" WUXGA 1920x1200 | Meranti Pro 14, Core Ultra 5 135U, 16 GB LPDDR5, 512 GB, 14\" FHD+ 1920x1200 |",
        "| Unit price | RM3,480.00 | RM3,390.00 | RM3,150.00 |",
        "| Bag | Backpack, RM85 | Backpack, RM70 | Sleeve, RM45 |",
        "| Imaging and setup | RM60 per unit | RM55 per unit (plus asset tagging) | RM50 per unit |",
        "| Delivery charge | RM350 | Complimentary (RM0) | RM250 |",
        f"| Subtotal | RM{rm(a[1][1])} | RM{rm(b[1][1])} | RM{rm(c_sub)} |",
        f"| Tax @ 8% | RM{rm(a[1][2])} | RM{rm(b[1][2])} | RM{rm(c_tax)} |",
        f"| Grand total printed | **RM{rm(a[1][4])}** | RM{rm(b[1][4])} | RM{rm(c[1][4])} |",
        f"| Grand total correct | RM{rm(a[1][3])} | RM{rm(b[1][3])} | RM{rm(c_grand)} |",
        "| Warranty | 3 years onsite NBD | 3 years onsite NBD | **1 year carry-in** (3-year onsite upgrade RM280/unit, not included) |",
        "| Delivery lead time | 3 to 4 weeks | 2 to 3 weeks, subject to stock | 3 weeks |",
        "| Payment | 30 days | 30 days | 30 days |",
        "",
        "## Seeded problems",
        "",
        f"1. **Vendor A, arithmetic.** Line items, subtotal (RM{rm(a[1][1])}) and tax (RM{rm(a[1][2])}) are correct. "
        f"The grand total is printed as RM{rm(a[1][4])}; it should be RM{rm(a[1][3])}. Digits 2 and 5 are transposed, "
        f"so the printed total is RM{rm(a[1][4] - a[1][3])} too high. The amount in words matches the wrong figure, which "
        "makes it look deliberate. Policy 6.4: the vendor must issue a revised quotation; participants must not fix it themselves.",
        f"2. **Vendor B, expired.** Dated {d(b[0]['date'])}, valid 30 days, expires {d(b[0]['valid_until'])}. "
        "In October 2026 it has expired. Policy 5 and 5.2: it needs written revalidation before it can be used. "
        "Copilot often misses this unless it is told today's date, so the prompts give the date.",
        "3. **Vendor C, not like-for-like.** 1-year carry-in warranty against 3 years onsite from A and B. "
        "Policy 6.3 requires at least 3 years for IT equipment and says to add the extension cost.",
        "",
        "## Like-for-like comparison (expected result)",
        "",
        "| Vendor | Total as compared | Status |",
        "|---|---|---|",
        f"| A | RM{rm(a[1][3])} (corrected) | Needs a revised quotation with the correct total |",
        f"| B | RM{rm(b[1][3])} | Lowest, but expired. Needs written revalidation |",
        f"| C | RM{rm(c_adj)} with warranty upgrade (RM{rm(c_adj_sub)} + RM{rm(c_adj_tax)} tax) | Was cheapest at RM{rm(c_grand)}; second after adjustment |",
        "",
        f"Ranking after adjustment: B (RM{rm(b[1][3])}), C (RM{rm(c_adj)}), A (RM{rm(a[1][3])}). "
        f"Difference B to C: RM{rm(c_adj - b[1][3])}.",
        "",
        "Expected recommendation: ask Vendor B to revalidate in writing (Chapter 5) and Vendor A to correct its total. "
        "If B revalidates at the same price, recommend B: lowest like-for-like price, 3-year onsite warranty, free "
        "delivery and the shortest lead time. Note the stock caveat. If B's price rises above RM95,445, C with the "
        "upgrade becomes the lowest. All totals are between RM20,000 and RM100,000, so HOD approval is enough; the "
        "memo should still say so.",
        "",
        "Smaller differences worth praising if spotted: C quotes a sleeve, not a backpack; A has a lower-resolution "
        "1920x1080 screen; C's processor is a 135U; C uses soldered LPDDR5 memory; B's delivery depends on stock.",
        "",
        "## Common Copilot mistakes to watch for",
        "",
        "- Copying Vendor A's printed grand total into the table without checking it.",
        "- Ranking Vendor C cheapest without mentioning the warranty.",
        "- Not flagging Vendor B as expired, or calculating expiry from the wrong date.",
        "- Recalculating tax at a different rate, or calling the 8% \"SST\". The documents only say \"Tax\".",
        "- Inventing a vendor detail (phone number, warranty type) that isn't in the PDF. Ask for page citations.",
        "",
        "## Chapter 5 email story",
        "",
        "Emails are in `05-copilot-in-outlook/prompts.md`. B's first email says prices \"may have changed\"; its "
        "follow-up (a reply in the same thread) says pricing is unchanged, stock is held for 7 days, and a written "
        "revalidation follows on confirmation. A good thread summary reports the follow-up. The email is not itself a "
        "revalidation (policy 5.2), so B still needs a revalidated quotation. C offers the 3-year onsite upgrade at "
        "RM280/unit (as in its quotation) and a 2-year carry-in extension at RM150/unit; the 2-year option does not "
        "meet policy 6.3. A asks when you will decide and offers an onsite technician; it has not been told about the "
        "total, which participants raise in 5.6.",
        "",
    ]
    return "\n".join(lines)


def capstone_key(results):
    by = {v["key"]: (v, r) for v, r in results}
    p1, p2, p3 = by["1"], by["2"], by["3"]
    p2_fee = 30 * 980.00
    p2_sub = p2_fee + 30 * 35.00
    p2_tax = round(p2_sub * TAX_RATE, 2)
    p2_total = round(p2_sub + p2_tax, 2)
    lines = [
        "# Answer key: capstone, training provider purchase (Chapter 10)",
        "",
        "Trainer only. This folder is git-ignored. Generated by `_design/sample-files/build-sample-files.py`.",
        "",
        "Brief: a two-day in-house Effective Business Writing course for 30 staff, November 2026. "
        "The same procurement policy applies (Section 5.1 covers HRD Corp status for training).",
        "",
        "## The three quotations",
        "",
        "| | Provider 1 | Provider 2 | Provider 3 |",
        "|---|---|---|---|",
        f"| Company | {p1[0]['name']} | {p2[0]['name']} | {p3[0]['name']} |",
        f"| File | `{p1[0]['file']}` | `{p2[0]['file']}` | `{p3[0]['file']}` |",
        f"| Quotation No. | {p1[0]['quote_no']} | {p2[0]['quote_no']} | {p3[0]['quote_no']} |",
        f"| Date / valid until | {d(p1[0]['date'])} / {d(p1[0]['valid_until'])} | {d(p2[0]['date'])} / {d(p2[0]['valid_until'])} | {d(p3[0]['date'])} / {d(p3[0]['valid_until'])} |",
        "| Duration | 2 days | 2 days | **1 day (7 hours)** |",
        "| Pricing basis | RM1,150 per pax, materials included | Says RM980 per participant; table charges 1 group x RM980 | RM16,500 per group + RM40 per pax materials |",
        "| HRD Corp | **Not stated** | Claimable, TP-PML-0412 | Claimable, TP-BSA-0187 |",
        f"| Grand total printed | RM{rm(p1[1][4])} | **RM{rm(p2[1][4])}** | RM{rm(p3[1][4])} |",
        f"| Grand total intended | RM{rm(p1[1][3])} | RM{rm(p2_total)} (RM{rm(p2_sub)} + RM{rm(p2_tax)} tax) | RM{rm(p3[1][3])} for one day |",
        "| Payment | 50% on confirmation, balance 30 days after | 30 days after | 30 days from invoice |",
        "",
        "## Seeded problems",
        "",
        "1. **Provider 1 does not state HRD Corp claimable status.** Policy 5.1 makes this a required item, so the "
        "quotation is incomplete. Action: ask the provider to confirm in writing. Also note the 50% deposit.",
        f"2. **Provider 2 mixes per-pax and per-group pricing.** The opening line says RM980 per participant, but the "
        f"table charges one group at RM980. The printed total (RM{rm(p2[1][4])}) is clearly not the real cost. At RM980 x 30 "
        f"the fee is RM{rm(p2_fee)} and the total RM{rm(p2_total)}. Action: request a revised quotation (policy 6.4). "
        "Do not use the corrected figure as if the vendor had confirmed it.",
        f"3. **Provider 3 quotes a one-day programme** against a two-day brief. Not like-for-like (policy 6.1). Its total "
        f"(RM{rm(p3[1][3])}) is below RM20,000, which can tempt people to think fewer quotes are needed. The policy "
        "values the whole requirement, and the requirement is two days.",
        "",
        "## Expected outcome",
        "",
        f"No quotation is ready to approve as it stands. On the stated figures Provider 2 is likely cheapest once "
        f"corrected (RM{rm(p2_total)} vs RM{rm(p1[1][3])}), subject to a revised quotation. Provider 1 needs written HRD "
        "Corp confirmation. Provider 3 must requote for two days or be excluded with a reason in the memo. Total is "
        "between RM20,000 and RM100,000, so HOD approval applies.",
        "",
        "Good capstone answers chase all three issues, show the Provider 2 correction as \"pending confirmation\", and "
        "say in the memo why the cheapest-looking quote (Provider 2 as printed, or Provider 3) isn't the real cheapest.",
        "",
    ]
    return "\n".join(lines)


# ---------------------------------------------------------------------------

def zip_folder(folder, zip_path):
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(folder.glob("*.pdf")):
            info = zipfile.ZipInfo(f.name, date_time=(2026, 10, 6, 12, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, f.read_bytes())


def main():
    ch4 = ROOT / "04-compare-the-quotations" / "sample-files"
    ch10 = ROOT / "10-capstone" / "sample-files"
    trainer = ROOT / "_trainer"
    for p in (ch4, ch10, trainer):
        p.mkdir(parents=True, exist_ok=True)

    laptop = [(v, build_quotation(v, ch4)) for v in LAPTOP_VENDORS]
    build_policy(ch4)
    training = [(v, build_quotation(v, ch10)) for v in TRAINING_VENDORS]
    build_policy(ch10)

    zip_folder(ch4, ch4.parent / "sample-files.zip")
    zip_folder(ch10, ch10.parent / "sample-files.zip")

    (trainer / "answer-key-laptop-purchase.md").write_text(laptop_key(laptop))
    (trainer / "answer-key-capstone.md").write_text(capstone_key(training))

    for v, (path, sub, tax, grand, shown) in laptop + training:
        flag = "" if shown == grand else f"  (printed {rm(shown)})"
        print(f"{path.relative_to(ROOT)}: subtotal {rm(sub)}, tax {rm(tax)}, total {rm(grand)}{flag}")


if __name__ == "__main__":
    main()
