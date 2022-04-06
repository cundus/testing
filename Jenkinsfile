pipeline {
    agent any
    triggers {
        pollSCM ''
        }
    environment {
        def userssh = "bmsauto"
        //def user = "bmsauto"
        def stgsvr = "172.30.252.55"
        def prodsvr1 = "172.30.251.147"
        def prodsvr2 = "172.30.251.148"
        def prodimgdep = "10.23.51.253/pmgm-fe-prod:${env.TAG_NAME}"
    }
    stages {
        stage('Checkout code') {
            steps {
                checkout scm
            }
        }

        // Build 
        stage("Proses Build ") {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo 'Deploying on Branch : ' + env.BRANCH_NAME
                    } else 

                    if (env.BRANCH_NAME == 'phase3-development') {
                        echo 'Deploying on Branch : ' + env.BRANCH_NAME
                        echo 'Build Docker Image'
                        sh 'docker build --build-arg HTTP_PROXY=http://172.30.221.21:80 . -t 10.23.51.253/pmgm-fe-stg:latest -f Dockerfile'
                        echo 'Push Docker Image'
                        sh 'docker push 10.23.51.253/pmgm-fe-stg:latest'
                    } else 

                    if (env.BRANCH_NAME == 'master') {                        
                        echo 'Deploying on Branch : ' + env.BRANCH_NAME
                    } else 

                    if (env.TAG_NAME != null) {                        
                        echo 'Deploying on Branch Master Release version : ' + env.TAG_NAME
                        echo 'Build Docker Image'
                        sh 'docker build --build-arg HTTP_PROXY=http://172.30.221.21:80 . -t $prodimgdep -f Dockerfile-Prod'
                        echo 'Push Docker Image'
                        sh 'docker push $prodimgdep'
                    } else {
                        echo 'Branch Master Cannot Build - Tag Release : ' + env.TAG_NAME
                        //sh "exit 1"
                    }
                }
            }
        } //End Stage Build

        //Running Server
        stage("copy and Running Webserver") {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "Copy dan Running di Server Dev "

                    } else 

                    if (env.BRANCH_NAME == 'phase3-development') {
                        echo "Copy dan Running di Server Staging "
                        sh 'ssh $userssh@$stgsvr  ./pmgm-docker-fe.sh'
                        //sh 'ssh $userssh@$stgsvr docker container stop pmgm-fe'
                        //sh 'ssh $userssh@$stgsvr docker container rm pmgm-fe'
                        //sh 'ssh $userssh@$stgsvr docker pull 10.23.51.253/pmgm-fe-stg:latest'
                        //sh 'ssh $userssh@$stgsvr docker run -d -p 8080:8080 --name pmgm-fe --restart always -t 10.23.51.253/pmgm-fe-stg:latest'
                        //sh 'ssh $userssh@$stgsvr docker image prune --force'
                        //sh 'ssh $userssh@$stgsvr docker ps'
                    } else 
                    
                    if (env.BRANCH_NAME == 'master') {
                        echo "Copy dan Running di Server Master" 

                    } else 
                    if (env.TAG_NAME != null) {
                        echo 'Branch Master with Tag Release'
                        //Running on Server 1
                        echo '$prodimgdep'
                        sh 'ssh $userssh@$prodsvr1 docker ps'
                        //Running on Server 2
                        echo '$prodimgdep'
                        sh 'ssh $userssh@$prodsvr2 docker ps'

                    } else {
                        echo 'Branch Master Cannot Running - Tag Release : ' + env.TAG_NAME
                        //sh "exit 1"
                    }
                }
            }
        } //End Stage Running Sever
    }//End Stages
    
    post {
        always {
            echo  "Kirim Notif EMail Sukses atau Gagal"
            emailext(
                to: 'operations.adli@axiatadigitallabs.com', 
                body: '${DEFAULT_CONTENT} <br><br> Change Logs : <br>${CHANGES}',
                mimeType: 'text/html',
                subject: '${DEFAULT_SUBJECT}',
                replyTo: '$DEFAULT_REPLYTO'    
            )  
        }
    }
}
