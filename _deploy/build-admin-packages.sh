#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Admin"'
echo '-------------------'

cd ../ui.packages || return

echo '[--- Application ---]'
cd  ./admin-application && npx yarn build
echo '[--- Dialog ---]'
cd ../admin-dialog && npx yarn build
echo '[--- Notifications ---]'
cd ../admin-notifications && npx yarn build
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
cd  ./main && npx yarn build
echo '[--- Admin order ---]'
cd  ../order && npx yarn build
echo '[--- Admin orders ---]'
cd  ../orders && npx yarn build
echo '[--- Admin plan ---]'
cd  ../plan && npx yarn build
echo '[--- Admin plans ---]'
cd  ../plans && npx yarn build
echo '[--- Admin customers ---]'
cd  ../customers && npx yarn build
echo '[--- Admin product ---]'
cd  ../product && npx yarn build
echo '[--- Admin products ---]'
cd  ../products && npx yarn build
echo '[--- Admin gallery ---]'
cd  ../gallery && npx yarn build
echo '[--- Admin customer ---]'
cd  ../customer && npx yarn build
echo '[--- Admin customers ---]'
cd  ../customers && npx yarn build
echo '[--- Admin comments ---]'
cd  ../comments && npx yarn build
echo '[--- Admin settings ---]'
cd  ../settings && npx yarn build
echo '[--- Admin sign in ---]'
cd  ../sign-in && npx yarn build
echo '[--- Admin group ---]'
cd  ../group && npx yarn build
echo '[--- Admin category ---]'
cd  ../category && npx yarn build

exit 0
