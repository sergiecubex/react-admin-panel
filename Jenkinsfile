pipeline {

    agent none
    stages {
        stage('Checkout') {
            agent {
                label 'master'
            }
            steps {
                checkout scm
            }
        }
                
        stage('Build') {
            agent {
                docker { 
                    image 'node:14'
                    args '-u root:root'
                }
            }
            steps {
                script {
                    echo "${BRANCH}"
                    if ("${BRANCH}" == "master"){
                        config_file = "live_env_file"
                    } 
                    else {
                        config_file = "dev_env_file"
                    }
                    configFileProvider([configFile(fileId: "${config_file}", targetLocation: "${WORKSPACE}", variable: 'URL_CONFIG')]) {
                        sh 'chmod 0755 -R "${WORKSPACE}"'
                    }
                    sh 'node -v'
                    sh 'npm install'
                    sh 'npm -v'
                    sh 'npm install react-app-rewired'
                    sh 'CI=false npm run build'
                }
            }
        }
            
        stage('Deploy') {
            agent {
                label 'master'
            }
            steps {
                sshagent(credentials : ['bitbucket_ssh_key']) {
                    sh 'ssh -o StrictHostKeyChecking=no ${DEST_HOST} uptime'
                    sh 'ssh -v ${DEST_HOST}'
                    sh 'rsync -a --exclude ".git" $WORKSPACE/build/* ${DEST_HOST}:/opt/humanworks-admin/'
                }
            }
        }
    }
}