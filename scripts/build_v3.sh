rm -rf out/v3
mkdir -p out/v3
cat manifests/base.json manifests/v3.json | json --merge > out/v3/manifest.json
cp -r src/ out/v3/src
cp -r icons/ out/v3/icons
cd out/v3
zip out.zip . -r