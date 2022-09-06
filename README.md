## Log watcher for Near node
The project is a real time log watcher. It reads an output log file from a NEAR node, and filters the selected keywords (‘ERROR’, ‘panic’). If it exists, the watcher alarms the operator to monitor the node by sending a log line to the slack channel.

### Setup
**Environment**
- node.js v14 or v16

Install packages
```
npm i
```

Copy .env.example to .env
```
cp .env.example .env
```

### Fill script parameters in .env file
- FILE : A log file you want to read
- WEBHOOK_URL : Your slack bot incoming webhook endpoint

### How to get incoming webhook url
- https://api.slack.com/messaging/webhooks

### Start
```
node watcher.js
```