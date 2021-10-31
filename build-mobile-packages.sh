#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Mobile"'
echo '-------------------'

cd ./ui.packages || return

echo '[--- Application ---]'
cd  ./application && npx yarn build
echo '[--- Kit ---]'
cd ../mobile-kit && npx yarn build
echo '[--- HOC ---]'
cd ../hoc && npx yarn build
echo '[--- Notifications ---]'
cd ../notifications && npx yarn build
echo '[--- Menu ---]'
cd ../menu && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Mobile"'
echo '-----------------------------------------'

cd ../../modules/mobile || return

echo '[--- Client products ---]'
cd  ./main && npx yarn build
echo '[--- Client product ---]'
cd  ../product && npx yarn build
echo '[--- Client order ---]'
cd  ../order && npx yarn build

exit 0
