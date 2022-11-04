rm -rf out
mkdir out
cp manifest.json out/manifest.json
cp -r src/ out/src
cp -r icons/ out/icons
cd out
zip out.zip . -r