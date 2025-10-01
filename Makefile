cv-pdf:
	npm install
	node scripts/render-cv.js

watch:
	python3 -m http.server -d src

