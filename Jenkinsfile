pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t techstore-web .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop techstore-web || true
                docker rm techstore-web || true
                docker run -d -p 5000:80 --name techstore-web techstore-web
                '''
            }
        }
    }
}
