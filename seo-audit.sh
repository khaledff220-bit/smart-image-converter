#!/data/data/com.termux/files/usr/bin/bash

cd ~/smart-image-converter || exit

FILE="index.html"

echo "=============================================="
echo "      SMART IMAGE CONVERTER SEO AUDIT"
echo "=============================================="

echo
echo "========== TITLE =========="
grep -oi '<title>.*</title>' "$FILE"

echo
echo "Title Length:"
grep -oP '(?<=<title>).*?(?=</title>)' "$FILE" | wc -m

echo
echo "========== DESCRIPTION =========="
grep -oi '<meta[^>]*name="description"[^>]*content="[^"]*"' "$FILE"

echo
echo "Description Length:"
grep -oP '(?<=name="description" content=").*?(?=")' "$FILE" | wc -m

echo
echo "========== KEYWORDS =========="
grep -oi '<meta[^>]*name="keywords"[^>]*content="[^"]*"' "$FILE"

echo
echo "========== CANONICAL =========="
grep -oi '<link[^>]*rel="canonical"[^>]*href="[^"]*"' "$FILE"

echo
echo "========== ROBOTS =========="
grep -oi '<meta[^>]*name="robots"[^>]*content="[^"]*"' "$FILE"

echo
echo "========== H1 =========="
grep -oi '<h1[^>]*>[^<]*' "$FILE"

echo
echo "========== H2 =========="
grep -oi '<h2[^>]*>[^<]*' "$FILE"

echo
echo "========== H3 =========="
grep -oi '<h3[^>]*>[^<]*' "$FILE"

echo
echo "========== KEYWORD FREQUENCY =========="
grep -RoiE \
'image converter|image to pdf|pdf converter|compress image|resize image|jpg to png|png to jpg|webp|heic|image compressor|convert image' \
"$FILE" | sort | uniq -c

echo
echo "========== WORDS USED IN TITLE & DESCRIPTION =========="
grep -oP '(?<=<title>).*?(?=</title>)|(?<=name="description" content=").*?(?=")' "$FILE" \
| tr '[:upper:]' '[:lower:]' \
| tr ' ' '\n' \
| sed 's/[^a-zA-Z0-9]//g' \
| awk 'length>2' \
| sort | uniq -c | sort -nr

echo
echo "========== Structured Data =========="
grep -c 'application/ld+json' "$FILE"

echo
echo "========== Open Graph =========="
grep -oi 'property="og:[^"]*"' "$FILE"

echo
echo "========== Twitter Cards =========="
grep -oi 'name="twitter:[^"]*"' "$FILE"

echo
echo "========== Images without ALT =========="
grep -n '<img' "$FILE" | grep -v 'alt='

echo
echo "========== Internal Links =========="
grep -oi '<a[^>]*href="[^"]*"' "$FILE" \
| grep -vE 'https?://' \
| wc -l

echo
echo "========== External Links =========="
grep -oi '<a[^>]*href="https[^"]*"' "$FILE" \
| wc -l

echo
echo "========== CSS Files =========="
grep -oi '<link[^>]*stylesheet[^>]*href="[^"]*"' "$FILE"

echo
echo "========== JS Files =========="
grep -oi '<script[^>]*src="[^"]*"' "$FILE"

echo
echo "========== Lazy Loading Images =========="
grep -c 'loading="lazy"' "$FILE"

echo
echo "========== Viewport =========="
grep -oi '<meta[^>]*name="viewport"[^>]*>'

echo
echo "=============================================="
echo "            END OF SEO REPORT"
echo "=============================================="
