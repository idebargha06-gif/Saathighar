import sys, json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent

ast = json.loads((ROOT_DIR / '.graphify_ast.json').read_text())
sem = json.loads((ROOT_DIR / '.graphify_semantic.json').read_text())

seen = {n['id'] for n in ast['nodes']}
merged_nodes = list(ast['nodes'])
for n in sem['nodes']:
    if n['id'] not in seen:
        merged_nodes.append(n)
        seen.add(n['id'])

merged_edges = ast['edges'] + sem['edges']
merged_hyperedges = sem.get('hyperedges', [])
merged = {
    'nodes': merged_nodes,
    'edges': merged_edges,
    'hyperedges': merged_hyperedges,
    'input_tokens': sem.get('input_tokens', 0),
    'output_tokens': sem.get('output_tokens', 0),
}
(ROOT_DIR / '.graphify_extract.json').write_text(json.dumps(merged, indent=2))
ast_count = len(ast['nodes'])
sem_count = len(sem['nodes'])
print('Merged: ' + str(len(merged_nodes)) + ' nodes, ' + str(len(merged_edges)) + ' edges (' + str(ast_count) + ' AST + ' + str(sem_count) + ' semantic)')
