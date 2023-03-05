require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

# 画像名に日本語が使えるようにする
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

CarrierWave.configure do |config|
  if Rails.env.production? # 本番環境の場合はS3へアップロード
    # config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/tokushi_kyouzai'

    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory = 'tokushi-kyouzai' # バケット名
    config.fog_public = false
    config.cache_storage = :fog

    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV.fetch('S3_ACCESS_KEY_ID', nil), # アクセスキー
      aws_secret_access_key: ENV.fetch('S3_SECRET_ACCESS_KEY', nil), # シークレットアクセスキー
      region: 'ap-northeast-1',  # アジアパシフィック(東京)
      path_style: true
    }
  else # 本番環境以外の場合はアプリケーション内にアップロード
    config.storage :file
    config.cache_storage = :file
    config.enable_processing = false if Rails.env.test?
    config.asset_host = "http://localhost:3001"

  end
end
