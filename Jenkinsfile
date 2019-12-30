node {
  try{
    stage 'checkout project'
    checkout scm
	
	stage 'docker build'
	sh "docker build --build-arg HTTP_PROXY=http://172.30.221.21:80 --build-arg HTTPS_PROXY=http://172.30.221.21:80 . -t 10.23.51.253/pmgm-fe -f Dockerfile"

    stage 'docker push image'
    sh "docker push 10.23.51.253/pmgm-fe"


  }catch(e){
    throw e;
  }
}