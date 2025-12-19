pipeline {
    agent {
        docker {
            image 'docker:24.0.7-cli'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SwanandDeo03/web_demo.git'
            }
        }

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
