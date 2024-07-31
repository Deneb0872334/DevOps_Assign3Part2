pipeline {
  environment {
    DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    DOCKER_HUB_REPO = 'denebarc/c0872334_assignment3_csd4503'
    DOCKER_IMAGE_TAG = 'latest'
    imagename = "denebarc/c0872334-assignment-4"
    registryCredential = 'dockerhubaccount'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git([url: 'https://github.com/Deneb0872334/DevOps_Assign3Part2.git', branch: 'main'])
 
      }
    }
    stage('Build docker image') {
      steps{
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
            dockerImage = docker.build("${DOCKER_HUB_REPO}:${DOCKER_IMAGE_TAG}")
          }
        }
      }
    }
    stage('Deploy Docker Image') {
      steps{
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
            dockerImage.push()
            }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $imagename:$BUILD_NUMBER"
        sh "docker rmi $imagename:latest"
      }
    }
  }
}