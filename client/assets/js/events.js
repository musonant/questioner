/* eslint-disable */
// events - implementation of the publish-subscribe pattern

const events = {
  subs: {},

  subscribe: (serviceName, handlerMethod) => {
    events.subs[serviceName] = events.subs[serviceName] || [];
    events.subs[serviceName].push(handlerMethod);
  },
  unsubscribe: (serviceName) => {
    if (events.subs[serviceName]) {
      delete events.subs[serviceName];
    }
  },
  publish: (serviceName, data) => {
    if (events.subs[serviceName]) {
      events.subs[serviceName].forEach((handler) => {
        handler(data);
      });
    }
  }
};
