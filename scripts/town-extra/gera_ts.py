# Builds src/lib/town-extra.ts (data) and src/lib/town-profiles.ts (researched paragraph + sources) for the 109 towns.
# Inputs: town-extra.json (coleta.py), energy-code.csv (mass.gov), cmr-snow-wind.json (cmr.py),
#         ../../../../dra ANA/CALAZANS LUMINA/_ghl_estudo/galaxy/maia-plano/cidades/<slug>.json (researched profiles)
import csv, glob, json, os, re, sys
AQ = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQ, "..", ".."))
PERFIS = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\RHAIDELINE\Downloads\dra ANA\CALAZANS LUMINA\_ghl_estudo\galaxy\maia-plano\cidades"

ex = json.load(open(os.path.join(AQ, "town-extra.json"), encoding="utf-8"))
ALIAS = {"West Boylston": "W. Boylston"}   # grafia da tabela do 780 CMR
cmr = json.load(open(os.path.join(AQ, "cmr-snow-wind.json"), encoding="utf-8"))
code = {r["Municipality"].strip().lower(): r for r in csv.DictReader(open(os.path.join(AQ, "energy-code.csv"), encoding="utf-8"))}
IOU = ("National Grid", "Eversource", "Unitil")


def iso(d):
    d = (d or "").strip()
    m = re.match(r"(\d+)/(\d+)/(\d{4})", d)
    return "%s-%02d-%02d" % (m.group(3), int(m.group(1)), int(m.group(2))) if m else None


def ts(v): return json.dumps(v, ensure_ascii=False)


linhas, faltas = [], []
for slug, v in sorted(ex.items()):
    nm = v["name"]; c = v.get("census") or {}; m = v.get("mhc") or {}; cl = v.get("climate")
    ec = code.get(nm.lower()); sw = cmr.get(nm) or cmr.get(ALIAS.get(nm, ""))
    if not ec: faltas.append("energy " + nm)
    if not sw: faltas.append("cmr " + nm)
    if not m: faltas.append("mhc " + nm)
    if not cl: faltas.append("climate " + nm)
    elec = v.get("electric")
    d = {
        "census": {"heated": c.get("heatedHomes"), "fuel": c.get("fuel"), "medianValue": c.get("medianValue"), "units": c.get("units")},
        "electric": elec, "gas": v.get("gas"), "mlp": bool(elec) and not any(x in elec for x in IOU),
        "energy": {"base": bool(ec and ec.get("Base Code", "").strip()), "stretch": iso(ec.get("Stretch Code Effective Date")) if ec else None,
                   "specialized": iso(ec.get("Specialized Code Effective Date")) if ec else None} if ec else None,
        "cmr": sw,
        "mhc": {"inventoried": m.get("inventoried", 0), "before1800": m.get("datedBefore1800", 0), "c19": m.get("dated1800to1899", 0),
                "early20": m.get("dated1900to1949", 0), "oldest": m.get("oldestYear"), "styles": m.get("styles", []),
                "individualNR": m.get("individualNR", 0), "lhd": m.get("lhdDistricts", []), "nr": m.get("nrDistricts", [])} if m else None,
        "climate": cl,
    }
    linhas.append("  %s: %s," % (ts(slug), ts(d)))

cab = '''/* ═══════════════════════════════════════════════════════════════════════
   TOWN EXTRA — more measured facts per town, each from a public source.

   census   US Census Bureau, ACS 2020–2024 5-year (B25040 house heating fuel,
            B25077 median value, B25024 units in structure), via Census Reporter.
   electric/gas  MassGIS electricity and natural-gas provider layers.
            mlp = served by a municipal light plant rather than an investor-owned utility.
   energy   Mass. DOER, "Building Energy Code Adoption by Municipality" (CSV of 2026-11-03):
            dates the Stretch and Municipal Opt-in Specialized codes took effect.
   cmr      780 CMR 10th ed., Table 301.2(2): ground snow load Pg, minimum flat-roof
            snow load Pf (psf), ultimate design wind speed Vult (mph).
   mhc      Massachusetts Historical Commission inventory (MACRIS) via MassGIS:
            surveyed buildings and areas, dated buildings, architectural styles,
            local historic districts (LHD, MGL c.40C) and National Register districts.
   climate  NOAA Regional Climate Centers (ACIS), PRISM grid at the town centre,
            yearly counts averaged over 1991–2020.

   Collected 2026-11-17 by scripts/town-extra. Regenerate rather than hand-edit.
   ═══════════════════════════════════════════════════════════════════════ */

export interface TownExtra {
  census: {
    heated: number;
    fuel: { gas: number; bottled: number; electric: number; oil: number; coal: number; wood: number; solar: number; other: number; none: number };
    medianValue: number | null;
    units: { detached: number; attached: number; two: number; threeFour: number; fivePlus: number; mobile: number; total: number };
  };
  electric: string | null;
  gas: string | null;
  mlp: boolean;
  energy: { base: boolean; stretch: string | null; specialized: string | null } | null;
  cmr: { pg: number; pf: number; vult: number } | null;
  mhc: { inventoried: number; before1800: number; c19: number; early20: number; oldest: number | null; styles: [string, number][]; individualNR: number; lhd: string[]; nr: string[] } | null;
  climate: { years: number; frostNights: number; iceDays: number; precipIn: number; zeroNights: number; frostNightsMin: number; frostNightsMax: number } | null;
}

export const TOWN_EXTRA: Record<string, TownExtra> = {
'''
open(os.path.join(RAIZ, "src", "lib", "town-extra.ts"), "w", encoding="utf-8").write(cab + "\n".join(linhas) + "\n};\n")

# researched profiles
perf = []
for f in sorted(glob.glob(os.path.join(PERFIS, "*.json"))):
    p = json.load(open(f, encoding="utf-8"))
    if p.get("slug") not in ex: continue
    fontes = []
    for x in p.get("facts", []):
        u = (x.get("source") or "").strip()
        if u.startswith("http") and u not in fontes: fontes.append(u)
    perf.append("  %s: { paragraph: %s, sources: %s, checked: %s }," % (ts(p["slug"]), ts(p["paragraph"].strip()), ts(fontes), ts(p.get("checked", "2026-11-17"))))
cab2 = '''/* Researched town profiles: one paragraph per town written from the sources listed
   (town websites, Massachusetts Historical Commission / MACRIS, National Register, mass.gov).
   Built by scripts/town-extra/gera_ts.py. Do not add a sentence without a source. */

export interface TownProfile { paragraph: string; sources: string[]; checked: string }

export const TOWN_PROFILES: Record<string, TownProfile> = {
'''
open(os.path.join(RAIZ, "src", "lib", "town-profiles.ts"), "w", encoding="utf-8").write(cab2 + "\n".join(perf) + "\n};\n")
print("towns", len(linhas), "profiles", len(perf), "missing", faltas[:20], len(faltas))
