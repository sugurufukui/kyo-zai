5.times do |n|
  User.create!(
    name: "name_#{n+1}",
    email: "test_#{n+1}@example.com",
    password: "password",
    password_confirmation: "password"
    # image?: "id_#{n+1}",
  )
end

user1 = User.find(1)
Material.create!(
  name: "教材1",
    description:"これは教材1の説明文です。",
    image: File.open("./db/fixtures/image1.jpg"),
    user: user1
)
Material.create!(
  name: "教材2",
    description:"これは教材2の説明文です。",
    image: File.open("./db/fixtures/image2.jpg"),
    user: user1
)

user2 = User.find(2)
Material.create!(
  name: "教材3",
    description:"これは教材3の説明文です。",
    image: File.open("./db/fixtures/image3.jpg"),
    user: user2
)
Material.create!(
  name: "教材4",
    description:"これは教材4の説明文です。",
    image: File.open("./db/fixtures/image4.jpg"),
    user: user2
)

user3 = User.find(3)
Material.create!(
  name: "教材5",
    description:"これは教材5の説明文です。",
    image: File.open("./db/fixtures/image3.jpg"),
    user: user3
)
Material.create!(
  name: "教材6",
    description:"これは教材6の説明文です。",
    image: File.open("./db/fixtures/image4.jpg"),
    user: user3
)

user4 = User.find(4)
Material.create!(
  name: "教材7",
    description:"これは教材7の説明文です。",
    image: File.open("./db/fixtures/image3.jpg"),
    user: user4
)
Material.create!(
  name: "教材8",
    description:"これは教材8の説明文です。",
    image:File.open("./db/fixtures/image4.jpg"),
    user: user4
)
