require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "dotenv/load"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module KyoZai
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.

    config.autoload_paths += ["#{config.root}/app/mailers"]

    # メールリンク押下後に遷移するURL
    # 新規登録後の認証メールURL
    config.confirm_success_url = if Rails.env.production?
                                   "https://tokushi-kyouzai.com/signin"
                                 else
                                   "http://localhost:3000/signin"
                                 end

    # パスワードリセットページのURL
    config.reset_password_url = if Rails.env.production?
                                  "https://tokushi-kyouzai.com/reset_password"
                                else
                                  "http://localhost:3000/reset_password"
                                end

    # トークンの有効期限切れURL
    config.expired_email_link_url = if Rails.env.production?
                                      "https://tokushi-kyouzai.com/expired_email_link"
                                    else
                                      "http://localhost:3000/expired_email_link"
                                    end

    config.api_only = true

    config.i18n.default_locale = :ja

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::ActiveRecordStore, key: '_interslice_session'
  end
end
