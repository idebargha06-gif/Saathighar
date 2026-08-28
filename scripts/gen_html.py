import sys, json
from pathlib import Path
from graphify.build import build_from_json
from graphify.export import to_html

ROOT_DIR = Path(__file__).resolve().parent.parent

extraction_path = ROOT_DIR / '.graphify_extract.json'
analysis_path = ROOT_DIR / '.graphify_analysis.json'
labels_path = ROOT_DIR / '.graphify_labels.json'

extraction = json.loads(extraction_path.read_text())
analysis = json.loads(analysis_path.read_text())
labels_raw = json.loads(labels_path.read_text()) if labels_path.exists() else {}

G = build_from_json(extraction)
communities = {int(k): v for k, v in analysis['communities'].items()}
labels = {int(k): v for k, v in labels_raw.items()}

if G.number_of_nodes() > 5000:
    print('Graph has ' + str(G.number_of_nodes()) + ' nodes - too large for HTML viz. Use Obsidian vault instead.')
else:
    output_html = ROOT_DIR / 'graphify-out' / 'graph.html'
    to_html(G, communities, str(output_html), community_labels=labels or None)
    print('graph.html written - open in any browser, no server needed')
