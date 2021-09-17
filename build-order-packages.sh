#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Order"'
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
echo 'Сборка модулей для приложения "Order"'
echo '-----------------------------------------'

cd ../../modules/order || return

echo '[--- Order main ---]'
cd  ./order-main && npx yarn build
echo '[--- Order main ---]'
cd  ../order-sign-in && npx yarn build

exit 0
