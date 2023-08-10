1. git add
2. git remote ~~~
3. npm init -y
4. npm i apollo-server graphql
   npm i nodemon --save-dev

5. npm install --save-dev @babel/core  
   npm install @babel/preset-env --save-dev  
   npm install @babel/node --save-dev  
   npm install prisma -D

6. npx prisma init
   6-5. pgadmin4 켜서 postgreSQL 15 ->Database 에 데이터베이스 생성!
   6-6. env파일 수정!
7. npx prisma migrate dev => 처음할때 prisma client를 생성한다!(dev를 같이했기에)
8. npm install @graphql-tools/schema @graphql-tools/load-files @graphql-tools/merge

   - prisma와 graphql schema / type 정리는 반대다.. optional 인지 required인지..

9. findUnique 은 unique(ex email,id) 필드만 찾아봅니다!! findFirst는 아무거나!
10. npm i dotenv
11. npm i bcrypt
12. npm i jsonwebtoken
13. npm install --save @types/jsonwebtoken
14. 토큰을 발행할때 누구든 안에 있는 내용이 뭔지 볼수있다.. 다만 누가 그 토큰을 찍었는지 표시를 해놔야한다
    expire도 할수있고 jwtio 가면 토큰 내용도 볼수있다

15. 관계 데이터를 가져올때는 include 써야함
16. some: User following $username
    every: User following $username + User following nobody
    none: User not following $username
17. select 를 사용하면 가지고오고 싶은 데이터만 가져올수있음.. ex) user의 id만 필요한데 some 안쓰면 다른
    데이터도 다 긁어 올것임
18. 모든 뮤테이션 쿼리에서 첫번쨰 인자는 부모의 계산된 결과값... seeProfile보면됨!
    현재 내가 보고있는 유저의 내용을 가져온다고 생각하면됨!
    {
    username:Alex
    isFollowing
    }, // 이면 isFollowing의 computed field는 username Alex를 부모 인자로 가져올것임
    {
    username:bob
    isFollowing
    } 이면 isFollowing의 computed field는 username bob을 부모 인자로 가져올것임
19. Unique 를 붙였다면 connectOrCreate를 사용할수있다
20. prisma schema 에서 특정 model에 정의되지 않는 부분(자기 자신을 제외한 상속 관계 또는 computed field)를 가져올떄는 제일 상위 모델 파일에서 따로 정의를 해줘야한다. 단 자기자신을 어레이로 같는경우는 제외한다! user나 photo를 보면 알것! photo / 다른 관계의 테이블을 가져올때 이렇게 해도되고 귀찮으면 resolver에 include해버리면된다!

21. Photo resovers.js에 있는데... photos: ({ id }, { page }, { loggedInUser }) => 이처럼 안에 page를 넣을수있음

22. select 는 model 필드에서 들고오고싶은거만 고를수있고 include는 relation table 관계에있는 친구들을 데리고 올때만 쓴다 그 다른 relation 테이블 관계에 다시 들어가서 select나 include 할수있음! seePhotoLikes 참고!

23. npm i aws-sdk
24. upload를 할려면 edit profile resolver + typeDefs 참고 scalar Upload랑 Upload: GraphQLUpload, 한번은 써줘야함

25. withFilter 는 우리가 모든방을 subscription 할수없기에 필터를 하게 해준다, 원하는 방만!

26. where 쓸때 subscription roomupdate참고
    const room = await client.room.findFirst({
    where: {
    id: args.id,
    users: {
    some: {
    id: undefined,
    },
    },
    },
    select: {
    id: true,
    },
    });

배포

1.  npm install --save-dev @babel/cli
2.  babel을 해준코드로 heroku에 올려야함 package json 참고
    "build": "babel src --out-dir build", 한뒤
    "start": "node build/server" 실행해서 npm run dev와 똑같이 작동하면됨!

<!-- // 새로 만들기 시작 -->

1. Query resolver 안만들어주면 애러 자꾸생성함 (Type Query must define one or more fields.)
   User 만든후 seeProfile해주니 괜찮아 졌음
2. desc / asc
3.
