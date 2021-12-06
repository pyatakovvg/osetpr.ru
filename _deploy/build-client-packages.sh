#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Client"'
echo '-------------------'

cd ./ui.packages || return

echo '[--- Kit ---]'
cd ./client-kit && npx yarn build
echo '[--- Dialog ---]'
cd ../client-dialog && npx yarn build
echo '[--- Application ---]'
cd  ../client-application && npx yarn build
echo '[--- Notifications ---]'
cd ../client-notifications && npx yarn build

echo '[--- HOC ---]'
cd ../hoc && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Client"'
echo '-----------------------------------------'

cd ../../modules/client || return

echo '[--- Client main ---]'
cd  ./client-main && npx yarn build
echo '[--- Client product ---]'
cd  ../client-product && npx yarn build
echo '[--- Client order ---]'
cd  ../client-order && npx yarn build
echo '[--- Client order draft ---]'
cd  ../client-order-draft && npx yarn build

exit 0
