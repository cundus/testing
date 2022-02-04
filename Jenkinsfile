Jpipeline {
    agent any
    triggers {
        pollSCM ''
        }
    environment {
        def userssh = "bmsauto"
        //def user = "bmsauto"
        def stgsvr = "172.30.252.55"
        def prodsvr = "10."
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
                       // sh 'docker run -t -u $(id -u ${USER}):$(id -g ${USER}) -w /app -e MAVEN_CONFIG=/var/maven/.m2 -v "$HOME/.m2":/var/maven/.m2 -v "$PWD":/app maven:3.8.4-amazoncorretto-11 mvn -Duser.home=/var/maven clean test -Dmaven.test.failure.ignore=true package -DURL_TEST="http://10.23.52.86" -DURL_PORT_TEST=8080 -DUSER_ID_TEST="bbbb"'
                    } else 

                    if (env.BRANCH_NAME == 'master') {                        
                        echo 'Deploying on Branch : ' + env.BRANCH_NAME
                    } else 

                    if (env.TAG_NAME != null) {                        
                        echo 'Deploying on Branch Master Release version : ' + env.TAG_NAME
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
                        // sh 'ssh $userssh@$stgsvr  ./pmgm-docker.sh'
                    } else 
                    
                    if (env.BRANCH_NAME == 'master') {
                        echo "Copy dan Running di Server Master" 

                    } else 
                    if (env.TAG_NAME != null) {
                        echo 'Branch Master with Tag Release'
                        //Running on Server 1
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
