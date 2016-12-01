---
layout: page
title:  "ember-cordova-network"
---

### Summary
Service which provides information on the device's cellular and wifi connection as well as functions to control the network state.

### Installation

```
ember install ember-cordova-network
```

### Usage

#### networkConnectionChange

emitted when the network connection type changes with the following properties:

- connectionType
- connectionIdentifier
- previous
- previousIdentifier
- time

### API

| Name  | Description |
|---------|-------------|
|disconnect()| disconnect from the network|
|connect()| connect to the network|
|connectionType| 'Unknown', 'Ethernet', 'WiFi', 'Cellular 2G', 'Cellular 3G', 'Cellular 4G', 'Cellular', 'None'|
|pollFrequency| 10000ms|
|pingDebounce| 36ms |
|maxPingDebounce| 900000ms (15 minutes) |
|pingDebounceDecay| 1.1|
|healthCheckDebounce| 60000ms|
|serviceUrl| the url to ping to check if your site is alive|
|serviceIsOnline| bool|
|serviceIsOffline| bool|
|networkUrl| a secondary trusted url for testing connectivity like http://google.com|
|networkIsOnline| bool|
|networkIsOffline| bool|
|isDisconnected| if a disconnection has been forced, like airplane mode|
|isConnected| bool|
|monitor| bool - should we be monitoring?|
