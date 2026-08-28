import sys, json
from pathlib import Path
from graphify.build import build_from_json
from graphify.cluster import score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate

ROOT_DIR = Path(__file__).resolve().parent.parent

extraction = json.loads((ROOT_DIR / '.graphify_extract.json').read_text())
detection  = json.loads((ROOT_DIR / '.graphify_detect.json').read_text())
analysis   = json.loads((ROOT_DIR / '.graphify_analysis.json').read_text())

G = build_from_json(extraction)
communities = {int(k): v for k, v in analysis['communities'].items()}
cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}

# Generate meaningful labels based on node analysis
labels = {
    0: "User Interface",
    1: "CSS & Styling",
    2: "Build System",
    3: "Core Features",
    4: "Accessibility",
    5: "Portals",
    6: "Reviews",
    7: "Mission",
    8: "Helpers",
    9: "Navigation",
    10: "Finder"
}

questions = suggest_questions(G, communities, labels)
report = generate(G, communities, cohesion, labels, analysis['gods'], analysis['surprises'], detection, tokens, str(ROOT_DIR), suggested_questions=questions)
(ROOT_DIR / 'graphify-out' / 'GRAPH_REPORT.md').write_text(report, encoding='utf-8')
(ROOT_DIR / '.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}))
print('Report updated with community labels')
