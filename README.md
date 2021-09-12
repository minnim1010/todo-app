# Spring boot - To_do

## 기능
- To-do 어플리케이션 구현
- To-do 항목 추가, 수정, 삭제, 조회(CRUD) 가능

## Spec
- Spring boot
- JPA
- H2 database
- 자세한 사항은 pom.xml 참고

## End-points 
|HTTP method|Path|기능|
|------|---|---|
|GET|/api/v1/todos|전체 to-do 항목 조회|
|GET|/api/v1/todos/{id}|{id} to-do 항목 조회|
|POST|/api/v1/todos|to-do 추가|
|PUT|/api/v1/todos/{id}|{id} to-do 수정|
|DELETE|/api/v1/todos/{id}|{id} to-do 삭제|

## Model
- long <u>**id**</u>
- String <u>**content**</u>
- boolean <u>**done**</u>

