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
echo '[--- Tabs ---]'
cd ../tabs && npx yarn build
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

echo '[--- Admin oder ---]'
cd  ./admin-order && npx yarn build
echo '[--- Admin sign in ---]'
cd  ../admin-sign-in && npx yarn build

exit 0
