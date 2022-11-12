rm -rf out
mkdir out
cp src/manifest.json out/manifest.json
cp -r src/ out/src
cp -r src/icons/ out/icons
cd out
zip out.zip . -r