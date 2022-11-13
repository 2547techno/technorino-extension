rm -rf out/v2
mkdir -p out/v2
cat manifests/base.json manifests/v2.json | json --merge > out/v2/manifest.json
cp -r src/ out/v2/src
cp -r icons/ out/v2/icons
cd out/v2
zip out.zip . -r