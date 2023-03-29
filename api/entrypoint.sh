#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /kyo-zai/tmp/pids/server.pid

# デプロイ初回のみ実行
bundle exec rails db:create
bundle exec rails db:reset DISABLE_DATABASE_ENVIRONMENT_CHECK=1

bundle exec rails db:migrate

# デプロイ初回のみ実行(デプロイ先の本番環境でDBに初期データを投入する)
bundle exec rails db:seed RAILS_ENV=production


# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
