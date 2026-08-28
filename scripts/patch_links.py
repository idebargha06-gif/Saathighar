import pathlib

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent

# Link first "View Full Profile" button in find-ashrams to ashram-profile.html
content = (ROOT_DIR / 'find-ashrams.html').read_text(encoding='utf-8')
old = 'href="dashboard.html" class="btn btn-teal btn-sm">View Full Profile</a>'
new = 'href="ashram-profile.html" class="btn btn-teal btn-sm">View Full Profile</a>'
updated = content.replace(old, new, 1)  # only first occurrence
(ROOT_DIR / 'find-ashrams.html').write_text(updated, encoding='utf-8')
print('Done. Replacements made:', content.count(old))

