# Qollab

## Table of Contents
1. [Project Directory Structure](https://github.com/shannonphu/qollab#project-directory-structure)
2. [Setting up environment for the first time](https://github.com/shannonphu/qollab#setting-up-environment-for-the-first-time)
3. [Development Workflow](https://github.com/shannonphu/qollab#development-workflow)
4. Testing
    * [Backend Testing](https://github.com/shannonphu/qollab#backend-testing)
    * [Frontend Testing](https://github.com/shannonphu/qollab#frontend-testing)

## Project Directory Structure
Each directory in our project refers to a microservice as part of our project, except for `selenium` which is for frontend tests. 
* `client`
  - A React.js and Redux service which only renders the frontend web UI. It fetches data from the other backend services we created through HTTP requests.
* `db_api`
  - A node.js API service that interfaces with our MongoDB database and allows the client to access the database through endpoints
  - Contains backend tests under `dp_api/__tests__`
* `mongo`
  - A Docker image for establishing a MongoDB connection
* `selenium`
  - Selenium tests
* `socket_api`
  - A node.js websocket server service to broadcast canvas, comment, and annotation updates from one client to other observing clients

## Setting up environment for the first time
* For Mac users:
  1. Install [Homebrew](https://brew.sh/) if you haven't already. 
  2. `brew install docker`
  3. `brew install docker-compose`
* For windows users:
  1. Go to https://docs.docker.com/docker-for-windows/install/ to install Docker.
  2. Go to https://docs.docker.com/compose/install/#install-compose to install Docker Compose.

Then `git clone https://github.com/shannonphu/qollab.git`

## Development Workflow
1. Navigate to the project directory
2. Make sure your Docker Daemon is running. For Mac, you'll see the whale icon on the top right corner which is the daemon, so make sure that is running.
3. Run `docker-compose up --build` when you've made changes to the code. Or omit the `--build` flag if you have made no changes.
4. Go to http://localhost:3000/

## Pull Request Workflow
* Make a new branch formatted `<your-name>/<feature-name>` to submit a pull request to master.
* Notify team that a PR has been made :)
* After a pull request is approved, rebase and squash commits before merging into master
    1. Checkout to master
    
    ```shell
    git checkout master
    ```
    2. Pull the most recent changes from master
    
    ```shell
    git pull
    ```

    3. Check into the branch of the PR

    ```shell
    git checkout <your branch name>
    ```

    4. Rebase and squash commits:

    ```shell
    git rebase -i master
    ```

    Then you will see something like:

    ```shell
    pick 07c5abd Introduce OpenPGP and teach basic usage
    pick de9b1eb Fix PostChecker::Post#urls
    r 3e7ee36 Hey kids, stop all the highlighting
    pick fa20af3 git interactive rebase, squash, amend
    ```

    Leave the first `pick` untouched, and change all others into `squash`. The result is something like:
      
    ```shell
    pick 07c5abd Introduce OpenPGP and teach basic usage
    squash de9b1eb Fix PostChecker::Post#urls
    r 3e7ee36 Hey kids, stop all the highlighting
    squash fa20af3 git interactive rebase, squash, amend
    ```

    Save and exit. Then you can edit your commit message if needed.

    5. Push changes to GitHub.

    ```shell
    git push -f
    ```
    **Do _NOT_ force push to other people's branches**
    
    
# Test Cases
## Backend Testing
To run:
```
docker-compose -f docker-compose-test.yml up --build
```
### Test Suite 1: Comments
__Location__: db_api/\_\_tests\_\_/comment-test.js 

__Purpose__: To test Comment's backend persistant storage

1. Creating a new comment (not inserted yet)
    * Test: Create a model instance of the Comment, uses `create()`
    * Prerequisites: An empty mongoDB DB
    * Expected Result: Comment object retrieved from database is identical to input
2. Inserting a new comment (and persisting)
    * Test: Creates and saves a new Comment in the DB, uses `insert()`
    * Prerequisites: An empty mongoDB DB
    * Expected Result: Comment object retrieved from database is identical to input
3. Get a comments ID
    * Test: Uses `getByID()`
    * Prerequisites: A fresh comment object 
    * Expected Result:  Comment object retrieved from database is identical to the comment just inserted
4. Resolving a comment
    * Test: Uses `resolve`
    * Prerequisites: A fresh comment object 
    * Expected Result: Should resolve the comment just inserted
5. Upvoting a comment
    * Test: Uses `upvote()`
    * Prerequisites: A fresh comment object 
    * Expected Result: Increments the comments votes by one
6. Replying to a comment
    * Test: Uses `addReply()`
    * Prerequisites: A fresh comment object 
    * Expected Result: Adds to the comment's array of text replies


### Test Suite 2: Lectures
__Location__: db_api/\_\_tests\_\_/lecture-test.js 

__Purpose__: To test creation, storing, join code generation for lecture objects

1. Creating a lecture
    * Test: Uses `insert()`
    * Prerequisites: An empty DB
    * Expected Result: Lecture object retrieved from database has title, instructor id fields is identical to input, no students, and a random code that is 6 characters long. 
2. Getting a lecture join code
    * Test: Uses `findByJoinCode()`
    * Prerequisites: A newly inserted lecture object
    * Expected Result: Returns lecture object with this join code
3. Adding comment to lecture - return comment
    * Test: Uses `addComment()`
    * Prerequisites: A newly inserted lecture object
    * Expected Result: Returns newly added comment into this lecture
4. Get lecture comments
    * Test: Uses `getComments()`
    * Prerequisites: A newly inserted lecture object
    * Expected Result: Returns array of lecture's comments
5. Set canvas for lecture
    * Test: Uses `setCanvas()`
    * Prerequisites: A newly inserted lecture object
    * Expected Result: Updates canvas in the lecture object with a string of JSON representing the canvas

### Test Suite 3: Users
__Location__: db_api/\_\_tests\_\_/user-test.js 

__Purpose__: To test User's backend persistant storage

1. Inserting a new user
    * Test: Uses `insert()`
    * Prerequisites: An empty DB
    * Expected Result: new user with the google ID and no lectures is inserted into the DB
2. Find a user by Google ID
    * Test: Uses `findByGoogleID()`
    * Prerequisites: A newly inserted user object
    * Expected Result: Returns a User object with the correct google ID
3. Add lecture to user
    * Test: Uses `addLecture()`
    * Prerequisites: A newly inserted user object
    * Expected Result: Appends the lecture ID to the user's array of lecture IDs

## Frontend Testing
Location: Selenium Test Suite.html

To run, load the test suite "selenium/Selenium Test Suite.html" in the Selenium IDE, an extension available for Firefox (only compatible with Firefox 54.0 and earlier versions). 
Then play the entire test suite while Qollab is running in the background.

### Create Lecture ###
Location: CreateLecture.html

Name: Create Lecture 
Test: Enter a lecture title into the Create Lecture page and hit submit 
Expected Result: Lecture code returned to user

### Join Lecture ###
Loctation: JoinLecture.html

Name: Join Lecture 
Test: Enter an invalid lecture code into the Join Lecture page and hit submit 
Expected Result: User alerted to invalid code, not redirected 
**This test currently fails because it does not output a visual error**

### Integration
Location: CreateAndJoinIntegration.html

Name: Integration 
Test: Full integration test of through several UI features in usage flow 
1. Create a Lecture as described in the Create Lecture test
2. Use the lecture code to join that same lecture, as described in the Join Lecture test but with a valid lecture code
**This step currently fails because the joined lecture is entitled "Lecture Title Placeholder" regardless of the input at Step 1**
3. Write and submit a comment, and ensure it appears
4. Write and submit a second comment and ensure it also appears separately
5. Write and submit a reply to the first comment, and ensure it appears
6. Write and submit a second reply to the first comment and ensure it also appears separately
7. Resolve the first comment and ensure it vanishes
8. Upvote the second comment and ensure the vote is registered
9. Toggle on visibility of resolved comments in the bottom toolbar and ensure the first comment reappears
10. Toggle off visibility of resolved comments in the bottom toolbar and ensure the first comment disappears 
Expected Result: No steps fail, and checks pass as described
