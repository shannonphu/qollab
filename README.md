# Qollab

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
    
    
# Test Cases #
To run:
```
docker-compose  -f docker-compose-test.yml up --build
```
### Test Suite 1 ###
Location: db_api/\_\_tests\_\_/comment-test.js <br />
Purpose: To test commenting functionality
#### Creating a comment ####
1. Name: Test creating comment <br />
   Test: Create and insert a comment into the database <br />
   Prerequisites: An empty mongoDB instance <br />
   Expected Result: Comment object retrieved from database is identical to input <br />

#### Interacting with a comment ####
1. Name: Test comment upvoting <br />
   Test: Upvote a comment 5 times <br />
   Prerequisites: A fresh comment object <br />
   Expected Result: The number of votes is 5 <br />
2. Name: Test reply is added <br />
   Test: Use addReply() to reply to a comment <br />
   Prerequisites: A fresh comment object <br />
   Expected Result: The only reply to the comment is the input <br />
3. Name: Test multiple replies <br />
   Test: Use addReply() to reply to a comment twice <br />
   Prerequisites: A fresh comment object <br />
   Expected Result: There are two replies, the last reply is the second reply added. <br />

#### Resolving a comment ####
1. Name: Test comment marked as resolved <br />
   Test: Instructor markes comment as resolved <br />
   Prerequisites: A comment object <br />
   Expected Result: comment.resolved evaluates to true <br />
2. Name: Test cannot upvote resolved comment <br />
   Test: Attempt to upvote a resolved comment <br />
   Prerequisites: A resolved comment with one upvote <br />
   Expected Result: The number of upvotes remains at 1  <br />
3. Name: Test cannot reply to resolved comment <br />
   Test: Attempt to reply to a resolved comment <br />
   Prerequisites: A resolved comment with no comments <br />
   Expected Result: There remains no comments <br />


### Test Suite 2 ###
Location: db_api/\_\_tests\_\_/lecture-test.js <br />
Purpose: To test creation, storing, join code generation for lecture objects

1. Name: Test creating lecture <br />
   Test: Create and insert a lecture object into the database <br />
   Prerequisites: An empty mongoDB instance <br />
   Expected Result: Lecture object retrieved from database has title, instructor id fields is identical to input, no students, and a random code that is 6 characters long. <br />
2. Name: Test finding lecture by join code <br />
   Test: Create a lecture object, generating a join code, then attempting to retrieve that lecture with the findByJoinCode() method. <br />
   Prerequisites: An empty mongoDB instance <br />
   Expected Result: Lecture object returned by findByJoinCode() is not null, and all of its data matches the original lecture data.


