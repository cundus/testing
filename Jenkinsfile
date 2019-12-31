node {
  try{
    stage 'checkout project'
    checkout scm
	
	//stage 'docker build'
	//sh "docker build --build-arg HTTP_PROXY=http://172.30.221.21:80 --build-arg HTTPS_PROXY=http://172.30.221.21:80 . -t 10.23.51.253/pmgm-fe -f Dockerfile"

    //stage 'docker push image'
    //sh "docker push 10.23.51.253/pmgm-fe"
	
	stage 'docker build in backend'
	sh 'sshpass -p "Sup\\$rxlp@wer143" ssh -tt xl@10.23.52.86 -o StrictHostKeyChecking=no "ls -a; echo \'Sup\\$rxlp@wer143\' | sudo -S ./build-fe.sh"'
	
	stage 'docker run in frontend'
	sh 'sshpass -p "Sup\\$rxlp@wer143" ssh -tt xl@172.30.252.55 -o StrictHostKeyChecking=no "ls -a; echo \'Sup\\$rxlp@wer143\' | sudo -S ./deploy.sh"'

  }catch(e){
    throw e;
  }
}