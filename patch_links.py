import pathlib
R = pathlib.Path(r'c:\Projects\Saathighar')

# Link first "View Full Profile" button in find-ashrams to ashram-profile.html
content = (R / 'find-ashrams.html').read_text(encoding='utf-8')
old = 'href="dashboard.html" class="btn btn-teal btn-sm">View Full Profile</a>'
new = 'href="ashram-profile.html" class="btn btn-teal btn-sm">View Full Profile</a>'
updated = content.replace(old, new, 1)  # only first occurrence
(R / 'find-ashrams.html').write_text(updated, encoding='utf-8')
print('Done. Replacements made:', content.count(old))
