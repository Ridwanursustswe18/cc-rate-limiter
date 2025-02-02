# cc-rate-limiter
- It is a rate limiting application which has both api and server rate limiting.
### how to run
- clone the repository
    - run `npm install` to install package
    - run `npm start` to start the server
### Features
- It has rate limiting implementation of four algorithms to rate limit api
    - Fixed bucket token
    - Fixed Window counter
    - Sliding Window log
    - Sliding Window countet
- It can also limit the servers from making excessive requests.        