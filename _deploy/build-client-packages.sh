#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Client"'
echo '-------------------'

cd ./ui.packages || return

echo '[--- Application ---]'
cd  ./application && npx yarn build
echo '[--- Dialog ---]'
cd ../client-dialog && npx yarn build
echo '[--- Notifications ---]'
cd ../notifications && npx yarn build
echo '[--- Table ---]'
cd ../table && npx yarn build
echo '[--- Kit ---]'
cd ../client-kit && npx yarn build
echo '[--- HOC ---]'
cd ../hoc && npx yarn build
echo '[--- Editor ---]'
cd ../editor && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Client"'
echo '-----------------------------------------'

cd ../../modules/client || return

echo '[--- Client main ---]'
cd  ./client-main && npx yarn build

exit 0
