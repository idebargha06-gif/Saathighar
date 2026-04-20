import os
import re

def update_html_file(file_path, folder_depth):
    """Update paths in HTML file based on folder depth"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Update CSS paths
    content = re.sub(r'href="assets/css/', f'href={"../" * folder_depth}assets/css/', content)
    
    # Update image paths
    content = re.sub(r'src="assets/images/', f'src={"../" * folder_depth}assets/images/', content)
    
    # Update JS paths
    content = re.sub(r'src="assets/js/', f'src={"../" * folder_depth}assets/js/', content)
    
    # Update index.html links to public folder
    content = re.sub(r'href="index.html"', 'href="../public/index.html"', content)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Update ashram portal files (depth 1)
ashram_folder = 'portals/ashram'
for file in os.listdir(ashram_folder):
    if file.endswith('.html'):
        update_html_file(os.path.join(ashram_folder, file), 1)
        print(f'Updated {file}')

# Update family portal files (depth 1)
family_folder = 'portals/family'
for file in os.listdir(family_folder):
    if file.endswith('.html'):
        update_html_file(os.path.join(family_folder, file), 1)
        print(f'Updated {file}')

# Update volunteer portal files (depth 1)
volunteer_folder = 'portals/volunteer'
for file in os.listdir(volunteer_folder):
    if file.endswith('.html'):
        update_html_file(os.path.join(volunteer_folder, file), 1)
        print(f'Updated {file}')

# Update elderly portal files (depth 1)
elderly_folder = 'portals/elderly'
for file in os.listdir(elderly_folder):
    if file.endswith('.html'):
        update_html_file(os.path.join(elderly_folder, file), 1)
        print(f'Updated {file}')

# Update public files (depth 0 - no change needed for assets)
public_folder = 'public'
for file in os.listdir(public_folder):
    if file.endswith('.html'):
        print(f'Checked {file} (no changes needed)')

print('Path updates complete!')
