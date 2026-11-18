# 780 CMR (10th ed.) Table 301.2(2): ground snow load Pg, minimum flat-roof snow load Pf (psf), ultimate wind speed Vult (mph)
import fitz, json, re
doc = fitz.open("780cmr-ch3.pdf")
txt = "\n".join(p.get_text() for p in doc)
txt = txt[txt.find("Vult (mph)"):]
lin = [l.strip() for l in txt.split("\n") if l.strip()]
out, i = {}, 0
while i + 3 < len(lin):
    a, b, c, d = lin[i:i + 4]
    if re.fullmatch(r"\d{2}", b) and re.fullmatch(r"\d{2}", c) and re.fullmatch(r"\d{3}", d) and re.match(r"[A-Z][A-Za-z .'-]+", a):
        nome = re.sub(r"\d+$", "", re.sub(r"\s*\(.*\)", "", a)).strip()
        out[nome] = {"pg": int(b), "pf": int(c), "vult": int(d)}; i += 4
    else: i += 1
json.dump(out, open("cmr-snow-wind.json", "w", encoding="utf-8"), indent=0)
print(len(out), out.get("Charlton"), out.get("Worcester"), out.get("Framingham"))
