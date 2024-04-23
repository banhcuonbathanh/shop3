------------------------------ common ----------------

cd 2.2.golang
go run main.go

---

cd admin
npm run dev

---

cd nextjs
npm run dev

------------------------------ docker compose ----------------
docker network ls
docker network inspect b938f5ef7abd
docker network rm b938f5ef7abd
docker network prune -- remove all networkds
docker network connect 6shop_app-network shop-postgres
docker network connect 6shop_app-network shop-golang
docker-compose up -d
docker-compose up postgres
docker-compose up next-app
docker-compose up go_app
docker-compose up admin-app
docker-compose logs -f next-app
docker compose watch
docker-compose -f docker-compose.dev.yml up --build
docker-compose up --build
docker-compose build go_app
docker-compose up --build postgres
docker-compose up --build next-app

docker-compose up --build go_app
docker-compose up --build nginx
docker-compose down nginx
docker-compose down go_app
docker-compose down admin-app
docker-compose up --build admin-app
docker images
docker rmi 8cce42ce42a4

docker rmi $(docker images -a -q) -- delete all images
docker volume rm $(docker volume ls -q) -- delete all docker volume
docker rm $(docker ps -a -q) -- delete all container

docker ps -- check which docker is running

docker ps -a -- list all container
docker image prune
docker volume prune

6shop-next-app latest 59c6180b98d5 4 minutes ago 2.21GB

efd2cb75a21e

docker exec -it <container_id> sh ping shop-golang

next-app1 ping shop-golang
docker exec -it next-app1 sh apt-get update && apt-get install -y iputils-ping
curl http://localhost
curl http://localhost/test/
curl http://localhost/fastapi/
curl http://localhost/api/
curl http://next-app-admin:3001
curl http://localhost:8888/api/billboards
curl http://shop-golang:8888/api/billboards
curl http://shop-golang:8888/api/users/login
curl http://shop-golang:8888/api/blog-sub-des  
docker-compose down && docker rmi admin-app && docker-compose up --build admin-app

//=========
http://localhost:8888/ws/joinRoom/8ab2dff5-99b2-4828-a94c-34f038a604db?userId=2&username=admin@gmail.com
//=========
docker volume rm 6shop_postgres-data
//--------------------------- debug -----------------

       <Image
            src="/images_landingpage6/blob-shape.png"
            alt="blob background shape"
            width={200}
            height={500}
          />

//--------------------------- nenxt js start -----------------

npx create-next-app@13 shop-store --typescript --tailwind --eslint
npx shadcn-ui@latest init
npm install framer-motion
npm install zustand
npm install @radix-ui/react-slot
npm install react-hot-toast
npx shadcn-ui@latest add button

//--------------------------- git hub -----------------

git remote -v -- check git remote

next-app:
container_name: next-app1
build:
context: ./3.shop-store
dockerfile: Dockerfile
args:
DB_HOST: host-in-docker-compose-nexj-store
ports: - 3000:3000
networks: - app-network

    depends_on:
      - go_app
    environment:
      NEXT_PUBLIC_DB_HOST: environment-nextapp

rm -rf .git

//--------------------------- postgres -----------------
psql -U myuser -d mydatabase
\dt : list all table
\d billboards
\d order_items

--------------------------------------------- show data ---------------------------------------
SELECT \* FROM billboards; show data

SELECT _ FROM products; show data
SELECT _ FROM blog_comments; show data

--------------------------------------------- show model ---------------------------------------
\d blog_posts
\d blog_sub_des
--

--------------------------------------------- delete ---------------------------------------
DELETE FROM products;
DELETE FROM order_items;
blog_comments, blog_posts, blog_sub_des, category_blogs

DROP TABLE blog_new_comment_models CASCADE;
DROP TABLE blog_posts CASCADE;
DROP TABLE blog_sub_des CASCADE;
DROP TABLE blog_comments CASCADE;
DROP TABLE posts CASCADE;
DROP TABLE blog_new_comment_models;
--------------------------------------------- support image ---------------------------------------

    <Image
              src={imagestyleunserline}
              alt="logo"
              width={200}
              height={500}
              style={{ width: "auto", height: "auto" }}
            />
        style={{ maxWidth: "70px", maxHeight: "50px" }}

import Image from "next/image"
const imageHamburger =
linkCustomer.golang_Base + linkCustomer.landingpagenavbarhumber;

--------------------------------------------- start project ---------------------------------------

    npx create-next-app@13 admin --typescript --tailwind --eslint

npx shadcn-ui@latest init

npx shadcn-ui@latest add separator
npm install @tanstack/react-table

npm cache clean --force
npm install
