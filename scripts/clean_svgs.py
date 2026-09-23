import re
import os

def clean_svg(svg_path):
    if not os.path.exists(svg_path):
        return
    with open(svg_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove XML declaration if duplicated
    content = re.sub(r'<\?xml[^>]*\?>\s*', '', content)
    # Replace ns0:, ns1:, ns2:
    content = content.replace('ns0:', '').replace(':ns0', '')
    content = content.replace('xmlns:ns0="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg"')
    content = content.replace('xmlns:ns1="http://www.inkscape.org/namespaces/inkscape"', '')
    content = content.replace('xmlns:ns2="http://www.w3.org/1999/xlink"', 'xmlns:xlink="http://www.w3.org/1999/xlink"')
    content = content.replace('ns2:href=', 'xlink:href=')
    content = content.replace('ns1:groupmode="layer" ns1:label="Layer 1"', '')
    
    clean = '<?xml version="1.0" encoding="utf-8"?>\n' + content.strip()
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(clean)
    print(f'Cleaned {svg_path}')

for p in [
    'public/images/logo.svg',
    'public/images/logo-dark.svg',
    'public/images/icon.svg',
    'public/icon.svg',
    'app/icon.svg',
    'public/logo.svg',
    'public/logo-dark.svg'
]:
    clean_svg(p)
