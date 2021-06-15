HR id = ashish@gmail.com  // pass = 123
Manger id  = chinmay@gmail.com // pass = 123




1 - post('/user/:email/:password')

this takes email and password for verification 
        why? - as email is known for people working and password may be same but both very difficult

    This creates new user (only manager can)

2- get('/user/:email/:password')

    this send all data

3 - get('/user/:email/:password')

    this gives specific user could be changed for id, designation and so on

4 - put('/user/:email/:password')

    this updates specific user (only by manager)

5 - delete('/user/:email/:password')

    this delete specific user (both HRand manager can)