#!/bin/bash
set -e

# MySQLサーバーが起動するまで待機
until nc -z -v -w30 db 3306; do
  echo 'Waiting for MySQL...'
  sleep 1
done

echo "MySQL is up - executing command"

# Remove a potentially pre-existing server.pid for Rails.
rm -f /kyo-zai/tmp/pids/server.pid

if [ "${RAILS_ENV}" = "production" ]
then
  # デプロイ初回のみ実行
  # bundle exec rails db:create
  bundle exec rails db:migrate
  # bundle exec rails db:seed RAILS_ENV=production
else
  # 開発環境では、データベースのリセットも実行する
  bundle exec rails db:create
  bundle exec rails db:migrate
  # bundle exec rails db:reset DISABLE_DATABASE_ENVIRONMENT_CHECK=1
fi

# DockerfileのCMDで指定されたコマンド（この場合、bundle exec unicorn -p 3000 -c /kyo-zai/config/unicorn.rb -E production）が実行され、RailsアプリケーションがUnicornサーバー上で起動される
exec "$@"
