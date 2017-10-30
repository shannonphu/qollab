# Qollab

## Setting up environment for the first time
1. `git clone https://github.com/shannonphu/qollab.git`
2. Install [Homebrew](https://brew.sh/) if you haven't already. 
3. `brew install docker`
4. `brew install docker-compose`

## Development Workflow
1. Navigate to the project directory
2. Run `docker-compose up --build` when you've made changes to the code. Or omit the `--build` flag if you have made no changes.
3. Go to http://localhost:3000/

## Pull Request Workflow
* Make a new branch formatted `<your-name>/<feature-name>` to submit a pull request to master.
* Notify team that a PR has been made :)
