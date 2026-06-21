#!/usr/bin/env python3
"""
Clean Notion markdown exports for the portfolio site.
Strips images, question blocks, title headings, and subpage links.

Usage:
  python clean_notion.py input_folder output_folder

Example:
  python clean_notion.py ./notion_export ./public/notes/ml-specialization
  
It processes all .md files in the input folder (and subfolders).
"""

import re
import sys
import os

def clean_notion_export(text):
    # Strip image lines
    text = re.sub(r'!\[.*?\]\(.*?\)\n?', '', text)
    
    # Strip empty lines left by image removal
    text = re.sub(r'^\s*$\n', '\n', text, flags=re.MULTILINE)
    
    # Strip subpage links (lines that are just a link to another .md file)
    text = re.sub(r'^\[.*?\]\(.*?\.md\)\s*$\n?', '', text, flags=re.MULTILINE)
    
    # Remove question/quiz blocks
    lines = text.split('\n')
    result = []
    in_q = False
    for line in lines:
        s = line.strip()
        if re.match(r'^(Question[s]?|Quiz)\s*:?\s*$', s, re.IGNORECASE):
            in_q = True
            continue
        if in_q:
            is_q_item = (
                bool(re.match(r'^[-*]?\s*\[[ x]\]', s)) or
                bool(re.match(r'^-\s', s)) or
                s == ''
            )
            if is_q_item or s == '':
                continue
            else:
                in_q = False
                result.append(line)
        else:
            result.append(line)
    text = '\n'.join(result)
    
    # Remove the # title line (first heading)
    text = re.sub(r'^# .+\n+', '', text)
    
    # Clean excess blank lines
    text = re.sub(r'\n{3,}', '\n\n', text).strip()
    
    return text


def process_folder(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    
    count = 0
    for root, dirs, files in os.walk(input_folder):
        for fname in sorted(files):
            if not fname.endswith('.md'):
                continue
            
            input_path = os.path.join(root, fname)
            
            with open(input_path, 'r', encoding='utf-8') as f:
                raw = f.read()
            
            cleaned = clean_notion_export(raw)
            
            # Generate a clean output filename
            # Remove the Notion ID hash from the filename
            clean_name = re.sub(r'_[a-f0-9]{32}', '', fname)
            # Convert to lowercase, replace spaces with dashes
            clean_name = clean_name.lower().replace(' ', '-').replace('_', '-')
            # Clean up double dashes
            clean_name = re.sub(r'-{2,}', '-', clean_name)
            
            output_path = os.path.join(output_folder, clean_name)
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            
            print(f"  {fname}")
            print(f"    -> {clean_name} ({len(cleaned)} chars)")
            count += 1
    
    print(f"\nDone: {count} files processed")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python clean_notion.py <input_folder> <output_folder>")
        print("Example: python clean_notion.py ./notion_export ./cleaned_notes")
        sys.exit(1)
    
    input_folder = sys.argv[1]
    output_folder = sys.argv[2]
    
    if not os.path.isdir(input_folder):
        print(f"Error: {input_folder} is not a directory")
        sys.exit(1)
    
    print(f"Input:  {input_folder}")
    print(f"Output: {output_folder}")
    print()
    
    process_folder(input_folder, output_folder)
