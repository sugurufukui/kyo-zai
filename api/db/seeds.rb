5.times do |n|
  User.create!(
    name: "name_#{n + 1}",
    email: "test_#{n + 1}@example.com",
    password: "password",
    password_confirmation: "password"
  )
end

10.times do |n|
  user1 = User.find(1)
  Material.create!(
    name: "教材#{n + 1}",
    description: "これは教材#{n + 1}の説明文です。",
    image: File.open("./db/fixtures/image0.jpg"),
    user: user1
  )
end
10.times do |n|
  user2 = User.find(2)
  Material.create!(
    name: "教材#{n + 11}",
    description: "これは教材#{n + 11}の説明文です。",
    image: File.open("./db/fixtures/image0.jpg"),
    user: user2
  )
end
10.times do |n|
  user3 = User.find(3)
  Material.create!(
    name: "教材#{n + 21}",
    description: "これは教材#{n + 21}の説明文です。",
    image: File.open("./db/fixtures/image0.jpg"),
    user: user3
  )
end
10.times do |n|
  user4 = User.find(4)
  Material.create!(
    name: "教材#{n + 31}",
    description: "これは教材#{n + 31}の説明文です。",
    image: File.open("./db/fixtures/image0.jpg"),
    user: user4
  )
end
10.times do |n|
  user5 = User.find(5)
  Material.create!(
    name: "教材#{n + 41}",
    description: "これは教材#{n + 41}の説明文です。",
    image: File.open("./db/fixtures/image0.jpg"),
    user: user5
  )
