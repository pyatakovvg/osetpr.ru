#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Admin"'
echo '-------------------'

cd ./ui.packages || return

echo '[--- Application ---]'
cd  ./application && npx yarn build
echo '[--- Dialog ---]'
cd ../dialog && npx yarn build
echo '[--- Notifications ---]'
cd ../notifications && npx yarn build
echo '[--- Table ---]'
cd ../table && npx yarn build
echo '[--- Kit ---]'
cd ../admin-kit && npx yarn build
echo '[--- HOC ---]'
cd ../hoc && npx yarn build
echo '[--- Editor ---]'
cd ../editor && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Admin"'
echo '-----------------------------------------'

cd ../../modules/admin || return

echo '[--- Admin main ---]'
cd  ./admin-main && npx yarn build
echo '[--- Admin order ---]'
cd  ../admin-order && npx yarn build
echo '[--- Admin orders ---]'
cd  ../admin-orders && npx yarn build
echo '[--- Admin plan ---]'
cd  ../admin-plan && npx yarn build
echo '[--- Admin plans ---]'
cd  ../admin-plans && npx yarn build
echo '[--- Admin customers ---]'
cd  ../admin-customers && npx yarn build
echo '[--- Admin product ---]'
cd  ../admin-product && npx yarn build
echo '[--- Admin products ---]'
cd  ../admin-products && npx yarn build
echo '[--- Admin gallery ---]'
cd  ../admin-gallery && npx yarn build
echo '[--- Admin customer ---]'
cd  ../admin-customer && npx yarn build
echo '[--- Admin customers ---]'
cd  ../admin-customers && npx yarn build
echo '[--- Admin comments ---]'
cd  ../admin-comments && npx yarn build
echo '[--- Admin sign in ---]'
cd  ../admin-sign-in && npx yarn build

exit 0
