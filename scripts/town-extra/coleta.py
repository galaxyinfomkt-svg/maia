# Collects extra public, verifiable facts for the 109 towns -> scripts/town-extra/town-extra.json
# Sources (all public, no API key):
#   Census Reporter API, ACS 2020-2024 5-year: B25040 heating fuel, B25077 median value, B25024 units in structure
#   MassGIS / Massachusetts Historical Commission inventory (MACRIS): counts by designation, architectural styles, dates,
#     named local historic districts (LHD) and National Register districts (NRDIS)
#   MassGIS electricity and natural-gas provider layers
#   NOAA Regional Climate Centers ACIS GridData (PRISM grid 21), 1991-2020 normals at the town centre
# Usage: python scripts/town-extra/coleta.py   (polite: 1 request at a time, short pauses)
import json, os, re, sys, time, urllib.parse, urllib.request
from collections import Counter

AQ = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQ, "..", ".."))
UA = {"User-Agent": "maia-town-facts/1.0 (site content research)"}
OUT = os.path.join(AQ, "town-extra.json")


def get(url, data=None, tent=4):
    for t in range(tent):
        try:
            req = urllib.request.Request(url, data=json.dumps(data).encode() if data else None,
                                         headers=dict(UA, **({"Content-Type": "application/json"} if data else {})))
            with urllib.request.urlopen(req, timeout=90) as r:
                return json.loads(r.read())
        except Exception as e:
            print("   retry", t, e, flush=True); time.sleep(5 * (t + 1))
    raise RuntimeError("failed " + url)


# towns: slug, name, county
src = open(os.path.join(RAIZ, "src", "lib", "cities.ts"), encoding="utf-8").read()
facts = open(os.path.join(RAIZ, "src", "lib", "city-facts.ts"), encoding="utf-8").read()
TOWNS = []
for m in re.finditer(r"name: '([^']+)',\s*slug: '([a-z-]+)'", src):
    TOWNS.append({"name": m.group(1), "slug": m.group(2)})
if len(TOWNS) != 109:
    TOWNS = []
    for m in re.finditer(r"slug: '([a-z-]+)'", src):
        TOWNS.append({"slug": m.group(1)})
    for m, t in zip(re.finditer(r"name: '([^']+)'", src), TOWNS): t["name"] = m.group(1)
coords = {m.group(1): (m.group(2), float(m.group(3)), float(m.group(4)))
          for m in re.finditer(r"'([a-z-]+)': \{ county: '(\w+)', coords: \[([-\d.]+), ([-\d.]+)\]", facts)}
for t in TOWNS: t["county"], t["lat"], t["lon"] = coords[t["slug"]]
print(len(TOWNS), "towns", flush=True)
res = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
for t in TOWNS: res.setdefault(t["slug"], {"name": t["name"], "county": t["county"]})

# ── 1. Census (one call per county, all county subdivisions)
FIPS = {"Middlesex": "25017", "Worcester": "25027", "Norfolk": "25021", "Essex": "25009"}
if not all("census" in res[t["slug"]] for t in TOWNS):
    for cty, f in FIPS.items():
        d = get("https://api.censusreporter.org/1.0/data/show/acs2024_5yr?table_ids=B25040,B25077,B25024&geo_ids=060|05000US" + f)
        for gid, g in d["geography"].items():
            nm = g["name"].split(",")[0]
            nm = re.sub(r" (town|city|Town city)$", "", nm).strip()
            for t in TOWNS:
                if t["county"] == cty and t["name"].lower() == nm.lower():
                    v = lambda tab, k: d["data"][gid][tab]["estimate"].get(k)
                    tot = v("B25040", "B25040001") or 0
                    fuel = {"gas": v("B25040", "B25040002"), "bottled": v("B25040", "B25040003"), "electric": v("B25040", "B25040004"),
                            "oil": v("B25040", "B25040005"), "coal": v("B25040", "B25040006"), "wood": v("B25040", "B25040007"),
                            "solar": v("B25040", "B25040008"), "other": v("B25040", "B25040009"), "none": v("B25040", "B25040010")}
                    u = lambda k: v("B25024", k) or 0
                    allu = u("B25024001")
                    res[t["slug"]]["census"] = {
                        "heatedHomes": tot, "fuel": fuel, "medianValue": v("B25077", "B25077001"),
                        "units": {"detached": u("B25024002"), "attached": u("B25024003"), "two": u("B25024004"),
                                  "threeFour": u("B25024005"), "fivePlus": u("B25024006") + u("B25024007") + u("B25024008") + u("B25024009"),
                                  "mobile": u("B25024010"), "total": allu}}
        print("census", cty, flush=True); time.sleep(2)
    json.dump(res, open(OUT, "w", encoding="utf-8"), indent=1)
miss = [t["slug"] for t in TOWNS if "census" not in res[t["slug"]]]
print("census missing:", miss, flush=True)

# ── 2. Utilities (one call each)
MG = "https://arcgisserver.digital.mass.gov/arcgisserver/rest/services/AGOL/"
if not all("electric" in res[t["slug"]] for t in TOWNS):
    for lay, fld, key in (("ElectricityProviders", "ELEC", "electric"), ("NatGasProviders", "GAS", "gas")):
        d = get(MG + lay + "/FeatureServer/0/query?" + urllib.parse.urlencode({"where": "1=1", "outFields": "TOWN," + fld, "returnGeometry": "false", "f": "json"}))
        tab = {f["attributes"]["TOWN"].strip().upper(): f["attributes"][fld] for f in d["features"]}
        for t in TOWNS: res[t["slug"]][key] = tab.get(t["name"].upper())
        time.sleep(2)
    json.dump(res, open(OUT, "w", encoding="utf-8"), indent=1)

# ── 3. MHC inventory per town (points: styles/dates/designations; areas: district names)
def ano(s):
    m = re.search(r"(1[6-9]\d\d|20[0-2]\d)", s or "")
    return int(m.group(1)) if m else None
for t in TOWNS:
    r = res[t["slug"]]
    if "mhc" in r: continue
    nm = t["name"].replace("'", "''")
    pts, off = [], 0
    while True:
        q = {"where": "TOWN_NAME='%s'" % nm, "outFields": "DESIGNATIO,CONSTRUCTI,ARCHITECTU,TYPE,DEMOLISHED,USE_TYPE",
             "returnGeometry": "false", "resultOffset": off, "resultRecordCount": 2000, "f": "json"}
        d = get(MG + "MHC_Inventory/FeatureServer/1/query?" + urllib.parse.urlencode(q))
        fs = [f["attributes"] for f in d.get("features", [])]
        pts += fs
        if len(fs) < 2000: break
        off += 2000; time.sleep(1)
    time.sleep(1)
    q = {"where": "TOWN_NAME='%s'" % nm, "outFields": "DESIGNATIO,HISTORIC_N,COMMON_NAM,TYPE", "returnGeometry": "false", "f": "json"}
    ar = [f["attributes"] for f in get(MG + "MHC_Inventory/FeatureServer/2/query?" + urllib.parse.urlencode(q)).get("features", [])]
    vivos = [p for p in pts if not (p.get("DEMOLISHED") or "").strip().upper().startswith("Y")]
    anos = [a for a in (ano(p.get("CONSTRUCTI")) for p in vivos) if a]
    estilos = Counter()
    for p in vivos:
        for e in re.split(r";|,|/", p.get("ARCHITECTU") or ""):
            e = e.strip()
            if e and not re.match(r"(?i)(no style|other|not determined|unknown|not researched)", e): estilos[e] += 1
    des = lambda p: (p.get("DESIGNATIO") or "")
    lhd = sorted({(a.get("HISTORIC_N") or a.get("COMMON_NAM") or "").strip() for a in ar if "LHD" in des(a)} - {""})
    nrd = sorted({(a.get("HISTORIC_N") or a.get("COMMON_NAM") or "").strip() for a in ar if "NRDIS" in des(a)} - {""})
    r["mhc"] = {"inventoried": len(vivos), "datedBefore1800": sum(a < 1800 for a in anos), "dated1800to1899": sum(1800 <= a < 1900 for a in anos),
                "dated1900to1949": sum(1900 <= a < 1950 for a in anos), "oldestYear": min(anos) if anos else None,
                "styles": estilos.most_common(6), "individualNR": sum("NRIND" in des(p) for p in vivos),
                "lhdDistricts": lhd[:12], "nrDistricts": nrd[:12], "areas": len(ar)}
    print("mhc", t["slug"], len(vivos), len(lhd), len(nrd), flush=True)
    json.dump(res, open(OUT, "w", encoding="utf-8"), indent=1)
    time.sleep(1)

# ── 4. Climate normals 1991-2020 at the town centre (ACIS GridData, PRISM grid)
for t in TOWNS:
    r = res[t["slug"]]
    if "climate" in r: continue
    body = {"loc": "%s,%s" % (t["lon"], t["lat"]), "grid": "21", "sdate": "1991", "edate": "2020",
            "elems": [{"name": "mint", "interval": "yly", "duration": "yly", "reduce": "cnt_le_32"},
                      {"name": "maxt", "interval": "yly", "duration": "yly", "reduce": "cnt_le_32"},
                      {"name": "pcpn", "interval": "yly", "duration": "yly", "reduce": "sum"},
                      {"name": "mint", "interval": "yly", "duration": "yly", "reduce": "cnt_le_0"}]}
    d = get("https://data.rcc-acis.org/GridData", body)
    rows = [x for x in d.get("data", []) if all(isinstance(v, (int, float)) and v > -900 for v in x[1:])]
    if rows:
        med = lambda i: round(sum(x[i] for x in rows) / len(rows), 1)
        r["climate"] = {"years": len(rows), "frostNights": med(1), "iceDays": med(2), "precipIn": med(3), "zeroNights": med(4),
                        "frostNightsMin": min(x[1] for x in rows), "frostNightsMax": max(x[1] for x in rows)}
    print("acis", t["slug"], r.get("climate"), flush=True)
    json.dump(res, open(OUT, "w", encoding="utf-8"), indent=1)
    time.sleep(1)
print("done", OUT)
