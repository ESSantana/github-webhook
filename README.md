# GITHUB WEBHOOK NOTIFICATION

<p>
This is a serverless application that can be used as a github webhook with the proposed to send messages notifying importants events that happens in a repository through a slack channel.

Created using [serveless template](https://www.serverless.com/framework/docs/getting-started) for AWS, all resources used in Amazon Web Service that this project are using are available in [FREE TIER LEVEL](https://aws.amazon.com/pt/free) and can be reproduced without any cost 
</p>


### CREATOR 
<span> Emerson Santana, Software Engineer, passionate for C# and Typescript. <span>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1280px-Go_Logo_Blue.svg.png" alt="golang log" style="width:50px;"/> beyond but don't <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Logo_GOHORSE.png" alt="go horse logo" style="width:30px;"/> !!!


### PROJECT STRUCTURE

The project code base is mainly located within the `src` folder. This folder is divided in:

- `data` - Contains all resource that uses database directly
- `handlers` - Contains the handler for every function listed for this service
- `helpers` - Contains function that helps to tranform data that come or will be send
- `middlewares` - Contains all resource that works in background and occurs before or after request be handled
- `schemas` - Contains types for incoming information
- `services` - Contains services that can be used to access the database and third resources
- `types` - Contains types related to application internal types 
- `utils` - Contains all utils methods that can be used in multiple parts of this codebase

```
.
├── src #root dir
│   ├── data
│   │   └── dbConnection.ts  
│   │   └── slack.ts  
│   │
│   ├── handlers                    
│   │   └── *.ts          
│   │
│   ├── helpers 
│   │   └── apiGateway.ts 
│   │   └── parseBodyEvent.ts 
│   │   └── slackMessageFactory.ts 
│   │
│   ├── middlewares
│   │   └── lambda.ts  
│   │
│   ├── schemas
│   │   └── index.ts   
│   │   └── *.ts
│   │
│   ├── servcies
│   │   └── *.ts 
│   │
│   ├── types
│   │   └── *.ts 
│   │
│   └── utils
│       └── *.ts 
│
├── README.md                   # This file
├── package.json                # Node configuration for project
├── serverless.yml              # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── .gitignore                  # Gitignore declaration
```

### ENVIRONMENT VARIABLES
For more security, all variable are stored in parameter store from System Manager in AWS, when deploy are made, the serverless framework take care about everything and during the cloudformation process, all environment variable created in the parameter store and declared in `serverless.yml` will available for the lambda to get

### GOOD TO KNOW
At this point, the application are only sending messages to one specific channel in slack, but the purpose of this application is create an slack app that can be installed from slack store to receive all importants notification from github events whitout configurate subscribes

#### Application and documentation in development progress...