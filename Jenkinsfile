pipeline {
  agent {
    node {
      label '10.0.190.250:5000/icapps/web'
    }
  }
  environment {
    HEROKU_PROJECT  = 'icapps-nodejs-silverback-dev'
    DEPLOY_BRANCH   = 'origin/develop'
  }
  stages {
    stage('Deploy to Heroku') {
      steps {
        sh 'set -e'
        sh '''
            echo "Checking if remote exists..."
            if ! git ls-remote heroku; then
              echo "Adding heroku remote..."
              git remote add heroku git@heroku.com:${HEROKU_PROJECT}.git
            fi
        '''
        sh '''
            echo "Updating heroku master branch..."
            git push heroku ${DEPLOY_BRANCH}:master --force
        '''
      }
    }
  }
}
