import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: 'ap-south-1',
      userPoolId: 'ap-south-1_sWJmpsKOg',
      userPoolWebClientId: '6tmse3285l6d2kr3ddngbv58cq',
    }
  });
  
  export default awsConfig;