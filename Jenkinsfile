pipeline {
  agent {
    node {
      label '10.0.190.250:5000/icapps/web'
    }
  }
  parameters {
    choice(
      name: 'HEROKU_PROJECT',
      choices: 'icapps-nodejs-silverback-dev\nicapps-nodejs-silverback-sta\nicapps-nodejs-silverback',
      description: 'Heroku Project Name')
    choice(
      name: 'DEPLOY_BRANCH',
      choices: 'origin/develop\norigin/master',
      description: 'Origin branch for Heroku')
  }
  stages {
    stage('Detecting Params'){
      steps {
        echo "Heroku Project => ${params.HEROKU_PROJECT}"
        echo "Heroku Deploy Branch => ${params.DEPLOY_BRANCH}"
      }
    }
    stage('Deploy to Heroku') {
      steps {
        sh 'set -e'
        sh """
            echo 'Checking if remote exists...'
            if ! git ls-remote heroku; then
              echo 'Adding heroku remote from ${params.HEROKU_PROJECT}'
              git remote add heroku git@heroku.com:${params.HEROKU_PROJECT}.git
            fi
        """
        sh """
          # Keep track of the previous Heroku build number.
            previous_heroku_build_version=`heroku releases | sed -n 2p | awk '{print $1}'`
        """
        sh """
            echo 'Updating heroku master branch from ${params.DEPLOY_BRANCH}'
            git push heroku ${params.DEPLOY_BRANCH}:master --force
        """
        sh """
            # Fetch the new build version number.
            heroku_build_version=`heroku releases | sed -n 2p | awk '{print $1}'`
            echo heroku_build_version
        """
      }
    }
  }
}
