class UserMailer < ApplicationMailer
  def account_deletion_confirmation(user)
    @user = user
    mail(to: @user.email, subject: '退会手続きが完了しました')
  end
end
