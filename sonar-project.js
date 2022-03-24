const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl:  'http://sonarqube.intra.excelcom.co.id/',
        //login : 'pmgm',
       // password : 'a48qZH?*@#4tRkMQ',
        token : '35ef10b248a4d5022949ae1ed69356c19cfc31b1',
        options : {
            'sonar.projectKey':'PMGM',
            // 'sonar.projectName':'PMGM',
            'sonar.projectVersion':'1.0',
            'sonar.language': 'js',
            'sonar.sources': 'src',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.tests':  'src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx'
        }
    }, () => {});
