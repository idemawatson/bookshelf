#!/bin/bash
sed -i -e 's|\(VUE_APP_FIREBASE_API_KEY\)|\1_TEST|g' \
-e 's|\(VUE_APP_FIREBASE_AUTH_DOMAIN\)|\1_TEST|g' \
-e 's|\(VUE_APP_FIREBASE_DB_URL\)|\1_TEST|g' \
-e 's|\(VUE_APP_FIREBASE_PROJECT_ID\)|\1_TEST|g' \
-e 's|\(VUE_APP_FIREBASE_STORAGE_BUCKET\)|\1_TEST|g' \
-e 's|\(VUE_APP_FIREBASE_MESSAGESENDER_ID\)|\1_TEST|g' \
-e 's|\(VUE_APP_FIREBASE_APP_ID\)|\1_TEST|g' \
src/plugins/firebase.js
npm run test
sed -i -e 's|_TEST||g' \
src/plugins/firebase.js
