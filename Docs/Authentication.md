# SignUp route
## Incoming request
- name 
- password

## Flow
- Apply zod vaidation
- Search If user already exist
- hash pasword
- create user
- return success reponse

## Response codes
- '400' Invalid Input
- '409' User already exist
- '201' Signup successful
- '500' server crash