5.times do |n|
  User.create!(
    # id: "id_#{n+1}",
    uid: "test_#{n+1}@example.com",
    provider: "provider_#{n+1}",
    email: "test_#{n+1}@example.com",
    name: "name_#{n+1}",
    password: "password"
    # nickname: "nickname_#{n+1}"
    # image?: "id_#{n+1}",
  )
end
