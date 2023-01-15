5.times do |n|
  User.create!(
    # id: "id_#{n+1}",
    uid: "test_#{n}@example.com",
    provider: "provider_#{n}",
    email: "test_#{n}@example.com",
    name: "name_#{n}",
    password: "password"
    # nickname: "nickname_#{n+1}"
    # image?: "id_#{n+1}",
  )
end

5.times do |n|
  Material.create!(
    name: "教材_#{n}",
    description:"これは教材_#{n}の説明文です。"
  )
end
